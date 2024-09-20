import React from 'react';
import './Cart.css';

function Cart({ cartItems = [], removeItem }) {
    const handleRemove = (itemId) => {
        if (removeItem) removeItem(itemId);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const handleCheckout = () => {
        // Handle the checkout process
        alert("Proceeding to checkout...");
    };

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.img} alt={item.service} className="cart-item-img" />
                            <div className="cart-item-details">
                                <h3>{item.service}</h3>
                                <p>{item.serviceInfo}</p>
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <button onClick={() => handleRemove(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="total">
                <strong>Total: ${calculateTotal().toFixed(2)}</strong>
            </div>
            <div className="checkout-container">
                <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
}

export default Cart;
