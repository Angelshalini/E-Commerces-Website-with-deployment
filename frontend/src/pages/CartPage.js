import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, cartTotal, setPage } = useCart();
  const [coupon, setCoupon] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState]   = useState('');
  const [zip, setZip]       = useState('');

  const shipping = cartTotal >= 55 ? 0 : 5.99;
  const total    = cartTotal + shipping;

  return (
    <div className="cart-page">
      <div className="cart-breadcrumb">
        <span className="cart-bc-link" onClick={() => setPage('home')}>Home</span>
        <span className="cart-bc-sep">›</span>
        <span>Shopping Cart</span>
      </div>

      <div className="cart-layout">
        {/* ── Left: Items table ── */}
        <div className="cart-left">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
              <button className="cart-continue-btn" onClick={() => setPage('home')}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td className="cart-product-cell">
                        <button className="cart-remove" onClick={() => removeFromCart(item.id)}>×</button>
                        <img src={item.img} alt={item.name} className="cart-item-img" />
                        <span className="cart-item-name">{item.name}</span>
                      </td>
                      <td className="cart-price">$ {parseFloat(item.price).toFixed(2)}</td>
                      <td className="cart-qty-cell">
                        <div className="cart-qty">
                          <button onClick={() => updateQty(item.id, -1)}>-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, +1)}>+</button>
                        </div>
                      </td>
                      <td className="cart-total-cell">
                        $ {(parseFloat(item.price) * item.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Coupon row */}
              <div className="cart-coupon-row">
                <input
                  className="cart-coupon-input"
                  placeholder="Coupon Code"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                />
                <button className="cart-coupon-btn">APPLY COUPON</button>
                <button className="cart-update-btn">UPDATE CART</button>
              </div>
            </>
          )}
        </div>

        {/* ── Right: Totals ── */}
        {cartItems.length > 0 && (
          <div className="cart-right">
            <h3 className="cart-totals-title">CART TOTALS</h3>

            <div className="cart-totals-row">
              <span>Subtotal:</span>
              <span className="cart-totals-val">${cartTotal.toFixed(2)}</span>
            </div>

            <div className="cart-totals-row cart-shipping-row">
              <span>Shipping:</span>
              <div className="cart-shipping-info">
                {shipping === 0
                  ? <span className="cart-free-ship">Free Shipping</span>
                  : <span className="cart-ship-note">There are no shipping methods available. Please double check your address, or contact us if you need any help.</span>
                }
                <div className="cart-calc-ship">
                  <p className="cart-calc-title">CALCULATE SHIPPING</p>
                  <select className="cart-ship-select" value={country} onChange={e => setCountry(e.target.value)}>
                    <option value="">Select a country...</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="IN">India</option>
                    <option value="CA">Canada</option>
                  </select>
                  <input className="cart-ship-input" placeholder="State / country" value={state} onChange={e => setState(e.target.value)} />
                  <input className="cart-ship-input" placeholder="Postcode / Zip" value={zip} onChange={e => setZip(e.target.value)} />
                  <button className="cart-update-totals-btn">UPDATE TOTALS</button>
                </div>
              </div>
            </div>

            <div className="cart-totals-row cart-total-final">
              <span>Total:</span>
              <span className="cart-totals-val">${total.toFixed(2)}</span>
            </div>

            <button className="cart-checkout-btn" onClick={() => setPage('checkout')}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
