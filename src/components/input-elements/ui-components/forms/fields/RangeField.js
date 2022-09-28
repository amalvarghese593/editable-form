import React, { Fragment, useState, useEffect } from "react";
import withInputGroup from "../composites/withInputGroup";

const AddOn = () => {
  return (
    <button className="arithmetic-controls">
      <div className="inc-ctrl">
        <i className="fas fa-plus"></i>
      </div>
      <div className="dec-ctrl">
        <i className="fas fa-minus"></i>
      </div>
    </button>
  );
};
const FromInput = withInputGroup({ addon: AddOn });
const ToInput = withInputGroup({ addon: AddOn });

const RangeField = ({
  label,
  onChange,
  onBlur,
  name,
  error,
  touched,
  value,
}) => {
  // const [from, setFrom] = useState(0);
  // const [to, setTo] = useState(0);
  // const onChangeFrom = (e) => setFrom(e.target.value);
  // const onChangeTo = (e) => setTo(e.target.value);
  // useEffect(() => {
  //   onChange({ from, to });
  // }, [from, to]);

  return (
    <Fragment>
      <label className="inp-grp-label">{label}</label>
      <div className="range-inp-grp">
        <FromInput
          type="number"
          label={"From"}
          value={value.from}
          // value={from}
          onChange={onChange}
          onBlur={onBlur}
          // onChange={onChangeFrom}
          name={name.from}
          error={touched?.from && error?.from}
        />
        <ToInput
          type="number"
          label={"To"}
          value={value.to}
          // value={to}
          onChange={onChange}
          // onChange={onChangeTo}
          onBlur={onBlur}
          name={name.to}
          error={touched?.to && error?.to}
        />
      </div>
    </Fragment>
  );
};

export default RangeField;
