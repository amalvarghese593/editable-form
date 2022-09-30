import React, { useEffect } from "react";
import "../input.css";

const TextField = React.forwardRef(
  (
    {
      name,
      label = null,
      onChange = () => {},
      onBlur = () => {},
      value = "",
      isEditable = true,
      error,
      type = "text",
      placeholder = "",
      ...rest
    },
    ref
  ) => (
    <div className="inp-cntr" data-editable={!isEditable ? "false" : ""}>
      <label className="label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        placeholder={!label ? placeholder : ""}
        ref={ref}
        {...rest}
      />
      {error && <small className="error">{error}</small>}
    </div>
  )
);

export default TextField;
