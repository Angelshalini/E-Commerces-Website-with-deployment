// ── Shared product data used across the app ──

// Real product photos
import d1 from '../assets/images/d1.jpg';
import d2 from '../assets/images/d2.jpg';
import d3 from '../assets/images/d3.jpg';

import jacketImg   from '../assets/images/jacket.png';
import shirtImg    from '../assets/images/shirt.png';
import menYarn     from '../assets/images/men yarn.png';
import menWinter   from "../assets/images/men's winter.png";
import casualImg   from '../assets/images/casual.png';
import watchesImg  from '../assets/images/watches.png';
import smartWatch  from '../assets/images/smartwatch.png';
import womensParty from "../assets/images/women's party.png";
import trekkingImg from '../assets/images/trekking.png';
import sportsImg   from '../assets/images/sports.png';
import betterBasic from '../assets/images/better basic.png';
import runningImg  from '../assets/images/running.png';
import platinumImg from '../assets/images/platinam.png';
import shampooImg  from '../assets/images/shampoo.png';
import roseGold    from '../assets/images/rose gold.png';
import i1 from '../assets/images/i1.png';
import i2 from '../assets/images/i2.png';
import i3 from '../assets/images/i3.png';
import ruffleShirtImg from '../assets/images/ruffle shirt.png';
import supplyImg      from '../assets/images/supply.png';
import herselfImg     from '../assets/images/her.png';
import womenImg       from "../assets/images/women .png";
import yourselfImg    from '../assets/images/yourself.png';
import himselfImg     from '../assets/images/hime.png';
import menImg         from '../assets/images/men.jpg';
import childImg    from '../assets/images/child.jpg';

// Property images (Figma product photos)
import p0  from '../assets/images/Property 1=Default.png';
import p1  from '../assets/images/Property 1=Default(1).png';
import p2  from '../assets/images/Property 1=Default(2).png';
import p3  from '../assets/images/Property 1=Default(3).png';
import p4  from '../assets/images/Property 1=Default(4).png';
import p5  from '../assets/images/Property 1=Default(5).png';
import p6  from '../assets/images/Property 1=Default(6).png';
import p7  from '../assets/images/Property 1=Default(7).png';
import p8  from '../assets/images/Property 1=Default(8).png';
import p9  from '../assets/images/Property 1=Default(9).png';
import p10 from '../assets/images/Property 1=Default(10).png';
import p11 from '../assets/images/Property 1=Default(11).png';
import p12 from '../assets/images/Property 1=Default(12).png';
import p13 from '../assets/images/Property 1=Default(13).png';
import pImg2 from '../assets/images/Property 1=img2.png';

const desc = 'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.';

// ── Women's products — all unique images, no boys/men ──
export const womenProducts = [
  { id: 'w1',  img: ruffleShirtImg, images: [ruffleShirtImg, p1,  p2],        name: 'Esprit Ruffle Shirt',     cat: 'Women', price: '16.64', old: '25.00',  stars: 4, badge: 'SALE', desc },
  { id: 'w2',  img: supplyImg,      images: [supplyImg,      p2,  p6],        name: 'Herschel Supply',         cat: 'Women', price: '35.31', old: '50.00',  stars: 5, badge: null,   desc },
  { id: 'w3',  img: p8,             images: [p8,  p6,  p13],                  name: 'Classic Trench Coat',     cat: 'Women', price: '75.00', old: '95.00',  stars: 5, badge: null,   desc },
  { id: 'w4',  img: p10,            images: [p10, p8,  p6],                   name: 'Front Pocket Jumper',     cat: 'Women', price: '34.75', old: '45.00',  stars: 3, badge: 'NEW',  desc },
  { id: 'w5',  img: p1,             images: [p1,  p2,  p6],                   name: 'Only Check Trouse',       cat: 'Women', price: '25.50', old: '35.00',  stars: 4, badge: null,   desc },
  { id: 'w6',  img: p6,             images: [p6,  p1,  p8],                   name: 'Pieces Metallic Printed', cat: 'Women', price: '18.96', old: '28.00',  stars: 4, badge: 'SALE', desc },
  { id: 'w7',  img: p2,             images: [p2,  p1,  p6],                   name: 'Shirt In Stretch Cotton', cat: 'Women', price: '52.66', old: '65.00',  stars: 4, badge: null,   desc },
  { id: 'w8',  img: p13,            images: [p13, p6,  p1],                   name: "Women's Hat",             cat: 'Women', price: '29.64', old: '40.00',  stars: 5, badge: 'NEW',  desc },
  { id: 'w9',  img: pImg2,          images: [pImg2, p1, p2],                  name: 'T-Shirt with Sleeve',     cat: 'Women', price: '18.49', old: '25.00',  stars: 3, badge: null,   desc },
  { id: 'w10', img: herselfImg,     images: [herselfImg, p1, p2],             name: 'Floral Wrap Midi Skirt',  cat: 'Women', price: '22.00', old: '32.00',  stars: 4, badge: 'SALE', desc },
  { id: 'w11', img: yourselfImg,    images: [yourselfImg, p6, p8],            name: 'Floral Print Blouse',     cat: 'Women', price: '28.00', old: '38.00',  stars: 4, badge: null,   desc },
  { id: 'w12', img: womenImg,       images: [womenImg, p1, p2],               name: 'Linen Blend Blazer',      cat: 'Women', price: '68.00', old: '85.00',  stars: 5, badge: 'NEW',  desc },
  { id: 'w13', img: womensParty,    images: [womensParty, p6, p13],           name: "Women's Party Wear",      cat: 'Women', price: '58.00', old: '64.00',  stars: 4, badge: null,   desc },
  { id: 'w14', img: i1,             images: [i1,  i2,  i3],                   name: 'Shiny Dress',             cat: 'Women', price: '95.50', old: '120.00', stars: 5, badge: 'NEW',  desc },
  { id: 'w15', img: i2,             images: [i2,  i1,  i3],                   name: 'Long Dress',              cat: 'Women', price: '95.50', old: '110.00', stars: 5, badge: null,   desc },
  { id: 'w16', img: i3,             images: [i3,  i1,  i2],                   name: 'Full Sweater',            cat: 'Women', price: '95.50', old: '115.00', stars: 5, badge: 'SALE', desc },
];

// ── Men's products — all unique men images ──
export const menProducts = [
  { id: 'm1', img: p0,         images: [p0,  p7,  p9],              name: 'Only Check Trouse',         cat: 'Men', price: '25.50', old: '35.00', stars: 4, badge: null,   desc },
  { id: 'm2', img: p4,         images: [p4,  p0,  p7],              name: 'Herschel Supply',           cat: 'Men', price: '63.16', old: '80.00', stars: 5, badge: null,   desc },
  { id: 'm3', img: p7,         images: [p7,  p4,  p9],              name: 'Esprit Ruffle Shirt',       cat: 'Men', price: '25.85', old: '38.00', stars: 4, badge: null,   desc },
  { id: 'm4', img: p9,         images: [p9,  p7,  p0],              name: "Men's Jeans",               cat: 'Men', price: '63.15', old: '80.00', stars: 4, badge: null,   desc },
  { id: 'm5', img: himselfImg, images: [himselfImg, p0, p4],        name: "Men's Hat",                 cat: 'Men', price: '54.79', old: '70.00', stars: 3, badge: null,   desc },
  { id: 'm6', img: menImg,     images: [menImg, p7, p9],            name: "Men's Winter Jacket",       cat: 'Men', price: '48.00', old: '75.00', stars: 3, badge: '15%',  desc },
  { id: 'm7', img: jacketImg,  images: [jacketImg, menYarn, p0],    name: "Men's Leather Jacket",      cat: 'Men', price: '58.00', old: '85.00', stars: 3, badge: null,   desc },
  { id: 'm8', img: menYarn,    images: [menYarn, jacketImg, p4],    name: 'MEN Yarn Fleece Jacket',    cat: 'Men', price: '58.00', old: '75.00', stars: 3, badge: 'SALE', desc },
];

// ── Children's products ──
export const childrenProducts = [
  { id: 'c1', img: childImg,   images: [childImg, d1, d2],    name: "Children's Dress",    cat: 'Children', price: '75.00', old: '90.00',  stars: 4, badge: null,   desc },
  { id: 'c2', img: d1,         images: [d1, childImg, d2],    name: "Esprit Ruffle Shirt", cat: 'Children', price: '93.20', old: '110.00', stars: 3, badge: 'SALE', desc },
  { id: 'c3', img: d2,         images: [d2, d1, childImg],    name: "Children's Shorts",   cat: 'Children', price: '86.85', old: '100.00', stars: 5, badge: 'NEW',  desc },
  { id: 'c4', img: d3,         images: [d3, d1, d2],          name: "Kids Casual Set",     cat: 'Children', price: '45.00', old: '60.00',  stars: 4, badge: null,   desc },
];

// ── All products combined (Women + Men + Children) ──
export const allProducts = [
  ...womenProducts,
  ...menProducts,
  ...childrenProducts,
];

// ── Home page new arrivals ──
export const homeNewArrivals = [
  { id: 'na1', img: i1, images: [i1, i2, i3], name: 'Shiny Dress',  cat: 'Women', price: '95.50', old: '120.00', stars: 5, desc: 'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula.' },
  { id: 'na2', img: i2, images: [i2, i1, i3], name: 'Long Dress',   cat: 'Women', price: '95.50', old: '110.00', stars: 5, desc: 'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula.' },
  { id: 'na3', img: i3, images: [i3, i1, i2], name: 'Full Sweater', cat: 'Women', price: '95.50', old: '115.00', stars: 5, desc: 'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula.' },
  { id: 'na4', img: i1, images: [i1, i2, i3], name: 'Shiny Dress',  cat: 'Women', price: '95.50', old: '120.00', stars: 5, desc: 'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula.' },
  { id: 'na5', img: i2, images: [i2, i1, i3], name: 'Long Dress',   cat: 'Women', price: '95.50', old: '110.00', stars: 5, desc: 'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula.' },
  { id: 'na6', img: i3, images: [i3, i1, i2], name: 'Full Sweater', cat: 'Women', price: '95.50', old: '115.00', stars: 5, desc: 'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula.' },
];
