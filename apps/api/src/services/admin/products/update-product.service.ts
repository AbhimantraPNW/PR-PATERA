import prisma from '@/prisma';
import { Product } from '@prisma/client';
import fs from 'fs';
import { join } from 'path';

const defaultDir = '../../../../public/images/';

export const updateProductService = async (
  id: number,
  body: Partial<Product>,
  files: Express.Multer.File[],
  existingImages: number[] = [],
) => {
  try {
    const { type, name, stock, price, diameter, tinggi } = body;

    const product = await prisma.product.findFirst({
      where: { id },
      include: { images: true },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    if (type && name) {
      const productTypeName = await prisma.product.findFirst({
        where: {
          type: { equals: type },
          name: { equals: name },
        },
      });

      if (productTypeName) {
        throw new Error('Product type and name combination already in use');
      }
    }
    
    const imagesToDelete = product.images.filter(
      (img) => !existingImages.includes(img.id),
    );
    console.log('Images to Delete:', imagesToDelete);

    for (const image of imagesToDelete) {
          // await prisma.image.delete({
          //   where: { id: image.id },
          // });
          // const imagePath = join(
          //   __dirname,
          //   defaultDir,
          //   image.url.replace('/images/', ''),
          // );
          // if (fs.existsSync(imagePath)) {
          //   fs.unlinkSync(imagePath);
          // }
      } 

    const newImages = files.map((file) => ({
      url: `/images/${file.filename}`,
    }));

     await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        stock: Number(stock),
        price: Number(price),
        diameter: Number(diameter),
        tinggi: Number(tinggi),
        images: {
          create : newImages,
        },
      },
    });
  } catch (error) {
    if (files && files.length > 0) {
      for (const file of files) {
        const imagePath = join(__dirname, defaultDir, file.filename);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    }
    throw error;
  }
};
