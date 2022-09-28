import React from "react";
import Input from "../core/Input";
import withLabel from "./withLabel";

const CoreInput = withLabel(Input);

const withInputGroup = (components) => {
  return ({ type, text, onChange, onBlur, value, name, error, label }) => {
    let PrependComponent = components?.prepend;
    let AddOn = components?.addon;

    return (
      <section className="inp-grp">
        {text ? (
          <span className="inp-grp-txt">@</span>
        ) : (
          PrependComponent && <PrependComponent />
        )}
        <div className="core-inp-cntr">
          <CoreInput
            label={label}
            value={value || ""}
            name={name}
            type={type}
            onChange={onChange}
            onBlur={onBlur}
          />
          {error && <small className="error">{error}</small>}
        </div>
        {AddOn && <AddOn />}
      </section>
    );
  };
};

export default withInputGroup;
