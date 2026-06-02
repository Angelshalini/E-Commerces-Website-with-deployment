import React, { useState, useEffect } from 'react';
import { useCart, useWishlist } from '../context/CartContext';
import { getProducts, getFashionProducts, imgUrl } from '../services/api';
import { homeNewArrivals } from '../data/productsData';
import './NewArrivals.css';

function Stars({ count }) {
  return (
    <span className="na-stars">
      {Array.from({length:5}).map((_,i) => (
        <span key={i} className={i < count ? 'star filled' : 'star'}>★</span>
      ))}
    </span>
  );
}

export default function NewArrivals({ onQuickView, onAddedToCart }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [products, setProducts] = useState(homeNewArrivals);
  const [hovered, setHovered]   = useState(null);

  // New Arrivals on home page always shows fashion products (i1, i2, i3 - dresses)
  // No API override needed here

  function handleAdd(p) { addToCart(p); onAddedToCart?.(p); }

  return (
    <section className="na-section">
      <div className="na-header">
        <h2 className="na-heading">New Arrivals</h2>
        <p className="na-sub">New Arrivals means recently added or newly available items.</p>
      </div>
      <div className="na-grid">
        {products.map(p => (
          <div key={p.id} className="na-card" onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}>
            <div className="na-img-wrap" onClick={() => onQuickView?.(p)} style={{cursor:'pointer'}}>
              <img src={p.img || imgUrl(p.image)} alt={p.name} className="na-img" />
              {hovered === p.id && (
                <div className="na-hover-overlay">
                  <button className="na-quick-view-btn" onClick={e => { e.stopPropagation(); onQuickView?.(p); }}>Quick View</button>
                </div>
              )}
            </div>
            <div className="na-info">
              <div className="na-name-row">
                <span className="na-name">{p.name}</span>
                <Stars count={p.stars || 5} />
              </div>
              <span className="na-brand">{p.brand || p.category_name || 'Al Karam'}</span>
              <span className="na-reviews">({p.review_count || p.reviews || '4.1k'}) Customer Reviews</span>
              <div className="na-price-row">
                <span className="na-price">${p.price}</span>
                <span className="na-sold">Almost Sold Out</span>
              </div>
              {hovered === p.id && (
                <button className="na-add-btn" onClick={() => handleAdd(p)}>ADD TO CART</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
