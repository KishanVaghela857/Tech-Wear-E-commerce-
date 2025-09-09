import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ShieldCheckIcon,
  TruckIcon,
  ArrowPathIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  const shopLinks = [
    { name: "All Products", href: "/products" },
    { name: "Laptops", href: "/products?category=laptops" },
    { name: "Smartphones", href: "/products?category=smartphones" },
    { name: "Audio", href: "/products?category=audio" },
    { name: "Accessories", href: "/products?category=accessories" },
    { name: "Home & Living", href: "/products?category=home-decoration" },
    { name: "Fragrances", href: "/products?category=fragrances" },
    { name: "Sale", href: "/products?sale=true" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "Help Center", href: "/help" },
    { name: "Track Your Order", href: "/track-order" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Warranty", href: "/warranty" },
    { name: "Live Chat", href: "/chat" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/story" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Investors", href: "/investors" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Partnerships", href: "/partnerships" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Accessibility", href: "/accessibility" },
    { name: "Sitemap", href: "/sitemap" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaPinterest, href: "#", label: "Pinterest" },
  ];

  const features = [
    { icon: TruckIcon, title: "Free Shipping", description: "On orders over $50" },
    { icon: ArrowPathIcon, title: "Easy Returns", description: "30-day return policy" },
    { icon: ShieldCheckIcon, title: "Secure Payment", description: "100% secure checkout" },
    { icon: ClockIcon, title: "24/7 Support", description: "Always here to help" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                TechWear
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Your premier destination for cutting-edge technology and innovative products. 
                We're committed to bringing you the latest and greatest in tech.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    500 Terry Francine Street<br />
                    San Francisco, CA 94158
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">hello@techwear.com</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <ClockIcon className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">Mon-Fri: 9AM-6PM PST</p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-6">
              Subscribe to our newsletter for exclusive deals, new arrivals, and tech insights.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="mb-6">
              <div className="flex flex-col space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Subscribe
                </button>
              </div>
            </form>

            <div className="space-y-3">
              <h5 className="font-semibold text-sm mb-3">Company</h5>
              {companyLinks.map((link, index) => (
                <div key={index}>
                  <button
                    onClick={() => navigate(link.href)}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 text-center sm:text-left">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-sm">{feature.title}</h5>
                  <p className="text-gray-400 text-xs">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h5 className="font-semibold mb-3">We Accept</h5>
              <div className="flex items-center space-x-4">
                <div className="bg-white p-2 rounded-lg">
                  <CreditCardIcon className="h-8 w-8 text-gray-600" />
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                    alt="Visa"
                    className="h-6"
                  />
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                    alt="MasterCard"
                    className="h-6"
                  />
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                    alt="American Express"
                    className="h-6"
                  />
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/PayPal.svg"
                    alt="PayPal"
                    className="h-6"
                  />
                </div>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <h5 className="font-semibold mb-3">Secure & Trusted</h5>
              <div className="flex items-center space-x-4">
                <div className="bg-white p-2 rounded-lg">
                  <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm text-gray-400">SSL Encrypted</span>
                <span className="text-gray-600">•</span>
                <span className="text-sm text-gray-400">PCI Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 TechWear. All rights reserved. | 
                <span className="ml-2">Powered by innovation, secured by trust.</span>
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center space-x-6">
              {legalLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => navigate(link.href)}
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
