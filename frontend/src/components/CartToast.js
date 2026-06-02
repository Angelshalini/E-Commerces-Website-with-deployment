import React, { useEffect } from 'react';
import './CartToast.css';

export default function CartToast({ product, onClose, onViewCart }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="cart-toast">
      <div className="cart-toast-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      </div>
      <div className="cart-toast-body">
        <p className="cart-toast-name"><strong>{product.name}</strong></p>
        <p className="cart-toast-msg">is added to cart!</p>
      </div>
      <div className="cart-toast-actions">
        <button className="cart-toast-ok" onClick={onViewCart}>OK</button>
      </div>
    </div>
  );
}
