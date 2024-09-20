import React from 'react';
import list from './data';
import './Subscriptions.css'; // Ensure this path is correct

function Subscriptions({ addToCart, cartItems, removeItem }) {
    const [error, setError] = React.useState('');

    const handleAdd = (item) => {
        if (cartItems.length > 0) {
            setError('You can only have one subscription at a time. Please remove the current one before adding a new subscription.');
            return;
        }

        addToCart(item);
        setError('');
    };

    const handleRemove = (item) => {
        removeItem(item.id); // Call the removeItem function to remove the item
    };

    return (
        <div>
            <h2>Subscriptions Page</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="subscription-container">
                {list.map((item) => {
                    const isInCart = cartItems.find(cartItem => cartItem.id === item.id);
                    return (
                        <div key={item.id} className="subscription-item">
                            <img src={item.img} alt={item.service} />
                            <h3>{item.service}</h3>
                            <p>{item.serviceInfo}</p>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            {isInCart ? (
                                <button onClick={() => handleRemove(item)}>Remove from Cart</button>
                            ) : (
                                <button
                                    onClick={() => handleAdd(item)}
                                    disabled={!!isInCart}
                                >
                                    Add
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Subscriptions;