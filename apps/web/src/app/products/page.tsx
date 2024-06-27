'use client';

import { Card } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { SAMPLE_PRODUCT } from '../../../constant';

const page = () => {
  return (
    <section className="padding-container max-container mt-24">
      <div className="mt-30 flex justify-center text-xl font-semibold">
        CUPS
      </div>
      <h1 className="ml-2 mt-5 text-2xl">Pitambari</h1>
      <Carousel>
        <div className="mt-2 flex flex-row overflow-hidden mb-10">
          <CarouselContent>
            {SAMPLE_PRODUCT.map((sample, index) => (
              <div className="flex flex-col px-1 py-2" key={index}>
                <CarouselItem>
                  <Card className='md:w-60 w-28'>
                    <Image
                      src={sample.image}
                      alt="Image"
                      width={20}
                      height={20}
                      layout="responsive"
                      objectFit="cover"
                    />
                  </Card>
                  <span className="text-xs">{sample.name}</span>
                </CarouselItem>
              </div>
            ))}
          </CarouselContent>
          <CarouselPrevious className='carousel-button prev'/>
          <CarouselNext className='carousel-button next'/>
        </div>
      </Carousel>
    </section>
  );
};

export default page;
