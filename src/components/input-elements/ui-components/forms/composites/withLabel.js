import React from "react";

const withLabel = (Component) => {
  return ({
    type,
    onChange = () => {},
    onBlur = () => {},
    children,
    label = "",
    value = "",
    name,
  }) => {
    return (
      <div className="inp-cntr">
        <label className="label">{label || children}</label>
        <Component
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          label={label}
          value={value}
          name={name}
        />
      </div>
    );
  };
};
export default withLabel;
