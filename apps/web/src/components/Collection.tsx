'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import useGetProducts from '@/hooks/api/admin/product/useGetProducts';
import { appConfig } from '@/utils/config';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product.types';
import Link from 'next/link';

const Collection = () => {
  const { seasonalData: products, seasonalMeta } = useGetProducts({
    page: 1,
    take: 4,
  });
  const router = useRouter();

  return (
    <section className="padding-container max-container">
      <div className="flex flex-col justify-center text-center">
        <div className="mt-10">Season Collection</div>

        <div className="font-bold">PATERA SUMMER</div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
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

      <div className="flex justify-center">
        <Button
          className="sliding-button mt-7"
          onClick={() => router.push('/seasoning')}
        >
          <span>View All Products</span>
        </Button>
      </div>
    </section>
  );
};

export default Collection;
