import React, { useState, useEffect } from 'react';
import d1 from '../assets/images/d1.jpg';
import d2 from '../assets/images/d2.jpg';
import d3 from '../assets/images/d3.jpg';
import './DealsOfMonth.css';

const products = [
  { id: 1, img: d1, label: 'Spring Sale',  num: '01', discount: '30% OFF' },
  { id: 2, img: d2, label: 'Summer Deal',  num: '02', discount: '25% OFF' },
  { id: 3, img: d3, label: 'Flash Sale',   num: '03', discount: '40% OFF' },
  { id: 4, img: d1, label: 'Hot Offer',    num: '04', discount: '20% OFF' },
  { id: 5, img: d2, label: 'New Arrival',  num: '05', discount: '15% OFF' },
  { id: 6, img: d3, label: 'Clearance',    num: '06', discount: '50% OFF' },
];

const VISIBLE = 3;
const TOTAL   = products.length;
const MAX     = TOTAL - VISIBLE;

function getTarget() {
  const t = new Date();
  t.setDate(t.getDate() + 2);
  t.setHours(t.getHours() + 6);
  t.setMinutes(t.getMinutes() + 5);
  t.setSeconds(t.getSeconds() + 30);
  return t;
}
const TARGET = getTarget();

function calcTime() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hrs:  Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000)  / 60000),
    secs: Math.floor((diff % 60000)    / 1000),
  };
}
function pad(n) { return String(n).padStart(2, '0'); }

export default function DealsOfMonth() {
  const [time,  setTime]  = useState(calcTime());
  const [start, setStart] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setStart((s) => (s > 0 ? s - 1 : MAX));
  const next = () => setStart((s) => (s < MAX ? s + 1 : 0));

  const visible = products.slice(start, start + VISIBLE);

  return (
    <section className="deals-section">

      {/* ── Left panel (1 part) ── */}
      <div className="deals-left">
        <div className="deals-left-top">
          <h2 className="deals-heading">Deals Of The Month</h2>
          <p className="deals-sub">
            Deals of the Month means special offers, discounts, or promotions
            that are available for a limited time, usually for that specific month.
          </p>
          <button className="deals-shop-btn">SHOP NOW</button>

          <p className="deals-timer-label">Hurry, Before It's Too Late!</p>

          {/* Timer + arrows + dots all in one row */}
          <div className="deals-bottom-row">
            <div className="deals-timer">
              {[
                { val: pad(time.days), unit: 'Days' },
                { val: pad(time.hrs),  unit: 'Hr'   },
                { val: pad(time.mins), unit: 'Mins'  },
                { val: pad(time.secs), unit: 'Sec'   },
              ].map(({ val, unit }) => (
                <div className="timer-item" key={unit}>
                  <div className="timer-box">
                    <span className="timer-num">{val}</span>
                  </div>
                  <span className="timer-unit">{unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Arrows + dots in one row, arrows slightly right */}
        <div className="deals-controls-row">
          <div className="deals-arrows">
            <button className="deals-arrow" onClick={prev} aria-label="Previous">‹</button>
            <button className="deals-arrow" onClick={next} aria-label="Next">›</button>
          </div>
        </div>
      </div>

      {/* ── Right panel (1.3 parts) ── */}
      <div className="deals-right">
        <div className="deals-cards">
          {visible.map((p, idx) => (
            <div className="deal-card" key={p.id}>
              <img src={p.img} alt={p.label} className="deal-card-img" />
              {idx === 0 && (
                <div className="deal-card-footer">
                  <div className="deal-footer-top">
                    <span className="deal-num">{p.num}</span>
                    <span className="deal-divider">——</span>
                    <span className="deal-label">{p.label}</span>
                  </div>
                  <div className="deal-discount">{p.discount}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dots below cards — right panel */}
        <div className="deals-dots-row">
          {Array.from({ length: MAX + 1 }).map((_, i) => (
            <button
              key={i}
              className={`deals-dot ${i === start ? 'active' : ''}`}
              onClick={() => setStart(i)}
              aria-label={`Go to group ${i + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
