import React from 'react';
import promoImg from '../assets/images/image(1).jpg';
import './PromoBanner.css';

export default function PromoBanner() {
  return (
    <section className="promo-banner">

      {/* ── Left: Content ── */}
      <div className="promo-content">
        <p className="promo-tag">Summer Sale</p>
        <h2 className="promo-heading">
          Get Up To <span className="promo-highlight">50% Off</span><br />
          New Arrivals
        </h2>
        <p className="promo-sub">
          Discover the latest trends in fashion. Shop our exclusive
          summer collection and enjoy amazing discounts on top brands.
        </p>
        <div className="promo-actions">
          <button className="promo-btn-primary">SHOP NOW</button>
          <button className="promo-btn-secondary">VIEW ALL</button>
        </div>
      </div>

      {/* ── Right: Image ── */}
      <div className="promo-image-wrap">
        <img src={promoImg} alt="Summer Sale" className="promo-img" />
      </div>

    </section>
  );
}
