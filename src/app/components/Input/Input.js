import React from "react";

const Input = ({ textarea, ...rest }) => {
  return <>{textarea ? <textarea {...rest} /> : <input {...rest} />}</>;
};

export default Input;
