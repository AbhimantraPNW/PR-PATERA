import Image from 'next/image';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { COFFEESHOP_CLIENT } from '../../constant';
import Link from 'next/link';

const CoffeeshopHero = () => {
  return (
    <section className="padding-container max-container">
      <div className="flex flex-col justify-center text-center">
        <div className="mt-20 font-bold">EXCLUSIVE COFFEESHOP COLLECTION</div>
      </div>

      {/* Card */}
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {COFFEESHOP_CLIENT.map((value, id) => (
          <Card
            className="coffeeshop-card relative"
            style={{ height: '450px' }}
            key={id}
            
          >
            <div className="coffeeshop-imageContainer absolute inset-0">
              <Image
                src={value.image}
                alt="Image"
                layout="fill"
                objectFit="cover"
                className="coffeeshop-image"
              />
            </div>
            <Link href={value.href}>
              <Button className="sliding-button-coffeeshop absolute bottom-4 left-1/2 flex -translate-x-1/2 text-center">
                <span>{value.label}</span>
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CoffeeshopHero;
