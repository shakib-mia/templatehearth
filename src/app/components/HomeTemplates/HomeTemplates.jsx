import React from "react";
import Templates from "../Templates/Templates";
import SeeAllButton from "../SeeAllButton/SeeAllButton";

const HomeTemplates = () => {
  return (
    <section className="bg-muted">
      <div className="container">
        <h5 className="text-primary">Top Templates</h5>
        <h3 className="font-semibold lg:w-5/12 mt-4">
          Discover the Perfect Template for your next project
        </h3>
        <div className="mt-10">
          <Templates route={"/"} />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <SeeAllButton path={"/templates"}>Explore All Templates</SeeAllButton>
      </div>
    </section>
  );
};

export default HomeTemplates;
