import React from "react";
import withInputGroup from "../composites/withInputGroup";

const PrependControl = () => (
  <select>
    {["IN", "US", "UK", "SL"].map((code, idx) => (
      <option value={code} key={idx}>
        {code}
      </option>
    ))}
  </select>
);

const InputGroup = withInputGroup({ prepend: PrependControl });

const PhoneNumberField = ({ onChange = () => {}, ...rest }) => (
  <section>
    <InputGroup onChange={onChange} {...rest} />
  </section>
);

export default PhoneNumberField;
