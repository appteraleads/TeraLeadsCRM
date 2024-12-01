/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SetPassword = ({ userEmailId, setuserEmailId }) => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [buttonloader, setbuttonloader] = useState(false);
  const openNotificationWithIcon = (type, messageType, message) => {
    api[type]({
      message: messageType,
      description: message,
    });
  };

  const onFinish = (values) => {
    setbuttonloader(true)
    let data = {
      token: token,
      password: values?.confirmpassword,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/set-password`,
        data
      )
      .then((res) => {
        openNotificationWithIcon(
          "success",
          "Success",
          "Password reset successfully"
        );
        navigate("/login");
        setbuttonloader(false)
      })
      .catch((err) => {
        console.log(err);
        setbuttonloader(false)
        openNotificationWithIcon("error", "Error", err?.message);
      });
  };

  const validateConfirmPassword = (_, value) => {
    const password = form.getFieldValue("password"); // Get the value of the password field
    if (!value || password === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Password do not match!"));
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
        })
        .catch((err) => {
          console.log(err);
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

  return (
    <>
      {contextHolder}

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
          <h2>Create a New Password</h2>
          <p className="custom-text1">
            Set your new password to access to your account.
          </p>

          <Form
            form={form}
            name="resetpassword"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="password"
              label="Password"
              rules={[{ message: "Please enter your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item
              name="confirmpassword"
              label="Repeat Password"
              dependencies={["password"]}
              rules={[
                { message: "Please enter your password!" },
                { validator: validateConfirmPassword },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button loading={buttonloader} className="custom-primary-button" htmlType="submit" block>
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SetPassword;
