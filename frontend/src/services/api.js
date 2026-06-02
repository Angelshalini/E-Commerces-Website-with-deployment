import axios from 'axios';

export const API_BASE = 'http://127.0.0.1:8000/api';

const api = axios.create({ baseURL: API_BASE });

// ── Store endpoints ──────────────────────────────────────────────
export const getHeroSlides    = ()       => api.get('/hero-slides/');
export const getCategories    = ()       => api.get('/categories/');
export const getBrands        = ()       => api.get('/brands/');
export const getBanners       = ()       => api.get('/banners/');
export const getBrandNewItems = ()       => api.get('/brand-new/');
export const getDealOfDay     = ()       => api.get('/deal-of-day/');
export const getProducts      = (params) => api.get('/products/', { params });

// Fashion / pages
export const getFashionProducts  = (params) => api.get('/fashion/',        { params });
export const getJewelleryProducts= (params) => api.get('/jewellery/',      { params });
export const getGiftCategories   = ()       => api.get('/gift-categories/');
export const getSpecialGifts     = ()       => api.get('/special-gifts/');
export const getPerfumeProducts  = (params) => api.get('/perfume/',        { params });

// Home sections
export const getBlogPosts       = ()       => api.get('/blog/');
export const getDealsOfMonth    = ()       => api.get('/deals-month/');
export const getInstagramPhotos = ()       => api.get('/instagram/');
export const getTestimonials    = ()       => api.get('/testimonials/');
export const getProductList     = (params) => api.get('/product-list/',    { params });

// Helper — get banner by type from a banners array
export const getBannerByType = (banners, type) =>
  banners.find(b => b.banner_type === type) || null;

// Helper — build full image URL
export const imgUrl = (path) =>
  path ? (path.startsWith('http') ? path : `http://127.0.0.1:8000/media/${path}`) : null;

// ── Newsletter endpoints ─────────────────────────────────────────
export const subscribeNewsletter = (email) => api.post('/subscribe/', { email });
export const getPopupBanner      = ()       => api.get('/popup/');
