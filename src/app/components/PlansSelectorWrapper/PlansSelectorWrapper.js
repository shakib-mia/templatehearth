import React from "react";
import { PricingGrid } from "../PricingGrid/PricingGrid";

const PlansSelectorWrapper = ({ pricing, country, currency }) => {
  return (
    <div className="container my-10">
      <PricingGrid pricing={pricing} country={country} currency={currency} />
    </div>
  );
};

export default PlansSelectorWrapper;
