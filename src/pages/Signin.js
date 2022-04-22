import React from "react";
import style from "./Signin.module.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Form, Input, Button, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {useDispatch,useSelector} from "react-redux"
import { signupSagaAction } from "../redux/actions/signupAction";

export default function Login() {
  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
      repassword: "",
      phoneNumber: "",
      name: "",
    },
  });
  //dispatch 
  const dispatch=useDispatch()


  //xử lý submit
  const handleSubmitSign=(e)=>{
    e.preventDefault()
    let {passWord,repassword}=formik.values
    if(passWord===repassword){
      dispatch(signupSagaAction(formik.values))
    }
  }

  return (
    <div className={style.main}>
      <h1> SIGN IN </h1>
      <Form
        onSubmit={formik.handleSubmit}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            size="large"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="passWord"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            name="passWord"
            size="large"
            onChange={formik.handleChange}
            value={formik.values.passWord}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="repassword"
          rules={[{ required: true, message: "Please input your RePassword!" }]}
        >
          <Input
            onChange={formik.handleChange}
            value={formik.values.repassword}
            name="repassword"
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="RePassword"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: "Please input your Phone!" }]}
        >
          <Input
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            type="number"
            size="large"
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Phone"
          />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item className="mt-1">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>I agree to </Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Terms
          </a>
        </Form.Item>
        <Form.Item>
          <Button

            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={handleSubmitSign}
          >
            Sign in
          </Button>
          &nbsp; Or <Link to="/login"> Login now! </Link>
        </Form.Item>
      </Form>
    </div>
  );
}
