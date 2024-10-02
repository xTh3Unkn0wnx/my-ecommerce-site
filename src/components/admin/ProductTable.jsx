'use client';

import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json(); // Directly parse as JSON
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading once the data is fetched or failed
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Show loading message
  }

  if (error) {
    return <p className='text-center text-red-500'>Error: {error}</p>;
  }

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        Admin Product List
      </h1>
      {products.length > 0 ? (
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='text-black py-2 px-4'>Name</th>
              <th className='text-black py-2 px-4'>Description</th>
              <th className='text-black py-2 px-4'>Price</th>
              <th className='text-black py-2 px-4'>Image URL</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className='border-b'
              >
                <td className='text-black py-2 px-4'>{product.name}</td>
                <td className='text-black py-2 px-4'>{product.description}</td>
                <td className='text-black py-2 px-4'>${product.price}</td>
                <td className='text-black py-2 px-4'>
                  <a
                    href={product.imageUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    View Image
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center'>No products found.</p>
      )}
    </div>
  );
}
