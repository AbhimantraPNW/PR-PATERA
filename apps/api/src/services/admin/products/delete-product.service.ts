import prisma from '@/prisma';
import fs from 'fs';
import { join } from 'path';

const defaultDir = '../../../../public/images/';

export const deleteProductService = async (productId: number) => {
  try {
    const product = await prisma.product.findFirst({
      where: { id: productId },
      include: { images: true },
    });

    if (!product) {
      throw new Error('Product id not found');
    }

    const images = product.images;

    await prisma.image.deleteMany({
      where: { productId },
    });

    images.forEach((image) => {
      const imagePath = join(__dirname, defaultDir + image.url.replace('/images/', ''));

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    const deleteProduct = await prisma.product.delete({
      where: { id: productId },
    });

    return deleteProduct;
  } catch (error) {
    throw error;
  }
};
