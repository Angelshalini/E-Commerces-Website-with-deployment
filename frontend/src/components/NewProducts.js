import React, { useState, useEffect } from 'react';
import { useCart, useWishlist } from '../context/CartContext';
import { getProducts, imgUrl } from '../services/api';
import jacketImg  from '../assets/images/jacket.png';
import shirtImg   from '../assets/images/shirt.png';
import menYarn    from '../assets/images/men yarn.png';
import skirtImg   from "../assets/images/women's party.png";
import casualImg  from '../assets/images/casual.png';
import watchesImg from '../assets/images/watches.png';
import smartWatch from '../assets/images/smartwatch.png';
import menWinter  from "../assets/images/men's winter.png";
import trekkingImg from '../assets/images/trekking.png';
import sportsImg  from '../assets/images/sports.png';
import betterBasic from '../assets/images/better basic.png';
import './NewProducts.css';

const FALLBACK = [
  {id:'np1',img:jacketImg,images:[jacketImg,menYarn,menWinter],cat:'JACKET',name:"Men's Winter Leathers Jackets",stars:3,price:'48.00',old:'75.00',badge:'15%',badgeType:'discount',desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'np2',img:shirtImg,images:[shirtImg,jacketImg,menYarn],cat:'SHIRT',name:'Pure Garment Dyed Cotton Shirt',stars:3,price:'45.00',old:'56.00',badge:'SALE',badgeType:'sale',desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'np3',img:menYarn,images:[menYarn,menWinter,jacketImg],cat:'JACKET',name:'MEN Yarn Fleece Full Zip Jacket',stars:3,price:'58.00',old:'85.00',badge:null,badgeType:null,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'np4',img:skirtImg,images:[skirtImg],cat:'SKIRT',name:'Black Floral Wrap Midi Skirt',stars:3,price:'25.00',old:'35.00',badge:'NEW',badgeType:'new',desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'np5',img:casualImg,images:[casualImg,sportsImg,trekkingImg],cat:'CASUAL',name:"Casual Men's Brown Shoes",stars:3,price:'58.00',old:'85.00',badge:null,badgeType:null,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'np6',img:watchesImg,images:[watchesImg,smartWatch,jacketImg],cat:'WATCHES',name:'Pocket Watch Leather Pouch',stars:3,price:'70.00',old:'86.00',badge:'SALE',badgeType:'sale',desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'np7',img:smartWatch,images:[smartWatch,watchesImg,jacketImg],cat:'WATCHES',name:'Smart Watch Vital Plus',stars:3,price:'58.00',old:'65.00',badge:null,badgeType:null,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'np8',img:skirtImg,images:[skirtImg],cat:'PARTY WEAR',name:"Women's Party Wear Shoes",stars:3,price:'58.00',old:'64.00',badge:'SALE',badgeType:'sale',desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'np9',img:menWinter,images:[menWinter,jacketImg,menYarn],cat:'JACKET',name:"Men's Winter Leathers Jackets",stars:3,price:'58.00',old:'65.00',badge:null,badgeType:null,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'np10',img:trekkingImg,images:[trekkingImg,sportsImg,casualImg],cat:'SPORTS',name:'Trekking & Running Shoes - Black',stars:4,price:'58.00',old:'64.00',badge:'SALE',badgeType:'sale',desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'np11',img:sportsImg,images:[sportsImg,trekkingImg,casualImg],cat:'FORMAL',name:"Men's Leather Formal Wear Shoes",stars:3,price:'58.00',old:'65.00',badge:null,badgeType:null,desc:'Nulla eget sem vitae eros pharetra viverra.'},
  {id:'np12',img:betterBasic,images:[betterBasic,shirtImg,jacketImg],cat:'SHORTS',name:'Better Basics French Terry Sweatshorts',stars:3,price:'70.00',old:'86.00',badge:'SALE',badgeType:'sale',desc:'Nulla eget sem vitae eros pharetra viverra.'},
];

function Stars({ count }) {
  return (
    <div className="np-stars">
      {[1,2,3,4,5].map(s => <span key={s} className={s<=count?'np-star filled':'np-star'}>★</span>)}
    </div>
  );
}

export default function NewProducts({ onQuickView, onAddedToCart }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [products, setProducts] = useState(FALLBACK);
  const [hovered, setHovered]   = useState(null);

  // New Products shows fashion items - use static fallback always

  function handleAdd(p) { addToCart(p); onAddedToCart?.(p); }

  return (
    <section className="np-section">
      <h2 className="np-heading">New Products</h2>
      <div className="np-grid">
        {products.map(p => (
          <div key={p.id} className="np-card" onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}>
            {p.badge && <span className={`np-badge np-badge-${p.badgeType}`}>{p.badge}</span>}
            <div className="np-img-wrap" onClick={() => onQuickView?.(p)} style={{cursor:'pointer'}}>
              <img src={p.img || imgUrl(p.image)} alt={p.name} className="np-img" />
              {hovered === p.id && (
                <div className="np-actions">
                  <button className="np-action-btn" aria-label="Wishlist" onClick={e => { e.stopPropagation(); toggleWishlist(p); }} style={{color:isWishlisted(p.id)?'#e53e3e':undefined}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted(p.id)?'#e53e3e':'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                  <button className="np-action-btn" aria-label="Quick view" onClick={e => { e.stopPropagation(); onQuickView?.(p); }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  </button>
                  <button className="np-action-btn" aria-label="Add to cart" onClick={e => { e.stopPropagation(); handleAdd(p); }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  </button>
                </div>
              )}
            </div>
            <div className="np-info">
              <p className="np-cat">{p.cat}</p>
              <p className="np-name">{p.name}</p>
              <Stars count={p.stars || 3} />
              <div className="np-price-row">
                <span className="np-price">${p.price}</span>
                {(p.old || p.old_price) && <span className="np-old">${p.old || p.old_price}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
