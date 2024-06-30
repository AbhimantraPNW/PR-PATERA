import AuthGuard from '@/hoc/AuthGuard';
import { useContext, useState } from 'react';
import SidebarContext from '@/app/dashboard/context/SidebarContext';
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from '@/app/dashboard/icons';
import {
  Avatar,
  Badge,
  Input,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from '@roketid/windmill-react-ui';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logoutAction } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';

function Header() {
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

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
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="h-4 w-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search for projects"
              aria-label="Search"
              crossOrigin="anonymous"
            />
          </div>
        </div>
        <ul className="flex flex-shrink-0 items-center space-x-6">
          {/* <!-- Theme toggler --> */}
          {/* <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li> */}

          {/* <!-- Notifications menu --> */}
          {/* <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" aria-hidden="true" /> */}
          {/* <!-- Notification badge --> */}
          {/* <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>

            <Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Messages</span>
                <Badge type="danger">13</Badge>
              </DropdownItem>
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Sales</span>
                <Badge type="danger">2</Badge>
              </DropdownItem>
              <DropdownItem onClick={() => alert('Alerts!')}>
                <span>Alerts</span>
              </DropdownItem>
            </Dropdown>
          </li> */}

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
                src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                alt=""
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem>
                <OutlinePersonIcon
                  className="mr-3 h-4 w-4"
                  aria-hidden="true"
                />
                <span>{user.fullName}</span>
              </DropdownItem>
              {/* <DropdownItem tag="a" href="#">
                <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Settings</span>
              </DropdownItem> */}
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
