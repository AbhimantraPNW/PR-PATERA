import Image from 'next/image';
import React from 'react';

const ImageGrid = () => {
  return (
    <main>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="relative h-[200px] w-[200px] rounded-lg">
            <Image
              src="/Collection/Vase_Cup.jpg"
              alt="Image"
              layout="fill"
              objectFit="cover"
              className="absolute rounded-lg"
            />
          </div>
          <div className="relative h-[200px] w-[200px] rounded-lg">
            <Image
              src="/Collection/Vase_Cup.jpg"
              alt="Image"
              layout="fill"
              objectFit="cover"
              className="absolute rounded-lg"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative h-[200px] w-[200px] rounded-lg">
            <Image
              src="/Collection/Vase_Cup.jpg"
              alt="Image"
              layout="fill"
              objectFit="cover"
              className="absolute rounded-lg"
            />
          </div>
          <div className="relative h-[200px] w-[200px] rounded-lg">
            <Image
              src="/Collection/Vase_Cup.jpg"
              alt="Image"
              layout="fill"
              objectFit="cover"
              className="absolute rounded-lg"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ImageGrid;
