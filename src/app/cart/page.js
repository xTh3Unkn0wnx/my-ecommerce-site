'use client';

import { useState } from 'react';

export default function CartPage() {
  const [cart, setCart] = useState([
    // Sample product data for now, replace this with actual cart items
    { id: 1, name: 'Sample Product 1', price: 49.99 },
    { id: 2, name: 'Sample Product 2', price: 79.99 },
  ]);

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-4"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-lg">${item.price}</p>
              </div>
              <button
                onClick={() => removeItem(index)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
