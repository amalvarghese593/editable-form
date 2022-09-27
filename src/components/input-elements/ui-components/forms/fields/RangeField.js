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

const RangeField = ({ label, onChange }) => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const onChangeFrom = (e) => setFrom(e.target.value);
  const onChangeTo = (e) => setTo(e.target.value);
  useEffect(() => {
    onChange({ from, to });
  }, [from, to]);

  return (
    <Fragment>
      <label className="inp-grp-label">{label}</label>
      <div className="range-inp-grp">
        <FromInput
          type="number"
          label={"From"}
          value={from}
          onChange={onChangeFrom}
        />
        <ToInput type="number" label={"To"} value={to} onChange={onChangeTo} />
      </div>
    </Fragment>
  );
};

export default RangeField;
