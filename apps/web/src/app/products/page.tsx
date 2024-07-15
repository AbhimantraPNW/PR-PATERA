'use client';

import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useGetProducts from '@/hooks/api/admin/product/useGetProducts';
import { Product } from '@/types/product.types';
import { appConfig } from '@/utils/config';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Page = () => {
  const [stockPage, setStockPage] = useState<number>(1);
  const { stockData: products, stockMeta } = useGetProducts({
    page: stockPage,
    take: 20,
  });

  // Group products by type and ensure unique names within each type
  const groupedProducts: { [type: string]: { [name: string]: Product } } = {};

  products.forEach((product) => {
    if (!groupedProducts[product.type]) {
      groupedProducts[product.type] = {};
    }
    //max product in type
    if (Object.keys(groupedProducts[product.type]).length < 10) {
      if (!groupedProducts[product.type][product.name]) {
        groupedProducts[product.type][product.name] = product;
      }
    }
  });

  return (
      <section className="padding-container max-container mt-24">
        <Navbar />
        <div className="mt-30 flex justify-center text-xl font-semibold">
          Stock Products
        </div>

        {Object.entries(groupedProducts).map(([type, productsByName], i) => (
          <div key={i} className="my-7">
            <h1 className="ml-2 mt-5 text-2xl">{type}</h1>
            <Carousel>
              <div className="flex cursor-pointer flex-row">
                <CarouselContent>
                  {Object.values(productsByName).map((product, i) => (
                    <Link key={i} href={`/${product.id}`}>
                      <div>
                        <CarouselItem>
                          <Card className="relative h-44 w-52 md:h-72 md:w-80">
                            <Image
                              src={
                                appConfig.baseUrl +
                                `/assets${product.images?.[0].url}`
                              }
                              alt="Image"
                              fill
                              objectFit="cover"
                            />
                          </Card>
                          <span className="text-xs">{product.name}</span>
                        </CarouselItem>
                      </div>
                    </Link>
                  ))}
                </CarouselContent>
              </div>
              <CarouselPrevious className="carousel-button prev" />
              <CarouselNext className="carousel-button next" />
            </Carousel>
          </div>
        ))}
      </section>
  );
};

export default Page;
