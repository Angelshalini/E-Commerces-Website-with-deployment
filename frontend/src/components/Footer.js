import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">

      {/* ── Brand Directory ── */}
      <div className="footer-directory">
        <h3 className="footer-dir-title">BRAND DIRECTORY</h3>
        <div className="footer-dir-row">
          <span className="footer-dir-label">FASHION:</span>
          {['T-Shirt','Shirt','Shorts & Jeans','Jackets','Dress & Frock','Innerwear','Hosiery'].map((item, i, arr) => (
            <span key={item}><a href="#!" className="footer-dir-link">{item}</a>{i < arr.length - 1 && <span className="footer-dir-sep">|</span>}</span>
          ))}
        </div>
        <div className="footer-dir-row">
          <span className="footer-dir-label">FOOTWEAR:</span>
          {['Branded','Sport','Formal','First Copy','Boots','Casual','Party Wear Shoes','Long Shoes'].map((item, i, arr) => (
            <span key={item}><a href="#!" className="footer-dir-link">{item}</a>{i < arr.length - 1 && <span className="footer-dir-sep">|</span>}</span>
          ))}
        </div>
        <div className="footer-dir-row">
          <span className="footer-dir-label">JEWELLERY:</span>
          {['Necklace','Earrings','Couple Rings','Pendente','Crystal','Bangles','Bracelets','Nosepin','Chain'].map((item, i, arr) => (
            <span key={item}><a href="#!" className="footer-dir-link">{item}</a>{i < arr.length - 1 && <span className="footer-dir-sep">|</span>}</span>
          ))}
        </div>
        <div className="footer-dir-row">
          <span className="footer-dir-label">COSMETICS:</span>
          {['Shampoo','Bodywash','Facewash','Makeup Kit','Liner','Lipstick','Perfume','Body Soap','Scrub','Hair Gel','Hair Colors','Hair Dye','Sunscreen','Skin Lotion'].map((item, i, arr) => (
            <span key={item}><a href="#!" className="footer-dir-link">{item}</a>{i < arr.length - 1 && <span className="footer-dir-sep">|</span>}</span>
          ))}
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="footer-main">
        <div className="footer-col">
          <h4 className="footer-col-title">POPULAR CATEGORIES</h4>
          {['Fashion','Electronic','Cosmetic','Health','Watches'].map(item => (
            <a key={item} href="#!" className="footer-link">{item}</a>
          ))}
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">PRODUCTS</h4>
          {['Prices Drop','New Products','Best Sales','Sitemap','Contact Us'].map(item => (
            <a key={item} href="#!" className="footer-link">{item}</a>
          ))}
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">OUR COMPANY</h4>
          {['Delivery','Legal Notice','Terms And Conditions','About Us','Secure Payment'].map(item => (
            <a key={item} href="#!" className="footer-link">{item}</a>
          ))}
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">SERVICES</h4>
          {['Prices Drop','New Products','Best Sales','Sitemap','Contact Us'].map(item => (
            <a key={item} href="#!" className="footer-link">{item}</a>
          ))}
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">CONTACT</h4>
          <p className="footer-contact-item">
            <span className="footer-contact-icon">📍</span>
            419 State 414 Rte Beaver Dams, New York(NY), 14812, USA
          </p>
          <p className="footer-contact-item">
            <span className="footer-contact-icon">📞</span>
            032 454-3256
          </p>
          <p className="footer-contact-item">
            <span className="footer-contact-icon">✉️</span>
            Example@gmail.com
          </p>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <div className="footer-payments">
          <span className="footer-pay-badge">VISA</span>
          <span className="footer-pay-badge">G Pay</span>
          <span className="footer-pay-badge">Amazon Pay</span>
          <span className="footer-pay-badge">PayPal</span>
        </div>
        <p className="footer-copy">
          © 2026 <a href="#!" className="footer-brand-link">Mano_uidesigns</a>. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}
