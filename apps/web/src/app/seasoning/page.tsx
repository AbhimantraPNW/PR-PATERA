'use client';

import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import useGetProducts from '@/hooks/api/admin/product/useGetProducts';
import { appConfig } from '@/utils/config';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  const { seasonalData: products } = useGetProducts({});
  const router = useRouter();

  return (
    <section className="padding-container max-container mt-24">
      <Navbar />
      <div className="mt-30 flex justify-center text-xl font-semibold">
        SEASONING CUPS
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {/* Card */}
        {products.map((product, i) => (
          <div key={i} className="flex flex-col">
            <Link href={`/seasoning/${product.id}`}>
              <Card className="relative h-80 w-full cursor-pointer">
                <Image
                  src={appConfig.baseUrl + `/assets${product.images?.[0]?.url}`}
                  alt="Image"
                  fill
                  objectFit="cover"
                />
              </Card>
            </Link>
            <h1 className="text-center">{product.name}</h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
