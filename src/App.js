import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import Subscriptions from './components/Subscriptions';
import './App.css';

function App() {
    const [cartItems, setCartItems] = useState(() => {
        // Load initial cartItems from localStorage if available
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cartItems to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (subscription) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === subscription.id);
            if (!existingItem) {
                return [...prevItems, subscription];
            } else {
                return prevItems;
            }
        });
    };

    const removeItem = (itemId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    };

    const clearSelections = () => {
        setCartItems([]);
    };

    return (
        <Router>
            <div className="App">
                <Navbar cartItems={cartItems} />
                <Routes>
                    <Route path="/" element={<StreamList />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route
                        path="/cart"
                        element={
                            <Cart
                                cartItems={cartItems}
                                removeItem={removeItem}
                                clearSelections={clearSelections}
                            />
                        }
                    />
                    <Route
                        path="/subscriptions"
                        element={
                            <Subscriptions
                                addToCart={addToCart}
                                clearSelections={clearSelections}
                                cartItems={cartItems}
                                removeItem={removeItem}
                            />
                        }
                    />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
