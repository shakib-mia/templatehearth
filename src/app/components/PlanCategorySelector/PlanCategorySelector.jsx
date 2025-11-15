"use client";

import React from "react";

const PlanCategorySelector = ({ category, setCategory }) => {
  return (
    <>
      <h5 className="font-semibold mb-2">Select A Category</h5>

      <ul className="space-y-2">
        <li className="flex items-start gap-2">
          <label
            htmlFor="web-design-and-development"
            className="text-gray-800 relative"
          >
            <aside className="absolute left-0 top-0 bottom-0 my-auto">
              <input
                onChange={(e) =>
                  e.target.checked && setCategory("web-development")
                }
                id="web-design-and-development"
                checked={category === "web-development"}
                type="radio"
                name="category"

                //   className="inline-block"
              />
            </aside>
            <p>
              {" "}
              &nbsp; &nbsp; &nbsp; Web Design and Development with all modern
              features included
            </p>
          </label>
        </li>

        <li className="flex items-start gap-2">
          <label htmlFor="video-editing" className="text-gray-800 relative">
            <aside className="absolute left-0 top-0 bottom-0 my-auto">
              <input
                onChange={(e) =>
                  e.target.checked && setCategory("video-editing")
                }
                id="video-editing"
                checked={category === "video-editing"}
                type="radio"
                name="category"

                //   className="inline-block"
              />
            </aside>
            <p>
              {" "}
              &nbsp; &nbsp; &nbsp; Video Editing with cinematic effects and
              motion graphics
            </p>
          </label>
        </li>
      </ul>
    </>
  );
};

export default PlanCategorySelector;
