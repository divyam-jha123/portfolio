import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Link } from '../router';
import { products, type Product } from '../data';

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [open, setOpen] = useState(false);
  const moreId = useId();
  const [lead, ...rest] = product.description;
  const hasMore = rest.length > 0 || Boolean(product.note);

  return (
    <motion.article
      className="product"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="product-head">
        <h3 className="product-name">{product.name}</h3>
        <span className={`product-status product-status--${product.status}`}>
          <span className="product-status-dot" aria-hidden="true" />
          {product.statusLabel}
        </span>
      </div>

      <p className="product-meta">
        <span>{product.role}</span>
        <span className="product-meta-sep" aria-hidden="true">/</span>
        <span>{product.period}</span>
      </p>

      <p className="product-description">{lead}</p>

      {hasMore && (
        <>
          {/* Grid-row collapse: the wrapper animates 0fr -> 1fr so the height
              tweens smoothly without measuring content. */}
          <div
            id={moreId}
            className="product-more"
            data-open={open ? 'true' : 'false'}
            aria-hidden={!open}
          >
            <div className="product-more-inner">
              {rest.map((paragraph, i) => (
                <p className="product-description" key={i}>
                  {paragraph}
                </p>
              ))}
              {product.note && <p className="product-note">{product.note}</p>}
            </div>
          </div>

          <button
            type="button"
            className="product-toggle"
            aria-expanded={open}
            aria-controls={moreId}
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? 'Show less' : 'Read more'}</span>
            <ChevronDown size={16} aria-hidden="true" className="product-toggle-icon" />
          </button>
        </>
      )}

      <div className="product-actions">
        {product.actions.map((action) =>
          action.url.startsWith('/') ? (
            <Link
              key={action.label}
              className={`btn btn--${action.variant}`}
              to={action.url}
            >
              {action.label}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          ) : action.url ? (
            <a
              key={action.label}
              className={`btn btn--${action.variant}`}
              href={action.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {action.label}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ) : (
            <button
              key={action.label}
              type="button"
              className={`btn btn--${action.variant}`}
              disabled
            >
              {action.label}
              <span className="btn-soon">soon</span>
            </button>
          )
        )}
      </div>
    </motion.article>
  );
}

export function ProductSection() {
  return (
    <motion.section
      id="products"
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-label">Products</h2>
      <p className="section-intro">
        Products I’m building because I wanted them to exist.
      </p>

      <div className="product-list">
        {products.map((product, index) => (
          <ProductCard key={product.name} product={product} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
