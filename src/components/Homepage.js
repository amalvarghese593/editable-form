import React, { useState } from "react";
import { TextFieldWithLabel } from "./TextField";
import "./index.css";

export const Homepage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const handleClick = () => setIsEditable((prev) => !prev);
  return (
    <form className="form-cntr" data-editable={!isEditable ? "false" : ""}>
      <button type="button" onClick={handleClick}>
        Edit
      </button>
      <div className="form-ctrl-wpr">
        <div className="form-ctrl">
          <TextFieldWithLabel value="Amal" placeholder="Name">
            Name
          </TextFieldWithLabel>
        </div>
        <div className="form-ctrl">
          <TextFieldWithLabel placeholder="Email">Email</TextFieldWithLabel>
        </div>
        <div className="form-ctrl">
          <TextFieldWithLabel placeholder="Phone">Phone</TextFieldWithLabel>
        </div>
      </div>
    </form>
  );
};
