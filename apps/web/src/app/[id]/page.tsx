'use client';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SAMPLE_PRODUCT, SAMPLE_PRODUCT_ID } from '../../../constant';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Page = () => {
  const [count, setCount] = useState<number>(1);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 1 ? count - 1 : 1);

  return (
    <section className="padding-container max-container">
      <div className="mb-10 mt-36 flex flex-col justify-center px-12 md:flex-row md:justify-between">
        <div>
          {/* Product Card */}
          {SAMPLE_PRODUCT_ID.map((name, index) => (
            <Card key={index}>
              <Image
                src={name.image}
                alt="image"
                width={550}
                height={550}
                objectFit="cover"
              />
            </Card>
          ))}
        </div>
        <div className="mt-3 flex flex-col text-left md:mt-0">
          <h1>PALMWOOD</h1>
          <span className="text-xl text-slate-500">40.000</span>
          <Separator className="mt-5" />
          <div className="flex flex-col gap-2 py-4 text-slate-500">
            <span>Diameter : 4 cm</span>
            <span>Tinggi : 6 cm</span>
            <span>
              Jika ingin bertanya lebih lanjut, bisa mengirimkan pesan ke Admin
              kami
            </span>
            <Link href="/">
              <Image
                src="/whatsapp.svg"
                alt="Whatsapp Icon"
                width={30}
                height={30}
              />
            </Link>
          </div>
          <Separator className="mt-3" />
          <div className="flex flex-col gap-2 py-4 text-slate-500">
            <span>Stock : 10</span>
            <Card
              style={{
                width: '129px',
                height: '38px',
                border: '1px solid',
              }}
            >
              <span className="flex translate-y-2 items-center px-2 text-slate-500">
                Espresso
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger className="-translate-y-4 translate-x-24">
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="absolute -right-5 top-0 border border-black">
                  <DropdownMenuItem>Piccolo</DropdownMenuItem>
                  <DropdownMenuItem>Cappucino</DropdownMenuItem>
                  <DropdownMenuItem>Latte</DropdownMenuItem>
                  <DropdownMenuItem>Longblack</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Card>
          </div>
          <div className="flex flex-row">
            <Card className="flex items-center justify-between gap-6 border-solid border-black px-2">
              <button onClick={decrement} className="text-xl">
                -
              </button>
              <span>{count}</span>
              <button onClick={increment} className="text-xl">
                +
              </button>
            </Card>
          </div>
          <Card className="mt-4 w-48 cursor-pointer border-solid border-orange-400 p-2">
            <span className="flex justify-center font-bold text-orange-400">
              Add to Cart
            </span>
          </Card>
        </div>
      </div>

      {/* Products */}
      <div className="mt-16">
        <h1 className="ml-2 mt-5 text-xl text-slate-500">Pitambari</h1>
        <Carousel>
          <div className="mb-10 mt-2 flex flex-row overflow-hidden">
            <CarouselContent>
              {SAMPLE_PRODUCT.map((sample, index) => (
                <div className="flex flex-col px-1 py-2" key={index}>
                  <CarouselItem>
                    <Card className="responsive-card-productId">
                      <Image
                        src={sample.image}
                        alt="Image"
                        width={20}
                        height={20}
                        layout="responsive"
                        objectFit="cover"
                        className="cursor-pointer"
                      />
                    </Card>
                    <span className="text-xs text-slate-500">
                      {sample.name}
                    </span>
                  </CarouselItem>
                </div>
              ))}
            </CarouselContent>
            <CarouselPrevious className="carousel-button prev" />
            <CarouselNext className="carousel-button next" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Page;
