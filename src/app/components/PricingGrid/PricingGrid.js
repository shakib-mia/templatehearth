// "use client";
// import { useState } from "react";
// import Button from "../Button/Button";
import Plan from "../Plan/Plan";

export const PricingGrid = ({ pricing, country, currency, category }) => {
  const webDevCategory = pricing.find((item) => item.categoryId === category);

  console.log(category);

  return (
    <>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${
          category === "web-development" && "lg:grid-cols-3"
        } gap-6`}
      >
        {webDevCategory?.plans.map((plan, key) => (
          <Plan {...plan} key={key} country={country} currency={currency} />
        ))}
      </div>
    </>
  );
};
