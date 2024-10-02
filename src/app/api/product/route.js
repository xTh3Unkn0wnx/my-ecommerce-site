// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     // Handle GET request to fetch all products
//     try {
//       const products = await prisma.product.findMany();
//       res.status(200).json(products);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       res.status(500).json({ error: 'Error fetching products' });
//     }
//   } else if (req.method === 'POST') {
//     // Handle POST request to create a new product
//     const { name, description, price, imageUrl } = req.body;

//     try {
//       const product = await prisma.product.create({
//         data: { name, description, price, imageUrl },
//       });
//       res.status(201).json(product);
//     } catch (error) {
//       console.error('Error creating product:', error);
//       res.status(500).json({ error: 'Failed to create product' });
//     }
//   } else {
//     // Handle any other HTTP methods
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json(); // In App Directory, you need to use req.json() to parse the body
    const { name, description, price, imageUrl } = body;

    const product = await prisma.product.create({
      data: { name, description, price, imageUrl },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({
    message: 'Method not allowed. Allowed methods: GET, POST',
  }, {
    status: 405,
    headers: {
      Allow: 'GET, POST',
    },
  });
}
