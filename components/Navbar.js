"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/logo.jpg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav style={{backgroundColor:'rgb(222, 249, 196)'}}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo section */}
          <div className="flex-shrink-0">
            <Link href="/" legacyBehavior>
              <a className="text-white text-xl font-bold">
                <Image src={logo} alt="Logo" className="w-24 h-14 rounded-xl" />
              </a>
            </Link>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden sm:flex sm:ml-auto sm:space-x-4">
            <Link href="/" legacyBehavior>
              <a className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg">Home</a>
            </Link>
            <Link href="/pages/about" legacyBehavior>
              <a className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg">About</a>
            </Link>
            <Link href="/services" legacyBehavior>
              <a className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg">Services</a>
            </Link>
            <Link href="/pages/contact" legacyBehavior>
              <a className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg">Contact</a>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? 'true' : 'false'}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" legacyBehavior>
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
          </Link>
          <Link href="/services" legacyBehavior>
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</a>
          </Link>
          <Link href="/pages/contact" legacyBehavior>
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
