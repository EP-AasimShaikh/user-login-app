import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const valid = /^[a-zA-Z '-.]+$/i;
  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(valid, "Special character not allowed")
      .required("First Name required"),
    lastName: Yup.string()
      .matches(valid, "Special character not allowed")
      .required("Last Name required"),
    emailId: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
  });

  async function submitForm(registerUser) {
    console.log(registerUser);

    const res = await axios.post(
      "http://localhost:3000/register",
      registerUser
    );
    if (res.data.status === "SUCCESS") {
      navigate("/homepage", {
        state: res.data,
      });
    } else {
      setRegisterError(res.data.reasonText);
    }
  }

  const [registerError, setRegisterError] = useState("");
  return (
    <React.Fragment>
      <div className="ui  form container">
        <div className="four wide field">
          <button
            className="ui fluid small teal submit button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            emailId: "",
            password: "",
          }}
          validationSchema={registerSchema}
          onSubmit={submitForm}
        >
          {({ resetForm }) => {
            return (
              <Form className="ui form" autoComplete="off">
                <div className="field ten wide field">
                  <label>First Name</label>
                  <Field name="firstName" type="text" />
                  <ErrorMessage
                    component="div"
                    name="firstName"
                    className="invalid-feedback ui negative message ui red message"
                  />
                </div>

                <div className="field ten wide field">
                  <label>Last Name</label>
                  <Field name="lastName" type="text" />
                  <ErrorMessage
                    component="div"
                    name="lastName"
                    className="invalid-feedback ui negative message ui red message"
                  />
                </div>

                <div className="field ten wide field">
                  <label>Email Id</label>
                  <Field name="emailId" type="email" />
                  <ErrorMessage
                    component="div"
                    name="emailId"
                    className="invalid-feedback ui negative message ui red message"
                  />
                </div>

                <div className="field ten wide field">
                  <label>Enter Password</label>
                  <Field name="password" type="password" />
                  <ErrorMessage
                    component="div"
                    name="password"
                    className="invalid-feedback ui negative message ui red message"
                  />
                </div>
                {registerError !== "" ? (
                  <div className="ui negative message ui red message">
                    {registerError}
                  </div>
                ) : (
                  ""
                )}
                <button
                  className="ui primary button"
                  type="button"
                  onClick={(e) => {
                    resetForm();
                    setRegisterError("");
                  }}
                >
                  Reset
                </button>
                <button className="ui button" type="submit">
                  Register
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default Register;
