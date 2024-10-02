import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function HomePage() {
  const products = await prisma.product.findMany();

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-3xl font-bold mb-8 text-center'>All Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {products.map((product) => (
          <div
            key={product.id}
            className='border p-6 rounded-lg shadow-lg'
          >
            <h2 className='text-xl font-semibold mb-4'>{product.name}</h2>
            <p className='mb-2'>{product.description}</p>
            <p className='font-bold mb-4'>${product.price}</p>
            <Link
              href={`/product/${product.id}`}
              className='text-blue-500 hover:underline'
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
