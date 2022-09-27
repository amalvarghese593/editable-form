import React from "react";

const withLabel = (Component) => {
  return ({ type, onChange = () => {}, children, label = "", value = "" }) => {
    return (
      <div className="inp-cntr">
        <label className="label">{label || children}</label>
        <Component
          onChange={onChange}
          type={type}
          label={label}
          value={value}
        />
      </div>
    );
  };
};
export default withLabel;
