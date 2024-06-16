import Image from 'next/image';
import { FC } from 'react';
import { TESTIMONIAL } from '../../constant';

interface TestimonialProps {
  name: string;
  description: string;
  image: string;
}

const Testimonial: FC<TestimonialProps> = () => {
  return (
    <section className="padding-container max-container">
      <div className="mt-24 text-xl font-semibold">TESTIMONIAL</div>

      <div className="grid grid-cols-1 gap-10 md:p-10 p-0 mt-16 md:grid-cols-2">
        {TESTIMONIAL.map((testi) => (
          <ul key={testi.name} className="p-6">
            <TestiCust
              image={testi.image}
              description={testi.description}
              name={testi.name}
            />
          </ul>
        ))}
      </div>
    </section>
  );
};

type TestiCust = {
  name: string;
  image: string;
  description: string;
};

const TestiCust = ({ name, image, description }: TestiCust) => {
  return (
    <div className="relative flex w-full flex-col border border-gray-400 p-4">
      <div className="absolute -top-16 md:left-16 left-10 rounded p-12">
        <Image
          src={image}
          alt="person"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <div className="">
        <div className="md:mt-5 mt-7 flex">
          {[...Array(5)].map((_, index) => (
            <Image
              src="/star.svg"
              key={index}
              alt="star"
              width={30}
              height={30}
            />
          ))}
        </div>
        <p className="md:mt-5 mt-3 text-slate-700">{description}</p>
      </div>
      <h2 className="md:mt-10 mt-6 text-2xl">{name}</h2>
    </div>
  );
};

export default Testimonial;
