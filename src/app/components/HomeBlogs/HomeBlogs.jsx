import React from "react";
import Blogs from "../Blogs/Blogs";
import SeeAllButton from "../SeeAllButton/SeeAllButton";

const HomeBlogs = () => {
  return (
    <section className="container">
      <h5 className="text-primary">Our Blogs</h5>
      <h3 className="font-semibold lg:w-5/12 mt-4">
        Insights, Tips, and Resources to Help You Build Better Websites
      </h3>

      <Blogs route="/" />

      <div className="mt-8 flex justify-center">
        <SeeAllButton path={"/blogs"}>Read All Blogs</SeeAllButton>
      </div>
    </section>
  );
};

export default HomeBlogs;
