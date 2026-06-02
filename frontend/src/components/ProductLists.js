import React from 'react';
import menYarn     from '../assets/images/men yarn.png';
import menWinter   from '../assets/images/men\'s winter.png';
import jacketImg   from '../assets/images/jacket.png';
import betterBasic from '../assets/images/better basic.png';
import runningImg  from '../assets/images/running.png';
import trekkingImg from '../assets/images/trekking.png';
import womensParty from '../assets/images/women\'s party.png';
import sportsImg   from '../assets/images/sports.png';
import platinumImg from '../assets/images/platinam.png';
import smartWatch  from '../assets/images/smartwatch.png';
import shampooImg  from '../assets/images/shampoo.png';
import roseGold    from '../assets/images/rose gold.png';
import './ProductLists.css';

const newArrivals = [
  { id: 1, img: menYarn,     name: 'MEN Yarn Fleece F...', cat: 'Winter Wear', price: '61.00', old: '61.00' },
  { id: 2, img: menWinter,   name: "Men's Winter Leat...",  cat: 'Winter Wear', price: '32.00', old: '29.00' },
  { id: 3, img: jacketImg,   name: "Men's Winter Leat...",  cat: 'Jackets',     price: '50.00', old: '25.00' },
  { id: 4, img: betterBasic, name: 'Better Basics Fren...', cat: 'Shorts',      price: '20.00', old: '13.00' },
];

const trendings = [
  { id: 1, img: runningImg,  name: 'Running & Trekki...', cat: 'Sports',     price: '49.00', old: '25.00' },
  { id: 2, img: trekkingImg, name: 'Trekking & Runni...', cat: 'Sports',     price: '78.00', old: '38.00' },
  { id: 3, img: womensParty, name: "Women's Party W...",  cat: 'Party Wear', price: '94.00', old: '95.00' },
  { id: 4, img: sportsImg,   name: 'Sports Claw Wom...',  cat: 'Sports',     price: '54.00', old: '85.00' },
];

const topRated = [
  { id: 1, img: platinumImg, name: 'Platinum Zircon Cl...', cat: 'Jewellery', price: '62.00', old: '85.00' },
  { id: 2, img: smartWatch,  name: 'Smart Watch Viol...',   cat: 'Watches',   price: '58.00', old: '70.00' },
  { id: 3, img: shampooImg,  name: 'Shampoo Condit...',     cat: 'Cosmetics', price: '20.00', old: '30.00' },
  { id: 4, img: roseGold,    name: 'Rose Gold Peacoc...',   cat: 'Jewellery', price: '25.00', old: '30.00' },
];

function ProductItem({ item }) {
  return (
    <div className="pl-item">
      <div className="pl-img-wrap">
        <img src={item.img} alt={item.name} className="pl-img" />
      </div>
      <div className="pl-info">
        <p className="pl-name">{item.name}</p>
        <p className="pl-cat">{item.cat}</p>
        <div className="pl-price-row">
          <span className="pl-price">${item.price}</span>
          <span className="pl-old">${item.old}</span>
        </div>
      </div>
    </div>
  );
}

function ProductColumn({ title, items }) {
  return (
    <div className="pl-column">
      <h3 className="pl-col-title">{title}</h3>
      <div className="pl-list">
        {items.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function ProductLists() {
  return (
    <section className="pl-section">
      <ProductColumn title="New Arrivals" items={newArrivals} />
      <ProductColumn title="Trendings"    items={trendings}   />
      <ProductColumn title="Top Rated"    items={topRated}    />
    </section>
  );
}
