import { BLOGIFY_SITE } from '../data';

/** Loading state for anything fetched from Blogify. The API can take a
 *  moment to wake up, so this says where the wait is coming from and links
 *  there, rather than showing an anonymous spinner. */
export function BlogifyLoader({ label }: { label: string }) {
  return (
    <div className="blogify-loader" role="status" aria-live="polite">
      <img
        className="blogify-loader-logo"
        src="/blogify-logo.png"
        alt=""
        width={48}
        height={48}
        aria-hidden="true"
      />
      <p className="blogify-loader-text">
        <span className="sr-only">{label} </span>
        Fetching this from{' '}
        <a
          className="article-inline-link"
          href={BLOGIFY_SITE}
          target="_blank"
          rel="noopener noreferrer"
        >
          Blogify
        </a>
        , my own blogging app. It can take a few seconds to wake up.
      </p>
    </div>
  );
}
