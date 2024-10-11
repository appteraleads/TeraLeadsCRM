import React from "react";
import { Form, Input, Button, notification, Row, Col, Image } from "antd";
import TeraLogo from "../assets/logo/teraleadslogo.jpg";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ForgotPassword = ({ userEmailId, setuserEmailId }) => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, messageType, message) => {
    api[type]({
      message: messageType,
      description: message,
    });
  };

  const onFinish = (values) => {
    setuserEmailId(values.email);
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/send-otp`,
        values
      )
      .then((res) => {
        openNotificationWithIcon("success", "Success", res?.data?.message);
        navigate("/verify-otp");
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon("error", "Error", err?.message);
      });
  };

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={24} md={12}>
          <Row justify="start">
            <Image style={{ margin: 35 }} width={100} src={TeraLogo} />
          </Row>
          <div className="login-container-left">
            <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
              <Button
                icon={<FaArrowLeft />}
                style={{ marginBottom: "10px" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Back
              </Button>
              <h2>Forgot Your Password?</h2>
              <p className="custom-text1">
                Enter your email, and we’ll send you instructions to reset your
                password.
              </p>

              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ message: "Please enter your email!" }]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="custom-primary-button"
                    htmlType="submit"
                    block
                  >
                    Send Code
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="auth-custom-footer">
            <Row className="auth-footer-content">
              <Col span={11} className="footer-col" style={{ marginLeft: 15 }}>
                <p className="custom-text1">
                  All rights reserved Teraleads 2024
                </p>
              </Col>
              <Col
                className="footer-links footer-col"
                span={12}
                style={{ display: "flex", justifyContent: "end" }}
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
        <Col span={12} className="container-right"></Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
