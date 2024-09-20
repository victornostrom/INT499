import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ cartItems }) {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    const itemCount = cartItems.length;

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/movies">Movies</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/subscriptions">Subscriptions</Link></li>
                <li className="cart">
                    <Link to="/cart">
                        <img
                            src="https://img.icons8.com/material-outlined/24/000000/shopping-cart.png"
                            alt="Cart"
                        />
                        {itemCount > 0 && (
                            <span className="cart-total">({itemCount}) ${totalPrice.toFixed(2)}</span>
                        )}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
