import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  message,
  Row,
  Col,
  Image,
  Divider,
} from "antd";
import TeraLogo from "../assets/logo/teraleadslogo.jpg";
import GoogleIcon from "../assets/logo/google_logo-google_icongoogle-512 (1) 1.svg";

const Login = () => {


  const onFinish = (values) => {
 
    console.log(values);
    setTimeout(() => {
      
      message.success("Login successful!");
    }, 1500);
  };

  return (
    <>
      <Row>
        <Col span={24} md={12}>
          <Row justify="start">
            <Image style={{ margin: 35 }} width={100} src={TeraLogo} />
          </Row>
          <div className="login-container-left">
            <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
              <h2>Log In to Your Account</h2>
              <p className="custom-text1">
                Welcome back! Enter your email and password to proceed.
              </p>
              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item>
                  <Button block icon={<Image src={GoogleIcon} />}>
                    Continue with Google
                  </Button>
                </Form.Item>
                <Divider>Or</Divider>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter your password!" },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="custom-text1">Remember me</Checkbox>
                  </Form.Item>
                  <a
                    className="custom-text1"
                    style={{ float: "right" }}
                    href="/forgot-password"
                  >
                    Forgot password?
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button
                    className="custom-primary-button"
                    htmlType="submit"
                    block
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
              <p>
                Don’t have an account yet?{" "}
                <a href="/signup" className="custom-text-link">
                  Create an account
                </a>
              </p>
            </div>
          </div>
          <div className="auth-custom-footer">
            <Row className="auth-footer-content">
              <Col span={7} className="footer-col" style={{ marginLeft: 15 }}>
                <p className="custom-text1">
                  All rights reserved Teraleads 2024
                </p>
              </Col>
              <Col
                className="footer-links footer-col"
                span={12}
                style={{ display: "flex" }}
              >
                <a
                  className="custom-text1"
                  href="/terms"
                  style={{ marginRight: 10 }}
                >
                  <p>Terms & Conditions</p>
                </a>
                <a className="custom-text1" href="/privacy">
                  <p>Privacy Policy</p>
                </a>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24} md={12} className="container-right"></Col>
      </Row>
    </>
  );
};

export default Login;
