import Image from 'next/image';
import Link from 'next/link';
import { DEVELOPER_TEAM, FOOTER_ABOUT, PATERA_STORE } from '../../constant';
import { Separator } from './ui/separator';
import { DeveloperTeamProps, FooterAboutProps, PateraStoreProps } from '../../constant/types';

export const Footer = () => {
  return (
    <>
      <Separator />
      <footer className="padding-container max-container mt-10">
        <div className="flex md:flex-row flex-col justify-between">
          {FOOTER_ABOUT.map((about: FooterAboutProps) => (
            <div className="flex flex-col md:gap-3 gap-2">
              <h1>{about.title}</h1>
              <p className="max-w-[300px] text-slate-500">
                {about.description}
              </p>
              <div>
                <Link href="https://www.instagram.com/paterapottery/">
                  <Image
                    src={about.social}
                    alt="social"
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
            </div>
          ))}

          {DEVELOPER_TEAM.map((developer: DeveloperTeamProps) => (
            <div className="md:ml-40 md:mt-0 mt-8 flex flex-col md:text-right md:gap-3 gap-2">
              {developer.title}
              <span className="text-slate-500">{developer.email}</span>
            </div>
          ))}

          {PATERA_STORE.map((store: PateraStoreProps) => (
            <div className="flex flex-col md:mt-0 mt-8 md:gap-3 gap-2">
              <h1>{store.title}</h1>
              <p className="max-w-[400px] text-slate-500">{store.address}</p>
              <span className="text-slate-500">{store.contact}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-30 mt-10 w-full text-center">
          Dev 2024 &#174; | All rights reserved
        </p>
      </footer>
    </>
  );
};
