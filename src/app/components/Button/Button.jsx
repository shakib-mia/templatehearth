import React from "react";

const Button = ({ outline, type = "button", children, onClick }) => {
  if (outline)
    return (
      <button
        type={type}
        className="px-6 py-3 border-accent text-accent rounded-lg cursor-pointer"
      >
        {children}
      </button>
    );
  else
    return (
      <button
        type={type}
        className="px-6 py-3 bg-accent hover:bg-white border border-accent transition hover:text-accent text-white rounded-lg cursor-pointer"
      >
        {children}
      </button>
    );
};

export default Button;
