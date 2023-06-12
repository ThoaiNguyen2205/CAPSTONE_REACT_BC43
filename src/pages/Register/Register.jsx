import React from "react";
import "../../assets/css/base.min.css";
import "../../assets/css/register.min.css";
import "../../assets/css/register.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { http } from "../../util/config";

const Register = () => {
  const navigate = useNavigate();
  const registerForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      gender: "true",
      phone: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("email is required")
        .email("Email is invalid !"),
      password: yup
        .string()
        .required("password is required!")
        .min(6, "6 - 32 characters")
        .max(32, "6 - 32 characters"),
      passwordConfirm: yup
        .string()
        .required("password is required")
        .min(6, "6 - 32 characters")
        .max(32, "6 - 32 characters")
        .oneOf([yup.ref("password")], "Passwords do not match"),
      name: yup.string().required("name is required"),
      phone: yup
        .string()
        .required("phone is required")
        .matches(/\d$/, "phone is numbers")
        .min(10)
        .max(12),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await http.post("/api/Users/signup", values);
        alert(res.data?.message);
        navigate("/login");
        console.log("res", res);
      } catch (err) {
        alert(err.response.data.message);
      }
    },
  });

  return (
    <div style={{ height: "130vh" }}>
      <div className="ctrlqFormContentWrapper">
        <div className="ctrlqHeaderMast" />
        <div className="ctrlqCenteredContent">
          <div className="ctrlqFormCard">
            <div className="ctrlqAccent" />
            <div className="ctrlqFormContent">
              <form className="container" onSubmit={registerForm.handleSubmit}>
                <h3>Register</h3>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <p>Email</p>
                      <input
                        className="form-control"
                        id="email"
                        name="email"
                        onInput={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                      />
                      {registerForm.errors.email && (
                        <p className="alert alert-danger mt-2">
                          {registerForm.errors.email}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <p>Password</p>
                      <input
                        className="form-control"
                        type="password"
                        id="password"
                        name="password"
                        onInput={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                      />
                      {registerForm.errors.password && (
                        <p className="alert alert-danger  mt-2">
                          {registerForm.errors.password}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <p>Password Confirm</p>
                      <input
                        className="form-control"
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        onInput={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                      />
                      {registerForm.errors.passwordConfirm && (
                        <p className="alert alert-danger  mt-2">
                          {registerForm.errors.passwordConfirm}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <p>Name</p>
                      <input
                        className="form-control"
                        id="name"
                        name="name"
                        onInput={registerForm.handleChange}
                        onBlur={registerForm.handleBlur}
                      />
                      {registerForm.errors.name && (
                        <p className="alert alert-danger  mt-2">
                          {registerForm.errors.name}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <p>Phone</p>
                      <input
                        className="form-control"
                        id="phone"
                        name="phone"
                        type="number"
                        onInput={registerForm.handleChange}
                      />
                      {registerForm.errors.phone && (
                        <p className="alert alert-danger  mt-2">
                          {registerForm.errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <p className="mt-2">Gender</p>
                      <form>
                        <input
                          className=" form-check-input"
                          id="gender1"
                          name="gender"
                          type="radio"
                          value={true}
                          onInput={registerForm.handleChange}
                        />
                        <label for="gender1">Male</label>
                        <input
                          className="ms-4 form-check-input"
                          id="gender2"
                          name="gender"
                          type="radio"
                          value={false}
                          onInput={registerForm.handleChange}
                        />{" "}
                        <label for="gender2">Female</label>
                      </form>
                    </div>
                    <div className="form-group mt-5">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!registerForm.isValid}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <a id="button">
        <i className="fa fa-arrow-up" />
      </a>
    </div>
  );
};
export default Register;
