import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, RotateCw } from 'lucide-react';
import { Link } from '../router';
import { BlogifyLoader } from './BlogifyLoader';
import { BLOG_API_BASE, BLOGIFY_SITE, blogifyPostUrl } from '../data';
import type { BlogPost } from '../data';
import { renderRichText, estimateReadingTime } from '../lib/richText';

type State =
  | { status: 'loading' }
  | { status: 'ready'; post: BlogPost }
  | { status: 'missing' }
  | { status: 'error'; message: string };

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function WritingPage({ postId }: { postId: string }) {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });

    fetch(`${BLOG_API_BASE}/${postId}`, { signal: controller.signal })
      .then(async (response) => {
        if (response.status === 404) return setState({ status: 'missing' });
        if (!response.ok) throw new Error(`The server responded with ${response.status}.`);
        const post = (await response.json()) as BlogPost;
        if (!post?.body) throw new Error('That post came back empty.');
        setState({ status: 'ready', post });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: 'error',
          message: error instanceof Error ? error.message : 'Something went wrong.',
        });
      });

    return () => controller.abort();
  }, [postId, attempt]);

  useEffect(() => {
    if (state.status === 'ready') {
      document.title = `${state.post.title} — Divyam Jha`;
    }
  }, [state]);

  if (state.status === 'loading') return <ArticleSkeleton />;

  if (state.status === 'missing') {
    return (
      <ArticleMessage
        title="That post isn't published"
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
      <ArticleMessage
        title="This post didn't load"
        body={
          <>
            {state.message} The writing lives on <BlogifyLink />, so this is usually
            temporary — you can also{' '}
            <a
              className="article-inline-link"
              href={blogifyPostUrl(postId)}
              target="_blank"
              rel="noopener noreferrer"
            >
              read this post there directly
            </a>
            .
          </>
        }
        onRetry={() => setAttempt((count) => count + 1)}
      />
    );
  }

  const { post } = state;
  const date = formatDate(post.createdAt);

  return (
    <article className="article">
      <motion.header
        className="article-header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <BackLink />

        <h1 className="article-title">{post.title}</h1>

        <p className="article-meta">
          {post.author?.userName && <span>{post.author.userName}</span>}
          {post.author?.userName && date && (
            <span className="article-meta-sep" aria-hidden="true">/</span>
          )}
          {date && <span>{date}</span>}
          <span className="article-meta-sep" aria-hidden="true">/</span>
          <span>{estimateReadingTime(post.body)}</span>
        </p>

        {post.coverImageUrl && (
          <img
            className="article-cover"
            src={post.coverImageUrl}
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
        transition={{ duration: 0.5, delay: 0.12 }}
      >
        {renderRichText(post.body)}
      </motion.div>

      <footer className="article-footer">
        <a
          className="btn btn--primary"
          href="https://www.brainexpo.me/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit BrainExpo
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <Link to="/" className="btn btn--secondary">
          <ArrowLeft size={15} aria-hidden="true" />
          Back to portfolio
        </Link>
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

function ArticleSkeleton() {
  return (
    <div className="article">
      <div className="article-header">
        <BackLink />
      </div>
      <BlogifyLoader label="Loading the post." />
    </div>
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

function ArticleMessage({
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

export function NotFoundPage() {
  return (
    <ArticleMessage
      title="Nothing here"
      body={
        <>
          That page doesn't exist — it may have moved, or the link may be wrong. If
          you were looking for something I wrote, it's on <BlogifyLink />.
        </>
      }
    />
  );
}
