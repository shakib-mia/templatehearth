// "use client";

import Link from "next/link";
import Button from "../Button/Button";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { TbBrandGumroad } from "react-icons/tb";
import axios from "axios";
import { HiMiniChevronDoubleRight } from "react-icons/hi2";
// import { useEffect, useState } from "react";
// import { useState } from "react";

export default async function Footer() {
  // const [services, setServices] = useState([]);
  const { data: services } = await axios.get(
    "https://templatehearth-be.onrender.com/services/all"
  );

  // console.log(services);

  // useEffect(() => {
  //   axios
  //     .get("https://templatehearth-be.onrender.com/services/all")
  //     .then(({ data }) => setServices(data));
  // }, []);

  return (
    <footer className="bg-muted-100 pt-10 pb-8">
      <div className="px-4 max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold">TemplateHearth</h3>
            <p className="text-sm my-4">
              Your trusted hub for beautiful & modern templates. Ready. Set.
              Launch.
            </p>

            <div className="flex gap-2 items-center">
              <a
                href="https://www.facebook.com/templatehearth"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center w-10 aspect-square rounded-full bg-accent text-white border border-accent hover:bg-white hover:text-accent transition text-xl"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.youtube.com/@TemplateHearth"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center w-10 aspect-square rounded-full bg-accent text-white border border-accent hover:bg-white hover:text-accent transition text-xl"
              >
                <FaYoutube />
              </a>

              <a
                href="https://www.linkedin.com/in/templatehearth"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center w-10 aspect-square rounded-full bg-accent text-white border border-accent hover:bg-white hover:text-accent transition text-xl"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://x.com/TemplateHearth"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center w-10 aspect-square rounded-full bg-accent text-white border border-accent hover:bg-white hover:text-accent transition text-xl"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://www.instagram.com/templatehearth"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center w-10 aspect-square rounded-full bg-accent text-white border border-accent hover:bg-white hover:text-accent transition text-xl"
              >
                <FaInstagram />
              </a>

              <a
                href="https://templatehearth.gumroad.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center w-10 aspect-square rounded-full bg-accent text-white border border-accent hover:bg-white hover:text-accent transition text-xl"
              >
                <TbBrandGumroad />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary flex gap-1 items-center"
                >
                  <HiMiniChevronDoubleRight />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="hover:text-primary flex gap-1 items-center"
                >
                  <HiMiniChevronDoubleRight />
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="hover:text-primary flex gap-1 items-center"
                >
                  <HiMiniChevronDoubleRight />
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-primary flex gap-1 items-center"
                >
                  <HiMiniChevronDoubleRight />
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-primary flex gap-1 items-center"
                >
                  <HiMiniChevronDoubleRight />
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Services</h4>
            <ul className="space-y-2">
              {services.map(({ _id, title, slug }) => (
                <li key={_id}>
                  <Link
                    href={`/services/${slug}`}
                    className="flex gap-1 items-center hover:text-primary"
                  >
                    <HiMiniChevronDoubleRight /> {title}
                  </Link>
                </li>
              ))}
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
              <Button type="submit" className="!px-2 !py-2 text-sm">
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
