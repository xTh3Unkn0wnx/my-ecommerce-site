import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ProductPage({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        <img
          src={product.imageUrl || '/placeholder.png'}
          alt={product.name}
          className="w-full md:w-1/2 h-auto rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
