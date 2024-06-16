import Image from 'next/image';
import { PARTNERSHIP1, PARTNERSHIP2 } from '../../constant';

type Partnership1 = {
  logo: string;
}

type Partnership2 = {
  logo: string;
}

const Partnership = () => {
  return (
    <section className="padding-container max-container">
      <div className="mt-10 text-xl font-semibold">PARTNERSHIP</div>

      <div className="scroll-container">
        <div className="mt-10">
          <div className="carousel-primary gap-5 md:gap-0">
            {([...PARTNERSHIP1, ...PARTNERSHIP1] as Partnership1[]).map((partner, index) => (
              <div className="carousel-item" key={index}>
                <Image src={partner.logo} alt="Logo" height={80} width={100} />
              </div>
            ))}
          </div>

          <div className="carousel-secondary mt-5 gap-5 md:gap-0">
            {([...PARTNERSHIP2, ...PARTNERSHIP2] as Partnership2[]).map((partner, index) => (
              <div className="carousel-item" key={index}>
                <Image src={partner.logo} alt="Logo" height={80} width={100} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;
