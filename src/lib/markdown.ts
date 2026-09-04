/**
 * Series parts arrive as Markdown rather than the HTML standalone posts use.
 * This is a deliberately small converter — paragraphs, headings, lists, quotes,
 * fenced code, and the usual inline marks — whose output goes straight into
 * `renderRichText`, which sanitises it against the same allowlist as any other
 * post. So this only has to be *correct*, never *safe*: nothing here reaches
 * the DOM directly.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Stand-in for a code span while the other marks run; never appears in prose. */
const CODE_TOKEN = /@@code(\d+)@@/g;

function inline(text: string): string {
  let out = escapeHtml(text);
  // Code first, so marks inside a code span are left alone.
  const codeSpans: string[] = [];
  out = out.replace(/`([^`]+)`/g, (_, code: string) => {
    codeSpans.push(`<code>${code}</code>`);
    return `@@code${codeSpans.length - 1}@@`;
  });
  out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*\w])\*([^*\n]+)\*(?=[^*\w]|$)/g, '$1<em>$2</em>');
  out = out.replace(/(^|[^_\w])_([^_\n]+)_(?=[^_\w]|$)/g, '$1<em>$2</em>');
  return out.replace(CODE_TOKEN, (_, index: string) => codeSpans[Number(index)]);
}

/** The page's `<h1>` is already spoken for, so `#` and `##` both become `<h2>`. */
function headingTag(hashes: number): string {
  return `h${Math.min(4, Math.max(2, hashes))}`;
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const html: string[] = [];
  let paragraph: string[] = [];
  let list: { tag: 'ul' | 'ol'; items: string[] } | null = null;
  let quote: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) html.push(`<p>${inline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (list) {
      const items = list.items.map((item) => `<li>${inline(item)}</li>`).join('');
      html.push(`<${list.tag}>${items}</${list.tag}>`);
    }
    list = null;
  };
  const flushQuote = () => {
    if (quote.length) html.push(`<blockquote>${markdownToHtml(quote.join('\n'))}</blockquote>`);
    quote = [];
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/^\s*```/.test(line)) {
      flushAll();
      const code: string[] = [];
      while (++i < lines.length && !/^\s*```/.test(lines[i])) code.push(lines[i]);
      html.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (heading) {
      flushAll();
      const tag = headingTag(heading[1].length);
      html.push(`<${tag}>${inline(heading[2])}</${tag}>`);
      continue;
    }

    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) {
      flushAll();
      html.push('<hr>');
      continue;
    }

    const quoted = /^\s*>\s?(.*)$/.exec(line);
    if (quoted) {
      flushParagraph();
      flushList();
      quote.push(quoted[1]);
      continue;
    }
    flushQuote();

    const bullet = /^\s*[-*+]\s+(.+)$/.exec(line);
    const numbered = /^\s*\d+[.)]\s+(.+)$/.exec(line);
    const item = bullet ?? numbered;
    if (item) {
      flushParagraph();
      const tag = bullet ? 'ul' : 'ol';
      if (!list || list.tag !== tag) {
        flushList();
        list = { tag, items: [] };
      }
      list.items.push(item[1]);
      continue;
    }

    if (!line.trim()) {
      flushAll();
      continue;
    }

    // A wrapped line directly under a list item continues that item.
    if (list && /^\s{2,}/.test(line)) {
      list.items[list.items.length - 1] += ` ${line.trim()}`;
      continue;
    }
    flushList();
    paragraph.push(line.trim());
  }

  flushAll();
  return html.join('\n');
}

/** Standalone posts are HTML; series parts are Markdown. Tell them apart by
 *  whether the body already contains block-level tags. */
export function looksLikeHtml(body: string): boolean {
  return /<(p|h[1-6]|ul|ol|blockquote|pre|div)[\s>]/i.test(body);
}

export function toHtml(body: string): string {
  return looksLikeHtml(body) ? body : markdownToHtml(body);
}
