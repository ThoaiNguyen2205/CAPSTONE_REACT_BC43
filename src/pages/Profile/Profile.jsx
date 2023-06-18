//rafce

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useFormik } from "formik";

import {
  getProfileAction,
  getProfileActionApi,
} from "../../redux/reducers/loginReducer";
import * as yup from "yup";
import { http, httpup } from "../../util/config";

const Profile = () => {
  const { userProfile } = useSelector((state) => state.loginReducer);
  console.log("profile", userProfile);
  const dispatch = useDispatch();

  const getProfileApi = () => {
    const action = getProfileActionApi();
    dispatch(action);
  };

  useEffect(() => {
    getProfileApi();
  }, []);
  const profileForm = useFormik({
    initialValues: userProfile,
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
      name: yup.string().required("name is required"),
      phone: yup
        .string()
        .required("Name cannot be blank !")
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone is a number !"),
    }),
    onSubmit: async (values) => {
      console.log("ketqua", values);
      try {
        const res = await httpup.post("/api/Users/updateProfile", values);
        alert("Update finished");
      } catch (err) {
        console.log(err);
        alert(err.response?.data.message);
      }
    },
  });

  const action = getProfileAction(profileForm.values);
  dispatch(action);
  console.log("first", profileForm.values);

  return (
    <form className="container" onSubmit={profileForm.handleSubmit}>
      <h3>{userProfile.name}</h3>
      <hr />
      <div className="row">
        <div className="col-2">
          <div className="form-group">
            <img
              src="https://i.pravatar.cc?u=2"
              alt=""
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="col-5">
          <div className="form-group">
            <p className="mb-0">Email </p>
            <input
              className="form-control"
              id="email"
              name="email"
              value={userProfile.email}
              onInput={profileForm.handleChange}
            />
          </div>
          <div className="form-group">
            <p className="mb-0 mt-4">Phone</p>
            <input
              className="form-control"
              id="phone"
              name="phone"
              value={userProfile.phone}
              onInput={profileForm.handleChange}
              onBlur={profileForm.handleBlur}
            />
            {profileForm.errors.phone && (
              <p className="alert alert-danger  mt-2">
                {profileForm.errors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="col-5">
          <div className="form-group">
            <p className="mb-0">Name</p>
            <input
              className="form-control"
              id="name"
              name="name"
              value={userProfile.name}
              onInput={profileForm.handleChange}
            />
            {profileForm.errors.name && (
              <p className="alert alert-danger  mt-2">
                {profileForm.errors.name}
              </p>
            )}
          </div>
          <div className="form-group">
            <p className="mb-0 mt-4">Password</p>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              value={userProfile.password}
              onInput={profileForm.handleChange}
            />
            {profileForm.errors.password && (
              <p className="alert alert-danger  mt-2">
                {profileForm.errors.password}
              </p>
            )}
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group mt-2">
                <p>Gender</p>
                <input
                  className="form-check-input "
                  id="gender1"
                  name="gender"
                  type="radio"
                  value={true}
                  onInput={profileForm.handleChange}
                />
                <label for="gender1" className="me-3">
                  Male
                </label>
                <input
                  className="form-check-input"
                  id="gender2"
                  name="gender"
                  type="radio"
                  value={false}
                  onInput={profileForm.handleChange}
                />
                <label for="gender2">Female</label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group mt-2">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Order History
          </a>
        </li>
      </ul>
      <div style={{ minHeight: "70vh" }} className="mt-5">
        <table
          className="table text-center"
          style={{ backgroundColor: "rgb(237, 236, 236)" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Adidas</td>
              <td>1</td>
              <td>450$</td>
              <td>3</td>
              <td>1350$</td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default Profile;
