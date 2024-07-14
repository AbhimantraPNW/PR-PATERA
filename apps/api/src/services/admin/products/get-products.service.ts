import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { PaginationQueryParams } from 'types/pagination.type';

interface GetProductsQuery extends PaginationQueryParams {
  search: string;
}

export const getProductsService = async (query: GetProductsQuery) => {
  try {
    const { page, sortBy, sortOrder, take, search } = query;
    const whereClause: Prisma.ProductWhereInput = {
      // type: { contains: search },
      name: { contains: search },
    };

    const stockProducts = await prisma.product.findMany({
      where: { ...whereClause, status: 'Stock Product' },
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { user: true, images: true },
    });

    const seasonalProducts = await prisma.product.findMany({
      where: { ...whereClause, status: 'Seasonal Product' },
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { user: true, images: true },
    });

    const stockCount = await prisma.product.count({
      where: { ...whereClause, status: 'Stock Product' },
    });

    const seasonalCount = await prisma.product.count({
      where: { ...whereClause, status: 'Seasonal Product' },
    });

    return {
      stock : {
        data: stockProducts,
        meta: { page, take, total: stockCount },
      },
      seasonal : {
        data: seasonalProducts,
        meta: { page, take, total: seasonalCount },
      }
    };
  } catch (error) {
    throw error;
  }
};
