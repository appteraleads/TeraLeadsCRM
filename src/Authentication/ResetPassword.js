import React from "react";
import { Form, Input, Button, notification } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = ({ userEmailId, setuserEmailId }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, messageType, message) => {
    api[type]({
      message: messageType,
      description: message,
    });
  };
  const onFinish = (values) => {
    let data = {
      email: userEmailId,
      newPassword: values?.confirmpassword,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/reset-password`,
        data
      )
      .then((res) => {
        openNotificationWithIcon(
          "success",
          "Success",
          "Password reset successfully"
        );
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
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
            Set your new password to regain access to your account.
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
              <Button className="custom-primary-button" htmlType="submit" block>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
