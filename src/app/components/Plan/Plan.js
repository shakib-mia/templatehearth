import React from "react";

const Plan = ({
  _id,
  name,
  tagline,
  price,
  features,
  delivery_days,
  // country,
  // currency,
}) => {
  return (
    <div className="p-6 bg-white border border-gray-200  rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 ">{name}</h3>
        <p className="text-sm text-gray-500 ">{tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-4">
        <span className="text-2xl font-semibold text-purple-600 ">
          {/* {currency}{" "}
          {country === "BD"
            ? (price.usd * 105).toLocaleString()
            : country === "IN"
            ? (price.usd * 85).toLocaleString()
            : price.usd.toLocaleString()} */}
          ${price.usd.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500 ml-1">starting</span>
      </div>

      {/* Features */}
      <ul className="mb-4 space-y-2 text-gray-700 list-disc list-inside">
        {features.map((f, idx) => (
          <li key={idx}>{f}</li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-200 text-gray-500 text-sm">
        Delivery: <span className="font-medium">{delivery_days} days</span>
      </div>
    </div>
  );
};

export default Plan;
