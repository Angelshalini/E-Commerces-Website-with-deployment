import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import CartToast from '../components/CartToast';
import QuickViewModal from '../components/QuickViewModal';
import {
  getCategories, getBrands, getProducts, getDealOfDay,
  getBrandNewItems, getBanners, getBannerByType, imgUrl
} from '../services/api';

// Fallback static images (used only if API returns nothing)
import noiseCancelImg from '../assets/images/noise cancelling headphone.png';
import sonoPlaygoImg  from '../assets/images/xiamoi.png';
import logitekImg     from '../assets/images/logiket bluetooth keyboard.png';
import xomiaWatchImg  from '../assets/images/sports water watch.png';
import okodoHeroImg   from '../assets/images/okodo hero black.png';
import topCellphoneImg from '../assets/images/top cellphone.png';
import bestLaptopImg   from '../assets/images/best laptop.png';
import audiosCamerasImg from '../assets/images/audios & cameras.jpg';
import gamingBannerImg  from '../assets/images/gaming.png';
import officeEquipImg   from '../assets/images/office equipments.jpg';
import xiaomiImg        from '../assets/images/xioma redmi.png';
import joystickImg      from '../assets/images/joystick.png';
import ipadImg          from '../assets/images/ipad.png';
import laptopFbImg      from '../assets/images/laptop.png';
import pcGamingFbImg    from '../assets/images/pc gaming.png';
import headphonesFbImg  from '../assets/images/headphones.png';
import monitorsFbImg    from '../assets/images/monitors.png';
import speakerFbImg     from '../assets/images/C&O bluetooth speaker.jpg';
import dslrFbImg        from '../assets/images/DSLR camera.jpg';
import chairFbImg       from '../assets/images/chair.jpg';
import printersFbImg    from '../assets/images/printers.jpg';
import networkFbImg     from '../assets/images/network.jpg';
import earbudsFbImg     from '../assets/images/Ear buds.jpg';
import micFbImg         from '../assets/images/microphone.jpg';
import controllerFbImg  from '../assets/images/controller.jpg';
import keyboardsFbImg   from '../assets/images/keyboards.jpg';
import projectorsFbImg  from '../assets/images/projectors.jpg';

import './CategoriesPage.css';

// ── Helpers ──────────────────────────────────────────────────────
const fmt = (v) => v ? `$${parseFloat(v).toFixed(2)}` : null;

function Countdown({ endDatetime }) {
  const calcTime = () => {
    const diff = new Date(endDatetime) - new Date();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calcTime);
  useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1000);
    return () => clearInterval(id);
  });
  const pad = n => String(Math.max(0, n)).padStart(2, '0');
  return (
    <div className="cp-countdown">
      <p className="cp-hurry">HURRY UP! PROMOTION WILL EXPIRES IN</p>
      <div className="cp-timer">
        {[{v:time.d,u:'d'},{v:time.h,u:'h'},{v:time.m,u:'m'},{v:time.s,u:'s'}].map(({v,u}) => (
          <div key={u} className="cp-timer-box">
            <span className="cp-timer-num">{pad(v)}</span>
            <span className="cp-timer-unit">{u}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ p, onAdd }) {
  const image = imgUrl(p.image) || p.img;
  const extras = p.extra_images || [];
  return (
    <div className="cp-bs-card">
      <div className="cp-bs-img-wrap">
        {p.save_amount && <span className="cp-bs-save">SAVE<br />{fmt(p.save_amount)}</span>}
        {p.is_new      && !p.save_amount && <span className="cp-cell-badge">NEW</span>}
        <img src={image} alt={p.name} className="cp-bs-img" />
      </div>
      <div className="cp-bs-info">
        {p.review_count > 0 && <p className="cp-bs-reviews">({p.review_count})</p>}
        <p className="cp-bs-name">{p.name}</p>
        <div className="cp-bs-price-row">
          <span className={`cp-bs-price ${p.old_price ? 'pink' : ''}`}>{fmt(p.price)}</span>
          {p.old_price && <span className="cp-bs-old">{fmt(p.old_price)}</span>}
        </div>
        <div className="cp-bs-tags">
          {p.free_shipping && <span className="cp-bs-tag-ship">FREE SHIPPING</span>}
          {p.free_gift     && <span className="cp-bs-tag-gift">FREE GIFT</span>}
          {p.shipping_cost && <span className="cp-bs-tag-ship">{p.shipping_cost}</span>}
        </div>
        {p.stock_label && (
          <p className={`cp-bs-stock ${p.stock_status === 'out_stock' ? 'out' : p.stock_status === 'pre_order' ? 'pre' : ''}`}>
            {p.stock_label}
          </p>
        )}
        {extras.length > 0 && (
          <div className="cp-bs-variants">
            {extras.map((ex, i) => (
              <img key={i} src={imgUrl(ex.image)} alt="variant" className="cp-bs-variant-img" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const { addToCart, setPage } = useCart();
  const [activeTab, setActiveTab] = useState('BEST SELLER');
  const [quickView, setQuickView] = useState(null);
  const [toast, setToast]         = useState(null);

  // API state
  const [brands,       setBrands]       = useState([]);
  const [topCats,      setTopCats]      = useState([]);
  const [sidebarCats,  setSidebarCats]  = useState([]);
  const [circleCats,   setCircleCats]   = useState([]);
  const [brandNewItems,setBrandNewItems]= useState([]);
  const [banners,      setBanners]      = useState([]);
  const [bsProducts,   setBsProducts]   = useState([]);
  const [cellProducts, setCellProducts] = useState([]);
  const [laptopProds,  setLaptopProds]  = useState([]);
  const [deal,         setDeal]         = useState(null);
  const [dealTime,     setDealTime]     = useState({d:0,h:0,m:0,s:0});

  useEffect(() => {
    getBrands()       .then(r => setBrands(r.data)).catch(()=>{});
    getCategories()   .then(r => {
      const all = r.data;
      setTopCats(all.filter(c => [1,2,3,4].includes(c.order)));
      setSidebarCats(all.filter(c => c.order >= 5 && c.order <= 15));
      setCircleCats(all.filter(c => c.order >= 16 && c.order <= 26));
    }).catch(()=>{});
    getBrandNewItems().then(r => setBrandNewItems(r.data)).catch(()=>{});
    getBanners()      .then(r => setBanners(r.data)).catch(()=>{});
    getProducts({filter:'best_seller'}).then(r => setBsProducts(r.data)).catch(()=>{});
    getProducts({category:'cell-phones'}).then(r => setCellProducts(r.data.slice(0,5))).catch(()=>{});
    getProducts({category:'laptops'}).then(r => setLaptopProds(r.data.slice(0,5))).catch(()=>{});
    getDealOfDay().then(r => setDeal(r.data)).catch(()=>{});
  }, []);

  // Deal countdown
  useEffect(() => {
    if (!deal) return;
    const target = new Date(deal.end_datetime);
    const calc = () => {
      const diff = Math.max(0, target - Date.now());
      setDealTime({
        d: Math.floor(diff/86400000),
        h: Math.floor((diff%86400000)/3600000),
        m: Math.floor((diff%3600000)/60000),
        s: Math.floor((diff%60000)/1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [deal]);

  const pad = n => String(Math.max(0,n)).padStart(2,'0');

  // Banner helpers
  const b = (type) => {
    const found = getBannerByType(banners, type);
    return found ? imgUrl(found.image) : null;
  };

  const dealProd   = deal?.product;
  const dealImg    = dealProd ? (imgUrl(dealProd.image)||xiaomiImg) : xiaomiImg;
  const dealSold   = deal?.sold_count  || 26;
  const dealTotal  = deal?.total_stock || 75;
  const dealPct    = Math.round((dealSold/dealTotal)*100);

  const topCatFallback = [
    {id:'tc1',image:null,name:'Laptops',   imgFallback:laptopFbImg},
    {id:'tc2',image:null,name:'PC Gaming', imgFallback:pcGamingFbImg},
    {id:'tc3',image:null,name:'Headphones',imgFallback:headphonesFbImg},
    {id:'tc4',image:null,name:'Monitors',  imgFallback:monitorsFbImg},
  ];
  const displayTopCats   = topCats.length   > 0 ? topCats   : topCatFallback;
  const displaySidebar   = sidebarCats.length > 0 ? sidebarCats.map(c=>c.name) : ['Laptops','PC & Computers','Cell Phones','Tablets','Gaming & VR','Networking','Cameras','Sounds','Office','Storage, USB','Accessories','Clearance'];

  const circleFallback = [
    {id:'cc1',name:'Speaker',    item_count:12, imgFallback:speakerFbImg},
    {id:'cc2',name:'DSLR Camera',item_count:9,  imgFallback:dslrFbImg},
    {id:'cc3',name:'Monitors',   item_count:28, imgFallback:monitorsFbImg},
    {id:'cc4',name:'Chair',      item_count:12, imgFallback:chairFbImg},
    {id:'cc5',name:'Printers',   item_count:9,  imgFallback:printersFbImg},
    {id:'cc6',name:'Network',    item_count:90, imgFallback:networkFbImg},
    {id:'cc7',name:'Earbuds',    item_count:5,  imgFallback:earbudsFbImg},
    {id:'cc8',name:'Microphone', item_count:12, imgFallback:micFbImg},
    {id:'cc9',name:'Controller', item_count:9,  imgFallback:controllerFbImg},
    {id:'cc10',name:'Keyboards', item_count:30, imgFallback:keyboardsFbImg},
    {id:'cc11',name:'Security',  item_count:12, imgFallback:gamingBannerImg},
    {id:'cc12',name:'Projectors',item_count:12, imgFallback:projectorsFbImg},
  ];
  const displayCircles = circleCats.length > 0 ? circleCats : circleFallback;

  // Filter products for tabs
  const tabProducts = activeTab === 'BEST SELLER' ? bsProducts
    : activeTab === 'NEW IN'      ? bsProducts.filter(p => p.is_new)
    : bsProducts.filter(p => p.is_popular);

  const displayBsProducts = tabProducts.length > 0 ? tabProducts : bsProducts;

  return (
    <div className="cp-page">

      {/* ══ 0. HERO SECTION ══ */}
      <div className="cp-hero-outer">
        <aside className="cp-hero-sidebar">
          <p className="cp-sale-tag">SALE 40% OFF</p>
          <ul className="cp-sidebar-list">
            {displaySidebar.map(link => (
              <li key={link} className="cp-sidebar-item">{typeof link === 'string' ? link : link.name}</li>
            ))}
          </ul>
        </aside>
        <div className="cp-hero-center">
          <div className="cp-hero-slide">
            <img src={noiseCancelImg} alt="Noise Cancelling Headphone" className="cp-hero-bg" />
            <div className="cp-hero-content">
              <h2 className="cp-hero-title">Noise Cancelling<br /><span>Headphone</span></h2>
              <p className="cp-hero-sub">Boso Over-Ear Headphone<br />Wifi, Voice Assistant,<br />Low Latency Game Mode</p>
              <button className="cp-hero-btn">BUY NOW</button>
            </div>
          </div>
          <div className="cp-hero-mini-cards">
            <div className="cp-mini-card">
              <div className="cp-mini-card-info">
                <p className="cp-mini-name">Sono Playgo 5</p>
                <p className="cp-mini-price">from <span>$569</span></p>
                <a href="#!" className="cp-mini-link">DISCOVER NOW</a>
              </div>
              <img src={sonoPlaygoImg} alt="Sono Playgo 5" className="cp-mini-img" />
            </div>
            <div className="cp-mini-card cp-mini-card-dark">
              <div className="cp-mini-card-info">
                <p className="cp-mini-name-light">Logitek Bluetooth</p>
                <p className="cp-mini-highlight">Keyboard</p>
                <p className="cp-mini-desc">Best for all device</p>
              </div>
              <img src={logitekImg} alt="Logitek Keyboard" className="cp-mini-img" />
            </div>
          </div>
        </div>
        <div className="cp-hero-right">
          <div className="cp-right-banner cp-right-banner-light">
            <div className="cp-right-banner-text">
              <p className="cp-right-brand">XOMIA</p>
              <h3 className="cp-right-title">Sport Water<br />Resistance<br />Watch</h3>
              <button className="cp-right-btn">SHOP NOW</button>
            </div>
            <img src={b('hero_right_top') || xomiaWatchImg} alt="Xomia Watch" className="cp-right-img" />
          </div>
          <div className="cp-right-banner cp-right-banner-dark">
            <div className="cp-right-banner-text">
              <h3 className="cp-right-title-dark">OKODO<br />HERO 11+<br />BLACK</h3>
              <p className="cp-right-from">FROM</p>
              <p className="cp-right-price">$169</p>
            </div>
            <img src={b('hero_right_bottom') || okodoHeroImg} alt="Okodo Hero" className="cp-right-img-dark" />
          </div>
        </div>
      </div>

      {/* ══ 1. FEATURED BRANDS + TOP CATEGORIES ══ */}
      <div className="cp-brands-cats-row">
        <div className="cp-brands-section">
          <div className="cp-section-header">
            <h3 className="cp-section-title">FEATURED BRANDS</h3>
            <a href="#!" className="cp-view-all">View All</a>
          </div>
          <div className="cp-brands-grid">
            {brands.map(br => (
              <div key={br.id} className="cp-brand-item">
                <img src={imgUrl(br.logo)} alt={br.name} className="cp-brand-img" />
              </div>
            ))}
          </div>
        </div>
        <div className="cp-topcats-section">
          <div className="cp-section-header">
            <h3 className="cp-section-title">TOP CATEGORIES</h3>
            <a href="#!" className="cp-view-all">View All</a>
          </div>
          <div className="cp-topcats-grid">
            {displayTopCats.map(c => (
              <div key={c.id || c.name} className="cp-topcat-item">
                <img src={imgUrl(c.image) || c.imgFallback} alt={c.name} className="cp-topcat-img" />
                <p className="cp-topcat-name">{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 2. DEALS OF THE DAY + SIDE BANNERS ══ */}
      <div className="cp-deals-outer">
        <div className="cp-deal-section">
          <div className="cp-deal-header"><h3 className="cp-deal-title">DEALS OF THE DAY</h3></div>
          <div className="cp-deal-body">
            <div className="cp-deal-thumbs">
              {[dealImg,dealImg,dealImg].map((img,i) => (
                <img key={i} src={img} alt="thumb" className="cp-deal-thumb" />
              ))}
            </div>
            <div className="cp-deal-main-img">
              <span className="cp-deal-save">SAVE<br />${dealProd?.save_amount || '199.00'}</span>
              <img src={dealImg} alt={dealProd?.name || 'Deal'} className="cp-deal-img" />
            </div>
            <div className="cp-deal-info">
              <p className="cp-deal-reviews">({dealProd?.review_count || 12})</p>
              <h3 className="cp-deal-name">{dealProd?.name || 'Xioma Redmi Note 11 Pro 256GB 2023'}</h3>
              <div className="cp-deal-price-row">
                <span className="cp-deal-price">${dealProd?.price || '569.00'}</span>
                {dealProd?.old_price && <span className="cp-deal-old">${dealProd.old_price}</span>}
              </div>
              <ul className="cp-deal-specs">
                {(dealProd?.description || 'Intel LGA 1700 Socket. DDR5 Compatible. Commanding Power Design.').split('.').filter(Boolean).slice(0,3).map((s,i) => (
                  <li key={i}>{s.trim()}</li>
                ))}
              </ul>
              <div className="cp-deal-tags">
                {dealProd?.free_shipping && <span className="cp-deal-tag-free">FREE SHIPPING</span>}
                {dealProd?.free_gift     && <span className="cp-deal-tag-gift">FREE GIFT</span>}
              </div>
              <div className="cp-countdown">
                <p className="cp-hurry">HURRY UP! PROMOTION WILL EXPIRES IN</p>
                <div className="cp-timer">
                  {[{v:dealTime.d,u:'d'},{v:dealTime.h,u:'h'},{v:dealTime.m,u:'m'},{v:dealTime.s,u:'s'}].map(({v,u}) => (
                    <div key={u} className="cp-timer-box">
                      <span className="cp-timer-num">{pad(v)}</span>
                      <span className="cp-timer-unit">{u}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cp-deal-progress-wrap">
                <div className="cp-deal-progress-bar"><div className="cp-deal-progress-fill" style={{width:`${dealPct}%`}} /></div>
                <p className="cp-deal-sold">Sold: <strong>{dealSold}/{dealTotal}</strong></p>
              </div>
            </div>
          </div>
        </div>
        <div className="cp-side-banners">
          <div className="cp-side-banner cp-side-banner-dark">
            <div className="cp-side-banner-text"><p className="cp-side-sale">SALE</p><p className="cp-side-pct">50%</p></div>
            <img src={b('side_dark') || joystickImg} alt="Sale" className="cp-side-banner-img" />
          </div>
          <div className="cp-side-banner cp-side-banner-green">
            <img src={b('side_green') || ipadImg} alt="Promo" className="cp-side-banner-img cp-side-full-img" />
          </div>
        </div>
      </div>

      {/* ══ 3. FREE SHIPPING BANNER ══ */}
      <div className="cp-free-banner">
        <span className="cp-free-star">⭐</span>
        Member get <span className="cp-free-highlight">FREE SHIPPING*</span> with no order minimum!. *Restriction apply
        <a href="#!" className="cp-free-trial">Try free 30-days trial!</a>
      </div>

      {/* ══ 4. BEST SELLER TABS ══ */}
      <div className="cp-tabs-section">
        <div className="cp-tabs-header">
          <div className="cp-tabs">
            {['BEST SELLER','NEW IN','POPULAR'].map(t => (
              <button key={t} className={`cp-tab ${activeTab===t?'active':''}`} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </div>
          <a href="#!" className="cp-view-all-link">View All</a>
        </div>
        <div className="cp-bs-grid">
          {displayBsProducts.map(p => <ProductCard key={p.id} p={p} onAdd={() => { addToCart({...p,img:imgUrl(p.image),cat:p.category_name||'Electronics',desc:p.description||''}); setToast(p); }} />)}
        </div>
      </div>

      {/* ══ 5. BRAND NEW FOR YOU ══ */}
      <div className="cp-brandnew-section">
        <h2 className="cp-brandnew-title">BRAND NEW FOR YOU</h2>
        <div className="cp-brandnew-grid">
          {brandNewItems.map(item => (
            <div key={item.id} className="cp-brandnew-card">
              <div className="cp-brandnew-img-wrap">
                <img src={imgUrl(item.image)} alt={item.title} className="cp-brandnew-img" />
              </div>
              <p className="cp-brandnew-name">{item.title}</p>
              <p className="cp-brandnew-desc">{item.desc}</p>
              <button className="cp-brandnew-btn">SHOP NOW</button>
            </div>
          ))}
        </div>
      </div>

      {/* ══ 6. TOP CELLPHONES & TABLETS ══ */}
      <div className="cp-topcell-section">
        <div className="cp-section-header">
          <h2 className="cp-topcell-title">TOP CELLPHONES & TABLETS</h2>
          <a href="#!" className="cp-view-all">View All</a>
        </div>
        <img src={b('top_cellphone') || topCellphoneImg} alt="Top Cellphones" className="cp-topcell-img" />
        <div className="cp-cell-grid">
          {cellProducts.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>

      {/* ══ 7. BEST LAPTOPS & COMPUTERS ══ */}
      <div className="cp-topcell-section">
        <div className="cp-section-header">
          <h2 className="cp-topcell-title">BEST LAPTOPS & COMPUTERS</h2>
          <a href="#!" className="cp-view-all">View All</a>
        </div>
        <img src={b('best_laptop') || bestLaptopImg} alt="Best Laptops" className="cp-topcell-img" />
        <div className="cp-cell-grid">
          {laptopProds.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>

      {/* ══ 8. AUDIOS & CAMERAS + GAMING + OFFICE EQUIPMENTS ══ */}
      <div className="cp-three-banners">
        {[
          {type:'audio_cameras', fallback:audiosCamerasImg, title:'AUDIOS & CAMERAS'},
          {type:'gaming',        fallback:gamingBannerImg,  title:'GAMING'},
          {type:'office',        fallback:officeEquipImg,   title:'OFFICE EQUIPMENTS'},
        ].map(item => (
          <div key={item.type} className="cp-three-banner-col">
            <div className="cp-three-header">
              <h3 className="cp-three-title">{item.title}</h3>
              <a href="#!" className="cp-view-all">View All</a>
            </div>
            <img src={b(item.type) || item.fallback} alt={item.title} className="cp-three-img" />
          </div>
        ))}
      </div>

      {/* ══ 9. CATEGORY CIRCLES ══ */}
      <div className="cp-circles-section">
        <div className="cp-circles-grid">
          {displayCircles.map(c => (
            <div key={c.id || c.name} className="cp-circle-item">
              <div className="cp-circle-img-wrap">
                <img src={imgUrl(c.image) || c.imgFallback} alt={c.name} className="cp-circle-img" />
              </div>
              <p className="cp-circle-name">{c.name}</p>
              <p className="cp-circle-count">{c.item_count} Items</p>
            </div>
          ))}
        </div>
      </div>

      {quickView && (
        <QuickViewModal
          product={{...quickView, img: imgUrl(quickView.image)||quickView.img, cat: quickView.category_name||'Electronics', desc: quickView.description||''}}
          onClose={() => setQuickView(null)}
          onAddedToCart={p => setToast(p)}
        />
      )}
      {toast && (
        <CartToast
          product={{...toast, img: imgUrl(toast.image)||toast.img}}
          onClose={() => setToast(null)}
          onViewCart={() => { setToast(null); setPage('cart'); }}
        />
      )}
    </div>
  );
}
