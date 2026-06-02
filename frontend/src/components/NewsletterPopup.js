import React, { useState, useEffect } from 'react';
import axios from 'axios';
import popupImage from '../assets/images/popup image.png';
import './NewsletterPopup.css';

const API_BASE = 'http://127.0.0.1:8000/api';

function NewsletterPopup({ onClose }) {
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [bannerData, setBannerData] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/popup/`)
      .then((res) => setBannerData(res.data))
      .catch(() => setBannerData(null));

    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { setVisible(false); setTimeout(onClose, 300); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleClose = () => { setVisible(false); setTimeout(onClose, 300); };
  const handleOverlayClick = (e) => { if (e.target === e.currentTarget) handleClose(); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setMessage({ text: 'Please enter your email address.', type: 'error' }); return; }
    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      await axios.post(`${API_BASE}/subscribe/`, { email: email.trim() });
      setMessage({ text: 'Successfully subscribed! Thank you.', type: 'success' });
      setEmail('');
      setTimeout(handleClose, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.errors?.email?.[0] || err.response?.data?.message || 'Something went wrong.';
      setMessage({ text: errorMsg, type: 'error' });
    } finally { setLoading(false); }
  };

  const title    = bannerData?.title    || 'Subscribe Newsletter';
  const imageUrl = bannerData?.image_url || popupImage;

  return (
    <div
      className={`popup-overlay ${visible ? 'visible' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div className={`popup-modal ${visible ? 'visible' : ''}`}>

        {/* ✕ Close */}
        <button className="popup-close" onClick={handleClose} aria-label="Close">✕</button>

        {/* LEFT — image */}
        <div className="popup-left">
          <img src={imageUrl} alt="Newsletter promotion" className="popup-img" />
        </div>

        {/* RIGHT — white content panel */}
        <div className="popup-right">
          <h2 id="popup-title" className="popup-title">{title}</h2>
          <p className="popup-subtitle">
            Subscribe the <strong>TheMart</strong> to get latest products and discount update.
          </p>

          <form onSubmit={handleSubmit} className="popup-form" noValidate>
            <input
              type="email"
              className="popup-input"
              placeholder="Enter your product name......."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              aria-label="Email address"
              autoComplete="email"
            />
            {message.text && (
              <p className={`popup-message ${message.type}`} role="alert">{message.text}</p>
            )}
            <button type="submit" className="popup-subscribe-btn" disabled={loading}>
              {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default NewsletterPopup;
