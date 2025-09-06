import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-black w-full">

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 py-12">
        
        <div>
          <h4 className="font-semibold mb-3">Store Location</h4>
          <p className="text-sm text-gray-600">
            500 Terry Francine Street <br />
            San Francisco, CA 94158
          </p>
          <p className="text-sm text-gray-600 mt-2">
            techWear@techWear.com <br /> 123-456-7890
          </p>
          <div className="flex space-x-4 mt-4 text-xl">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#">Shop All</a></li>
            <li><a href="#">Computers</a></li>
            <li><a href="#">Tablets</a></li>
            <li><a href="#">Drones & Cameras</a></li>
            <li><a href="#">Audio</a></li>
            <li><a href="#">Mobile</a></li>
            <li><a href="#">T.V & Home Cinema</a></li>
            <li><a href="#">Wearable Tech</a></li>
            <li><a href="#">Sale</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Customer Support</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h4 className="font-semibold mb-3">Policy</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Payment Methods</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6 text-center">
        <p className="text-sm mb-4">We accept the following payment methods</p>
        <div className="flex justify-center space-x-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt="Visa"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
            alt="MasterCard"
            className="h-8"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © 2035 by TechShed. Powered and secured by Tech Wear
      </div>
    </footer>
  );
}
