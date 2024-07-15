import SidebarContext from '@/app/dashboard/context/SidebarContext';
import {
  HomeIcon,
  MenuIcon,
  OutlineLogoutIcon,
  OutlinePersonIcon,
} from '@/app/dashboard/icons';
import AutoComplete from '@/components/AutoComplete';
import AuthGuard from '@/hoc/AuthGuard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from '@roketid/windmill-react-ui';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

function Header() {
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const imgSrc = `https://ui-avatars.com/api/?name=${user.fullName}&background=0D8ABC&color=fff`;

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    dispatch(logoutAction());
    router.push('/');
  }

  return (
    <header className="shadow-bottom z-40 bg-white py-4 dark:bg-gray-800">
      <div className="container mx-auto flex h-full items-center justify-between px-6 text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="focus:shadow-outline-purple -ml-1 mr-5 rounded-md p-1 focus:outline-none lg:hidden"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex flex-1 justify-center lg:mr-32">
          <div className="relative mr-6 w-full max-w-xl focus-within:text-purple-500">
            {/* <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="h-4 w-4" aria-hidden="true" />
            </div> */}
            <AutoComplete />
            {/* <Input
              className="pl-8 text-gray-700"
              placeholder="Search for products"
              aria-label="Search"
              crossOrigin="anonymous"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              />  */}
          </div>
        </div>
        <ul className="flex flex-shrink-0 items-center space-x-6">
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="focus:shadow-outline-purple rounded-full focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="h-14 w-14 align-middle"
                src={imgSrc}
                alt=""
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem onClick={() => router.push('/')}>
                <HomeIcon className="mr-3 h-4 w-4" aria-hidden="true" />
                <span>Home</span>
              </DropdownItem>
              <DropdownItem>
                <OutlinePersonIcon
                  className="mr-3 h-4 w-4"
                  aria-hidden="true"
                />
                <span>{user.fullName}</span>
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>
                <OutlineLogoutIcon
                  className="mr-3 h-4 w-4"
                  aria-hidden="true"
                />
                <span>Logout</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default AuthGuard(Header);
