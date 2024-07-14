'use client';

import { useCart } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import useGetProduct from '@/hooks/api/admin/product/useGetProduct';
import useGetProducts from '@/hooks/api/admin/product/useGetProducts';
import { Product } from '@/types/product.types';
import { appConfig } from '@/utils/config';
import { Label, Select } from '@roketid/windmill-react-ui';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Page = ({ params }: { params: { id: string } }) => {
  const { updateCartItem } = useCart() || { updateCartItem: () => {} };
  const { product } = useGetProduct(Number(params.id));
  const [seasonalPage, setSeasonalPage] = useState<number>(1);
  const { seasonalData, seasonalMeta } = useGetProducts({
    page: seasonalPage,
    take: 15,
  });

  const [count, setCount] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>(product?.size || '');
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    product?.images?.[0]?.url,
  );

  //state price and ticket
  const [stockCount, setStockCount] = useState<number>(1);
  const [price, setPrice] = useState<string>('');

  //filter by status cup
  const seasonalFilterByStatus = seasonalData.filter(
    (cup) => cup.status === product?.status,
  );

  //number format
  const formatPrice = (value: any) => {
    if (!value) return '';
    return `${parseFloat(value).toLocaleString('id-ID')}`;
  };

  // Filter status and name to exclude the current product size
  const avalaibleCups = seasonalData.filter(
    (cup) => cup.status === product?.status && cup.name !== product?.name,
  );

  // Group products by status and ensure unique names within same status products
  const groupedProducts: { [status: string]: { [name: string]: Product } } = {};
  avalaibleCups.forEach((product) => {
    if (!groupedProducts[product.status]) {
      groupedProducts[product.status] = {};
    }
  });

  //get selected size product
  const getProductBySize = (
    status: string | undefined,
    name: string | undefined,
    size: string,
    data: Product[],
  ) => {
    return data.find(
      (product) =>
        product.status === status &&
        product.name === name &&
        product.size === size,
    );
  };

  // handler for size selection
  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);
  };

  const selectedProduct =
    getProductBySize(
      product?.status,
      product?.name,
      selectedSize,
      seasonalFilterByStatus,
    ) || product;

  //change image
  const handleThumbnailImage = (image: string) => {
    setCurrentImage(image);
  };

  //add or reduce stock
  const handleAddStock = () => {
    if (selectedProduct && stockCount < selectedProduct.stock) {
      setStockCount(stockCount + 1);
    }
  };

  const handleReduceStock = () => {
    if (stockCount > 1) {
      setStockCount(stockCount - 1);
    }
  };

  //Add to Cart
  const handleItemAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const itemToAdd = {
      type: selectedProduct?.type,
      name: selectedProduct?.name,
      status: selectedProduct?.status,
      size: selectedProduct?.size,
      image: currentImage,
      totalStock: stockCount,
      totalPrice: selectedProduct!.price * stockCount,
    };

    cart.push(itemToAdd);

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItem();
  };

  //size and others
  useEffect(() => {
    if (product) {
      setSelectedSize(product.size);
      setCurrentImage(product.images?.[0]?.url);
    }
  }, [product]);

  //image
  useEffect(() => {
    setCurrentImage(selectedProduct?.images?.[0]?.url);
  }, [selectedProduct]);

  return (
    <section className="padding-container max-container">
      <Navbar />
      <div className="mb-20 mt-36 flex flex-col items-center justify-center px-3 md:flex-row md:justify-between md:px-12">
        <div>
          {/* Product Card */}
          <Card className="relative h-80 w-80 md:w-96 md:ml-4 ml-0">
            <Image
              src={appConfig.baseUrl + `/assets/${currentImage}`}
              alt="image"
              fill
              objectFit="cover"
            />
          </Card>

          {/* Image Detail */}
          <div className="flex flex-row gap-3">
            {selectedProduct?.images?.map((image, index) => (
              <Card
                key={index}
                className="relative mt-7 h-24 w-24 cursor-pointer"
                onClick={() => handleThumbnailImage(image.url)}
              >
                <Image
                  src={appConfig.baseUrl + `/assets/${image.url}`}
                  alt="Image"
                  fill
                  objectFit="cover"
                />
              </Card>
            ))}
          </div>
        </div>
        <div className="mt-3 flex flex-col text-left md:mt-0">
          <h1 className="text-xl text-gray-500">{selectedProduct?.name}</h1>
          {selectedProduct?.price && selectedProduct.price > 1 && (
            <span className="mt-2 text-xl text-slate-500">
              {formatPrice(selectedProduct?.price * stockCount)}
            </span>
          )}
          <Separator className="mt-5" />
          <div className="flex flex-col gap-2 py-4 text-slate-500">
            <span>Diameter : {selectedProduct?.diameter} cm</span>
            <span>Tinggi : {selectedProduct?.tinggi} cm</span>
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
            {selectedProduct?.stock && selectedProduct?.stock > 1 && (
              <span>Sisa Stock : {selectedProduct?.stock - stockCount}</span>
            )}

            <Label>
              <Select
                className="rounded-none border border-solid border-black py-1"
                style={{ maxWidth: '100px' }}
                name="type"
                onChange={handleSizeChange}
                value={selectedSize}
              >
                {seasonalFilterByStatus
                  .filter(
                    (cup) =>
                      cup.type === product?.type && cup.name === product?.name,
                  )
                  .map((cup, i) => (
                    <option key={i} value={cup.size}>
                      {cup?.size}
                    </option>
                  ))}
              </Select>
            </Label>
          </div>
          <div className="flex flex-row">
            <Card className="flex items-center justify-between gap-6 border-solid border-black px-2">
              <button onClick={handleReduceStock} className="text-xl">
                -
              </button>
              <span>{stockCount}</span>
              <button onClick={handleAddStock} className="text-xl">
                +
              </button>
            </Card>
          </div>
          <Card className="mt-4 w-48 cursor-pointer border-solid border-orange-400 p-2">
            <span
              className="flex justify-center font-bold text-orange-400"
              onClick={() => handleItemAddToCart()}
            >
              Add to Cart
            </span>
          </Card>
        </div>
      </div>
      <Separator />

      {/* Products */}
      {Object.entries(groupedProducts).map(([status], i) => (
        <div key={i}>
          <h1 className="ml-2 mt-5 text-xl text-slate-500">{status}</h1>
        </div>
      ))}
      <div className="flex flex-row">
        {seasonalData.map((cup, i) => (
          <div key={i}>
            <Carousel>
              <div className="flex cursor-pointer flex-row">
                <CarouselContent>
                  <Link href={`/seasoning/${cup?.id}`}>
                    <div key={i}>
                      <div className="px-1 py-2">
                        <CarouselItem>
                          <Card className="relative h-36 w-36">
                            <Image
                              src={
                                appConfig.baseUrl +
                                `/assets${cup?.images?.[0].url}`
                              }
                              alt="Image"
                              fill
                              objectFit="cover"
                            />
                          </Card>
                          <span className="text-xs text-slate-500">
                            {cup?.name}
                          </span>
                        </CarouselItem>
                      </div>
                    </div>
                  </Link>
                </CarouselContent>
              </div>
              <CarouselPrevious className="carousel-button prev" />
              <CarouselNext className="carousel-button next" />
            </Carousel>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
