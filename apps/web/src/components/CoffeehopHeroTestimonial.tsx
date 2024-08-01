'use client';

import Image from 'next/image';
import {
  COFFEESHOP_TESTIMONIAL1,
  COFFEESHOP_TESTIMONIAL2,
  COFFEESHOP_TESTIMONIAL3,
} from '../../constant';
import { Card } from './ui/card';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

const images1 = COFFEESHOP_TESTIMONIAL1.map((coffeeshop) => coffeeshop.image);
const images2 = COFFEESHOP_TESTIMONIAL2.map((coffeeshop) => coffeeshop.image);
const images3 = COFFEESHOP_TESTIMONIAL3.map((coffeeshop) => coffeeshop.image);

const label1 = COFFEESHOP_TESTIMONIAL1.map((coffeeshop) => coffeeshop.label);
const label2 = COFFEESHOP_TESTIMONIAL2.map((coffeeshop) => coffeeshop.label);
const label3 = COFFEESHOP_TESTIMONIAL3.map((coffeeshop) => coffeeshop.label);

const CoffeeshopHeroTestimonial = () => {
  const [currentIndexImage, setCurrentIndexImage] = useState(0);
  const [currentIndexLabel, setCurrentIndexLabel] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsHovered(true);
      setTimeout(() => {
        setIsHovered(false);
        setCurrentIndexImage((currentIndexImage + 1) % images1.length);
        setCurrentIndexLabel((currentIndexLabel + 1) % label1.length);
      }, 1200); //duration of transition
    }, 5000); // duration between image changes
    return () => clearInterval(intervalId);
  }, [currentIndexImage, currentIndexLabel]);

  return (
    <section className="padding-container max-container">
      <div className="flex flex-col justify-center text-center">
        <div className="mt-20 font-bold">EXCLUSIVE COFFEESHOP COLLECTION</div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Card */}
        <Card className="relative overflow-hidden" style={{ height: '450px' }}>
          <div
            className={`1s opacity 1s absolute inset-0 transform ease-in-out ${
              isHovered ? 'opacity-0' : 'opacity-1'
            }`}
          >
            <Image
              src={images1[currentIndexImage]}
              alt="Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <Button className="sliding-button-coffeeshop absolute bottom-4 left-1/2 flex -translate-x-1/2 text-center">
            <span>{label1[currentIndexLabel]}</span>
          </Button>
        </Card>

        {/* Card */}
        <Card className="relative overflow-hidden" style={{ height: '450px' }}>
          <div
            className={`card-image-container absolute inset-0 ${
              isHovered ? 'opacity-0' : 'opacity-1'
            }`}
          >
            <Image
              src={images2[currentIndexImage]}
              alt="Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <Button className="sliding-button-coffeeshop absolute bottom-4 left-1/2 flex -translate-x-1/2 text-center">
            <span>{label2[currentIndexLabel]}</span>
          </Button>
        </Card>

        {/* Card */}
        <Card className="relative overflow-hidden" style={{ height: '450px' }}>
          <div
            className={`card-image-container absolute inset-0 ${
              isHovered ? 'opacity-0' : 'opacity-1'
            }`}
          >
            <Image
              src={images3[currentIndexImage]}
              alt="Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <Button className="sliding-button-coffeeshop absolute bottom-4 left-1/2 flex -translate-x-1/2 text-center">
            <span>{label3[currentIndexLabel]}</span>
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default CoffeeshopHeroTestimonial;
