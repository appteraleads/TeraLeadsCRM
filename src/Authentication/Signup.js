import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Image,
  Select,

} from "antd";
import TeraLogo from "../assets/logo/teraleadslogo.jpg";
import { FaArrowLeft } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import { IoMailUnreadOutline } from "react-icons/io5";
const Signup = () => {
  const navigate = useNavigate();
  
  const [form] = Form.useForm();
  
  const [signupSteps, setsignupSteps] = useState(1);
  const onFinish = (values) => {
    console.log(signupSteps);
    if (signupSteps === 4) {
      navigate('/login');
      setsignupSteps(0);
    } else {
      setsignupSteps(signupSteps + 1);
     
    }

    // Simulate a request
  };

  const clinicSizeOption = [
    {
      value: "1-5 dentists",
      lable: "1-5 dentists",
    },
    {
      value: "1-10 dentists",
      lable: "1-10 dentists",
    },
    {
      value: "1-15 dentists",
      lable: "1-15 dentists",
    },
    {
      value: "1-20 dentists",
      lable: "1-20 dentists",
    },
    {
      value: "1-25 dentists",
      lable: "1-25 dentists",
    },
  ];

  const patientsAveragePerWeekOption = [
    {
      value: "Less Than 50",
      lable: "Less Than 50",
    },
    {
      value: "50-100",
      lable: "50-100",
    },
    {
      value: "100-150",
      lable: "150-200",
    },
    {
      value: "More Than 200",
      lable: "1-20 dentists",
    },
  ];

  return (
    <>
      <Row>
        <Col span={24} md={12}>
          <Row justify="start">
            <Image style={{ margin: 35 }} width={100} src={TeraLogo} />
          </Row>
          <div className="login-container-left">
            <div style={{ maxWidth: "410px", margin: "auto", padding: "10px" }}>
              {signupSteps !== 1 && signupSteps !== 4 ? (
                <>
                  <Button
                    icon={<FaArrowLeft />}
                    style={{ marginBottom: "10px" }}
                    onClick={() => {
                      setsignupSteps(signupSteps - 1);
                    }}
                  >
                    Back
                  </Button>
                </>
              ) : (
                ""
              )}
              {signupSteps === 4 ? (
                <>
                  <IoMailUnreadOutline size={30} />
                </>
              ) : (
                ""
              )}

              <Form
                name="signup"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
              >
                {signupSteps === 1 ? (
                  <>
                    <h2>Set Up Your Clinic Profile</h2>
                    <p className="custom-text1">
                      Enter your clinic’s details to get everything in place.
                    </p>
                    <Form.Item
                      name="clinicName"
                      label="Clinic  Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter clinic name !",
                        },
                      ]}
                    >
                      <Input placeholder="Please enter clinic name" />
                    </Form.Item>

                    <Form.Item
                      name="dentistFullName"
                      label="Dentist Full Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter dentist full name!",
                        },
                      ]}
                    >
                      <Input placeholder="Please enter dentist full name" />
                    </Form.Item>
                    <Form.Item
                      name="clinicWebsite"
                      label="Clinic Website"
                      rules={[
                        {
                          required: true,
                          message: "Please enter clinic website!",
                        },
                      ]}
                    >
                      <Input placeholder="Please enter clinic website" />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Please enter your email!" },
                      ]}
                    >
                      <Input placeholder="Please enter your email" />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="Phone  Number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter clinic phone number!",
                        },
                      ]}
                    >
                      <Input placeholder="Please enter clinic phone number" />
                    </Form.Item>
                  </>
                ) : signupSteps === 2 ? (
                  <>
                    <h2>Get to Know Your Clinic</h2>
                    <p className="custom-text1">
                      Help us understand your clinic’s size, patient flow, and
                      services.
                    </p>
                    <Form.Item
                      name="clinicSize"
                      label="What is your clinic size?"
                      rules={[
                        { required: true, message: "Select clinic size !" },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select a person"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={clinicSizeOption}
                      />
                    </Form.Item>

                    <Form.Item
                      name="patientsAveragePerWeek"
                      label="How many patients do you see on average per week?"
                      rules={[
                        {
                          required: true,
                          message: "Select average per week?!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select a person"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={patientsAveragePerWeekOption}
                      />
                    </Form.Item>
                    <Form.Item
                      name="servicesFrequently"
                      label="What type of dental services do you offer most frequently?"
                    >
                      <Button className="custom-btn">Genral Dentistry</Button>
                      <Button className="custom-btn">Othodontics</Button>
                      <Button className="custom-btn">Cosmetic Dentistry</Button>
                      <Button className="custom-btn">Oral Surgery</Button>
                      <Button className="custom-btn">
                        Pediatric Dentistry
                      </Button>
                    </Form.Item>
                  </>
                ) : signupSteps === 3 ? (
                  <>
                    <h2>Full Arch Solutions</h2>
                    <p className="custom-text1">
                      Let us know about your digital workflow and lab resources.
                    </p>
                    <Form.Item
                      name="inHouseArchLabYN"
                      label="Do you have an in-house full arch lab?"
                    >
                      <Row>
                        <Checkbox value="Y">Yes</Checkbox>
                        <Checkbox value="N">No</Checkbox>
                      </Row>
                    </Form.Item>

                    <Form.Item
                      name="archDigitalWorkFlowYN"
                      label="Do you have full arch digital workflow?"
                    >
                      <Row>
                        <Checkbox value="Y">Yes</Checkbox>
                        <Checkbox value="N">No</Checkbox>
                      </Row>
                    </Form.Item>
                  </>
                ) : signupSteps === 4 ? (
                  <>
                    <h2>Check Your Inbox!</h2>
                    <p className="custom-text1">
                      An activation email has been sent. Please confirm to
                      complete your setup.
                    </p>
                   
                    <p style={{ paddingBottom: 10 }}>
                      Didn’t get the email?{" "}
                      <a href="/signup" className="custom-text-link">
                    Resend
                </a>{" "}
                    </p>
                  </>
                ) : (
                  <></>
                )}

                <Form.Item>
                  <Button
                    className="custom-primary-button"
                    htmlType="submit"
                    block
                  >
                    {signupSteps === 3
                      ? "Create Account"
                      : signupSteps === 4
                      ? "Login"
                      : "Next"}
                  </Button>
                  {signupSteps === 4 ? (
                    <>
                      <Button block style={{ marginTop: 10 }}>
                        Contact Us
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </Form.Item>
              </Form>
              {signupSteps === 1 ? (
                <>
                  {" "}
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    Do you have an account?{" "}
                    <a href="/login" className="custom-text-link">
                      Login
                    </a>
                  </p>
                </>
              ) : signupSteps === 3 ? (
                <>
                  By Creating and account you agree to our{" "}
                  <a
                    className="custom-text-link"
                    href="/terms"
                    style={{ marginRight: 10 }}
                  >
                    Terms & Conditions
                  </a>
                  and{" "}
                  <a className="custom-text-link" href="/privacy">
                    Privacy Policy
                  </a>
                </>
              ) : (
                ""
              )}
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
        <Col span={12} className="container-right"></Col>
      </Row>
    </>
  );
};

export default Signup;
