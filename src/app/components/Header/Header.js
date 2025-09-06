import Image from "next/image";
import React from "react";
import hero from "@/app/assets/hero-2.png";
import Button from "../Button/Button";

const Header = () => {
  return (
    <div className="relative">
      <>
        <div
          style={{
            backgroundImage: `url(${hero.src})`,
          }}
          className="bg-no-repeat bg-none lg:bg-cover bg-right hide-bg-mobile absolute left-1/2 top-0 w-1/2 h-full"
        ></div>
        <div className="w-full h-full absolute left-0 top-0 from-muted-100 via-muted-100 to-transparent bg-gradient-to-r z-[0]"></div>
        <div className="container relative">
          <div className="pt-20 pb-10 lg:pb-16 lg:pt-28 w-full lg:w-8/12">
            <h1 className="font-bold">
              Modern Designs for Ambitious Brands Simplified
            </h1>
            <p className="pt-2 pb-6 lg:w-5/6 text-base lg:text-xl">
              Get ready to launch beautifully designed, fully responsive
              templates that simplify the website building process and help you
              create stunning online experiences with ease.
            </p>

            <Button>Get Started</Button>
          </div>
        </div>
      </>
    </div>
  );
};

export default Header;
