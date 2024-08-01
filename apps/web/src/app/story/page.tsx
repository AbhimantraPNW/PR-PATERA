import { Footer } from '@/components/Footer';
import NavbarFeatures from '@/components/NavbarFeatures';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ImageGrid from './component/ImageGrid';

const Story = () => {
  return (
    <main>
      <NavbarFeatures />
      <div className="mt-24">
        {/* HEADER START */}
        <div className="rounded-b-3xl bg-slate-50">
        <div className="container flex h-[500px] w-full flex-col items-center md:flex-row">
        <div className="flex h-full w-full flex-col justify-center gap-4 md:w-1/2">
        <h1 className="text-5xl font-bold text-[#152C5B]">
                About Patera
              </h1>
              <p className="text-lg">
                Welcome to Patera Pottery, a Yogyakarta-based studio crafting
                unique ceramics since 2016. Our high-quality, minimalist designs
                are loved by customers worldwide, including top hotels and
                coffee shops. Discover more about our story and products by
                clicking the &apos;Read More&apos; button below.
              </p>
              <Link href="#story" scroll={true}>
                <Button className="sliding-button w-1/4">
                  <span>Read More</span>
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex h-full w-1/2 flex-col items-center justify-center md:mt-0">
              <ImageGrid />
            </div>
          </div>
        </div>
        {/* HEADER END */}
        
        {/* STORY START */}
        <div id="story" className="container mx-auto my-20 mt-96 md:mt-0">
          <h1 className="text-center text-5xl font-bold text-[#152C5B]">
            Our Journey
          </h1>
          <div className="mx-auto my-10 flex w-full flex-col gap-5 text-xl md:w-3/4">
            <p>
              Handmade Pottery Product based in Yogyakarta since 2016. All
              Products are thrown at the wheel and glaze in studio with our
              signature glaze. In our product portfolio, you will therefore find
              both understated and timeless pieces, as well as, on the contrary,
              pieces that have all sorts of color combination in both colorfull
              and softer natural stones. In any case, we try to make the lines
              and shapes of the product as simple, minimalist, and functional as
              possible. Now over 500 ++ customer included hotels, restaurant,
              coffee shop already used our product. Not only for local but we
              also delivered across the world.
            </p>
            <p>
              Patera is translate as mosaic color. It forms by variously
              coloured and small pieces material but then can form beauty
              pattern or shape. We carry it with as our professional philosophy.
              We always respecting our customer and artisan potter, so
              everything can come and work together in harmony to make beautiful
              handcrafter ceramics.
            </p>
            <p>
              Patera pottery combines commercial and art to produce artisan
              hand-crafted ceramics. We accepted custom order and also sell
              ready stock pottery product. We will support your business with
              high quality and unique tableware or understand your hobby for
              using unique pottery in your daily day. Find us our product here
              or visit our studio in Yogyakarta.
            </p>
          </div>
        </div>
        {/* STORY END */}
      </div>
      <Footer />
    </main>
  );
};

export default Story;
