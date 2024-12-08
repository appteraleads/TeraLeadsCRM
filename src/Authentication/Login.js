import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Image, Divider, Alert } from "antd";
import GoogleIcon from "../assets/logo/google_logo-google_icongoogle-512 (1) 1.svg";
import axios from "axios";
import facebookLogo from "../assets/logo/fbIcon_round_gradient.png";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [alertMsg, setalertMsg] = useState("");
  const [alertDes, setalertDes] = useState("");
  const [alertType, setalertType] = useState("");
  const [alertDisplay, setalertDisplay] = useState(false);

  const [buttonloader, setbuttonloader] = useState(false);
  const onFinish = (values) => {
    setbuttonloader(true);
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/login`, values)
      .then((res) => {
        console.log(res)
        localStorage.setItem("authToken", res?.data?.token);
        localStorage.setItem("userColumn", res?.data?.userColumn || '');
        window.location.replace("/leads");
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
              <Button loading={buttonloader} className="custom-primary-button" htmlType="submit" block>
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
