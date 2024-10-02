'use client';
import ProductTable from '@components/admin/ProductTable'; // Fixed import
import UserTable from '@components/admin/UserTable';

import { useState } from 'react';

export default function AdminPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [refresh, setRefresh] = useState(false); // Trigger refresh for product list

  const addProduct = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price, imageUrl }),
    });

    if (response.ok) {
      alert('Product added successfully!');
      setName(''); // Clear the form after submission
      setDescription('');
      setPrice(0);
      setImageUrl('');
      setRefresh(!refresh); // Trigger product table refresh
    } else {
      alert('Failed to add product.');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Add a New Product</h1>
      <form onSubmit={addProduct} className="space-y-4 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-black px-4 py-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-black px-4 py-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="w-full text-black px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full text-black px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>

      {/* Pass refresh state to ProductTable to trigger re-fetch */}
      <ProductTable key={refresh} />
      <UserTable />
    </div>
  );
}
