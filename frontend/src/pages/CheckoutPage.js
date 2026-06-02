import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { cartTotal, clearCart, setPage } = useCart();

  const [form, setForm] = useState({
    email: '', country: '', firstName: '', lastName: '',
    address: '', city: '', postal: '', saveDelivery: false,
    cardNumber: '', expiry: '', cvv: '', cardName: '', savePayment: false,
  });

  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  function handlePay(e) {
    e.preventDefault();
    setSuccess(true);
    clearCart();
  }

  function handleSuccessClose() {
    setSuccess(false);
    setPage('home');
  }

  const shipping = cartTotal >= 55 ? 0 : 5.99;
  const total    = cartTotal + shipping;

  return (
    <div className="checkout-page">
      <div className="checkout-breadcrumb">
        <span className="checkout-bc-link" onClick={() => setPage('home')}>Home</span>
        <span className="checkout-bc-sep">›</span>
        <span className="checkout-bc-link" onClick={() => setPage('cart')}>Shopping Cart</span>
        <span className="checkout-bc-sep">›</span>
        <span>Checkout</span>
      </div>

      <form className="checkout-form" onSubmit={handlePay}>

        {/* ── Contact ── */}
        <div className="checkout-section">
          <div className="checkout-section-header">
            <h2 className="checkout-section-title">Contact</h2>
            <p className="checkout-have-account">
              Have an account? <a href="#!" className="checkout-create-link">Create Account</a>
            </p>
          </div>
          <input
            className="checkout-input full"
            type="email" name="email" placeholder="Email Address"
            value={form.email} onChange={handleChange} required
          />
        </div>

        <div className="checkout-two-col">
          {/* ── Delivery ── */}
          <div className="checkout-section">
            <h2 className="checkout-section-title">Delivery</h2>

            <select className="checkout-input full" name="country" value={form.country} onChange={handleChange} required>
              <option value="">Country / Region</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="IN">India</option>
              <option value="CA">Canada</option>
            </select>

            <div className="checkout-row">
              <input className="checkout-input" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
              <input className="checkout-input" name="lastName"  placeholder="Last Name"  value={form.lastName}  onChange={handleChange} required />
            </div>

            <input className="checkout-input full" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />

            <div className="checkout-row">
              <input className="checkout-input" name="city"   placeholder="City"          value={form.city}   onChange={handleChange} required />
              <input className="checkout-input" name="postal" placeholder="Postal Code"   value={form.postal} onChange={handleChange} required />
            </div>

            <label className="checkout-checkbox">
              <input type="checkbox" name="saveDelivery" checked={form.saveDelivery} onChange={handleChange} />
              <span>Save This Info For Future</span>
            </label>
          </div>

          {/* ── Payment ── */}
          <div className="checkout-section">
            <h2 className="checkout-section-title">Payment</h2>

            <div className="checkout-card-type">
              <span>Credit Card</span>
              <div className="checkout-card-icons">
                <span className="checkout-card-badge">VISA</span>
                <span className="checkout-card-badge">MC</span>
              </div>
            </div>

            <div className="checkout-input-icon-wrap">
              <input className="checkout-input full" name="cardNumber" placeholder="Card Number"
                value={form.cardNumber} onChange={handleChange} required maxLength={19} />
              <span className="checkout-lock-icon">🔒</span>
            </div>

            <div className="checkout-row">
              <input className="checkout-input" name="expiry" placeholder="Expiration Date"
                value={form.expiry} onChange={handleChange} required />
              <input className="checkout-input" name="cvv" placeholder="Security Code"
                value={form.cvv} onChange={handleChange} required maxLength={4} />
            </div>

            <input className="checkout-input full" name="cardName" placeholder="Card Holder Name"
              value={form.cardName} onChange={handleChange} required />

            <label className="checkout-checkbox">
              <input type="checkbox" name="savePayment" checked={form.savePayment} onChange={handleChange} />
              <span>Save This Info For Future</span>
            </label>
          </div>
        </div>

        {/* ── Pay Now ── */}
        <button type="submit" className="checkout-pay-btn">
          Pay Now — ${total.toFixed(2)}
        </button>

      </form>

      {/* ── Success Popup ── */}
      {success && (
        <div className="checkout-success-overlay" onClick={handleSuccessClose}>
          <div className="checkout-success-modal" onClick={e => e.stopPropagation()}>
            <div className="checkout-success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <h3 className="checkout-success-title">Thanks so much for your payment! 😊</h3>
            <p className="checkout-success-text">
              Your order has been confirmed and we're getting everything ready for you.
              We'll notify you once it's on the way!
            </p>
            <button className="checkout-success-btn" onClick={handleSuccessClose}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
