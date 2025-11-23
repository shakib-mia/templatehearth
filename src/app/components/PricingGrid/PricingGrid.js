// "use client";
// import { useState } from "react";
// import Button from "../Button/Button";
import Plan from "../Plan/Plan";

export const PricingGrid = ({ pricing, country, currency }) => {
  return (
    <>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-6`}
      >
        {pricing[1].plans.map((plan, key) => (
          <Plan
            {...plan}
            key={key}
            // country={country} currency={currency}
          />
        ))}
      </div>
    </>
  );
};
