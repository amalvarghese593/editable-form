import React from "react";
import "../input.css";

const TextField = ({
  name,
  label = null,
  onChange = () => {},
  onBlur = () => {},
  value = "",
  isEditable,
  error,
  type = "text",
}) => (
  <div className="inp-cntr" data-editable={!isEditable ? "false" : ""}>
    <label className="label">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
    />
    {error && <small className="error">{error}</small>}
  </div>
);

export default TextField;
