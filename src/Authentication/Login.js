/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Image,
  Divider,
  Alert,
  notification,
} from "antd";
import GoogleIcon from "../assets/logo/google_logo-google_icongoogle-512 (1) 1.svg";
import axios from "axios";
import facebookLogo from "../assets/logo/fbIcon_round_gradient.png";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [alertMsg, setalertMsg] = useState("");
  const [alertDes, setalertDes] = useState("");
  const [alertType, setalertType] = useState("");
  const [alertDisplay, setalertDisplay] = useState(false);
  const [buttonloader, setbuttonloader] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, messageType, message) => {
    api[type]({
      message: messageType,
      description: message,
    });
  };
  const onFinish = (values) => {
    setbuttonloader(true);
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/login`, values)
      .then((res) => {
        const decoded = jwtDecode(res?.data?.usertDetailsToken);
        localStorage.setItem("authToken", res?.data?.token);
        localStorage.setItem("usertDetailsToken", res?.data?.usertDetailsToken);
        localStorage.setItem("userColumn", res?.data?.userColumn || "");
        console.log(decoded);
        if (decoded?.user?.role_name === "super-admin")
          window.location.replace("/admin");
        else window.location.replace("/leads");
        setbuttonloader(false);
      })
      .catch((err) => {
        setalertMsg("Invalid Credential");
        setalertDes(err?.response?.data?.message || err?.message);
        setalertType("error");
        setalertDisplay(true);
        setbuttonloader(false);
      });
  };

  const handleGoogleLogin = async () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/google`;
  };

  const handleFacebookLogin = async () => {
    try {
    } catch (error) {
      console.error("Facebook login failed", error);
    }
  };

  const activationUser = () => {
    let data = {
      token: token,
    };
    if (token) {
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/activate`,
          data
        )
        .then((res) => {
          openNotificationWithIcon("success", "Success", res?.data?.message);
          navigate("/login");
        })
        .catch((err) => {
          navigate("/login");
          openNotificationWithIcon(
            "error",
            "Error",
            err?.response?.data?.message || err?.message
          );
        });
    }
  };

  useEffect(() => {
    activationUser();
  }, [token]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store the token in local storage
      localStorage.setItem("authToken", token);
      // Remove the token from the URL
      urlParams.delete("token");
      navigate("/leads");
    }
  }, [navigate]);

  return (
    <>
      {contextHolder}
      <div className="login-container-left">
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
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
              <Button
                onClick={handleGoogleLogin}
                block
                disabled
                icon={<Image src={GoogleIcon} />}
              >
                Continue with Google
              </Button>
              <Button
                style={{ marginTop: 10 }}
                onClick={handleFacebookLogin}
                block
                disabled
                icon={<Image src={facebookLogo} style={{ width: 20 }} />}
              >
                Continue with Facebook
              </Button>
            </Form.Item>
            <Divider>Or</Divider>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
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
                loading={buttonloader}
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
    </>
  );
};

export default Login;
