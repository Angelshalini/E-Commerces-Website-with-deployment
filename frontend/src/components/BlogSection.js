import React from 'react';
import blog1 from '../assets/images/blog-img.png';
import blog2 from '../assets/images/blog-img(1).png';
import blog3 from '../assets/images/blog-img(2).png';
import blog4 from '../assets/images/blog-img(3).png';
import './BlogSection.css';

const posts = [
  { id: 1, img: blog1, cat: 'Fashion',     title: 'Clothes Retail KPIs 2021 Guide for Clothes Executives.',  author: 'Mr Admin', date: 'June 18, 2024' },
  { id: 2, img: blog2, cat: 'Shoes',       title: 'EBT vendor: Claim Your Share of SNAP Online Revenue.',    author: 'Mr John',  date: 'June 18, 2024' },
  { id: 3, img: blog3, cat: 'Electronics', title: 'Curbside fashion Trends: How to Win the Pickup Battle.',  author: 'Mr Pawar', date: 'June 18, 2024' },
  { id: 4, img: blog4, cat: 'Clothes',     title: 'Curbside fashion Trends: How to Win the Pickup Battle.',  author: 'Mr Wick',  date: 'June 18, 2024' },
];

export default function BlogSection() {
  return (
    <section className="blog-section">
      <div className="blog-grid">
        {posts.map((p) => (
          <div className="blog-card" key={p.id}>
            <div className="blog-img-wrap">
              <img src={p.img} alt={p.title} className="blog-img" />
            </div>
            <div className="blog-info">
              <p className="blog-cat">{p.cat}</p>
              <h3 className="blog-title">{p.title}</h3>
              <p className="blog-meta">By {p.author} / {p.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
