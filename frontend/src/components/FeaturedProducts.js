import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getProducts, imgUrl } from '../services/api';
import img1 from '../assets/images/men yarn.png';
import img2 from "../assets/images/men's winter.png";
import img3 from '../assets/images/jacket.png';
import img4 from '../assets/images/better basic.png';
import img5 from '../assets/images/running.png';
import img6 from '../assets/images/trekking.png';
import img7 from "../assets/images/women's party.png";
import img8 from '../assets/images/sports.png';
import img9 from '../assets/images/platinam.png';
import img10 from '../assets/images/smartwatch.png';
import img11 from '../assets/images/shampoo.png';
import img12 from '../assets/images/rose gold.png';
import './FeaturedProducts.css';

const FALLBACK = [
  {id:'fp1',img:img1,images:[img1,img2,img3],name:'MEN Yarn Fleece',cat:'Winter Wear',price:'61.00',old:'80.00',stars:4,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'fp2',img:img2,images:[img2,img1,img3],name:"Men's Winter Leather",cat:'Winter Wear',price:'32.00',old:'50.00',stars:5,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'fp3',img:img3,images:[img3,img1,img2],name:"Men's Jacket",cat:'Jackets',price:'50.00',old:'70.00',stars:4,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'fp4',img:img4,images:[img4,img5,img6],name:'Better Basics French',cat:'Shorts',price:'20.00',old:'30.00',stars:3,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'fp5',img:img5,images:[img5,img6,img7],name:'Running Shoes',cat:'Sports',price:'49.00',old:'65.00',stars:5,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'fp6',img:img6,images:[img6,img5,img7],name:'Trekking Boots',cat:'Sports',price:'78.00',old:'95.00',stars:4,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'fp7',img:img7,images:[img7,img8,img9],name:"Women's Party Wear",cat:'Party Wear',price:'94.00',old:'120.00',stars:5,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'fp8',img:img8,images:[img8,img7,img9],name:'Sports Claw Women',cat:'Sports',price:'54.00',old:'85.00',stars:4,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'fp9',img:img9,images:[img9,img10,img11],name:'Platinum Zircon',cat:'Jewellery',price:'62.00',old:'85.00',stars:5,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'fp10',img:img10,images:[img10,img9,img11],name:'Smart Watch',cat:'Watches',price:'58.00',old:'70.00',stars:4,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'fp11',img:img11,images:[img11,img12,img9],name:'Shampoo Conditioner',cat:'Cosmetics',price:'20.00',old:'30.00',stars:3,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'fp12',img:img12,images:[img12,img11,img9],name:'Rose Gold Peacock',cat:'Jewellery',price:'25.00',old:'30.00',stars:5,desc:'Nulla eget sem vitae eros pharetra viverra.'},
];

const VISIBLE = 4;

function Stars({ count }) {
  return (
    <div className="fp-stars">
      {[1,2,3,4,5].map(s => <span key={s} className={s<=count?'fp-star filled':'fp-star'}>★</span>)}
    </div>
  );
}

export default function FeaturedProducts({ onQuickView, onAddedToCart }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState(FALLBACK);
  const [start, setStart]       = useState(0);
  const [hovered, setHovered]   = useState(null);

  useEffect(() => {
    getProducts({ filter: 'featured' })
      .then(res => {
        if (res.data.length > 0) {
          setProducts(res.data.map(p => ({
            ...p,
            img: imgUrl(p.image) || img1,
            images: [imgUrl(p.image) || img1],
            old: p.old_price,
            stars: 4,
            desc: p.description || 'Premium product.',
          })));
        }
      })
      .catch(() => {});
  }, []);

  const MAX     = Math.max(0, products.length - VISIBLE);
  const visible = products.slice(start, start + VISIBLE);

  function handleAdd(p) {
    addToCart(p);
    onAddedToCart?.(p);
  }

  return (
    <section className="fp-section">
      <div className="fp-header">
        <h2 className="fp-heading">Featured Products</h2>
        <div className="fp-arrows">
          <button className="fp-arrow" onClick={() => setStart(s => s > 0 ? s-1 : MAX)} aria-label="Previous">‹</button>
          <button className="fp-arrow" onClick={() => setStart(s => s < MAX ? s+1 : 0)} aria-label="Next">›</button>
        </div>
      </div>
      <div className="fp-grid">
        {visible.map(p => (
          <div key={p.id} className="fp-card" onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}>
            <div className="fp-img-wrap" onClick={() => onQuickView?.(p)} style={{cursor:'pointer'}}>
              <img src={p.img || imgUrl(p.image)} alt={p.name} className="fp-img" />
              {hovered === p.id && (
                <div className="fp-hover-overlay">
                  <button className="fp-quick-view-btn" onClick={e => { e.stopPropagation(); onQuickView?.(p); }}>Quick View</button>
                </div>
              )}
            </div>
            <div className="fp-info">
              <Stars count={p.stars || 4} />
              <p className="fp-name">{p.name}</p>
              <p className="fp-cat">{p.cat || p.category_name}</p>
              <div className="fp-price-row">
                <span className="fp-price">${p.price}</span>
                {(p.old || p.old_price) && <span className="fp-old">${p.old || p.old_price}</span>}
              </div>
              {hovered === p.id && (
                <button className="fp-add-btn" onClick={() => handleAdd(p)}>ADD TO CART</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="fp-dots">
        {Array.from({ length: MAX + 1 }).map((_, i) => (
          <button key={i} className={`fp-dot ${i===start?'active':''}`} onClick={() => setStart(i)} aria-label={`Page ${i+1}`} />
        ))}
      </div>
    </section>
  );
}
