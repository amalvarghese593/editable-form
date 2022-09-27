import React from "react";
import Input from "../core/Input";
import withLabel from "./withLabel";

const CoreInput = withLabel(Input);

const withInputGroup = (components) => {
  return ({ type, text, onChange, value, error, label }) => {
    let PrependComponent = components?.prepend;
    let AddOn = components?.addon;

    return (
      <section className="inp-grp">
        {text ? (
          <span className="inp-grp-txt">@</span>
        ) : (
          PrependComponent && <PrependComponent />
        )}
        <CoreInput
          label={label}
          value={value || ""}
          type={type}
          onChange={onChange}
        />
        {AddOn && <AddOn />}
        {error && <small className="error">{error}</small>}
      </section>
    );
  };
};

export default withInputGroup;
