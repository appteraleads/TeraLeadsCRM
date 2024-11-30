import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Select,
  notification,
} from "antd";

import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoMailUnreadOutline } from "react-icons/io5";
import { PiCheckBold } from "react-icons/pi";
import axios from "axios";

const CustomButton = ({ service, services, onClick }) => {
  const isSelected = services.includes(service);

  return (
    <Button
      className="custom-btn"
      style={{
        color: isSelected ? "#3900DB" : "",
        borderColor: isSelected ? "#3900DB" : "",
        background: isSelected ? "#ECEEFF" : "",
      }}
      onClick={onClick}
    >
      {isSelected ? <PiCheckBold /> : ""}
      {service}
    </Button>
  );
};

const Signup = ({ userEmailId, setuserEmailId }) => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, messageType, message) => {
    api[type]({
      message: messageType,
      description: message,
    });
  };
  const serviceList = [
    "Full Arch",
    "Dental Implants",
    "Genral Dentistry",
    "Othodontics",
    "Cosmetic Dentistry",
    "Oral Surgery",
    "Pediatric Dentistry",
  ];
  const [form] = Form.useForm();

  const [signupSteps, setsignupSteps] = useState(1);

  const [services, setservices] = useState([]);

  const addServices = (val) => {
    if (services.includes(val.trim())) {
      setservices(services.filter((service) => service !== val));
    } else {
      setservices([...services, val]);
    }
  };

  const reSendActivationLink = () => {
    let data = { email: userEmailId ? userEmailId : "app@teraleads.com" };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/resend-activation-link`,
        data
      )
      .then((res) => {
        openNotificationWithIcon("success", "Success", res?.data);
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Error",
          err?.response?.data?.message || err?.message
        );
      });
  };

  const onFinish = async () => {
    if (signupSteps === 4) {
      navigate("/login");
      setsignupSteps(0);
    }
    if (signupSteps === 3) {
      const data = {
        clinic_name: form.getFieldValue(["clinicName"]),
        dentist_full_name: form.getFieldValue(["dentistFullName"]),
        clinic_website: form.getFieldValue(["clinicWebsite"]),
        email: form.getFieldValue(["email"]),
        phone: form.getFieldValue(["phone"]),
        clinic_size: form.getFieldValue(["clinicSize"]),
        patients_average_per_week: form.getFieldValue([
          "patientsAveragePerWeek",
        ]),
        services_frequently: services.toString(),
        in_house_arch_lab_yn:
          form.getFieldValue(["inHouseArchLabYN"]) === "Y"
            ? true
            : form.getFieldValue(["inHouseArchLabYN"]) === "N"
            ? false
            : undefined,
        arch_digital_workflow_yn:
          form.getFieldValue(["archDigitalWorkFlowYN"]) === "Y"
            ? true
            : form.getFieldValue(["archDigitalWorkFlowYN"]) === "N"
            ? false
            : undefined,
        activated_yn: false,
        staffCount: form.getFieldValue(["staffCount"]),
      };
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/user`, data)
        .then((res) => {
          console.log(res);
          setsignupSteps(signupSteps + 1);
        })
        .catch((err) => {
          console.log(err);
          openNotificationWithIcon(
            "error",
            "Error",
            err?.response?.data?.message || err?.message
          );
        });
    } else {
      setsignupSteps(signupSteps + 1);
    }
  };

  const clinicSizeOption = [
    {
      value: "1-5 dentists",
      lable: "1-5 dentists",
    },
    {
      value: "6-10 dentists",
      lable: "6-10 dentists",
    },
    {
      value: "11-15 dentists",
      lable: "11-15 dentists",
    },
    {
      value: "16-20 dentists",
      lable: "16-20 dentists",
    },
    {
      value: "21-25 dentists",
      lable: "21-25 dentists",
    },
    {
      value: "25+ dentists",
      lable: "25+ dentists",
    },
  ];

  const patientsAveragePerWeekOption = [
    {
      value: "Less Than 50",
      lable: "Less Than 50",
    },
    {
      value: "51-100",
      lable: "51-100",
    },
    {
      value: "101-150",
      lable: "101-150",
    },
    {
      value: "More Than 150",
      lable: "More Than 150",
    },
  ];

  return (
    <>
      {contextHolder}
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
            form={form}
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
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter valid email!",
                      type: "email",
                    },
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
                <Form.Item
                  name="clinicName"
                  label="Clinic  Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter clinic name!",
                    },
                  ]}
                >
                  <Input placeholder="Please enter clinic name" />
                </Form.Item>

                <Form.Item name="clinicWebsite" label="Clinic Website">
                  <Input placeholder="Please enter clinic website" />
                </Form.Item>
              </>
            ) : signupSteps === 2 ? (
              <>
                <h2>Get to Know Your Clinic</h2>
                <p className="custom-text1">
                  Help us understand your clinic’s size, patient flow, and
                  services.
                </p>
                <Form.Item name="clinicSize" label="What is your clinic size?">
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
                  name="staffCount"
                  label="how much staff do you have? "
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
                  {serviceList.map((service) => (
                    <CustomButton
                      key={service}
                      service={service}
                      services={services}
                      onClick={() => addServices(service)}
                    />
                  ))}
                </Form.Item>
              </>
            ) : signupSteps === 3 ? (
              <>
                <h2>Digital Workflow & Lab Resources</h2>
                <p className="custom-text1">
                  Let us know about your digital workflow and lab resources.
                </p>
                {services.includes("Full Arch") ? (
                  <Form.Item
                    name="inHouseArchLabYN"
                    label="Do you have an in-house full arch lab?"
                  >
                    <Row>
                      <Checkbox value="Y">Yes</Checkbox>
                      <Checkbox value="N">No</Checkbox>
                    </Row>
                  </Form.Item>
                ) : (
                  ""
                )}

                <Form.Item
                  name="archDigitalWorkFlowYN"
                  label="Is your clinic set up for digital workflow?"
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
                  An activation email has been sent. Please confirm to complete
                  your setup.
                </p>

                <p style={{ paddingBottom: 10 }}>
                  Didn’t get the email?{" "}
                  <span
                    className="custom-text-link"
                    onClick={() => {
                      reSendActivationLink();
                    }}
                  >
                    Resend
                  </span>{" "}
                </p>
              </>
            ) : (
              <></>
            )}

            <Form.Item>
              <Button className="custom-primary-button" htmlType="submit" block>
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
                Do you have an account?&nbsp;
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
    </>
  );
};

export default Signup;
