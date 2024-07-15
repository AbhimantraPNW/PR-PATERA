import prisma from '@/prisma';

export const getProductService = async (id: number) => {
  try {
    const blog = await prisma.product.findFirst({
      where: { id },
      include: { user: true, images: true },
    });

    if (!blog) {
      throw new Error('Product not found');
    }

    return blog;
  } catch (error) {
    throw error;
  }
};
