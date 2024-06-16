'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import { NAV_LINKS, SOCIAL_ICON_LINKS } from '../../constant';
import NavbarDropdown from './NavbarDropdown';
import VerticalLine from './ui/vertical-line';
import { IconLink, NavLink } from '../../constant/types';

const Navbar = () => {
  const [navBackgroundColor, setNavBackgroundColor] = useState('transparent');
  const [borderBottomColor, setBorderBottomColor] = useState('transparent');
  const [subNavbar, setSubNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setNavBackgroundColor('white');
        setBorderBottomColor('#e5e7eb'); // Tailwind CSS color for border-gray-200
      } else {
        setNavBackgroundColor('transparent');
        setBorderBottomColor('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar transition-color duration-300`}
      style={{
        backgroundColor: navBackgroundColor,
        borderBottom: `1px solid ${borderBottomColor}`,
      }}
      onMouseEnter={() => {
        setNavBackgroundColor('white');
        setBorderBottomColor('#e5e7eb');
      }}
      onMouseLeave={() => {
        setNavBackgroundColor(window.scrollY > 0 ? 'white' : 'transparent');
        setBorderBottomColor(window.scrollY > 0 ? '#e5e7eb' : 'transparent');
      }}
    >
      <div className="flex w-full items-center justify-between md:px-16 px-5">
        <NavbarDropdown />
        <div className="absolute right-24 md:mr-0 mr-1 text-4xl md:relative md:right-0">
          <Link href="/">LOGO</Link>
        </div>

        <div className="flex flex-row items-center gap-4">
          {NAV_LINKS.map((nav: NavLink, index) => (
            <div key={index} className="relative">
              <div className="subNav hidden md:flex">
                <Link href={nav.href}>
                  <div
                    className="py-8"
                    onMouseEnter={() => nav.subNav && setSubNavbar(true)}
                    onMouseLeave={() => nav.subNav && setSubNavbar(false)}
                  >
                    {nav.label}
                  </div>
                </Link>
              </div>

              {/* SubNavbar */}
              {nav.subNav && subNavbar && (
                <div
                  className="absolute right-0 top-full flex flex-row bg-white"
                  onMouseEnter={() => setSubNavbar(true)}
                  onMouseLeave={() => setSubNavbar(false)}
                >
                  {nav.subNav.map((sub) => (
                    <Link key={sub.subKey} href={sub.subHref}>
                      <div className="whitespace-nowrap px-2 py-2 text-teal-700 hover:bg-gray-100 hover:text-teal-900">
                        {sub.subLabel}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="ml-2">
            <VerticalLine />
          </div>
          <div>
            <BiShoppingBag
              className="ml-2 text-orange-400"
              style={{ height: '50px', width: '30px' }}
            />
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-4 right-5 flex flex-col gap-2"
        style={{ alignSelf: 'flex-end' }}
      >
        {SOCIAL_ICON_LINKS.map((icon: IconLink, index) => (
          <Link href={icon.href} key={index}>
            <div className="cursor-pointer">
              <Image
                src={icon.icon}
                alt="Contact Icon"
                height={50}
                width={50}
              />
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
