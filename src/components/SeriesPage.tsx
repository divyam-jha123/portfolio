import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, RotateCw } from 'lucide-react';
import { Link } from '../router';
import { SERIES_API_BASE, BLOGIFY_SITE, blogifySeriesUrl, blogifyPostUrl } from '../data';
import type { Series, SeriesPart } from '../data';
import { renderRichText, estimateReadingTime, excerpt } from '../lib/richText';

/**
 * A series is a build log read in order, so the page is a reading surface
 * with an index beside it: the parts on the left, the selected one on the
 * right. Every part has its own URL (`/writing/<slug>/<n>`), so the index is a
 * list of real links and the browser's back button walks back through parts.
 */

type State =
  | { status: 'loading' }
  | { status: 'ready'; series: Series }
  | { status: 'missing' }
  | { status: 'error'; message: string };

type Props = {
  slug: string;
  seriesSlug: string;
  eyebrow: string;
  /** From the URL. Undefined means "the first part"; NaN means a bad URL. */
  partNumber?: number;
};

function formatDate(iso?: string, style: 'long' | 'short' = 'long'): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
  });
}

export function SeriesPage({ slug, seriesSlug, eyebrow, partNumber }: Props) {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });

    fetch(`${SERIES_API_BASE}/${seriesSlug}`, { signal: controller.signal })
      .then(async (response) => {
        if (response.status === 404) return setState({ status: 'missing' });
        if (!response.ok) throw new Error(`The server responded with ${response.status}.`);
        const series = (await response.json()) as Series;
        if (!Array.isArray(series?.parts)) throw new Error('That series came back empty.');
        series.parts = [...series.parts].sort((a, b) => a.partNumber - b.partNumber);
        setState({ status: 'ready', series });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: 'error',
          message: error instanceof Error ? error.message : 'Something went wrong.',
        });
      });

    return () => controller.abort();
  }, [seriesSlug, attempt]);

  const series = state.status === 'ready' ? state.series : null;
  const parts = useMemo(() => series?.parts ?? [], [series]);
  const current: SeriesPart | undefined =
    partNumber === undefined ? parts[0] : parts.find((part) => part.partNumber === partNumber);
  const index = current ? parts.indexOf(current) : -1;
  const previous = index > 0 ? parts[index - 1] : undefined;
  const next = index >= 0 && index < parts.length - 1 ? parts[index + 1] : undefined;

  useEffect(() => {
    if (!series) return;
    document.title = current
      ? `${current.title} — ${series.title} — Divyam Jha`
      : `${series.title} — Divyam Jha`;
  }, [series, current]);

  if (state.status === 'loading') return <SeriesSkeleton />;

  if (state.status === 'missing') {
    return (
      <SeriesMessage
        title="That series isn't published"
        body={
          <>
            It may have been unpublished or removed since this link was created.
            The rest of my writing is on <BlogifyLink />.
          </>
        }
      />
    );
  }

  if (state.status === 'error') {
    return (
      <SeriesMessage
        title="This series didn't load"
        body={
          <>
            {state.message} The writing lives on <BlogifyLink />, so this is usually
            temporary — you can also{' '}
            <a
              className="article-inline-link"
              href={blogifySeriesUrl(seriesSlug)}
              target="_blank"
              rel="noopener noreferrer"
            >
              read this series there directly
            </a>
            .
          </>
        }
        onRetry={() => setAttempt((count) => count + 1)}
      />
    );
  }

  const ready = state.series;
  const partHref = (part: SeriesPart) => `/writing/${slug}/${part.partNumber}`;
  const started = formatDate(parts[0]?.createdAt ?? ready.createdAt);

  return (
    <div className="series">
      <motion.header
        className="series-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <BackLink />
        <p className="series-eyebrow">
          <span className="series-eyebrow-tag">Series</span>
          <span>{eyebrow}</span>
        </p>
        <h1 className="article-title">{ready.title}</h1>
        {ready.description && <p className="article-dek">{ready.description}</p>}
        <p className="article-meta">
          <span>
            {parts.length} {parts.length === 1 ? 'part' : 'parts'}
          </span>
          {started && (
            <>
              <span className="article-meta-sep" aria-hidden="true">/</span>
              <span>Started {started}</span>
            </>
          )}
        </p>
      </motion.header>

      <div className="series-layout">
        <nav className="series-index" aria-label="Parts in this series">
          <h2 className="series-index-label">Parts</h2>
          <ol className="series-list">
            {parts.map((part) => {
              const isCurrent = part === current;
              const date = formatDate(part.createdAt, 'short');
              return (
                <li key={part.id}>
                  <Link
                    to={partHref(part)}
                    className={`series-card${isCurrent ? ' series-card--current' : ''}`}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    <span className="series-card-head">
                      <span className="series-card-part">Part {part.partNumber}</span>
                      {isCurrent && (
                        <span className="series-card-reading">Reading</span>
                      )}
                    </span>
                    <span className="series-card-title">{part.title}</span>
                    <span className="series-card-excerpt">{excerpt(part.body, 120)}</span>
                    <span className="series-card-meta">
                      <span>{estimateReadingTime(part.body)}</span>
                      {date && (
                        <>
                          <span className="article-meta-sep" aria-hidden="true">·</span>
                          <span>{date}</span>
                        </>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        {current ? (
          <PartArticle
            key={current.id}
            part={current}
            total={parts.length}
            previous={previous}
            next={next}
            href={partHref}
          />
        ) : (
          <article className="article series-article">
            <header className="article-header">
              <h2 className="series-part-title">
                {parts.length ? 'That part isn’t here' : 'Nothing published yet'}
              </h2>
              <p className="article-dek">
                {parts.length
                  ? 'Pick a part from the list to keep reading.'
                  : 'The first post is on its way. Check back soon.'}
              </p>
            </header>
          </article>
        )}
      </div>
    </div>
  );
}

function PartArticle({
  part,
  total,
  previous,
  next,
  href,
}: {
  part: SeriesPart;
  total: number;
  previous?: SeriesPart;
  next?: SeriesPart;
  href: (part: SeriesPart) => string;
}) {
  const date = formatDate(part.createdAt);

  return (
    <article className="article series-article">
      <motion.header
        className="article-header"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="series-part-eyebrow">
          Part {part.partNumber} of {total}
        </p>
        <h2 className="series-part-title">{part.title}</h2>
        <p className="article-meta">
          {part.author?.userName && <span>{part.author.userName}</span>}
          {part.author?.userName && date && (
            <span className="article-meta-sep" aria-hidden="true">/</span>
          )}
          {date && <span>{date}</span>}
          <span className="article-meta-sep" aria-hidden="true">/</span>
          <span>{estimateReadingTime(part.body)}</span>
        </p>
        {part.coverImageUrl && (
          <img
            className="article-cover"
            src={part.coverImageUrl}
            alt=""
            loading="eager"
            decoding="async"
          />
        )}
      </motion.header>

      <motion.div
        className="article-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        {renderRichText(part.body)}
      </motion.div>

      <footer className="article-footer series-footer">
        <div className="series-pager">
          {previous ? (
            <Link to={href(previous)} className="series-pager-link">
              <span className="series-pager-label">
                <ArrowLeft size={13} aria-hidden="true" />
                Previous
              </span>
              <span className="series-pager-title">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={href(next)} className="series-pager-link series-pager-link--next">
              <span className="series-pager-label">
                Next
                <ArrowRight size={13} aria-hidden="true" />
              </span>
              <span className="series-pager-title">{next.title}</span>
            </Link>
          ) : (
            <span className="series-pager-end">
              <span className="series-pager-label">Latest post</span>
              <span className="series-pager-title">More coming as we build.</span>
            </span>
          )}
        </div>
        <div className="series-footer-actions">
          <a
            className="btn btn--primary"
            href={blogifyPostUrl(part.id)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read on Blogify
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <Link to="/" className="btn btn--secondary">
            <ArrowLeft size={15} aria-hidden="true" />
            Back to portfolio
          </Link>
        </div>
      </footer>
    </article>
  );
}

function BackLink() {
  return (
    <Link to="/" className="article-back">
      <ArrowLeft size={15} aria-hidden="true" />
      Divyam Jha
    </Link>
  );
}

function BlogifyLink() {
  return (
    <a
      className="article-inline-link"
      href={BLOGIFY_SITE}
      target="_blank"
      rel="noopener noreferrer"
    >
      Blogify
    </a>
  );
}

/** Shaped like the page it replaces: header, then index beside article. */
function SeriesSkeleton() {
  return (
    <div className="series" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading the series…</span>
      <div className="series-header">
        <BackLink />
        <div className="skeleton skeleton-meta" style={{ marginTop: 0, marginBottom: 16 }} />
        <div className="skeleton skeleton-title skeleton-title--short" />
        <div className="skeleton skeleton-meta" />
      </div>
      <div className="series-layout" aria-hidden="true">
        <div className="series-index">
          <ol className="series-list">
            <li><div className="skeleton series-card-skeleton" /></li>
            <li><div className="skeleton series-card-skeleton" /></li>
          </ol>
        </div>
        <div className="article series-article">
          <div className="article-header">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-meta" />
          </div>
          <div className="article-body">
            {[92, 100, 74, 100, 88, 96, 60].map((width, i) => (
              <div className="skeleton skeleton-line" key={i} style={{ width: `${width}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SeriesMessage({
  title,
  body,
  onRetry,
}: {
  title: string;
  body: ReactNode;
  onRetry?: () => void;
}) {
  return (
    <article className="article">
      <header className="article-header">
        <BackLink />
        <h1 className="article-title">{title}</h1>
        <p className="article-dek">{body}</p>
      </header>
      <footer className="article-footer">
        {onRetry && (
          <button type="button" className="btn btn--primary" onClick={onRetry}>
            <RotateCw size={15} aria-hidden="true" />
            Try again
          </button>
        )}
        <Link to="/" className="btn btn--secondary">
          <ArrowLeft size={15} aria-hidden="true" />
          Back to portfolio
        </Link>
      </footer>
    </article>
  );
}
