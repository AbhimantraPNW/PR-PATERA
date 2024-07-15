// Import Prisma client instance
import prisma from '@/prisma';
import fs from 'fs';
import { join } from 'path';

const defaultDir = '../../../../public/images/';

export const deleteImageService = async (id: number) => {
  try {
    const image = await prisma.image.findUnique({
      where: { id },
      include: { product: { include: { images: true } } },
    });

    if (!image) {
      throw new Error('Image not found');
    }

    await prisma.image.delete({
      where: { id },
    });

    if (image.product) {
      const updatedImages = image.product.images.filter((img) => img.id !== id);

      const imagePath = join(
            __dirname,
            defaultDir,
            image.url.replace('/images/', ''),
          );
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }

      await prisma.product.update({
        where: { id: image.product.id },
        data: {
          images: {
            set: updatedImages,
          },
        },
      });
    }
  } catch (error) {
    throw error;
  }
};
