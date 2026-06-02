import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartToast from '../components/CartToast';
import QuickViewModal from '../components/QuickViewModal';

// Incense & Wood products
import goeImg      from '../assets/images/Goe.png';
import goeClavoImg from '../assets/images/goe-clavo.png';
import jamerahImg  from '../assets/images/jamerah.png';
import cegrImg     from '../assets/images/cegr.png';

// Natural Freshness products
import floralImg   from '../assets/images/floral.png';
import frutosImg   from '../assets/images/frutos.png';
import carmelitaImg from '../assets/images/carmelita.png';
import mangoImg    from '../assets/images/mango.png';

// Promo / banner images
import fraganceImg from '../assets/images/fragance.png';
import pinkImg     from '../assets/images/pink.png';
import natureImg   from '../assets/images/nature.png';
import visitImg    from '../assets/images/visit store.png';

import './PerfumePage.css';

const tabs = ['All Fragrances', 'Incense & Wood', 'Natural Freshness', 'Exclusive'];

const incenseProducts = [
  { id: 'p1', img: goeImg,      images: [goeImg, goeClavoImg, jamerahImg], name: 'GOE',       price: '340', desc: 'Perfect for creating a refreshing atmosphere.' },
  { id: 'p2', img: goeClavoImg, images: [goeClavoImg, goeImg, cegrImg],    name: 'GOE-CLAVO', price: '340', desc: 'Perfect for creating a refreshing atmosphere.' },
  { id: 'p3', img: jamerahImg,  images: [jamerahImg, goeImg, cegrImg],     name: 'JAMAREH',   price: '340', desc: 'Perfect for creating a refreshing atmosphere.' },
  { id: 'p4', img: cegrImg,     images: [cegrImg, jamerahImg, goeImg],     name: 'CERGETADE', price: '340', desc: 'Perfect for creating a refreshing atmosphere.' },
];

const freshProducts = [
  { id: 'p5', img: floralImg,    images: [floralImg, frutosImg, carmelitaImg],   name: 'FLORAL',       price: '340', desc: 'Perfect for creating a refreshing atmosphere' },
  { id: 'p6', img: frutosImg,    images: [frutosImg, floralImg, mangoImg],       name: 'FRUTOS ROJOS', price: '340', desc: 'Perfect for creating a refreshing atmosphere' },
  { id: 'p7', img: carmelitaImg, images: [carmelitaImg, floralImg, mangoImg],    name: 'CARMELITA',    price: '340', desc: 'Perfect for creating a refreshing atmosphere' },
  { id: 'p8', img: mangoImg,     images: [mangoImg, carmelitaImg, frutosImg],    name: 'MANGO',        price: '340', desc: 'Perfect for creating a refreshing atmosphere' },
];

const allProducts = [...incenseProducts, ...freshProducts];

const usaCards = [
  { img: pinkImg,   label: 'Pink Premium'      },
  { img: natureImg, label: 'Nature Collection' },
  { img: visitImg,  label: 'Visit Store'       },
];

export default function PerfumePage() {
  const { addToCart, setPage } = useCart();
  const [activeTab, setActiveTab] = useState('All Fragrances');
  const [hovered, setHovered]     = useState(null);
  const [quickView, setQuickView] = useState(null);
  const [toast, setToast]         = useState(null);

  function handleAdd(p) {
    addToCart(p);
    setToast(p);
  }

  // Which products to show based on tab
  const displayed =
    activeTab === 'All Fragrances'   ? allProducts :
    activeTab === 'Incense & Wood'   ? incenseProducts :
    activeTab === 'Natural Freshness'? freshProducts :
    [];

  return (
    <div className="pp-page">

      {/* ══ 1. FILTER TABS ══ */}
      <div className="pp-tabs-bar">
        {tabs.map((t, i) => (
          <React.Fragment key={t}>
            <button
              className={`pp-tab ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
            {i < tabs.length - 1 && <span className="pp-tab-sep">|</span>}
          </React.Fragment>
        ))}
        <button className="pp-filter-btn">Filter +</button>
      </div>

      {/* ══ 2. PRODUCT GRID ══ */}
      <div className="pp-grid">
        {displayed.map(p => (
          <div
            key={p.id}
            className="pp-card"
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="pp-img-wrap"
              onClick={() => setQuickView(p)}
              style={{ cursor: 'pointer' }}
            >
              <img src={p.img} alt={p.name} className="pp-img" />
              {hovered === p.id && (
                <div className="pp-hover-overlay">
                  <button
                    className="pp-quick-view-btn"
                    onClick={e => { e.stopPropagation(); setQuickView(p); }}
                  >
                    Quick View
                  </button>
                </div>
              )}
            </div>
            <div className="pp-info">
              <p className="pp-name">{p.name}</p>
              <p className="pp-desc">{p.desc}</p>
              <p className="pp-price">{p.price}€</p>
              {hovered === p.id && (
                <button className="pp-add-btn" onClick={() => handleAdd(p)}>
                  ADD TO CART
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ══ 3. ESSENCE PROMO — content left, image right ══ */}
      <div className="pp-essence-section">
        <div className="pp-essence-content">
          <p className="pp-essence-sub">Immerse Yourself in the Essence of Nature</p>
          <h2 className="pp-essence-title">Experience the Fragrance</h2>
          <p className="pp-essence-desc">
            Discover the art of scent with our premium, handcrafted
            fragrances that transform any space into a sensory haven.
          </p>
        </div>
        <div className="pp-essence-img-side">
          <img src={fraganceImg} alt="Experience the Fragrance" className="pp-essence-img" />
        </div>
      </div>

      {/* ══ 4. #1 IN USA — content left, 3 image cards right ══ */}
      <div className="pp-usa-section">
        <div className="pp-usa-content">
          <h2 className="pp-usa-title">#1 In the USA<br />market</h2>
          <p className="pp-usa-desc">
            Experience the benefits of our fragrances: premium quality, long-lasting
            effect, and natural aromas that effortlessly elevate every space.
          </p>
          <a href="https://wa.me/" target="_blank" rel="noreferrer" className="pp-whatsapp-btn">
            Contact on Whatsapp
          </a>
        </div>
        <div className="pp-usa-cards">
          {usaCards.map(c => (
            <div key={c.label} className="pp-usa-card">
              <div className="pp-usa-img-wrap">
                <img src={c.img} alt={c.label} className="pp-usa-img" />
              </div>
              <p className="pp-usa-label">{c.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickView && (
        <QuickViewModal
          product={{ ...quickView, cat: 'Perfume', stars: 5, old: String(parseInt(quickView.price) + 60) }}
          onClose={() => setQuickView(null)}
          onAddedToCart={p => setToast(p)}
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
