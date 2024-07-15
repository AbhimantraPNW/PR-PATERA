'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import { NAV_LINKS, SOCIAL_ICON_LINKS } from '../../constant';
import NavbarDropdown from './NavbarDropdown';
import VerticalLine from './ui/vertical-line';
import { IconLink, NavLink } from '../../constant/types';
import { useCart } from './CartContext';
import CardDetailsPage from './CardDetailsPage';

const Navbar = () => {
  const [navBackgroundColor, setNavBackgroundColor] = useState('transparent');
  const [borderBottomColor, setBorderBottomColor] = useState('transparent');
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [showCartDetails, setShowCartDetails] = useState<boolean>(false);
  const { cartCount, updateCartItem } = useCart() || {
    cartCount: 0,
    updateCartItem: () => {},
  };

  const toggleCartDetails = () => {
    updateCartItem();
    setShowCartDetails(!showCartDetails);
  };

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
      <div className="flex w-full items-center justify-between px-5 md:px-16">
        <NavbarDropdown />
        <div className="absolute right-24 mr-1 text-4xl md:relative md:right-0 md:mr-0">
          <Link href="/">LOGO</Link>
        </div>

        <div className="flex flex-row items-center gap-4">
          {NAV_LINKS.map((nav: NavLink, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredNav(nav.label)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <div className="subNav hidden md:flex">
                <Link href={nav.href}>
                  <div className="py-8">{nav.label}</div>
                </Link>
              </div>

              {/* SubNavbar */}
              {nav.subNav && hoveredNav === nav.label && (
                <div className="absolute left-0 top-full flex flex-col bg-orange-400 text-white">
                  {nav.subNav.map((sub) => (
                    <Link key={sub.subKey} href={sub.subHref}>
                      <div className="flex whitespace-nowrap px-2 py-2 text-white hover:text-black">
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
          <div className="cursor-pointer">
            <BiShoppingBag
              className="ml-2 text-orange-400"
              style={{ height: '50px', width: '30px' }}
              onClick={toggleCartDetails}
            />
            {cartCount > 0 && (
              <span className="absolute right-3 top-7 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white md:right-14">
                {cartCount}
              </span>
            )}
          </div>
          {showCartDetails && <CardDetailsPage />}
        </div>
      </div>

      <div
        className="fixed bottom-4 right-0 flex flex-col gap-2"
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
