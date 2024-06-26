import prisma from '@/prisma';
import { Custom } from '@prisma/client';

interface CustomProductBody extends Omit<Custom, 'id' | 'createAt'> {}

export const customProductService = async (body: CustomProductBody) => {
  try {
    const { name, quantity, size, handle } = body;

    if (quantity < 12) {
      throw new Error('minimal custom order adalah 12 pcs');
    }

    return await prisma.custom.create({
      data: {
        name,
        size,
        quantity: Number(quantity),
        handle,
      },
    });
  } catch (error) {
    throw error;
  }
};
