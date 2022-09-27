import React from "react";

const Input = ({ onChange = () => {}, name = "", type = "text", ...rest }) => (
  <input {...rest} type={type} onChange={onChange} name={name} />
);

export default Input;
