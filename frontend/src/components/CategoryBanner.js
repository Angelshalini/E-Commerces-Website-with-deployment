import React from 'react';
import womenImg from '../assets/images/women .png';
import menImg   from '../assets/images/men.jpg';
import childImg from '../assets/images/child.jpg';
import './CategoryBanner.css';

const banners = [
  {
    id: 1,
    title: 'Women',
    sub: 'Spring 2025',
    img: womenImg,
    dark: false,
  },
  {
    id: 2,
    title: 'Men',
    sub: 'Spring 2025',
    img: menImg,
    dark: false,
  },
  {
    id: 3,
    title: 'Children',
    sub: 'Spring 2025',
    img: childImg,
    dark: true,   // blue/purple bg, white text
  },
];

export default function CategoryBanner({ onWomenClick }) {
  return (
    <section className="cat-banner-section">
      {banners.map((b) => (
        <div
          key={b.id}
          className={`cat-banner-card ${b.dark ? 'cat-dark' : ''}`}
          onClick={b.id === 1 && onWomenClick ? onWomenClick : undefined}
          style={b.id === 1 && onWomenClick ? { cursor: 'pointer' } : {}}
        >
          <div className="cat-banner-content">
            <h3 className="cat-banner-title">
              {b.title}
              <span className="cat-banner-underline" />
            </h3>
            <p className="cat-banner-sub">{b.sub}</p>
            {b.dark && (
              <button className="cat-banner-shopbtn">SHOP NOW</button>
            )}
          </div>
          <div className="cat-banner-img-wrap">
            <img src={b.img} alt={b.title} className="cat-banner-img" />
            <div className="cat-banner-overlay" />
          </div>
        </div>
      ))}
    </section>
  );
}
