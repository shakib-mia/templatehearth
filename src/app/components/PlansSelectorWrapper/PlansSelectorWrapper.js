"use client";

import React, { useState } from "react";
import PlanCategorySelector from "../PlanCategorySelector/PlanCategorySelector";
import { PricingGrid } from "../PricingGrid/PricingGrid";

const PlansSelectorWrapper = ({ pricing, country, currency }) => {
  const [category, setCategory] = useState("web-development");
  return (
    <div className="container my-10">
      {/* <aside>
        <PlanCategorySelector category={category} setCategory={setCategory} />
      </aside> */}
      {/* <aside className="col-span-1 lg:col-span-4"> */}
      <PricingGrid
        pricing={pricing}
        country={country}
        currency={currency}
        category={category}
      />
      {/* </aside> */}
    </div>
  );
};

export default PlansSelectorWrapper;
