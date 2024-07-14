import prisma from '@/prisma';
import { Product } from '@prisma/client';

const defaultDir = "../../../public/images/"

interface CreateProductBody
  extends Omit<
    Product,
    'deletedAt' | 'updatedAt' | 'createdAt' | 'thumbnail'
  > {}

export const createProductService = async (
  body: CreateProductBody,
  files: Express.Multer.File[],
) => {
  try {
    const { type, name, status, stock, size, price, diameter, tinggi, userId } =
      body;

    const existingProduct = await prisma.product.findFirst({
      where: { type, name, size },
    });

    if (existingProduct) {
      throw new Error('Product sudah ada di katalog');
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(userId) },
    });

    if (!user) {
      throw new Error('User tidak ditemukan');
    } 

    const createProduct = await prisma.product.create({
      data: {
        type: body.type,
        name: body.name,
        status: body.status,
        size: body.size,
        stock: Number(stock),
        price: Number(price),
        diameter: Number(diameter),
        tinggi: Number(tinggi),
        userId: Number(userId),
        images: {
          create: files.map((file) => ({
            url: `/images/${file.filename}`,
          })),
        },
      },
      include: {
        images: true,
      },
    });  

    const createProductWithImages = await prisma.product.findUnique({
      where: { id: createProduct.id },
      include: { images: true },
    });

    return {
      product: createProductWithImages,
    };
  } catch (error) {
    throw error;
  }
};
