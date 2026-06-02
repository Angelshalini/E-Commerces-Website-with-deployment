import React, { useState, useEffect } from 'react';
import { useCart, useWishlist } from './context/CartContext';
import NewsletterPopup from './components/NewsletterPopup';
import DealsOfMonth from './components/DealsOfMonth';
import CategoryBanner from './components/CategoryBanner';
import NewArrivals from './components/NewArrivals';
import ProductLists from './components/ProductLists';
import DealOfDay from './components/DealOfDay';
import NewProducts from './components/NewProducts';
import InstagramFeed from './components/InstagramFeed';
import TestimonialServices from './components/TestimonialServices';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import FeaturedProducts from './components/FeaturedProducts';
import QuickViewModal from './components/QuickViewModal';
import CartToast from './components/CartToast';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WomenPage from './pages/WomenPage';
import MenPage from './pages/MenPage';
import CategoriesPage from './pages/CategoriesPage';
import JewelleryPage from './pages/JewelleryPage';
import PerfumePage from './pages/PerfumePage';
import catTshirt  from './assets/images/t shirt.png';
import catJacket  from './assets/images/jacket.png';
import catWatch   from './assets/images/watch.png';
import catHat     from './assets/images/hat &.png';
import heroBg1 from './assets/images/Rectangle 6.jpg';
import heroBg2 from './assets/images/herobg2.png';
import heroBg3 from './assets/images/herobg3.png';
import megaHeadphone from './assets/images/watches.png';
import megaMen       from './assets/images/men.jpg';
import megaWomen     from "./assets/images/women .png";
import './App.css';

const slides = [
  {
    bg: heroBg1,
    tag: 'Trending Item',
    title: <>WOMEN'S<br />LATEST<br />FASHION SALE</>,
    price: '20.00',
    filter: '',
  },
  {
    bg: heroBg2,
    tag: 'Sale Offer',
    title: <>NEW FASHION<br />SUMMER SALE</>,
    price: '29.99',
    filter: 'contrast(0.65) brightness(1.08) saturate(0.8)',
  },
  {
    bg: heroBg3,
    tag: 'Trending Accessories',
    title: <>MODERN<br />SUNGLASSES</>,
    price: '15.00',
    filter: 'contrast(0.65) brightness(1.08) saturate(0.8)',
  },
];

// ── Inner app that has access to cart context ──
function App() {
  const { cartCount, page, setPage } = useCart();
  const { wishlistCount } = useWishlist();

  const [showPopup, setShowPopup] = useState(false);
  const [current, setCurrent]     = useState(0);
  const [quickView, setQuickView] = useState(null);
  const [toast, setToast]         = useState(null);
  const [womenFilter, setWomenFilter] = useState('All Products');

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Show popup after 1.2s (only on home page)
  useEffect(() => {
    if (page === 'home') {
      const t = setTimeout(() => setShowPopup(true), 1200);
      return () => clearTimeout(t);
    }
  }, [page]);

  function handleAddedToCart(product) {
    setToast(product);
  }

  function handleQuickView(product) {
    setQuickView(product);
  }

  // ── Render page ──
  if (page === 'cart') return (
    <PageLayout cartCount={cartCount} wishlistCount={wishlistCount} setPage={setPage} setWomenFilter={setWomenFilter}>
      <CartPage />
    </PageLayout>
  );
  if (page === 'checkout') return (
    <PageLayout cartCount={cartCount} wishlistCount={wishlistCount} setPage={setPage} setWomenFilter={setWomenFilter}>
      <CheckoutPage />
    </PageLayout>
  );
  if (page === 'women') return (
    <PageLayout cartCount={cartCount} wishlistCount={wishlistCount} setPage={setPage} setWomenFilter={setWomenFilter}>
      <WomenPage onBack={() => setPage('home')} defaultFilter={womenFilter} />
    </PageLayout>
  );
  if (page === 'men') return (
    <PageLayout cartCount={cartCount} wishlistCount={wishlistCount} setPage={setPage} setWomenFilter={setWomenFilter}>
      <MenPage onBack={() => setPage('home')} />
    </PageLayout>
  );
  if (page === 'categories') return (
    <PageLayout cartCount={cartCount} wishlistCount={wishlistCount} setPage={setPage} setWomenFilter={setWomenFilter}>
      <CategoriesPage />
    </PageLayout>
  );
  if (page === 'jewellery') return (
    <PageLayout cartCount={cartCount} wishlistCount={wishlistCount} setPage={setPage} setWomenFilter={setWomenFilter}>
      <JewelleryPage onBack={() => setPage('home')} />
    </PageLayout>
  );
  if (page === 'perfume') return (
    <PageLayout cartCount={cartCount} wishlistCount={wishlistCount} setPage={setPage} setWomenFilter={setWomenFilter}>
      <PerfumePage />
    </PageLayout>
  );

  return (
    <div className="app">

      {/* ── Top Bar ── */}
      <Topbar />

      {/* ── Header ── */}
      <Header cartCount={cartCount} wishlistCount={wishlistCount} setPage={setPage} />

      {/* ── Navigation ── */}
      <Navbar setPage={setPage} setWomenFilter={setWomenFilter} />

      {/* ── Hero Slider ── */}
      <div className="hero-slider">
        <div
          className="hero-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="hero-slide">
              <img
                src={s.bg}
                alt=""
                className="hero-bg-img"
                aria-hidden="true"
                style={s.filter ? { filter: s.filter } : {}}
              />
              <div className="hero-overlay" />
              <div className="hero-content">
                <p className="hero-tag">{s.tag}</p>
                <h1 className="hero-title">{s.title}</h1>
                <p className="hero-price">starting at $ <span>{s.price}</span></p>
                <button className="shop-btn" onClick={() => setPage('women')}>SHOP NOW</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Category Grid ── */}
      <div className="category-section">
        {[
          { img: catTshirt,  name: 'T-SHIRTS',   count: 35 },
          { img: catJacket,  name: 'JACKET',      count: 16 },
          { img: catWatch,   name: 'WATCH',       count: 27 },
          { img: catHat,     name: 'HAT & CAPS',  count: 30 },
        ].map((cat) => (
          <div className="category-card" key={cat.name}>
            <div className="category-icon">
              <img src={cat.img} alt={cat.name} />
            </div>
            <div className="category-info">
              <p className="category-name">{cat.name}</p>
              <p className="category-count">({cat.count}) <span className="show-all">Show All</span></p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Deals of the Month ── */}
      <DealsOfMonth />

      {/* ── Category Banner: Women / Men / Children ── */}
      <CategoryBanner onWomenClick={() => setPage('women')} />

      {/* ── New Arrivals ── */}
      <NewArrivals
        onQuickView={handleQuickView}
        onAddedToCart={handleAddedToCart}
      />

      {/* ── Product Lists ── */}
      <ProductLists />

      {/* ── Deal of The Day ── */}
      <DealOfDay onAddedToCart={handleAddedToCart} />

      {/* ── New Products ── */}
      <NewProducts
        onQuickView={handleQuickView}
        onAddedToCart={handleAddedToCart}
      />

      {/* ── Instagram Feed ── */}
      <InstagramFeed />

      {/* ── Testimonial + Summer Banner + Services ── */}
      <TestimonialServices />

      {/* ── Blog Section ── */}
      <BlogSection />

      {/* ── Footer ── */}
      <Footer />

      {/* Newsletter Popup */}
      {showPopup && <NewsletterPopup onClose={() => setShowPopup(false)} />}

      {/* Quick View Modal */}
      {quickView && (
        <QuickViewModal
          product={quickView}
          onClose={() => setQuickView(null)}
          onAddedToCart={handleAddedToCart}
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

// ── Topbar ──
function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <a href="#!" aria-label="Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#484848"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="#!" aria-label="Twitter">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#484848"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
        </a>
        <a href="#!" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="#!" aria-label="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#484848"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
      <div className="topbar-center">FREE SHIPPING THIS WEEK ORDER OVER – $55</div>
      <div className="topbar-right">
        <span>USD $ ▾</span>
        <span>ENGLISH ▾</span>
      </div>
    </div>
  );
}

// ── Navbar with dropdowns ──
const navItems = [
  { label: "HOME",       key: "home",       action: true },
  {
    label: "CATEGORIES", key: "categories", action: true,
    mega: true,
    columns: [
      {
        title: "Electronics",
        items: ["Desktop","Laptop","Mobile Phone","Tablet","Headphone","Smart Watch","Smart TV","Keyboard","Mouse","Camera"],
        promo: { title: "Headphone Collection", sub: "Flat 30% off", img: megaHeadphone },
      },
      {
        title: "Men's",
        items: ["Formal","Casual","Sports","Jacket","Sunglasses"],
        promo: { title: "Men's Fashion", sub: "Flat 19% off", img: megaMen },
      },
      {
        title: "Women's",
        items: ["Formal","Casual","Perfume","Cosmetics","Bags"],
        promo: { title: "Women's Fashion", sub: "Flat 35% off", img: megaWomen },
      },
    ],
  },
  {
    label: "MEN'S",      key: "mens",       action: true,
    items: ["Shirt","Shorts & Jeans","Shoes","Wallet"],
  },
  {
    label: "WOMEN'S",    key: "women",      action: true,
    items: ["Dress & Frock","Earrings","Necklace","Makeup Kit"],
  },
  {
    label: "PERFUME",    key: "perfume",    action: true,
    items: ["Clothes Perfume","Deodorant","Flower Fragrance","Air Freshener"],
  },
  {
    label: "JEWELLERY",  key: "jewellery",  action: true,
    items: ["Earrings","Couple Rings","Necklace","Bracelets"],
  },
  { label: "BLOG",       key: "blog" },
  { label: "HOT OFFERS", key: "hotoffers",  hot: true },
];

function Navbar({ setPage, setWomenFilter }) {
  const [open, setOpen] = React.useState(null);
  let closeTimer = React.useRef(null);

  function onEnter(key) {
    clearTimeout(closeTimer.current);
    setOpen(key);
  }
  function onLeave() {
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  }

  function handleClick(item) {
    if (item.action && item.key === 'home')       { setPage('home');        setOpen(null); }
    if (item.action && item.key === 'categories') { setPage('categories');  setOpen(null); }
    if (item.action && item.key === 'mens')       { setPage('men');         setOpen(null); }
    if (item.action && item.key === 'women')      { setWomenFilter('All Products'); setPage('women'); setOpen(null); }
    if (item.action && item.key === 'jewellery')  { setPage('jewellery');   setOpen(null); }
    if (item.action && item.key === 'perfume')    { setPage('perfume');     setOpen(null); }
  }

  // Map Women's dropdown labels to WomenPage filter values
  const womenSubMap = {
    'Dress & Frock': 'Women',
    'Earrings':      'Women',
    'Necklace':      'Women',
    'Makeup Kit':    'Women',
  };

  return (
    <nav className="navbar">
      <ul>
        {navItems.map(item => (
          <li
            key={item.key}
            className="nav-item"
            onMouseEnter={() => (item.items || item.mega) ? onEnter(item.key) : null}
            onMouseLeave={onLeave}
          >
            <button
              className={`nav-link${item.hot ? ' hot-offers' : ''}`}
              onClick={() => handleClick(item)}
            >
              {item.label}
              {(item.items || item.mega) && <span className="nav-arrow">▾</span>}
            </button>

            {/* Simple dropdown */}
            {item.items && open === item.key && (
              <div className="nav-dropdown" onMouseEnter={() => onEnter(item.key)} onMouseLeave={onLeave}>
                {item.items.map(sub => (
                  <a key={sub} href="#!" className="nav-dropdown-item"
                    onClick={() => {
                      if (item.key === 'mens')      { setPage('men'); }
                      if (item.key === 'women') {
                        setWomenFilter(womenSubMap[sub] || 'All Products');
                        setPage('women');
                      }
                      if (item.key === 'jewellery') { setPage('jewellery'); }
                      if (item.key === 'perfume')   { setPage('perfume'); }
                      setOpen(null);
                    }}>
                    {sub}
                  </a>
                ))}
              </div>
            )}

            {/* Mega dropdown for Categories */}
            {item.mega && open === item.key && (
              <div className="nav-mega" onMouseEnter={() => onEnter(item.key)} onMouseLeave={onLeave}>
                {item.columns.map(col => (
                  <div key={col.title} className="nav-mega-col">
                    <p className="nav-mega-title">{col.title}</p>
                    <div className="nav-mega-items">
                      {col.items.map(sub => (
                        <a key={sub} href="#!" className="nav-dropdown-item" onClick={() => {
                          if (col.title === "Women's") {
                            setWomenFilter('All Products');
                            setPage('women');
                          } else if (col.title === "Men's") {
                            setPage('men');
                          } else {
                            // Electronics and others → Categories page
                            setPage('categories');
                          }
                          setOpen(null);
                        }}>{sub}</a>
                      ))}
                    </div>
                    <div className="nav-mega-promo">
                      {col.promo.img && (
                        <img src={col.promo.img} alt={col.promo.title} className="nav-mega-promo-img" />
                      )}
                      <div className="nav-mega-promo-text">
                        <strong>{col.promo.title}</strong>
                        <span>{col.promo.sub}</span>
                        <a href="#!" className="nav-mega-shop" onClick={() => setOpen(null)}>SHOP NOW</a>
                      </div>
                    </div>                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── Full page layout: topbar + header + navbar + content + instagram + footer ──
function PageLayout({ cartCount, wishlistCount, setPage, setWomenFilter, children }) {
  return (
    <div className="app">
      <Topbar />
      <Header cartCount={cartCount} wishlistCount={wishlistCount} setPage={setPage} />
      <Navbar setPage={setPage} setWomenFilter={setWomenFilter || (() => {})} />
      <div className="page-content">
        {children}
      </div>
      <InstagramFeed />
      <Footer />
    </div>
  );
}

// ── Shared Header component ──
function Header({ cartCount, wishlistCount, setPage }) {
  return (
    <header className="header">
      <div className="header-logo" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
        The Mart
      </div>
      <div className="header-search">
        <input type="text" placeholder="Enter your product name......" />
        <button aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </div>
      <div className="header-icons">
        <button aria-label="Account">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
        <button aria-label="Wishlist" className="icon-badge-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span className="badge">{wishlistCount}</span>
        </button>
        <button aria-label="Cart" className="icon-badge-wrap" onClick={() => setPage('cart')}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#484848" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span className="badge">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}

export default App;
