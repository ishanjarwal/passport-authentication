"use client";
import { logoutUser, selectAuthState } from "@/features/auth/authSlice";
import { classNames } from "@/utils/classNames";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/logout/LogoutButton";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Documentation", href: "/documentation" },
  { name: "Protected Route", href: "/protected" },
];
const userNavigation = [{ name: "Your Profile", href: "/account/profile" }];

const Navbar = () => {
  const { is_auth, user } = useSelector(selectAuthState);
  const pathname = usePathname();
  const current = pathname;

  return (
    <Disclosure as="nav" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <img alt="Your Company" src="/logo.png" className="size-12" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      current == item.href
                        ? "bg-primary text-white"
                        : "text-foreground-muted hover:bg-primary/50 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {is_auth ? (
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={`https://ui-avatars.com/api/?name=${user?.name?.replaceAll(
                          " ",
                          "+"
                        )}`}
                        className="size-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background-muted py-1 ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in shadow-xl"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <Link
                          href={item.href}
                          className="block px-4 py-2 text-sm text-foreground data-focus:bg-background data-focus:outline-hidden"
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                    <MenuItem>
                      <LogoutButton className="block w-full text-start px-4 py-2 text-sm text-foreground data-focus:bg-background data-focus:outline-hidden cursor-pointer hover:bg-background" />
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href={"/account/register"}
                    className="rounded-md px-3 py-2 text-sm font-medium bg-background text-primary border border-primary hover:brightness-90"
                  >
                    Register
                  </Link>
                  <Link
                    href={"/account/login"}
                    className="rounded-md px-3 py-2 text-sm font-medium bg-primary text-white border border-primary hover:brightness-90"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
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
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                current === item.href
                  ? "bg-primary text-foreground"
                  : "text-foreground hover:bg-primary/25",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        {is_auth ? (
          <div className="border-t border-gray-700 pt-4 pb-3">
            <div className="flex items-center px-5">
              <div className="shrink-0">
                <img
                  alt=""
                  src={`https://ui-avatars.com/api/?name=${user?.name?.replaceAll(
                    " ",
                    "+"
                  )}`}
                  className="size-10 rounded-full"
                />
              </div>
              <div className="ml-3">
                <div className="text-base/5 font-medium text-white">
                  {user?.name}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  {user?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-foreground/10"
                >
                  {item.name}
                </Link>
              ))}
              <LogoutButton className="block w-full text-start rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-foreground/10 cursor-pointer" />
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2 p-4">
            <DisclosureButton>
              <Link
                href={"/account/register"}
                className="rounded-md px-3 py-2 text-sm font-medium bg-background text-primary border border-primary hover:brightness-90"
              >
                Register
              </Link>
            </DisclosureButton>
            <DisclosureButton>
              <Link
                href={"/account/login"}
                className="rounded-md px-3 py-2 text-sm font-medium bg-primary text-white border border-primary hover:brightness-90"
              >
                Login
              </Link>
            </DisclosureButton>
          </div>
        )}
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
