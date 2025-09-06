import React, { useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from "./Pages/Cart/Cart";

const navigation = [
  { name: "About", href: "/" },
  { name: "Contact", href: "/contact" },
  { name: "Help Center", href: "/help" },
  { name: "Call Us +1234567890", href: "/call" },
];

// const categories = [
//   { name: "Shop All", href: "/" },
//   { name: "Computers", href: "/category/computers" },
//   { name: "Tablets", href: "/category/tablets" },
//   { name: "Audio", href: "/category/audio" },
//   { name: "Mobile", href: "/category/mobile" },
//   { name: "T.V & Home Cinema", href: "/category/tv" },
//   { name: "Wearable Tech", href: "/category/wearable" },
//   { name: "Sale", href: "/sale" },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <>
      <div className="bg-black text-white text-sm px-6 lg:px-20 py-1 flex justify-between items-center">
        <span>Free Shipping for orders over $50</span>
        <div className="hidden sm:flex space-x-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-gray-300"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

      <Disclosure as="nav" className="bg-white shadow relative z-30">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-full px-6 lg:px-20">
              <div className="flex h-16 items-center justify-between">
                <div className="flex-shrink-0">
                  <a href="/" className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                    TechWear
                  </a>
                </div>

                <div className="hidden lg:flex space-x-6">
                  {/* {categories.map((cat) => (
                    <a
                      key={cat.name}
                      href={cat.href}
                      className="text-gray-700 hover:text-purple-600"
                    >
                      {cat.name}
                    </a>
                  ))} */}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="hidden sm:block border rounded-full px-4 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <Menu as="div" className="relative">
                    <Menu.Button className="flex rounded-full focus:outline-none">
                      {/* <img
                        alt="User"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&fit=facearea"
                        className="h-8 w-8 rounded-full"
                      /> */}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg py-1 ring-1 ring-black/5">
                      {["Your Profile", "Settings", "Sign out"].map((item, i) => (
                        <Menu.Item key={i}>
                          {({ active }) => (
                            <a
                              href="/"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>

                  <ShoppingCartIcon
                    onClick={openCart}
                    className="cursor-pointer w-2.5 h-2.5"
                  />
                </div>

                <div className="sm:hidden flex items-center">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                    {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden px-6 pt-4 pb-3 space-y-1 bg-white">
              {/* {categories.map((cat) => (
                <Disclosure.Button
                  key={cat.name}
                  as="a"
                  href={cat.href}
                  className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {cat.name}
                </Disclosure.Button>
              ))} */}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Cart isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
