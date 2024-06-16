import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from './ui/button';

const Collection = () => {
  return (
    <section className="padding-container max-container">
      <div className="flex flex-col justify-center text-center">
        <div className="mt-10">Season Collection</div>

        <div className="font-bold">PATERA SUMMER</div>
      </div>

      <div className='grid md:grid-cols-4 grid-cols-2 mt-10 gap-4'>
      {/* Card */}
        <div className='flex flex-col'>
          <Card>
            <Image src="/Collection/Carnelian.jpg" alt='Image' width={50} height={50} layout='responsive' objectFit='cover'/>
          </Card>
            <h1 className='text-center'>Carnelian Green</h1>
        </div>

         {/* Card */}
         <div className='flex flex-col'>
          <Card>
            <Image src="/Collection/Travertine.jpg" alt='Image' width={50} height={50} layout='responsive' objectFit='cover'/>
          </Card>
            <h1 className='text-center'>Blue Ocean</h1>
        </div>

         {/* Card */}
         <div className='flex flex-col'>
          <Card>
            <Image src="/Collection/Pitambari.jpg" alt='Image' width={50} height={50} layout='responsive' objectFit='cover'/>
          </Card>
            <h1 className='text-center'>Black Classic</h1>
        </div>

         {/* Card */}
         <div className='flex flex-col'>
          <Card>
            <Image src="/Collection/Vase_Cup.jpg" alt='Image' width={50} height={50} layout='responsive' objectFit='cover'/>
          </Card>
            <h1 className='text-center'>Black Line Blue</h1>
        </div>

      </div>

      <div className='flex justify-center'>
        <Button className='mt-7 sliding-button'>
          <span>View All Products</span>
        </Button>
      </div>

    </section>
  );
};

export default Collection;
