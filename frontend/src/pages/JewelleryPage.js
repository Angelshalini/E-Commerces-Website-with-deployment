import React, { useState } from 'react';
import { useCart, useWishlist } from '../context/CartContext';
import QuickViewModal from '../components/QuickViewModal';
import CartToast from '../components/CartToast';

import giftHero       from '../assets/images/bible image.png';
import anniversaryImg from '../assets/images/anniversary gitf.png';
import birthdayImg    from '../assets/images/birthday gift.png';
import gradImg        from '../assets/images/grad gift.png';
import weddingImg     from '../assets/images/wedding gift.png';
import specialImg     from '../assets/images/special gift.png';
import herselfImg     from '../assets/images/her.png';
import himselfImg     from '../assets/images/hime.png';
import kidsImg        from '../assets/images/kids.png';
import yourselfImg    from '../assets/images/yourself.png';
import titanImg       from '../assets/images/titan card.png';
import ringImg        from '../assets/images/ring.png';
import roseGoldImg    from '../assets/images/rose gold.png';
import platinumImg    from '../assets/images/platinam.png';
import watchImg       from '../assets/images/watches.png';
import smartWatchImg  from '../assets/images/smartwatch.png';

import './JewelleryPage.css';

const giftCategories = [
  { id: 1, img: anniversaryImg, label: 'Anniversary Gift' },
  { id: 2, img: weddingImg,     label: 'Wedding Gift'     },
  { id: 3, img: gradImg,        label: 'Graduation Gift'  },
  { id: 4, img: birthdayImg,    label: 'Birthday Gift'    },
];

const specialGifts = [
  { id: 1, img: himselfImg,  label: 'For Him'     },
  { id: 2, img: herselfImg,  label: 'For Her'     },
  { id: 3, img: yourselfImg, label: 'For Yorself' },
  { id: 4, img: kidsImg,     label: 'For Kids'    },
];

const jewelleryProducts = [
  { id: 'j1', img: ringImg,      images: [ringImg, roseGoldImg, platinumImg],   name: 'Diamond Ring',          cat: 'Rings',     price: '125.00', old: '160.00', stars: 5, badge: 'NEW',  desc: 'Elegant diamond ring crafted with premium quality stones.' },
  { id: 'j2', img: roseGoldImg,  images: [roseGoldImg, ringImg, platinumImg],   name: 'Rose Gold Peacock',     cat: 'Earrings',  price: '25.00',  old: '30.00',  stars: 5, badge: null,   desc: 'Beautiful rose gold peacock earrings with intricate detailing.' },
  { id: 'j3', img: platinumImg,  images: [platinumImg, ringImg, roseGoldImg],   name: 'Platinum Zircon Clip',  cat: 'Necklace',  price: '62.00',  old: '85.00',  stars: 5, badge: 'SALE', desc: 'Stunning platinum zircon clip necklace for a sophisticated look.' },
  { id: 'j4', img: titanImg,     images: [titanImg, watchImg, smartWatchImg],   name: 'Titan Gold Card',       cat: 'Bracelets', price: '89.00',  old: '110.00', stars: 4, badge: null,   desc: 'Premium titan gold bracelet with a modern card design.' },
  { id: 'j5', img: watchImg,     images: [watchImg, smartWatchImg, titanImg],   name: 'Pocket Watch Pouch',    cat: 'Watches',   price: '70.00',  old: '86.00',  stars: 3, badge: 'SALE', desc: 'Classic pocket watch with a premium leather pouch.' },
  { id: 'j6', img: smartWatchImg,images: [smartWatchImg, watchImg, titanImg],   name: 'Smart Watch Vital',     cat: 'Watches',   price: '58.00',  old: '65.00',  stars: 4, badge: null,   desc: 'Smart watch with health tracking and stylish design.' },
  { id: 'j7', img: roseGoldImg,  images: [roseGoldImg, platinumImg, ringImg],   name: 'Gold Hoop Earrings',    cat: 'Earrings',  price: '35.00',  old: '48.00',  stars: 4, badge: 'NEW',  desc: 'Classic gold hoop earrings that complement any outfit.' },
  { id: 'j8', img: platinumImg,  images: [platinumImg, roseGoldImg, ringImg],   name: 'Silver Chain Necklace', cat: 'Necklace',  price: '45.00',  old: '60.00',  stars: 5, badge: null,   desc: 'Delicate silver chain necklace with a timeless design.' },
];

const filters = ['All', 'Earrings', 'Necklace', 'Rings', 'Bracelets', 'Watches'];

function Stars({ count }) {
  return (
    <div className="jp-stars">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={s <= count ? 'jp-star filled' : 'jp-star'}>★</span>
      ))}
    </div>
  );
}

export default function JewelleryPage({ onBack }) {
  const { addToCart, setPage } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [filter, setFilter]   = useState('All');
  const [hovered, setHovered] = useState(null);
  const [quickView, setQuickView] = useState(null);
  const [toast, setToast]     = useState(null);
  const [giftCode, setGiftCode] = useState('');

  const filtered = jewelleryProducts.filter(p =>
    filter === 'All' || p.cat === filter
  );

  function handleAdd(product) {
    addToCart(product);
    setToast(product);
  }

  return (
    <div className="jp-page">

      {/* ══ 1. HERO — image left, content right ══ */}
      <div className="jp-hero">
        <div className="jp-hero-img-side">
          <img src={giftHero} alt="Gifting Guide" className="jp-hero-img" />
        </div>
        <div className="jp-hero-content">
          <h1 className="jp-hero-title">Gifting Guide</h1>
          <p className="jp-hero-sub">
            Whether marking traditional milestones or celebrating new
            reasons to revel, we have a gift for every occasion.
          </p>
          <a href="#jp-gift-cats" className="jp-hero-read">Read More <span>›</span></a>
        </div>
      </div>

      {/* ══ 2. GIFT CATEGORIES ══ */}
      <div className="jp-gift-section" id="jp-gift-cats">
        <div className="jp-gift-grid">
          {giftCategories.map(g => (
            <div key={g.id} className="jp-gift-card">
              <div className="jp-gift-img-wrap">
                <img src={g.img} alt={g.label} className="jp-gift-img" />
              </div>
              <p className="jp-gift-label">{g.label}</p>
              <span className="jp-gift-explore">Explore <span>›</span></span>
            </div>
          ))}
        </div>
        <div className="jp-view-more-row">
          <div className="jp-view-line" />
          <button className="jp-view-more-btn">View More</button>
          <div className="jp-view-line" />
        </div>
      </div>

      {/* ══ 3. SPECIAL GIFT PROMO — content left, image right ══ */}
      <div className="jp-promo-section">
        <div className="jp-promo-content">
          <h2 className="jp-promo-title">A special gift<br />for your loved<br />ones.</h2>
          <p className="jp-promo-sub">
            Give the gift of adornment and celebrate special moments
            with our exquisite collection
          </p>
          <div className="jp-gift-code-row">
            <input
              className="jp-gift-code-input"
              placeholder="Enter gift code..."
              value={giftCode}
              onChange={e => setGiftCode(e.target.value)}
            />
            <button className="jp-redeem-btn">Redeem</button>
          </div>
          <div className="jp-stats-row">
            <div className="jp-stat">
              <span className="jp-stat-num">1000+</span>
              <span className="jp-stat-label">Gifts<br />Delivered</span>
            </div>
            <div className="jp-stat-divider">❧</div>
            <div className="jp-stat">
              <span className="jp-stat-num">5000+</span>
              <span className="jp-stat-label">Happy<br />Customers</span>
            </div>
          </div>
        </div>
        <div className="jp-promo-img-side">
          <img src={specialImg} alt="Special Gift" className="jp-promo-img" />
        </div>
      </div>

      {/* ══ 4. GIFT CARD BANNER — titan card full width, no content ══ */}
      <div className="jp-giftcard-section">
        <img src={titanImg} alt="Lillian Gift Card" className="jp-giftcard-img" />
      </div>

      {/* ══ 5. SPECIAL GIFT — 4 person cards ══ */}
      <div className="jp-special-section">
        <h2 className="jp-special-title">Special Gift</h2>
        <div className="jp-special-divider">
          <div className="jp-special-line" />
          <span className="jp-special-diamond">◆</span>
          <div className="jp-special-line" />
        </div>
        <div className="jp-special-grid">
          {specialGifts.map(g => (
            <div key={g.id} className="jp-special-card">
              <div className="jp-special-img-wrap">
                <img src={g.img} alt={g.label} className="jp-special-img" />
              </div>
              <p className="jp-special-label">{g.label}</p>
              <span className="jp-special-explore">Explore <span>›</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ 6. STILL NOT SURE — ring image full width only ══ */}
      <div className="jp-expert-section">
        <img src={ringImg} alt="Diamond Ring" className="jp-expert-img" />
      </div>

      {quickView && (
        <QuickViewModal
          product={quickView}
          onClose={() => setQuickView(null)}
          onAddedToCart={p => setToast(p)}
        />
      )}
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
