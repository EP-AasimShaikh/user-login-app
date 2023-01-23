import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    emailId: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
  });

  const loginUser = async (loginData) => {
    console.log(loginData);
    const res = await axios.post("http://localhost:3000/login", loginData);
    if (res.data.status === "SUCCESS") {
      navigate("/homepage", {
        state: res.data,
      });
    } else {
      setLoginError(res.data.reasonText);
    }
  };

  return (
    <React.Fragment>
      <div className="ui  form container">
        <div className="four wide field">
          <button
            className="ui fluid small teal submit button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>

        <Formik
          autoComplete="off"
          initialValues={{
            emailId: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={loginUser}
        >
          {({ resetForm }) => {
            return (
              <Form className="ui form">
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
                {loginError !== "" ? (
                  <div className="ui negative message ui red message">
                    {loginError}
                  </div>
                ) : (
                  ""
                )}
                <button
                  className="ui primary button"
                  type="button"
                  onClick={(e) => {
                    resetForm();
                    setLoginError("");
                  }}
                >
                  Reset
                </button>
                <button className="ui button" type="submit">
                  Login
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default Login;
