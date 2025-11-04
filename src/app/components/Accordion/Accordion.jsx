"use client";

import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi"; // Chevron icon

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden"
          data-animate="fade-in-left"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex items-center justify-between cursor-pointer bg-primary-light p-4 font-medium"
          >
            <span>{item.title}</span>
            <HiChevronDown
              className={`w-5 h-5 transform transition-transform duration-300 ${
                activeIndex === index ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              activeIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <p className="p-4 text-gray-700">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
