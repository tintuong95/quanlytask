import React, { useState, useEffect } from "react";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { useFormik } from "formik";
import {useDispatch} from "react-redux"
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { LOGIN_POST_SAGA } from "../redux/contants/signupContant";
import { loginSagaAction } from "../redux/actions/loginAction";

export default function Login(props) {
  //dispatch 
  const dispatch=useDispatch()
  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
    },
  });
// login submit
const handleSubmitLogin=(e)=>{
  e.preventDefault()
  dispatch(loginSagaAction(formik.values))
}
  return (
    <div className={style.main}>
      <h1>LOGIN</h1>
      <Form
        onSubmit={formik.handleSubmit}
        className="login-form"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            size="large"
            onChange={formik.handleChange}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            value={formik.values.email}
            name="email"
          />
        </Form.Item>
        <Form.Item
          name="passWord"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            size="large"
            onChange={formik.handleChange}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={formik.values.passWord}
            name="passWord"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="#">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item className=" my-2">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={handleSubmitLogin}
          >
            Log in
          </Button>
          &nbsp; Or <Link to="/signin">register now!</Link>
        </Form.Item>
        <Form.Item className="text-center my-2">
          <p className="my-0">Or</p>
        </Form.Item>
        <Form.Item className="text-center">
          <Button
            size="large"
            className={style.login}
            icon={<FacebookOutlined />}
            style={{ backgroundColor: "#096dd9", color: "white" }}
          >
            Facebook
          </Button>
          &nbsp;
          <Button
            size="large"
            className={style.login}
            icon={<GoogleOutlined />}
            style={{ backgroundColor: "#f5222d", color: "white" }}
          >
            Google
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
