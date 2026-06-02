import React from 'react';
import summerImg from '../assets/images/sumer discount.png';
import avatar1   from '../assets/images/i1.png';
import './TestimonialServices.css';

const services = [
  {
    title: 'Worldwide Delivery', sub: 'For Order Over $100',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FF8F9C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
        <rect x="9" y="11" width="14" height="10" rx="2"/>
        <circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      </svg>
    ),
  },
  {
    title: 'Next Day Delivery', sub: 'UK Orders Only',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FF8F9C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: 'Best Online Support', sub: 'Hours: 8AM – 11PM',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FF8F9C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    title: 'Return Policy', sub: 'Easy & Free Return',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FF8F9C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
      </svg>
    ),
  },
  {
    title: '30% Money Back', sub: 'For Order Over $100',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FF8F9C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
];

export default function TestimonialServices() {
  return (
    <section className="ts-section">

      {/* ── Left: Testimonial — single, no dots ── */}
      <div className="ts-left">
        <h2 className="ts-heading">Testimonial</h2>
        <div className="ts-card">
          <div className="ts-avatar">
            <div className="ts-avatar-circle">
              <img src={avatar1} alt="Alan Doe" className="ts-avatar-img" />
            </div>
          </div>
          <p className="ts-name">ALAN DOE</p>
          <p className="ts-role">CEO &amp; Founder Invision</p>
          <div className="ts-quote-icon">"</div>
          <p className="ts-text">
            Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet.
          </p>
        </div>
      </div>

      {/* ── Center: Summer Banner ── */}
      <div className="ts-center">
        <img src={summerImg} alt="Summer Collection" className="ts-banner-img" />
      </div>

      {/* ── Right: Our Services ── */}
      <div className="ts-right">
        <h2 className="ts-heading">Our Services</h2>
        <div className="ts-services">
          {services.map((s, i) => (
            <div className="ts-service-item" key={i}>
              <div className="ts-service-icon">{s.icon}</div>
              <div className="ts-service-info">
                <p className="ts-service-title">{s.title}</p>
                <p className="ts-service-sub">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
