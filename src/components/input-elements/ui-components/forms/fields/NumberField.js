import React from "react";
import withInputGroup from "../composites/withInputGroup";

const AddOn = () => {
  return (
    <button className="arithmetic-controls">
      <div className="inc-ctrl">
        <i className="fas fa-caret-up"></i>
      </div>
      <div className="dec-ctrl">
        <i className="fas fa-caret-down"></i>
      </div>
    </button>
  );
};
const Prepend = () => {
  return <span className="inp-grp-txt">$</span>;
};

const InputGroup = withInputGroup({ addon: AddOn });

const NumberField = ({ onChange = () => {}, ...rest }) => {
  return <InputGroup onChange={onChange} {...rest} />;
};

export default NumberField;

const Decrement = () => (
  // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
  //   <path d="M136.5 185.1l116 117.8c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L128 224.7 27.6 326.9c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17l116-117.8c4.7-4.6 12.3-4.6 17 .1z" />
  // </svg>
  <i className="fa fa-caret-up"></i>
);
const Increment = () => (
  // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
  //   <path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" />
  // </svg>
  <i className="fa fa-caret-down"></i>
);
