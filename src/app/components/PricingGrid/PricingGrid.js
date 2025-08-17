"use client";
import { useState } from "react";
import Button from "../Button/Button";

export const PricingGrid = ({ pricing, country, currency }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleExpand = () => {
    setVisibleCount(visibleCount < pricing.length ? pricing.length : 3);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricing.slice(0, visibleCount).map((plan) => (
          <div
            key={plan._id}
            className="p-5 border rounded-lg flex flex-col justify-between"
          >
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-sm mb-2">{plan.tagline}</p>
            <p className="mb-2">
              Starts From:{" "}
              <span className="font-semibold">
                {currency}{" "}
                {country === "BD"
                  ? plan.price.bdt.toLocaleString()
                  : country === "IN"
                  ? plan.price.inr.toLocaleString()
                  : plan.price.usd.toLocaleString()}
              </span>
            </p>
            <ul className="text-sm list-disc list-inside mb-2">
              {plan.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
            <p className="mt-2 text-gray-500">
              Delivery: {plan.delivery_days} days
            </p>
          </div>
        ))}
      </div>

      {pricing.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Button onClick={handleExpand}>
            {visibleCount < pricing.length ? "Expand" : "Collapse"}
          </Button>
        </div>
      )}
    </>
  );
};
