import React, { useState } from 'react';
import insta1 from '../assets/images/insta1.png';
import insta2 from '../assets/images/insta2.png';
import insta3 from '../assets/images/insta3.png';
import insta4 from '../assets/images/insta4.png';
import insta5 from '../assets/images/insta5.png';
import insta6 from '../assets/images/insta6.png';
import './InstagramFeed.css';

const photos = [
  { id: 1, img: insta1, tall: false },
  { id: 2, img: insta2, tall: true  },
  { id: 3, img: insta3, tall: true  },
  { id: 4, img: insta4, tall: false },
  { id: 5, img: insta5, tall: false },
  { id: 6, img: insta6, tall: true  },
];

export default function InstagramFeed() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="insta-section">
      <h2 className="insta-heading">Follow Us On Instagram</h2>

      <div className="insta-grid">
        {photos.map((p) => (
          <div
            key={p.id}
            className={`insta-item ${p.tall ? 'tall' : ''}`}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <img src={p.img} alt={`Instagram ${p.id}`} className="insta-img" />
            {hovered === p.id && (
              <div className="insta-overlay">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
