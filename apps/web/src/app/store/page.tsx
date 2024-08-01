import { Footer } from '@/components/Footer';
import NavbarFeatures from '@/components/NavbarFeatures';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { imageList } from './list';
import Link from 'next/link';

const Store = () => {
  return (
    <main>
      <NavbarFeatures />
      <div className="mt-28">
        <div className="container py-4">
          {/* MAP SECTION START */}
          <h1 className="text-center text-5xl font-bold text-[#152C5B]">
            Visit Our Store
          </h1>

          <div className="my-5 flex w-full flex-col items-center">
            <div className="relative mb-3 h-[400px] w-full md:w-3/4">
              <Link href="https://maps.app.goo.gl/5GXR7JQE6LZfaB1X7">
                <Image
                  src="/patera-map.png"
                  alt="gambar 1"
                  layout="fill"
                  objectFit="cover"
                  className="absolute rounded-xl"
                />
              </Link>
            </div>
            <div className="flex md:w-3/4 w-full gap-3 rounded-xl bg-orange-400 p-3 text-xl text-white">
              <MapPin size={36} />
              <p>
                Gg. Ledok Tukangan Blok DN 2 No.243, RT.02/RW.01, Tegal
                Panggung, Kec. Danurejan, Kota Yogyakarta, Daerah Istimewa
                Yogyakarta 55212
              </p>
            </div>
          </div>

          {/* MAP SECTION END */}

          {/* GALLERY SECTION START */}
          <h1 className="text-center text-5xl mt-10 font-bold text-[#152C5B]">
            Our Gallery
          </h1>
          <div className="mx-auto my-8 flex flex-wrap justify-center gap-6">
            {imageList.map((image, i) => (
              <div key={i} className="relative h-[300px] w-[400px]">
                <Image
                  src={image.image}
                  alt="gambar 1"
                  layout="fill"
                  objectFit="cover"
                  className="absolute rounded-lg"
                />
              </div>
            ))}
          </div>
          {/* GALLERY SECTION END */}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Store;
