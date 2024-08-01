import { Separator } from './ui/separator';

const Welcome = () => {
  return (
    <>
      <section className="padding-container max-container mt-10 text-center">
        <div className="font-bold">WELCOME TO PATERA POTTERY</div>
        <span>&apos;Where Art and Clay Takes New Beauty&apos;</span>

        <div className="flex justify-center">
          <div className="mt-4 max-w-[400px] text-xs md:max-w-[600px] flex flex-col gap-3">
            <span>
              Handmade Pottery Product based in Yogyakarta since 2016. All
              Products are thrown at the wheel and glaze in studio with our
              signature glaze. In our product portfolio, you will therefore find
              both understated and timeless pieces, as well as, on the contrary,
              pieces that have all sorts of color combination in both colorfull
              and softer natural stones. In any case, we try to make the lines
              and shapes of the product as simple, minimalist, and functional as
              possible. Now over 500 ++ customer included hotels, restaurant,
              coffee shop already used our product. Not only for local but we
              also delivered across the world
            </span>
            <span>
              Patera is translate as mosaic color. It forms by variously
              coloured and small pieces material but then can form beauty
              pattern or shape. We carry it with as our professional philosophy.
              We always respecting our customer and artisan potter, so
              everything can come and work together in harmony to make beautiful
              handcrafter ceramics.
            </span>
            <span>
              Patera pottery combines commercial and art to produce artisan
              hand-crafted ceramics. We accepted custom order and also sell
              ready stock pottery product. We will support your business with
              high quality and unique tableware or understand your hobby for
              using unique pottery in your daily day. Find us our product here
              or visit our studio in Yogyakarta.
            </span>
          </div>
        </div>
      </section>
      <Separator className="mt-12" />
    </>
  );
};

export default Welcome;
