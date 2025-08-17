"use client"; // important for client-side interactivity

import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader/PageHeader";
import axios from "axios";
import Button from "../components/Button/Button";

const PricingPage = () => {
  const [pricing, setPricing] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [country, setCountry] = useState("");
  const headers = new Headers();
  const ip =
    headers.get("x-forwarded-for") || headers.get("x-real-ip") || "unknown";

  //   console.log(headers);
  const currency = country === "BD" ? "BDT" : country === "IN" ? "INR" : "USD";
  //   const price =
  //     ;

  useEffect(() => {
    axios
      .get("https://templatehearth-be.onrender.com/plans")
      .then((res) => setPricing(res.data))
      .catch((err) => console.error(err));

    axios.get("https://api.ipify.org?format=json").then(({ data }) => {
      const { ip } = data;
      axios
        .get(`https://ipinfo.io/${ip}?token=1ea4859427fd67`)
        .then(({ data }) => setCountry(data.country));
    });

    // fetch("/api/get-ip")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data.ip))
    //   .catch((err) => console.error(err));
  }, []);

  const handleExpand = () => {
    setVisibleCount(visibleCount < pricing.length ? pricing.length : 3);
    console.log(visibleCount);
  };

  return (
    <>
      <PageHeader
        title="Pricing"
        description="Explore custom web development pricing for Next.js + MERN stack projects. Get premium, scalable, and SEO-friendly landing pages, multipage websites, ecommerce stores, and SaaS solutions tailored to your business"
      />

      <div className="container my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricing.slice(0, visibleCount).map((plan, key) => (
            <div
              key={plan._id}
              className={` p-5 border rounded-lg flex flex-col justify-between`}
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

        {
          <div className="mt-6 flex justify-center">
            <Button onClick={handleExpand}>
              {visibleCount < pricing.length ? "Expand" : "Collapse"}
            </Button>
          </div>
        }
      </div>
    </>
  );
};

export default PricingPage;
