import React from "react";
import "../../assets/css/css/login.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginActionApi } from "../../redux/reducers/loginReducer";
import * as Yup from "yup";
import '../../assets/css/css/login.css'

const Login = () => {
  const dispatch = useDispatch();
  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email:  Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required("password is required"),
    }),
    onSubmit:(values)=>{
      const action = loginActionApi(values);
      dispatch(action);
    }
  });

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={formLogin.handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email </label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              id="email"
              name="email"
              onInput={formLogin.handleChange}
              onBlur={formLogin.handleChange}
            />{formLogin.errors.email && <p className='alert alert-danger mt-2'>{formLogin.errors.email}</p>}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onInput={formLogin.handleChange}
              onBlur={formLogin.handleChange}
            />
        {formLogin.errors.password && <p className='alert alert-danger  mt-2'>{formLogin.errors.password}</p>}

          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          
        </div>
      </form>
    </div>
  );
};
export default Login;
