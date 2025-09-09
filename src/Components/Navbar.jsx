import React, { useEffect, useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { 
  ShoppingCartIcon, 
  UserIcon, 
  HeartIcon,
  BellIcon 
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Cart from "./Pages/Cart/Cart";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const categories = [
  { name: "Electronics", href: "/products?category=electronics" },
  { name: "Smartphones", href: "/products?category=smartphones" },
  { name: "Laptops", href: "/products?category=laptops" },
  { name: "Audio", href: "/products?category=audio" },
  { name: "Accessories", href: "/products?category=accessories" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    const interval = setInterval(updateCartCount, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Free Shipping on orders over $50
            </span>
            <span className="hidden md:block">|</span>
            <span className="hidden md:block">24/7 Customer Support</span>
          </div>
          <div className="hidden sm:flex space-x-4">
            {navigation.slice(0, 3).map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className="hover:text-purple-200 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <Disclosure as="nav" className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
      }`}>
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-6 lg:px-20">
              <div className="flex h-20 items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => navigate("/")}
                    className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
                  >
                    TechWear
                  </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-8">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.href)}
                      className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-200"></span>
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-lg mx-8">
                  <form onSubmit={handleSearch} className="w-full relative">
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search products, brands, categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </form>
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center space-x-4">
                  {/* Wishlist */}
                  <button className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors duration-200">
                    <HeartIcon className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </button>

                  {/* Notifications */}
                  <button className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors duration-200">
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  </button>

                  {/* Cart */}
                  <button
                    onClick={openCart}
                    className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
                  >
                    <ShoppingCartIcon className="h-6 w-6" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                        {cartCount}
                      </span>
                    )}
                  </button>

                  {/* User Menu */}
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-white" />
                      </div>
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl py-2 ring-1 ring-black/5 z-50">
                      {["Profile", "Orders", "Wishlist", "Settings", "Sign out"].map((item, i) => (
                        <Menu.Item key={i}>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                              )}
                            >
                              {item}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>

                  {/* Mobile menu button */}
                  <div className="lg:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200">
                      {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            <Disclosure.Panel className="lg:hidden bg-white border-t border-gray-200">
              <div className="px-6 py-4 space-y-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </form>

                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        navigate(item.href);
                        // Close mobile menu if needed
                      }}
                      className="block w-full text-left px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>

                {/* Mobile Categories */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => navigate(cat.href)}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Cart isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
