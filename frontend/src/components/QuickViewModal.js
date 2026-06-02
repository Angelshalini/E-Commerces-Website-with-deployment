import React, { useState, useEffect } from 'react';
import { useCart, useWishlist } from '../context/CartContext';
import './QuickViewModal.css';

function Stars({ count }) {
  return (
    <div className="qv-stars">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={s <= count ? 'qv-star filled' : 'qv-star'}>★</span>
      ))}
    </div>
  );
}

export default function QuickViewModal({ product, onClose, onAddedToCart }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize]   = useState('');
  const [color, setColor] = useState('');
  const [qty, setQty]     = useState(1);

  // Reset when product changes
  useEffect(() => {
    setActiveImg(0);
    setSize('');
    setColor('');
    setQty(1);
  }, [product]);

  // Close on Escape key
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.img];

  function handleAdd() {
    addToCart({ ...product, qty });
    onAddedToCart && onAddedToCart(product);
    onClose();
  }

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="qv-overlay" onClick={onClose}>
      <div className="qv-panel" onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button className="qv-close" onClick={onClose} aria-label="Close">×</button>

        <div className="qv-body">
          {/* ── Left: images ── */}
          <div className="qv-images">
            {/* Thumbnails */}
            <div className="qv-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`qv-thumb ${i === activeImg ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="qv-main-img-wrap">
              <img
                src={images[activeImg]}
                alt={product.name}
                className="qv-main-img"
              />
              {/* Prev / Next arrows */}
              {images.length > 1 && (
                <>
                  <button
                    className="qv-img-arrow qv-img-prev"
                    onClick={() => setActiveImg(i => (i > 0 ? i - 1 : images.length - 1))}
                    aria-label="Previous image"
                  >‹</button>
                  <button
                    className="qv-img-arrow qv-img-next"
                    onClick={() => setActiveImg(i => (i < images.length - 1 ? i + 1 : 0))}
                    aria-label="Next image"
                  >›</button>
                </>
              )}
            </div>
          </div>

          {/* ── Right: details ── */}
          <div className="qv-details">
            <h2 className="qv-name">{product.name}</h2>
            <p className="qv-price-row">
              <span className="qv-price">${parseFloat(product.price).toFixed(2)}</span>
              {product.old && (
                <span className="qv-old">${parseFloat(product.old).toFixed(2)}</span>
              )}
            </p>

            <Stars count={product.stars || 4} />

            <p className="qv-desc">
              {product.desc || 'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.'}
            </p>

            {/* Size */}
            <div className="qv-field">
              <label className="qv-label">Size</label>
              <select
                className="qv-select"
                value={size}
                onChange={e => setSize(e.target.value)}
              >
                <option value="">Choose an option</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            {/* Color */}
            <div className="qv-field">
              <label className="qv-label">Color</label>
              <select
                className="qv-select"
                value={color}
                onChange={e => setColor(e.target.value)}
              >
                <option value="">Choose an option</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Beige">Beige</option>
              </select>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="qv-cart-row">
              <div className="qv-qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button className="qv-add-btn" onClick={handleAdd}>
                ADD TO CART
              </button>
            </div>

            {/* Wishlist */}
            <button
              className={`qv-wishlist-btn ${wishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? '#e53e3e' : 'none'} stroke={wishlisted ? '#e53e3e' : 'currentColor'} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>

            {/* Category tag */}
            <p className="qv-cat-tag">
              Category: <span>{product.cat}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
