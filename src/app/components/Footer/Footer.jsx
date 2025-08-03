"use client";

import Link from "next/link";
import Button from "../Button/Button";

export default function Footer() {
  return (
    <footer className="bg-muted pt-10 pb-8">
      <div className="px-4 max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">TemplateHearth</h3>
            <p className="text-sm">
              Your trusted hub for beautiful & modern templates. Ready. Set.
              Launch.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="hover">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm mb-3">
              Get the latest templates in your inbox.
            </p>
            <form className="flex items-center space-x-2">
              <input type="email" placeholder="Enter your email" />
              <Button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-primary"></div>
      {/* Bottom */}
      <div className="mt-8 text-sm text-center">
        © {new Date().getFullYear()} TemplateHearth. All rights reserved.
      </div>
    </footer>
  );
}
