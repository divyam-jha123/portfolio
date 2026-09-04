import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '../router';
import { products } from '../data';

export function ProductSection() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-label">Products</h2>
      <p className="section-intro">
        Products I’m building because I wanted them to exist...
      </p>

      <div className="product-list">
        {products.map((product, index) => (
          <motion.article
            key={product.name}
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

            {product.description.map((paragraph, i) => (
              <p className="product-description" key={i}>
                {paragraph}
              </p>
            ))}

            {product.note && <p className="product-note">{product.note}</p>}

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
        ))}
      </div>
    </motion.section>
  );
}
