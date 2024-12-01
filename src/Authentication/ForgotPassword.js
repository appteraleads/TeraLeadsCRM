import React, { useState } from "react";
import { Form, Input, Button,Alert } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ForgotPassword = ({ userEmailId, setuserEmailId }) => {
  const navigate = useNavigate();
 
  const [alertMsg, setalertMsg] = useState("");
  const [alertDes, setalertDes] = useState("");
  const [alertType, setalertType] = useState("");
  const [alertDisplay, setalertDisplay] = useState(false);
  const [buttonloader, setbuttonloader] = useState(false);
  const onFinish = (values) => {
    setbuttonloader(true)
    setuserEmailId(values.email);
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/send-otp`,
        values
      )
      .then((res) => {
        setbuttonloader(false)
        navigate("/verify-otp");
      })
      .catch((err) => {
        console.log(err);
        setbuttonloader(false)
        setalertMsg("Error Message");
        setalertDes(err?.response?.data?.message || err?.message);
        setalertType("error");
        setalertDisplay(true);
      });
  };

  return (
    <>
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
          {alertDisplay ? (
            <Alert
              message={alertMsg}
              description={alertDes}
              type={alertType}
              showIcon
              closable={alertDisplay}
              onClose={() => setalertDisplay(false)}
              style={{ width: "100%" }}
            />
          ) : (
            ""
          )}
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
              <Button loading={buttonloader} className="custom-primary-button" htmlType="submit" block>
                Send Code
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
