import { Fragment, createElement } from 'react';
import type { ReactNode } from 'react';
import { glossary } from '../data';
import { toHtml } from './markdown';

/**
 * The blog API returns authored HTML. Rendering it with dangerouslySetInnerHTML
 * would hand a third-party origin script execution on this page, so instead the
 * markup is parsed and rebuilt as React elements from an allowlist. Anything not
 * listed is unwrapped (its text survives, the tag does not), and only `href` is
 * carried over — the API's inline `style` attributes are dropped on purpose so
 * this site's own typography owns the spacing.
 *
 * Body text is then run past the glossary, which links the first mention of each
 * technical term to Wikipedia.
 */

const BLOCK_TAGS = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'blockquote', 'pre', 'hr']);
const INLINE_TAGS = new Set(['strong', 'em', 'code', 'br']);
const DISCARD_TAGS = new Set(['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta', 'form', 'input']);

/** Code is quoted verbatim, and an existing link is already a link. Neither gets glossed. */
const NO_GLOSS_TAGS = new Set(['code', 'pre', 'a']);

/** b/i are presentational aliases; render them as their semantic counterpart. */
const TAG_ALIASES: Record<string, string> = { b: 'strong', i: 'em' };

const SAFE_HREF = /^(https?:|mailto:)/i;

function escapeForRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Longest first, so "browser extension" wins over a bare "extension". */
const SORTED_TERMS = [...glossary].sort((a, b) => b.term.length - a.term.length);

const TERM_PATTERN = new RegExp(
  `\\b(${SORTED_TERMS.map((entry) => escapeForRegExp(entry.term)).join('|')})\\b`,
  'gi',
);

/** A term written with a capital is a proper noun: match its exact casing. */
function entryFor(matched: string) {
  const lower = matched.toLowerCase();
  return SORTED_TERMS.find((entry) => {
    if (entry.term.toLowerCase() !== lower) return false;
    return /[A-Z]/.test(entry.term) ? entry.term === matched : true;
  });
}

type Context = {
  /** Terms already linked in this post — each gets exactly one link. */
  linked: Set<string>;
  /** False inside headings, code, and existing links. */
  glossable: boolean;
};

function glossText(text: string, context: Context): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  TERM_PATTERN.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TERM_PATTERN.exec(text)) !== null) {
    const entry = entryFor(match[0]);
    if (!entry || context.linked.has(entry.term)) continue;

    context.linked.add(entry.term);
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

    nodes.push(
      <a
        key={`gloss-${key++}`}
        className="glossary-link"
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        title={`${entry.term} on Wikipedia`}
      >
        {match[0]}
      </a>,
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function renderNode(node: ChildNode, key: number, context: Context): ReactNode {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? '';
    if (!context.glossable || !text.trim()) return text;
    return <Fragment key={key}>{glossText(text, context)}</Fragment>;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const element = node as Element;
  const rawTag = element.tagName.toLowerCase();
  if (DISCARD_TAGS.has(rawTag)) return null;

  const tag = TAG_ALIASES[rawTag] ?? rawTag;
  const childContext: Context = NO_GLOSS_TAGS.has(tag)
    ? { ...context, glossable: false }
    : context;
  const children = Array.from(element.childNodes).map((child, index) =>
    renderNode(child, index, childContext),
  );

  if (tag === 'br') return <br key={key} />;
  if (tag === 'hr') return <hr key={key} />;

  if (tag === 'a') {
    const href = element.getAttribute('href') ?? '';
    // javascript: and data: URLs never become links — keep the text, drop the link.
    if (!SAFE_HREF.test(href)) return <Fragment key={key}>{children}</Fragment>;
    return (
      <a key={key} href={href} target="_blank" rel="noopener noreferrer nofollow">
        {children}
      </a>
    );
  }

  if (BLOCK_TAGS.has(tag) || INLINE_TAGS.has(tag)) {
    return createElement(tag, { key }, ...children);
  }

  return <Fragment key={key}>{children}</Fragment>;
}

/** Accepts either authored HTML or Markdown (series parts) — see `toHtml`. */
export function renderRichText(body: string): ReactNode[] {
  const parsed = new DOMParser().parseFromString(toHtml(body), 'text/html');
  const context: Context = { linked: new Set(), glossable: true };
  return Array.from(parsed.body.childNodes).map((node, index) =>
    renderNode(node, index, context),
  );
}

function parse(body: string): Document {
  return new DOMParser().parseFromString(toHtml(body), 'text/html');
}

/**
 * The first real paragraph, for a listing. A paragraph that is nothing but an
 * `<em>` — "Post 1 of our build log" — is a byline, not the story, so it's skipped.
 */
export function excerpt(body: string, maxLength = 140): string {
  const first = Array.from(parse(body).querySelectorAll('p')).find((p) => {
    const text = p.textContent?.trim() ?? '';
    if (!text) return false;
    const only = p.children.length === 1 ? p.children[0] : null;
    return !(only?.tagName === 'EM' && only.textContent?.trim() === text);
  });
  const text = (first?.textContent ?? '').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

/** Plain-text length drives the reading estimate, not the markup. */
export function estimateReadingTime(body: string): string {
  const text = parse(body).body.textContent ?? '';
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
