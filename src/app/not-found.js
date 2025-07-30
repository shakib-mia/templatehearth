import React from "react";
import notFound from "./assets/404.png";
import Image from "next/image";
import Button from "./components/Button/Button";
import Link from "next/link";

const page = () => {
  return (
    <div className="pb-10 lg:pb-16 container">
      <Image src={notFound} alt="not found" className="lg:w-2/3 mx-auto" />

      <div className="text-center mt-4 space-y-2">
        <h1 className="lg:text-7xl lg:mb-4 text-highlight">Oops</h1>
        <p className="lg:text-xl mb-4">Looks like this page doesn’t exist.</p>

        <Link href={"/"}>
          <Button>Back To Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
