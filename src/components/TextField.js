import React from "react";

const TextField = ({ placeholder, ...rest }) => (
  <input type="text" placeholder={placeholder} {...rest} />
);

const withLabel = (Comp) => {
  return ({ children, ...rest }) => (
    <>
      <label>{children}</label>
      <Comp {...rest} />
    </>
  );
};

export const TextFieldWithLabel = withLabel(TextField);
