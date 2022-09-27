import { useState } from "react";
import RangeField from "./components/input-elements/ui-components/forms/fields/RangeField";
import "./App.css";
import {
  TextField,
  PhoneNumberField,
  NumberField,
} from "./components/input-elements/ui-components/index";

function App() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    salary: {
      from: 0,
      to: 0,
    },
  });
  const [error, setError] = useState({
    name: "Required",
    phone: "Required",
    salary: {
      from: "Required",
      to: "Required",
    },
  });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    salary: {
      from: false,
      to: false,
    },
  });
  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError((prev) => ({
      ...prev,
      [e.target.name]: e.target.value ? "" : "required",
    }));
  };
  const { name, phone } = form;
  const [isEditable, setIsEditable] = useState(true);
  const handleClick = () => setIsEditable((prev) => !prev);

  return (
    <div className="cntr">
      <div className="form-cntr">
        <div className="hdr">
          <h1>Fill your profile</h1>
          <button type="button" onClick={handleClick}>
            Edit
          </button>
        </div>
        <RangeField
          // error="Required"
          label="Salary"
          name="salary"
          // onBlur={onBlur}
          onChange={(e) => {
            setForm((prev) => ({
              ...prev,
              salary: e,
            }));
          }}
        />
        <p></p>
        <TextField
          name="name"
          error={touched.name && error.name}
          label={"Name"}
          onChange={onChange}
          onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          value={name}
          isEditable={isEditable}
        />
        <p></p>
        <PhoneNumberField
          // error="Required"
          type="number"
          name="phone"
          label={"Phone"}
          onChange={(e) => {
            setForm((prev) => ({
              ...prev,
              phone: e.target.value,
            }));
          }}
          // onBlur={onBlur}
          value={phone}
        />
        <p></p>
        <button type="submit" onClick={() => console.log("values: ", form)}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
