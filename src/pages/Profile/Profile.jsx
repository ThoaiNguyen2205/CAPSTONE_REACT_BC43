//rafce

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../assets/scss/scsspages/profile.scss";
import { useFormik } from "formik";

import {
  getProfileAction,
  getProfileActionApi,
  updateProfile,
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
    console.log("profile");
  }, []);

  const profileForm = useFormik({
    enableReinitialize: true,
    initialValues: userProfile,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email is required")
        .email("Email is invalid!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "6 - 32 characters")
        .max(32, "6 - 32 characters"),
      name: yup.string().required("Name is required"),
      phone: yup
        .string()
        .required("Phone cannot be blank!")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          "Phone must be a valid number!"
        ),
    }),
    // onSubmit: async (values) => {
    //   console.log("ketqua", values);
    //   try {
    //     const res = await http.post("/api/Users/updateProfile", values);
    //     alert("Update finished");
    //     console.log("update", res);
    //     // Cập nhật giá trị userProfile trong Redux Store
    //     const updatedProfile = { ...userProfile, ...values };
    //     const action = updateProfile(updatedProfile);
    //     dispatch(action);
    //   } catch (err) {
    //     console.log(err);
    //     alert(err.response?.data.message);
    //   }
    // },
  });
  const handleSubmitApi = async () => {
    try {
      const res = await httpup.post("/api/Users/updateProfile", values);
      const updatedProfile = {
        ...values,
        gender: values.gender === "true" ? true : false,
      };
      const action = updateProfile(updatedProfile);
      dispatch(action); // Cập nhật userProfile trong Redux Store
      alert("Update finished");
      console.log("update", res);
    } catch (err) {
      console.log(err);
      alert(err.response?.data.message);
    }
  };
  const { values, handleChange, handleBlur, errors, setFieldValue } =
    profileForm;

  const ordersHistory = userProfile.ordersHistory;
  console.log("orders history", ordersHistory);
  const action = getProfileAction(userProfile);
  dispatch(action);

  console.log("profile", userProfile);

  console.log("lich su", userProfile.email);
  console.log("password", userProfile.password);
  console.log("aaa", userProfile.ordersHistory);
  return (
    <div className="profile">
      <form className="container" onSubmit={handleSubmitApi}>
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
                value={values.email}
                onInput={handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <p className="mb-0 mt-4">Phone</p>
              <input
                className="form-control"
                id="phone"
                name="phone"
                value={values.phone}
                onInput={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && (
                <p className="alert alert-danger  mt-2">{errors.phone}</p>
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
                value={values.name}
                onInput={handleChange}
              />
              {errors.name && (
                <p className="alert alert-danger  mt-2">{errors.name}</p>
              )}
            </div>
            <div className="form-group">
              <p className="mb-0 mt-4">Password</p>
              <input
                className="form-control"
                value={values.password}
                type="password"
                id="password"
                name="password"
                disabled
              />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group mt-2">
                  <p>Gender</p>
                  <div className="gender-group">
                    <input
                      className="form-check-input"
                      id="gender1"
                      name="gender"
                      type="radio"
                      value="true"
                      checked={
                        values.gender === "true" || userProfile.gender === true
                      }
                      onChange={handleChange}
                    />
                    <label for="gender1" className="me-3">
                      Male
                    </label>
                  </div>
                  <div className="gender-group ">
                    <input
                      className="form-check-input"
                      id="gender2"
                      name="gender"
                      type="radio"
                      value="false"
                      checked={
                        values.gender === "false" ||
                        userProfile.gender === false
                      }
                      onChange={handleChange}
                    />
                    <label for="gender2">Female</label>
                  </div>
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
      </form>
      <hr />
      <ul className="nav nav-tabs container">
        <li className="nav-item">
          <a
            className="nav-link active text-white"
            aria-current="page"
            href="#"
            style={{
              background:
                "linear-gradient(270deg, rgba(62, 32, 248, 0.9) 5.14%, #d017ee 89.71%)",
            }}
          >
            Order History
          </a>
        </li>
      </ul>

      <div className="table-order container">
        <table className="text-center table table-bordered align-middle table1">
          <thead className="bg-dark text-white">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Order Detail</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {ordersHistory.map((prod, index) => {
              return (
                <tr key={index}>
                  <td className="order-info">
                    <p>{prod.id}</p>
                  </td>
                  <td className="order-info">
                    <p className="text-primary">{prod.date}</p>
                  </td>
                  <td className="order-info">
                    <table className=" table table-bordered border-secondary align-middle">
                      <thead>
                        <tr>
                          <th className="col1">Name</th>
                          <th className="col2">Image</th>
                          <th className="col3">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prod.orderDetail.map((item, index) => {
                          return (
                            <tr className="" key={index}>
                              <td>
                                <h5 className="text-success">{item.name}</h5>
                              </td>
                              <td>
                                <img src={item.image} alt="" />
                              </td>

                              <td>
                                <h4 className="text-danger">{item.price} $</h4>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                  <td className="order-info">
                    <p>{prod.email}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;

// {
//   ordersHistory.map((prod, index) => {
//     return (
//       <div key={index} className="mb-5">
//         <div className="text-success">
//           Order have been placed on :{prod.date}
//         </div>
//         <table
//           className="table text-center container"
//           style={{ backgroundColor: "rgb(237, 236, 236)" }}
//         >
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Image</th>
//               <th>Price</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {prod.orderDetail.map((prod, index) => {
//               return (
//                 <tr key={index} className="align-middle ">
//                   <td className="fs-5 text-success">{prod.name}</td>
//                   <td>
//                     <img src={prod.image} alt="" width={70} height={70} />
//                   </td>
//                   <td className="text-danger fs-5">{prod.price} $</td>
//                   <td>{prod.email}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   });
// }
