import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import searchIcon from "../assets/search-icon.png";
import Ticket from "../assets/Ticket.svg";
import Profile from "../assets/Profile.svg";
import "./navbar.css";
import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigation = [
    { name: "Home", href: "/" },
    // { name: "Museum", href: "/museums" },
    {name:'Vote Arts',href:'/vote-arts'},
    {name: 'Gallery', href:'/galery'},
    {name : 'Blog', href:'/blog'}
  ];

  const [currentPath, setCurrentpath] = useState(window.location.pathname);

  return (
    <Disclosure as="nav" className="bg-[#F4EFD8]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 items-center justify-between h-[88px] justify-between items-center">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex items-center justify-between items-center">
            <div className="flex shrink-0 gap-[6px] items-center">
              <img alt="Senetgah" src={logo} className="h-[60px] w-[60px]" />
              <h2 className="text-[#212121]  text-[28px] baskervville-400">
                Senetgah
              </h2>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex gap[20px] space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.href == currentPath ? "page" : undefined}
                  className={classNames(
                    item.href == currentPath
                      ? "bg-[#424F38] text-[#FBFAEE]"
                      : "text-[#212121] hover:bg-[#424F38] hover:text-[#FBFAEE]",
                    "flex items-center rounded-3xl px-5 py-2 text-[16px] font-medium"
                  )}
                  on
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className=" flex justify-between gap-[40px] items-center pr-2">
            <img src={searchIcon} alt="" className="size-8" />
            <img src={Ticket} alt="" className="size-8" /> 

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="cursor-pointer relative flex text-sm">
                  <img
                    alt=""
                    src={Profile}
                    className="size-8"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-[#424F38] text-[#FBFAEE]"
                  : "text-[#212121] hover:bg-[#424F38] hover:text-[#FBFAEE]",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
