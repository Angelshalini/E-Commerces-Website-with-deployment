import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import shampooImg from '../assets/images/shampoo.png';
import './DealOfDay.css';

function pad(n) { return String(n).padStart(2, '0'); }

function getTarget() {
  const t = new Date();
  t.setDate(t.getDate() + 26);
  t.setHours(t.getHours() + 12);
  t.setMinutes(t.getMinutes() + 54);
  t.setSeconds(t.getSeconds() + 33);
  return t;
}
const TARGET = getTarget();

function calcTime() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days:  Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins:  Math.floor((diff % 3600000)  / 60000),
    secs:  Math.floor((diff % 60000)    / 1000),
  };
}

const dodProduct = {
  id: 'dod1', img: shampooImg, images: [shampooImg],
  name: 'SHAMPOO, CONDITIONER & FACEWASH',
  cat: 'Cosmetics', price: '150.00', old: '200.00', stars: 3,
  desc: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet consectetur Lorem ipsum dolor.',
};

export default function DealOfDay({ onAddedToCart }) {
  const { addToCart } = useCart();
  const [time, setTime] = useState(calcTime());

  useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const sold = 20, available = 40;
  const pct  = Math.round((sold / (sold + available)) * 100);

  function handleAdd() {
    addToCart(dodProduct);
    onAddedToCart?.(dodProduct);
  }

  return (
    <section className="dod-section">
      <h2 className="dod-section-title">Deal of The Day</h2>
      <div className="dod-card">
        <div className="dod-img-wrap">
          <img src={shampooImg} alt="Shampoo" className="dod-img" />
        </div>
        <div className="dod-content">
          <div className="dod-stars">
            {[1,2,3,4,5].map(s => <span key={s} className={s<=3?'dod-star filled':'dod-star'}>★</span>)}
          </div>
          <h3 className="dod-name">SHAMPOO, CONDITIONER &amp; FACEWASH....</h3>
          <p className="dod-desc">Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet consectetur Lorem ipsum dolor.</p>
          <div className="dod-price-row">
            <span className="dod-price">$150.00</span>
            <span className="dod-old">$200.00</span>
          </div>
          <button className="dod-btn" onClick={handleAdd}>ADD TO CART</button>
          <div className="dod-progress-row">
            <span className="dod-progress-label">ALREADY SOLD: <strong>{sold}</strong></span>
            <span className="dod-progress-label">AVAILABLE: <strong>{available}</strong></span>
          </div>
          <div className="dod-bar-bg">
            <div className="dod-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <p className="dod-hurry">HURRY UP! OFFER ENDS IN:</p>
          <div className="dod-timer">
            {[{val:pad(time.days),unit:'Days'},{val:pad(time.hours),unit:'Hours'},{val:pad(time.mins),unit:'Min'},{val:pad(time.secs),unit:'Sec'}].map(({val,unit}) => (
              <div className="dod-timer-box" key={unit}>
                <div className="dod-timer-num-wrap"><span className="dod-timer-num">{val}</span></div>
                <span className="dod-timer-unit">{unit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
