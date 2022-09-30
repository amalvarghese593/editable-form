import React, { useState } from "react";
import RangeField from "./components/input-elements/ui-components/forms/fields/RangeField";
import "./App.css";
import {
  TextField,
  PhoneNumberField,
} from "./components/input-elements/ui-components/index";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTagsInput } from "./hooks/useTagsInput";
import ComboBoxAutocomplete from "combobox";

const skills = [...Array(50)].map((_, idx) => `item${idx + 1}`);

function App() {
  const { DefaultUi } = useTagsInput();
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    salary: {
      from: "",
      to: "",
    },
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("req field"),
    email: Yup.string().email("not valid email").required("req field"),
    phone: Yup.string()
      .required("req field")
      .length(10, "Invalid phone number"),
    // .matches(new RegExp("[.]", "g"), "dots not allowed"),
    salary: Yup.object({
      from: Yup.number().required("req field"),
      to: Yup.number().required("req field"),
    }),
    // salary: {
    //   from: Yup.number().required("req field"),
    //   to: Yup.number().required("req field"),
    // },
  });
  const onSubmit = (val) => {
    console.log(val);
  };
  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  // const [form, setForm] = useState({
  //   name: "",
  //   phone: "",
  //   salary: {
  //     from: 0,
  //     to: 0,
  //   },
  // });
  // const [error, setError] = useState({
  //   name: "Required",
  //   phone: "Required",
  //   salary: {
  //     from: "Required",
  //     to: "Required",
  //   },
  // });
  // const [touched, setTouched] = useState({
  //   name: false,
  //   phone: false,
  //   salary: {
  //     from: false,
  //     to: false,
  //   },
  // });
  // const onChange = (e) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  //   // setError((prev) => ({
  //   //   ...prev,
  //   //   [e.target.name]: e.target.value ? "" : "required",
  //   // }));
  // };
  // // const { name, phone } = form;
  const [isEditable, setIsEditable] = useState(true);
  const handleClick = () => setIsEditable((prev) => !prev);
  const onCreateOption = () => {
    console.log("create new option");
  };
  return (
    <div className="cntr">
      <div className="form-cntr">
        <div className="hdr">
          <h1>Fill your profile</h1>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleClick}
          >
            Edit
          </button>
        </div>
        <div className="mb-20">
          <TextField
            name="name"
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
            label={"Name"}
            // onChange={onChange}
            // onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isEditable={isEditable}
          />
        </div>
        <div className="mb-20">
          <TextField
            type="email"
            name="email"
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
            label={"email"}
            // onChange={onChange}
            // onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isEditable={isEditable}
          />
        </div>
        <div className="mb-20">
          <PhoneNumberField
            // error="Required"
            type="number"
            name="phone"
            label={"Phone"}
            // onChange={(e) => {
            //   setForm((prev) => ({
            //     ...prev,
            //     phone: e.target.value,
            //   }));
            // }}
            // onBlur={onBlur}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            error={formik.touched.phone && formik.errors.phone}
          />
        </div>
        <div className="mb-20">
          <RangeField
            // error="Required"
            label="Salary"
            name={{ from: "salary.from", to: "salary.to" }}
            // onBlur={onBlur}
            // onChange={(e) => {
            //   setForm((prev) => ({
            //     ...prev,
            //     salary: e,
            //   }));
            // }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.salary}
            error={formik.errors.salary}
            touched={formik.touched.salary}
          />
        </div>
        {/* <div className="mb-40">{DefaultUi("Enter Fruits", true, 6)}</div> */}
        <div className="mb-40">
          <ComboBoxAutocomplete
            // isTagsInside
            tagsCountLimit={6}
            options={skills}
            // options={apiSkills}
            placeholder="Select Skills"
            virtualized={false}
            components={{
              InputControl: React.forwardRef((props, ref) => (
                <TextInput isEditable={isEditable} {...props} ref={ref} />
              )),
            }}
            creatable={(newSkill) => newSkill}
            name="skills"
            // value={values.skills}
            onCreateNewOption={() => console.log("crt nw optn")}
            onApply={(ee) => {
              // setTouched({ skills: true });
              // setFieldValue("skills", ee, true);
              console.log("onapply");
            }}
            // error={touched.skills && errors.skills}
          />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={formik.handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;

const TextInput = React.forwardRef((props, ref) => {
  return (
    <>
      {/* <input className="custom-input" ref={ref} {...props} /> */}
      <TextField ref={ref} {...props} />
    </>
  );
});
