import React, { useState } from 'react';
import { useCart, useWishlist } from '../context/CartContext';
import QuickViewModal from '../components/QuickViewModal';
import CartToast from '../components/CartToast';
import { allProducts } from '../data/productsData';
import './WomenPage.css';

const ITEMS_PER_PAGE = 8;

function Stars({ count }) {
  return (
    <div className="wp-stars">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={s <= count ? 'wp-star filled' : 'wp-star'}>★</span>
      ))}
    </div>
  );
}

export default function WomenPage({ onBack, defaultFilter }) {
  const { addToCart, setPage } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [filter, setFilter]       = useState(defaultFilter || 'All Products');
  const [search, setSearch]       = useState('');
  const [visible, setVisible]     = useState(ITEMS_PER_PAGE);
  const [hovered, setHovered]     = useState(null);
  const [quickView, setQuickView] = useState(null);
  const [toast, setToast]         = useState(null);

  // Filter logic
  const filters = ['All Products', 'Women', 'Men', 'Children'];

  const filtered = allProducts.filter(p => {
    const matchCat    = filter === 'All Products' || p.cat === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const displayed = filtered.slice(0, visible);

  function handleAddToCart(product) {
    addToCart(product);
    setToast(product);
  }

  function handleQuickView(product) {
    setQuickView(product);
  }

  function handleQuickViewAdd(product) {
    setToast(product);
  }

  return (
    <div className="wp-page">
      {/* Breadcrumb */}
      <div className="wp-breadcrumb">
        <span className="wp-bc-link" onClick={onBack}>Home</span>
        <span className="wp-bc-sep">›</span>
        <span>Women's</span>
      </div>

      {/* Page title */}
      <h1 className="wp-title">PRODUCT OVERVIEW</h1>

      {/* Filter + Search bar */}
      <div className="wp-toolbar">
        <div className="wp-filters">
          {filters.map(f => (
            <button
              key={f}
              className={`wp-filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => { setFilter(f); setVisible(ITEMS_PER_PAGE); }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="wp-search-wrap">
          <button className="wp-filter-icon-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/></svg>
            Filter
          </button>
          <div className="wp-search-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="wp-grid">
        {displayed.map(product => (
          <div
            key={product.id}
            className="wp-card"
            onMouseEnter={() => setHovered(product.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Badge */}
            {product.badge && (
              <span className={`wp-badge wp-badge-${product.badge.toLowerCase()}`}>
                {product.badge}
              </span>
            )}

            {/* Image */}
            <div
              className="wp-img-wrap"
              onClick={() => handleQuickView(product)}
              style={{ cursor: 'pointer' }}
            >
              <img src={product.img} alt={product.name} className="wp-img" />

              {/* Quick View overlay on hover */}
              {hovered === product.id && (
                <div className="wp-hover-overlay">
                  <button
                    className="wp-quick-view-btn"
                    onClick={e => { e.stopPropagation(); handleQuickView(product); }}
                  >
                    Quick View
                  </button>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="wp-info">
              <div className="wp-name-row">
                <p
                  className="wp-name"
                  onClick={() => handleQuickView(product)}
                  style={{ cursor: 'pointer' }}
                >
                  {product.name}
                </p>
                <button
                  className={`wp-wish-btn ${isWishlisted(product.id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  aria-label="Wishlist"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted(product.id) ? '#e53e3e' : 'none'} stroke={isWishlisted(product.id) ? '#e53e3e' : '#888'} strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
              <p className="wp-price">${parseFloat(product.price).toFixed(2)}</p>
              <Stars count={product.stars} />

              {/* Add to Cart — visible on hover */}
              {hovered === product.id && (
                <button
                  className="wp-add-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  ADD TO CART
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {visible < filtered.length && (
        <div className="wp-load-more-wrap">
          <button
            className="wp-load-more-btn"
            onClick={() => setVisible(v => v + ITEMS_PER_PAGE)}
          >
            LOAD MORE
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      {quickView && (
        <QuickViewModal
          product={quickView}
          onClose={() => setQuickView(null)}
          onAddedToCart={handleQuickViewAdd}
        />
      )}

      {/* Cart Toast */}
      {toast && (
        <CartToast
          product={toast}
          onClose={() => setToast(null)}
          onViewCart={() => { setToast(null); setPage('cart'); }}
        />
      )}
    </div>
  );
}
