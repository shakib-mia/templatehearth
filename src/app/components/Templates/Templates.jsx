import Image from "next/image";
import React from "react";
import Button from "../Button/Button";
import SeeAllButton from "../SeeAllButton/SeeAllButton";

const Templates = () => {
  return (
    <div className="bg-muted">
      <section className="container">
        <h5 className="text-primary">Top Templates</h5>
        <h3 className="font-semibold lg:w-5/12 mt-4">
          We provide the Perfect Solution to your business growth
        </h3>

        <div className="grid grid-cols-2 gap-4 mt-16">
          <article>
            <Image
              width={600}
              height={100}
              src="https://i.ibb.co/tTt79Q94/Nexcent-Thumb.png"
              alt=""
              className="w-full"
            />
          </article>
          <article>
            <Image
              width={600}
              height={100}
              src="https://i.ibb.co/tTt79Q94/Nexcent-Thumb.png"
              alt=""
              className="w-full"
            />
          </article>
          <article>
            <Image
              width={600}
              height={100}
              src="https://i.ibb.co/tTt79Q94/Nexcent-Thumb.png"
              alt=""
              className="w-full"
            />
          </article>
          <article>
            <Image
              width={600}
              height={100}
              src="https://i.ibb.co/tTt79Q94/Nexcent-Thumb.png"
              alt=""
              className="w-full"
            />
          </article>
        </div>

        <SeeAllButton />
      </section>
    </div>
  );
};

export default Templates;
