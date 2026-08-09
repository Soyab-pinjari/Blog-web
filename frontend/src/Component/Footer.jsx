import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-blue-50 mt-16 relative w-full mt-0">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo */}
        <div>
          <h2 className="text-4xl font-extrabold">
            Blogy<span className="text-blue-600">.</span>
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            A platform to read and share knowledge with the world.
          </p>

          <div className="flex gap-3 mt-6">
            <a
              href="#"
              className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-sky-500 hover:text-white transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-pink-500 hover:text-white transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-blue-700 hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-5">Quick Links</h3>

          <ul className="space-y-3 text-gray-600">
            <li><Link to={'/'} className="hover:text-blue-600">Home</Link></li>
            <li><Link to={'/blogs'} className="hover:text-blue-600">Blogs</Link></li>
            <li><a href="/categories" className="hover:text-blue-600">Categories</a></li>
            <li><a href="/about" className="hover:text-blue-600">About</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-lg mb-5">Categories</h3>

          <ul className="space-y-3 text-gray-600">
            <li>Technology</li>
            <li>Lifestyle</li>
            <li>Travel</li>
            <li>Programming</li>
            <li>Business</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-lg mb-5">Legal</h3>

          <ul className="space-y-3 text-gray-600">
            <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-600">Disclaimer</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Blogy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;