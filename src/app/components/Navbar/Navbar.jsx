"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import logo from "@/app/assets/logo.png";
import Image from "next/image";
import Button from "../Button/Button";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  console.log(pathname);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY === 0);

      if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/templates",
      text: "Templates",
    },
    {
      href: "/pricing",
      text: "Pricing",
    },
    {
      href: "/services",
      text: "Services",
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full py-2 lg:py-4 z-50 transition-all duration-300 ${
        show ? "translate-y-0" : "-translate-y-[150%]"
      } ${isAtTop ? "bg-transparent shadow-none" : "bg-white shadow-lg"}`}
    >
      <div className="container">
        <div className="relative flex items-center h-16">
          {/* Left: Logo */}
          <div className="flex-1 min-w-0">
            <Link href="/" className="inline-flex items-center space-x-2">
              <Image
                src={logo}
                alt="Logo"
                width={140}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Nav Items (absolute center) */}
          <div className="hidden lg:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {links.map(({ href, text }, key) => (
              <Link
                href={href}
                key={key}
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                {text}
              </Link>
            ))}
          </div>

          {/* Right: CTA Button */}
          <div className="hidden lg:flex flex-1 justify-end">
            <Button>Contact Us</Button>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden ml-2">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow">
          <Link href="/" className="block text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link
            href="/templates"
            className="block text-gray-700 hover:text-indigo-600"
          >
            Templates
          </Link>
          <Link
            href="/pricing"
            className="block text-gray-700 hover:text-indigo-600"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="block text-gray-700 hover:text-indigo-600"
          >
            Contact
          </Link>
          <Link
            href="/get-started"
            className="block text-center mt-2 px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}
