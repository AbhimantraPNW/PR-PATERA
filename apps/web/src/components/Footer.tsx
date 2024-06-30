'use client';
import Image from 'next/image';
import Link from 'next/link';
import { DEVELOPER_TEAM, FOOTER_ABOUT, PATERA_STORE } from '../../constant';
import { Separator } from './ui/separator';
import {
  DeveloperTeamProps,
  FooterAboutProps,
  PateraStoreProps,
} from '../../constant/types';
import { useRouter } from 'next/navigation';

export const Footer = () => {
  const router = useRouter();

  return (
    <>
      <Separator />
      <footer className="padding-container max-container mt-10">
        <div className="flex flex-col justify-between md:flex-row">
          {FOOTER_ABOUT.map((about: FooterAboutProps, index) => (
            <div className="flex flex-col gap-2 md:gap-3" key={index}>
              <h1>{about.title}</h1>
              <span className="max-w-[300px] text-slate-500">
                {about.description}
              </span>
              <span className="max-w-[300px] text-slate-500 cursor-pointer" onClick={() => router.push('/login')}>{about.admin}</span>
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

          {DEVELOPER_TEAM.map((developer: DeveloperTeamProps, index) => (
            <div
              className="mt-8 flex flex-col gap-2 md:ml-40 md:mt-0 md:gap-3 md:text-right"
              key={index}
            >
              {developer.title}
              <span className="text-slate-500">{developer.email}</span>
            </div>
          ))}

          {PATERA_STORE.map((store: PateraStoreProps, index) => (
            <div
              className="mt-8 flex flex-col gap-2 md:mt-0 md:gap-3"
              key={index}
            >
              <h1>{store.title}</h1>
              <p className="max-w-[400px] text-slate-500">{store.address}</p>
              <span className="text-slate-500">{store.contact}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-30 mt-10 w-full text-center">
          Dev 2024 &copy; | All rights reserved
        </p>
      </footer>
    </>
  );
};
