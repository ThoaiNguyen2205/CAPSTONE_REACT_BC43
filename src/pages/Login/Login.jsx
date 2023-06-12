import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "../../assets/css/css/login.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginActionApi } from "../../redux/reducers/loginReducer";
import * as yup from "yup";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const action = loginActionApi(values);
    dispatch(action);
  };
  const dispatch = useDispatch();
  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("email is required")
        .email("email is invalid"),
      password: yup.string().required("password is required"),
    }),
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center ",
        alignItems: "center",
        marginTop: "150px",
      }}
    >
      <Form
        className="login-form  "
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h3>Login</h3>
        <hr />
        <Form.Item name="email">
          <Input
            prefix={<UserOutlined />}
            placeholder="email"
            id="email"
            name="email"
            onInput={formLogin.handleChange}
            onBlur={formLogin.handleBlur}
          />
          {formLogin.errors.email && (
            <p className="alert alert-danger mt-2">{formLogin.errors.email}</p>
          )}
        </Form.Item>
        <Form.Item name="password">
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            id="password"
            name="password"
            onInput={formLogin.handleChange}
            onBlur={formLogin.handleBlur}
            type="password"
            placeholder="Password"
          />
          {formLogin.errors.password && (
            <p className="alert alert-danger  mt-2">
              {formLogin.errors.password}
            </p>
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
