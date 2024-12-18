/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  List,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Tag,
  Typography,
} from "antd";
import {
  AppointmentsSVG,
  CampaignsSVG,
  ConversationsSVG,
  LeadsSVG,
  MailIconSvg,
  MyAccountSVG,
  ReportsSVG,
  TeamSVG,
} from "../Common/SettingSidebarIconsSvg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { IoChevronBackSharp, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineBlock, MdOutlineErrorOutline } from "react-icons/md";
import { getInitials } from "../Common/ReturnColumnValue";
import { RiUserForbidLine } from "react-icons/ri";
import { BlockIPTypeOptions } from "../Common/CommonCodeList";
import { RxCross2 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
const { TextArea } = Input;
const { Text } = Typography;

const isValidUrl = (value) => {
  try {
    // Attempt to create a new URL object
    new URL(value);
    return true; // If no error is thrown, the URL is valid
  } catch (_) {
    return false; // If an error is thrown, the URL is invalid
  }
};

const getLogoUrl = (url) => {
  const domain = new URL(url)?.hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
};

const getLogoUrlDomain = (domain) => {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
};

export const UpdateEmailModal = ({
  isUpdateEmailModalVisible,
  setisUpdateEmailModalVisible,
  buttonLoader,
  setbuttonLoader,
  setisOTPVerificationModalVisible,
  openNotificationWithIcon,
  userDetails,
}) => {
  const [UpdateEmailModalform] = Form.useForm();

  const handleUpdateEmailModal = async (values) => {
    let data = {
      user_id: userDetails?.id,
      email: userDetails?.email,
      confirmEmail: values?.confirmEmail,
      dentist_full_name: userDetails?.dentist_full_name,
      type: "email",
    };
    const token = localStorage.getItem("authToken");
    setbuttonLoader(true);
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/send-otp-update-email`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res?.status === 200) {
          openNotificationWithIcon(
            "success",
            "Settings",
            "Please check your email, as we have sent an OTP for verification."
          );
          UpdateEmailModalform?.resetFields();
          setisUpdateEmailModalVisible(false);
          setisOTPVerificationModalVisible(true);
        }
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Settings",
          err?.response?.data?.message || err?.message
        );
      });
    setbuttonLoader(false);
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography style={{ marginLeft: 10 }}>My Account</Typography>
        </div>
      }
      visible={isUpdateEmailModalVisible}
      footer={
        <>
          <Divider style={{ marginTop: 60 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 10,
            }}
          >
            <Space>
              <Button
                onClick={() => {
                  UpdateEmailModalform?.resetFields();
                  setisUpdateEmailModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  UpdateEmailModalform?.submit();
                }}
                loading={buttonLoader}
              >
                Next
              </Button>
            </Space>
          </div>
        </>
      }
      closable={false}
      width={500}
      className="custom-modal"
    >
      <Space>
        <MyAccountSVG color={"#72779E"} style={{ width: 15 }} />
        <Typography style={{ fontWeight: 600 }}>
          Change Account Email
        </Typography>
      </Space>
      <Typography className="custom-text1">
        Update the email address linked to your account.
      </Typography>
      <Divider style={{ margin: "10px 0px" }} />
      <Form
        form={UpdateEmailModalform}
        onFinish={handleUpdateEmailModal}
        layout="vertical"
        style={{ padding: "10px 0px" }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={
                <div className="custom-text1">
                  New Email Address<span style={{ color: "red" }}>*</span>
                </div>
              }
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={
                <div className="custom-text1">
                  Confirm New Email Address
                  <span style={{ color: "red" }}>*</span>
                </div>
              }
              name="confirmEmail"
              dependencies={["email"]} // Indicates that this field depends on the 'email' field
              rules={[
                {
                  required: true,
                  message: "Please confirm your email!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("email") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two email addresses do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export const UpdatePasswordModal = ({
  isUpdatePasswordModalVisible,
  setisUpdatePasswordModalVisible,
  buttonLoader,
  setbuttonLoader,
  setisOTPVerificationModalVisible,
  openNotificationWithIcon,
  userDetails,
  updateType,
}) => {
  const [UpdatePasswordModalform] = Form.useForm();
  const handleUpdatePasswordModal = async (values) => {
    let data = {
      user_id: userDetails?.id,
      email: userDetails?.email,
      confirmNewPassword: values?.confirmNewPassword,
      dentist_full_name: userDetails?.dentist_full_name,
      type: "password",
    };

    const token = localStorage.getItem("authToken");
    setbuttonLoader(true);
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/send-otp-update-email`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res?.status === 200) {
          openNotificationWithIcon(
            "success",
            "Settings",
            "Please check your email, as we have sent an OTP for verification."
          );
          UpdatePasswordModalform?.resetFields();
          setisUpdatePasswordModalVisible(false);
          setisOTPVerificationModalVisible(true);
        }
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Settings",
          err?.response?.data?.message || err?.message
        );
      });
    setbuttonLoader(false);
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography style={{ marginLeft: 10 }}>My Account</Typography>
        </div>
      }
      visible={isUpdatePasswordModalVisible}
      footer={
        <>
          <Divider style={{ marginTop: 60 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 10,
            }}
          >
            <Space>
              <Button
                onClick={() => {
                  UpdatePasswordModalform?.resetFields();
                  setisUpdatePasswordModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  UpdatePasswordModalform?.submit();
                }}
                loading={buttonLoader}
              >
                Change Password
              </Button>
            </Space>
          </div>
        </>
      }
      closable={false}
      width={500}
      className="custom-modal"
    >
      <Space>
        <MyAccountSVG color={"#72779E"} style={{ width: 15 }} />
        <Typography style={{ fontWeight: 600 }}>Change Password</Typography>
      </Space>
      <Typography className="custom-text1">
        Update the password for your account to keep it secure.
      </Typography>
      <Divider style={{ margin: "10px 0px" }} />
      <Form
        form={UpdatePasswordModalform}
        onFinish={handleUpdatePasswordModal}
        layout="vertical"
        style={{ padding: "10px 0px" }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={
                <>
                  Current Password <span style={{ color: "red" }}>*</span>
                </>
              }
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password!",
                },
              ]}
            >
              <Input.Password
                style={{ width: "100%" }}
                className="custom-text1"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={
                <>
                  New Password <span style={{ color: "red" }}>*</span>
                </>
              }
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your new password!",
                },
                {
                  pattern:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters, include a letter, a number, and a special character.",
                },
              ]}
            >
              <Input.Password
                style={{ width: "100%" }}
                className="custom-text1"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={
                <>
                  Confirm New Password <span style={{ color: "red" }}>*</span>
                </>
              }
              name="confirmNewPassword"
              dependencies={["newPassword"]} // Ensures revalidation when newPassword changes
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                style={{ width: "100%" }}
                className="custom-text1"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export const OTPVerificationModal = ({
  isOTPVerificationModalVisible,
  setisOTPVerificationModalVisible,
  buttonLoader,
  setbuttonLoader,
  openNotificationWithIcon,
  userDetails,
  updateType,
  handleGetLoginUserDetails,
}) => {
  const [OTPVerificationform] = Form.useForm();
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(50);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [otp, setotp] = useState();
  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  const handleOTPVerificationModal = async (values) => {
    let data = {
      user_id: userDetails?.id,
      otp: otp,
      type: updateType,
    };
    const token = localStorage.getItem("authToken");
    setbuttonLoader(true);
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/verify-otp-email-password`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res?.status === 200) {
          openNotificationWithIcon(
            "success",
            "Settings",
            updateType === "email"
              ? "Email update successfully "
              : "Password update successfully"
          );
          handleGetLoginUserDetails();
          OTPVerificationform?.resetFields();
          setisOTPVerificationModalVisible(false);

          if (res?.data?.token) {
            localStorage?.setItem("authToken", res?.data?.token);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Settings",
          err?.response?.data?.message || err?.message
        );
      });
    setbuttonLoader(false);
  };

  useEffect(() => {
    // If both minutes and seconds are zero, stop the timer
    if (minutes === 0 && seconds === 0) {
      setIsTimeOver(true);
      return;
    }

    // Set an interval to update the timer every second
    const timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timerInterval);
  }, [minutes, seconds]);
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography style={{ marginLeft: 10 }}>My Account</Typography>
        </div>
      }
      visible={isOTPVerificationModalVisible}
      footer={
        <>
          <Divider style={{ marginTop: 60 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 10,
            }}
          >
            <Space>
              <Button
                onClick={() => {
                  OTPVerificationform?.resetFields();
                  setisOTPVerificationModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  OTPVerificationform?.submit();
                }}
                loading={buttonLoader}
              >
                Change Email
              </Button>
            </Space>
          </div>
        </>
      }
      closable={false}
      width={500}
      className="custom-modal"
    >
      <Space style={{ margin: "15px 0px" }}>
        <MailIconSvg />
      </Space>

      <h2>Check Your Inbox!</h2>
      <p className="custom-text1">
        We’ve sent the reset code to {userDetails?.email}. Enter the code to
        continue.
      </p>

      <Form
        name="verify otp"
        form={OTPVerificationform}
        initialValues={{ remember: true }}
        onFinish={handleOTPVerificationModal}
        layout="vertical"
      >
        <Form.Item>
          <Input.OTP
            onChange={(e) => {
              setotp(e);
            }}
            name="otp"
            size="large"
            length={4}
          />
        </Form.Item>
        <Form.Item>
          <Typography>
            Didn’t get the code?
            {isTimeOver ? (
              <span
                onClick={() => {
                  //   reSendOtp();
                }}
                className="custom-text-link"
              >
                Resend{" "}
              </span>
            ) : (
              <>
                Wait {formatTime(minutes)}:{formatTime(seconds)}
              </>
            )}
          </Typography>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const ShowAllRolesModal = ({
  showAllRolesModalVisible,
  setshowAllRolesModalVisible,
  buttonLoader,
  setbuttonLoader,
  clinicDetails,
  setrolesAndPermissionsModal,
  clinicRolesList,
  setisRoleDeleteModalVisible,
  setupdateRolesAndPermissionsModal,
  setselectedRoleDetails,
}) => {
  return (
    <Modal
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography style={{ marginLeft: 10 }}>
            Roles And Permissions
          </Typography>
          <RxCross2
            style={{ cursor: "pointer" }}
            onClick={() => {
              setshowAllRolesModalVisible(false);
            }}
          />
        </div>
      }
      visible={showAllRolesModalVisible}
      footer={[]}
      closable={false}
      width={600}
      className="custom-modal"
    >
      <Row align="middle" gutter={[16, 16]}>
        <Col span={18}>
          <Typography style={{ fontWeight: 600 }}>
            Roles And Permissions
          </Typography>
          <Text className="custom-text1">
            Manage your team’s access and roles within TeraCRM
          </Text>
        </Col>
        <Col span={6} align="end">
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setrolesAndPermissionsModal(true);
              }}
            >
              + Create Role
            </Button>
          </Space>
        </Col>
      </Row>
      <Divider style={{ margin: "10px 0px" }} />
      <Typography>Roles ({clinicRolesList.length || 0})</Typography>

      <div>
        {clinicRolesList?.length <= 0 ? (
          <>
            <div
              style={{
                display: "flex",
                justifyItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
            >
              <Empty />
            </div>
          </>
        ) : (
          <>
            <List
              style={{ height: "47vh", overflow: "auto", padding: 10 }}
              itemLayout="horizontal"
              dataSource={clinicRolesList}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    description={
                      <>
                        <Row>
                          <Col span={12}>
                            <Typography>{item.role_name}</Typography>
                            <Typography className="custom-text1">
                              {item.users ? item.users?.length : 0} Users
                            </Typography>
                          </Col>
                          <Col
                            span={12}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "end",
                            }}
                          >
                            <Space>
                              <Button
                                icon={<FaRegEdit />}
                                onClick={() => {
                                  setselectedRoleDetails(item);
                                  setupdateRolesAndPermissionsModal(true);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                type="link"
                                danger
                                onClick={() => {
                                  setselectedRoleDetails(item);
                                  setisRoleDeleteModalVisible(true);
                                }}
                              >
                                Delete
                              </Button>
                            </Space>
                          </Col>
                        </Row>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export const RolesAndPermissionsModal = ({
  rolesAndPermissionsModal,
  setrolesAndPermissionsModal,
  buttonLoader,
  setbuttonLoader,
  openNotificationWithIcon,
  handlegetAllRoles,
  permissionList,
  clinicDetails,
}) => {
  const [RolesAndPermissionsModalform] = Form.useForm();
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Handle checkbox change
  const handleCheckboxChange = (checked, code) => {
    setSelectedPermissions((prev) =>
      checked ? [...prev, code] : prev.filter((item) => item !== code)
    );
  };
  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (_, record) => (
        <>
          {record?.type === "View" ? (
            <Checkbox
              onChange={(e) =>
                handleCheckboxChange(e.target.checked, record.code)
              }
            />
          ) : (
            "-"
          )}
        </>
      ),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => (
        <>
          {record?.type === "Edit" ? (
            <Checkbox
              onChange={(e) =>
                handleCheckboxChange(e.target.checked, record.code)
              }
            />
          ) : (
            "-"
          )}
        </>
      ),
    },
    {
      title: "Full Access",
      dataIndex: "fullAccess",
      key: "fullAccess",
      render: (_, record) => (
        <>
          {record?.type === "FullAccess" ? (
            <Checkbox
              onChange={(e) =>
                handleCheckboxChange(e.target.checked, record.code)
              }
            />
          ) : (
            "-"
          )}
        </>
      ),
    },
    {
      title: "Limited",
      dataIndex: "limited",
      key: "limited",
      render: (_, record) => (
        <>
          {record?.type === "Limited" ? (
            <Checkbox
              onChange={(e) =>
                handleCheckboxChange(e.target.checked, record.code)
              }
            />
          ) : (
            "-"
          )}
        </>
      ),
    },
  ];


  const handleSubmitRolesAndPermissions = async (values) => {
    const token = localStorage.getItem("authToken");
    setbuttonLoader(true);

    if (selectedPermissions?.length <= 0) {
      openNotificationWithIcon("error", "Settings", "Please select permission");
      setbuttonLoader(false);
      return;
    }
    let data = {
      clinic_id: clinicDetails.id,
      role_name: values?.role_name,
      description: values?.description,
      permission_group: selectedPermissions.join(","),
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/createRoles`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          handlegetAllRoles();
          openNotificationWithIcon(
            "success",
            "Settings",
            "Role created successfully"
          );
          RolesAndPermissionsModalform?.resetFields();
          setrolesAndPermissionsModal(false);
        })
        .catch((err) => {
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
          console.log(err);
        });
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Settings",
        err?.response?.data?.message || err?.message
      );
      console.log(err);
    }
    setbuttonLoader(false);
  };

  return (
    <Modal
      style={{ top: 20 }}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography style={{ marginLeft: 10 }}>
            Roles And Permissions
          </Typography>
        </div>
      }
      visible={rolesAndPermissionsModal}
      footer={
        <>
          <Divider style={{ margin: 5 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 10,
            }}
          >
            <Space>
              <Button
                onClick={() => {
                  RolesAndPermissionsModalform?.resetFields();
                  setrolesAndPermissionsModal(false);
                }}
              >
                Cancel
              </Button>

              <Button
                type="primary"
                onClick={() => {
                  RolesAndPermissionsModalform?.submit();
                }}
                loading={buttonLoader}
              >
                Create
              </Button>
            </Space>
          </div>
        </>
      }
      closable={false}
      width={800}
      className="custom-modal"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <TeamSVG
            color={"#72779E"}
            style={{ width: 12, display: "contents" }}
          />
          <Typography style={{ fontWeight: 600, marginLeft: 5 }}>
            Create New Role
          </Typography>
        </div>
      </div>
      <Divider style={{ margin: "10px 0px" }} />
      <Form
        onFinish={handleSubmitRolesAndPermissions}
        form={RolesAndPermissionsModalform}
        layout="vertical"
        style={{ padding: "10px 0px" }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label={
                <div className="custom-text1">
                  Role Name<span style={{ color: "red" }}>*</span>
                </div>
              }
              name="role_name"
              rules={[
                {
                  required: true,
                  message: "Please enter  role name",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label={
                <div className="custom-text1">
                  Description<span style={{ color: "red" }}>*</span>
                </div>
              }
              name="description"
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <div style={{ height: "50vh", overflow: "auto", paddingRight: 20 }}>
              <div style={{ marginTop: 10 }}>
                <Divider style={{ margin: "10px 0px" }} />
                {Object.keys(permissionList || {}).map((category) => (
                  <div key={category} style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {category === "Appointments" ? (
                        <AppointmentsSVG
                          color={"#72779E"}
                          style={{ width: 12, display: "contents" }}
                        />
                      ) : category === "Lead" ? (
                        <LeadsSVG
                          color={"#72779E"}
                          style={{ width: 12, display: "contents" }}
                        />
                      ) : category === "Conversations" ? (
                        <ConversationsSVG
                          color={"#72779E"}
                          style={{ width: 12, display: "contents" }}
                        />
                      ) : category === "Team" ? (
                        <TeamSVG
                          color={"#72779E"}
                          style={{ width: 12, display: "contents" }}
                        />
                      ) : category === "Campaigns" ? (
                        <CampaignsSVG
                          color={"#72779E"}
                          style={{ width: 12, display: "contents" }}
                        />
                      ) : category === "Reports" ? (
                        <ReportsSVG
                          color={"#72779E"}
                          style={{ width: 12, display: "contents" }}
                        />
                      ) : (
                        ""
                      )}

                      <Typography style={{ fontWeight: 500, marginLeft: 5 }}>
                        {category}
                      </Typography>
                      <Typography style={{ fontWeight: 500, marginLeft: 5 }}>
                        Permissions
                      </Typography>
                    </div>
                    <Row>
                      {permissionList[category]["View"]?.map(
                        (permissionlist) => {
                          return (
                            <Col span={12} style={{ padding: 5 }}>
                              <Space>
                                <Checkbox
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e.target.checked,
                                      permissionlist.code
                                    )
                                  }
                                ></Checkbox>
                                <Typography>
                                  {permissionlist?.description}
                                </Typography>
                              </Space>
                            </Col>
                          );
                        }
                      )}
                      {permissionList[category]["Edit"]?.map(
                        (permissionlist) => {
                          return (
                            <Col span={12} style={{ padding: 5 }}>
                              <Space>
                                <Checkbox
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e.target.checked,
                                      permissionlist.code
                                    )
                                  }
                                ></Checkbox>
                                <Typography>
                                  {permissionlist?.description}
                                </Typography>
                              </Space>
                            </Col>
                          );
                        }
                      )}
                      {permissionList[category]["Limited"]?.map(
                        (permissionlist) => {
                          return (
                            <Col span={12} style={{ padding: 5 }}>
                              <Space>
                                <Checkbox
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e.target.checked,
                                      permissionlist.code
                                    )
                                  }
                                ></Checkbox>
                                <Typography>
                                  {permissionlist?.description}
                                </Typography>
                              </Space>
                            </Col>
                          );
                        }
                      )}
                      {permissionList[category]["FullAccess"]?.map(
                        (permissionlist) => {
                          return (
                            <Col span={12} style={{ padding: 5 }}>
                              <Space>
                                <Checkbox
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e.target.checked,
                                      permissionlist.code
                                    )
                                  }
                                ></Checkbox>
                                <Typography>
                                  {permissionlist?.description}
                                </Typography>
                              </Space>
                            </Col>
                          );
                        }
                      )}
                    </Row>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export const EditRolesAndPermissionModal = ({
  updateRolesAndPermissionsModal,
  setupdateRolesAndPermissionsModal,
  buttonLoader,
  setbuttonLoader,
  openNotificationWithIcon,
  handlegetAllRoles,
  selectedRoleDetails,
  permissionList,
}) => {
  const [RolesAndPermissionsModalform] = Form.useForm();
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Handle checkbox change
  const handleCheckboxChange = (checked, code) => {
    setSelectedPermissions((prev) =>
      checked ? [...prev, code] : prev.filter((item) => item !== code)
    );
  };
  
  const handleSubmitRolesAndPermissions = async (values) => {
    const token = localStorage.getItem("authToken");
    setbuttonLoader(true);

    let data = {
      id: selectedRoleDetails?.id,
      role_name: values?.role_name,
      description: values?.description,
      permission_group: selectedPermissions.join(","),
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/updateRoles`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          handlegetAllRoles();
          openNotificationWithIcon(
            "success",
            "Settings",
            "Role updated successfully"
          );
          setupdateRolesAndPermissionsModal(false);
        })
        .catch((err) => {
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
          console.log(err);
        });
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Settings",
        err?.response?.data?.message || err?.message
      );
      console.log(err);
    }
    setbuttonLoader(false);
  };

  useEffect(() => {
    let temp = selectedRoleDetails?.permission_group?.split(",");
    setSelectedPermissions(temp);
    RolesAndPermissionsModalform?.setFieldValue(
      "role_name",
      selectedRoleDetails?.role_name
    );
    RolesAndPermissionsModalform?.setFieldValue(
      "description",
      selectedRoleDetails?.description
    );
  }, [selectedRoleDetails]);

  return (
    <Modal
      style={{ top: 20 }}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography style={{ marginLeft: 10 }}>
            Update Roles And Permissions
          </Typography>
        </div>
      }
      visible={updateRolesAndPermissionsModal}
      footer={
        <>
          <Divider style={{ margin: 5 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 10,
            }}
          >
            <Space>
              <Button
                onClick={() => {
                  setupdateRolesAndPermissionsModal(false);
                }}
              >
                Cancel
              </Button>

              <Button
                type="primary"
                onClick={() => {
                  RolesAndPermissionsModalform?.submit();
                }}
                loading={buttonLoader}
              >
                Update
              </Button>
            </Space>
          </div>
        </>
      }
      closable={false}
      width={700}
      className="custom-modal"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <TeamSVG
            color={"#72779E"}
            style={{ width: 12, display: "contents" }}
          />
          <Typography style={{ fontWeight: 600, marginLeft: 5 }}>
            Create New Role
          </Typography>
        </div>
      </div>
      <Divider style={{ margin: "10px 0px" }} />
      <Form
        onFinish={handleSubmitRolesAndPermissions}
        form={RolesAndPermissionsModalform}
        layout="vertical"
        style={{ padding: "10px 0px" }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label={
                <div className="custom-text1">
                  Role Name<span style={{ color: "red" }}>*</span>
                </div>
              }
              name="role_name"
              rules={[
                {
                  required: true,
                  message: "Please enter  role name",
                },
              ]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label={
                <div className="custom-text1">
                  Description<span style={{ color: "red" }}>*</span>
                </div>
              }
              name="description"
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>

            <div style={{ height: "50vh", overflow: "auto", paddingRight: 20 }}>
              <div style={{ marginTop: 10 }}>
                <Divider style={{ margin: "10px 0px" }} />
                {Object.keys(permissionList || {}).map((category) => (
                  <div key={category} style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {category === "Appointments" ? (
                        <AppointmentsSVG
                          color={"#72779E"}
                          style={{ width: 12, display: "contents" }}
                        />
                      ) : category === "Lead" ? (
                        <LeadsSVG
                          color={"#72779E"}
                          style={{ width: 12, display: "contents" }}
                        />
                      ) : category === "Conversations" ? (
                        <ConversationsSVG
                          color={"#72779E"}
                          style={{ width: 12, display: "contents" }}
                        />
                      ) : category === "Team" ? (
                        <TeamSVG
                          color={"#72779E"}
                          style={{ width: 12, display: "contents" }}
                        />
                      ) : category === "Campaigns" ? (
                        <CampaignsSVG
                          color={"#72779E"}
                          style={{ width: 12, display: "contents" }}
                        />
                      ) : category === "Reports" ? (
                        <ReportsSVG
                          color={"#72779E"}
                          style={{ width: 12, display: "contents" }}
                        />
                      ) : (
                        ""
                      )}

                      <Typography style={{ fontWeight: 500, marginLeft: 5 }}>
                        {category}
                      </Typography>
                      <Typography style={{ fontWeight: 500, marginLeft: 5 }}>
                        Permissions
                      </Typography>
                    </div>
                    <Row>
                      {permissionList[category]["View"]?.map(
                        (permissionlist) => {
                          return (
                            <Col span={12} style={{ padding: 5 }}>
                              <Space>
                                <Checkbox
                                checked={selectedPermissions?.includes(permissionlist?.code)}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e.target.checked,
                                      permissionlist.code
                                    )
                                  }
                                ></Checkbox>
                                <Typography>
                                  {permissionlist?.description}
                                </Typography>
                              </Space>
                            </Col>
                          );
                        }
                      )}
                      {permissionList[category]["Edit"]?.map(
                        (permissionlist) => {
                          return (
                            <Col span={12} style={{ padding: 5 }}>
                              <Space>
                                <Checkbox
                                 checked={selectedPermissions?.includes(permissionlist?.code)}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e.target.checked,
                                      permissionlist.code
                                    )
                                  }
                                ></Checkbox>
                                <Typography>
                                  {permissionlist?.description}
                                </Typography>
                              </Space>
                            </Col>
                          );
                        }
                      )}
                      {permissionList[category]["Limited"]?.map(
                        (permissionlist) => {
                          return (
                            <Col span={12} style={{ padding: 5 }}>
                              <Space>
                                <Checkbox
                                 checked={selectedPermissions?.includes(permissionlist?.code)}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e.target.checked,
                                      permissionlist.code
                                    )
                                  }
                                ></Checkbox>
                                <Typography>
                                  {permissionlist?.description}
                                </Typography>
                              </Space>
                            </Col>
                          );
                        }
                      )}
                      {permissionList[category]["FullAccess"]?.map(
                        (permissionlist) => {
                          return (
                            <Col span={12} style={{ padding: 5 }}>
                              <Space>
                                <Checkbox
                                 checked={selectedPermissions?.includes(permissionlist?.code)}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e.target.checked,
                                      permissionlist.code
                                    )
                                  }
                                ></Checkbox>
                                <Typography>
                                  {permissionlist?.description}
                                </Typography>
                              </Space>
                            </Col>
                          );
                        }
                      )}
                    </Row>
                  
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export const InviteTeamMemberModal = ({
  loginUserDetails,
  isInviteTeamMemberModalVisible,
  setisInviteTeamMemberModalVisible,
  buttonLoader,
  setbuttonLoader,
  openNotificationWithIcon,
  rolesList,
  getAllClinicUserDetails,
  clinicDetails,
}) => {
  const [InviteTeamMemberform] = Form.useForm();
  const [options, setoptions] = useState([]);
  const [full_name, setfull_name] = useState();
  const [email, setemail] = useState();
  const [selectedInviteWebsiteOrRole, setselectedInviteWebsiteOrRole] =
    useState([]);

  const [next, setnext] = useState(false);

  const handleCheckboxChange = (websiteId, event) => {
    const isChecked = event.target.checked;
    setselectedInviteWebsiteOrRole((prevWebsites) =>
      prevWebsites.map((website) =>
        website.website_id === websiteId
          ? { ...website, selected: isChecked }
          : website
      )
    );
  };

  const handleChangeRole = (websiteId, role_id, role_name) => {
    setselectedInviteWebsiteOrRole((prevWebsites) => {
      const websiteExistsAndSelected = prevWebsites.some(
        (website) => website.website_id === websiteId && website.selected
      );

      if (!websiteExistsAndSelected) {
        openNotificationWithIcon(
          "error",
          "Settings",
          "Please select website first"
        );
        return prevWebsites;
      }

      return prevWebsites.map((website) =>
        website.website_id === websiteId
          ? { ...website, role_id: role_id, role_name: role_name }
          : website
      );
    });
  };

  const handleSendInviteTeamMember = async () => {
    const token = localStorage.getItem("authToken");
    setbuttonLoader(true);

    const noSelection = !selectedInviteWebsiteOrRole.some(
      (website) => website.selected
    );

    if (noSelection) {
      openNotificationWithIcon(
        "error",
        "Settings",
        "Please select at least one website."
      );
      setbuttonLoader(false);

      return;
    }

    const noRolesAssigned = !selectedInviteWebsiteOrRole.some(
      (website) => website.selected && website.role_id
    );

    if (noRolesAssigned) {
      openNotificationWithIcon(
        "error",
        "Settings",
        "Please assign a role to the selected website."
      );
 
      setbuttonLoader(false);

      return;
    }

    let data = {
      clinic_id: clinicDetails?.id,
      clinic_name: clinicDetails?.clinic_name,
      email: email,
      dentist_full_name: full_name,
      website_selected: selectedInviteWebsiteOrRole,
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/inviteTeamMember`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setnext(false);
          InviteTeamMemberform?.resetFields();
          getAllClinicUserDetails();
          openNotificationWithIcon(
            "success",
            "Settings",
            "Invited Team Member successfully"
          );
          setisInviteTeamMemberModalVisible(false);
        })
        .catch((err) => {
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
          console.log(err);
        });
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Settings",
        err?.response?.data?.message || err?.message
      );
      console.log(err);
    }
    setbuttonLoader(false);
  };

  const handleSetValue = () => {
    let temp = rolesList?.map((role) => ({
      value: role?.id,
      label: role?.role_name,
    }));
    setoptions(temp);
  };

  useEffect(() => {
    handleSetValue();
  }, [rolesList]);

  useEffect(() => {
    let temp = clinicDetails?.websites?.map((item) => {
      return {
        website_id: item?.id,
        website_name: item?.website_user_name,
        role_id: null,
        selected: false,
      };
    });

    setselectedInviteWebsiteOrRole(temp);
  }, [clinicDetails]);

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          {next ? (
            <Button
              onClick={() => {
                setnext(false);
              }}
              icon={<IoChevronBackSharp />}
            ></Button>
          ) : (
            ""
          )}

          <Typography style={{ marginLeft: 10 }}>Team</Typography>
        </div>
      }
      visible={isInviteTeamMemberModalVisible}
      footer={
        <>
          <Divider style={{ marginTop: 60 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 10,
            }}
          >
            <Space>
              <Button
                onClick={() => {
                  setisInviteTeamMemberModalVisible(false);
                  InviteTeamMemberform?.resetFields();
                }}
              >
                Cancel
              </Button>
              {next ? (
                <Button
                  type="primary"
                  loading={buttonLoader}
                  onClick={() => {
                    InviteTeamMemberform.submit();
                  }}
                >
                  Send Invitation
                </Button>
              ) : (
                <Button
                  type="primary"
                  loading={buttonLoader}
                  onClick={async () => {
                    try {
                      // Validate full_name and email before proceeding
                      await InviteTeamMemberform.validateFields([
                        "full_name",
                        "email",
                      ]);
                      setnext(true); // Go to the next step
                    } catch (error) {
                      console.log("Validation failed:", error);
                    }
                  }}
                  icon={<FaArrowRight />}
                  iconPosition={"end"}
                >
                  Next
                </Button>
              )}
            </Space>
          </div>
        </>
      }
      closable={false}
      width={500}
      className="custom-modal"
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <TeamSVG color={"#72779E"} style={{ width: 15, display: "contents" }} />
        <Typography style={{ fontWeight: 600, marginLeft: 5 }}>
          Invite a Team Member
        </Typography>
      </div>
      <Typography className="custom-text1">
        Send an invitation to a team member via email and assign their role.
      </Typography>
      <Divider style={{ margin: "10px 0px" }} />
      <Form
        form={InviteTeamMemberform}
        onFinish={handleSendInviteTeamMember}
        layout="vertical"
        style={{ padding: "10px 0px" }}
      >
        <Row gutter={16}>
          {!next ? (
            <>
              <Col span={24}>
                <Form.Item
                  label={
                    <div className="custom-text1">
                      Full Name<span style={{ color: "red" }}>*</span>
                    </div>
                  }
                  name="full_name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a full name!",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setfull_name(e?.target?.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={
                    <div className="custom-text1">
                      Email<span style={{ color: "red" }}>*</span>
                    </div>
                  }
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter a valid email!",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setemail(e?.target?.value);
                    }}
                  />
                </Form.Item>
              </Col>
            </>
          ) : (
            <>
              <Space
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Avatar
                  src={clinicDetails?.clinic_favicon}
                  size={30}
                  shape="square"
                ></Avatar>
                <Typography>{clinicDetails?.clinic_name}</Typography>
              </Space>
              <List
                style={{ width: "100%" }}
                dataSource={clinicDetails?.websites}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      description={
                        <>
                          <Row>
                            <Col span={14}>
                              <Space
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Checkbox
                                  key={index}
                                  onChange={(e) => {
                                    handleCheckboxChange(item?.id, e);
                                  }}
                                />
                                <Avatar
                                  shape="square"
                                  size={18}
                                  src={
                                    item?.website_user_name
                                      ? getLogoUrlDomain(
                                          item?.website_user_name + ".com"
                                        )
                                      : ""
                                  }
                                />
                                <Typography
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {item?.website_user_name}
                                </Typography>
                              </Space>
                            </Col>
                            <Col
                              span={10}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                              }}
                            >
                              <Select
                                style={{
                                  width: "100%",
                                }}
                                placeholder="Select role"
                                onChange={(e, val) => {
                                  handleChangeRole(item?.id, e, val?.label);
                                }}
                                options={options}
                              />
                            </Col>
                          </Row>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </>
          )}
        </Row>
      </Form>
    </Modal>
  );
};

export const ManageAccessModal = ({
  manageAccessModalVisible,
  setmanageAccessModalVisible,
  buttonLoader,
  setbuttonLoader,
  clinicDetails,
  seletedUserDetails,
  openNotificationWithIcon,
  getAllClinicUserDetails,
}) => {
  const [selectedWebsite, setselectedWebsite] = useState();
  const [selectedRoleId, setselectedRoleId] = useState();
  const [selectedWebsiteId, setselectedWebsiteId] = useState();

  const [accesslevelData, setaccesslevelData] = useState([]);
  const [appointmentsAccess, setappointmentsAccess] = useState(false);
  const [leadaAccess, setleadaAccess] = useState(false);
  const [conversationsAccess, setconversationsAccess] = useState(false);
  const [teamAccess, setteamAccess] = useState(false);
  const [campaignsAccess, setcampaignsAccess] = useState(false);
  const [reportsAccess, setreportsAccess] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleSubmitAccess = async () => {
    const token = localStorage.getItem("authToken");
    setbuttonLoader(true);
    let data = {
      access_level_id: accesslevelData?.id || undefined,
      user_id: seletedUserDetails?.dataValues?.id,
      clinic_id: clinicDetails?.id,
      role_id: selectedRoleId,
      website_id: selectedWebsiteId,
      appointments: appointmentsAccess,
      lead: leadaAccess,
      conversations: conversationsAccess,
      team: teamAccess,
      campaigns: campaignsAccess,
      reports: reportsAccess,
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/createOrUpdateAccessLevel`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setUnsavedChanges(false);
          getAllClinicUserDetails();
          openNotificationWithIcon(
            "success",
            "Settings",
            "Access updated successfully"
          );
        })
        .catch((err) => {
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
          console.log(err);
        });
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Settings",
        err?.response?.data?.message || err?.message
      );
      console.log(err);
    }
    setbuttonLoader(false);
  };



  useEffect(() => {
    setappointmentsAccess(accesslevelData?.appointments);
    setleadaAccess(accesslevelData?.lead);
    setconversationsAccess(accesslevelData?.conversations);
    setteamAccess(accesslevelData?.team);
    setcampaignsAccess(accesslevelData?.campaigns);
    setreportsAccess(accesslevelData?.reports);
  }, [accesslevelData]);
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => {
              setmanageAccessModalVisible(false);
              setselectedWebsite();
              setaccesslevelData();
            }}
            icon={<IoChevronBackSharp />}
          ></Button>
          <Typography style={{ marginLeft: 10 }}>User Details</Typography>
        </div>
      }
      visible={manageAccessModalVisible}
      footer={
        <>
          {unsavedChanges ? (
            <>
              <Divider style={{ margin: 5 }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: 10,
                }}
              >
                <Space>
                  {unsavedChanges && (
                    <Text type="danger">You have unsaved changes</Text>
                  )}

                  <Button
                    type="primary"
                    onClick={() => {
                      handleSubmitAccess();
                    }}
                    loading={buttonLoader}
                  >
                    Save
                  </Button>
                </Space>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      }
      closable={false}
      width={600}
      className="custom-modal"
    >
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Col span={12}>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
            }}
            gutter={[5, 5]}
          >
            <Col style={{ display: "flex", justifyContent: "center" }}>
              {seletedUserDetails?.dataValues?.profile_picture ? (
                <Avatar size="large" src={seletedUserDetails?.dataValues?.profile_picture} />
              ) : (
                <Avatar
                  style={{
                    background: seletedUserDetails?.dataValues?.avatar_color,
                  }}
                  size="large"
                >
                  {getInitials(seletedUserDetails?.dataValues?.dentist_full_name)}
                </Avatar>
              )}
            </Col>
            <Col>
              <Typography> {seletedUserDetails?.dataValues?.dentist_full_name}</Typography>
              <Typography> {seletedUserDetails?.dataValues?.email}</Typography>
            </Col>
          </Row>
        </Col>

        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Space>
            <Typography> Account Admin</Typography>
            <Switch />
          </Space>
        </Col>
      </Row>
      <Divider style={{ margin: "10px 0px" }} />
      {selectedWebsite ? (
        <>
          <Button
            type="link"
            icon={<IoIosArrowBack />}
            onClick={() => {
              setselectedWebsite();
              setaccesslevelData();
            }}
            style={{ padding: 0 }}
          >
            Assigned Websites
          </Button>

          <Typography style={{ marginTop: 10 }}>
            <Space style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                shape="square"
                size={18}
                src={
                  selectedWebsite
                    ? getLogoUrlDomain(selectedWebsite + ".com")
                    : ""
                }
              />
              <Typography style={{ textTransform: "capitalize" }}>
                {selectedWebsite} Access Level
              </Typography>
            </Space>
          </Typography>
          <Divider style={{ margin: "15px 0px 15px 0px" }} />
          <Row>
            <Col span={10}>
              <Space>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AppointmentsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "flex" }}
                  />
                </div>

                <Typography>Appointments</Typography>
              </Space>
            </Col>
            <Col
              span={14}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Space>
                <Typography> Access </Typography>
                <Switch
                  checked={appointmentsAccess}
                  onChange={(e) => {
                    setappointmentsAccess(e);
                    setUnsavedChanges(true);
                  }}
                />
              </Space>
            </Col>
          </Row>
          <Divider style={{ margin: "15px 0px 15px 0px" }} />
          <Row>
            <Col span={10}>
              <Space style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LeadsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "flex" }}
                  />
                </div>

                <Typography>Leads</Typography>
              </Space>
            </Col>
            <Col
              span={14}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Space>
                <Typography> Access </Typography>
                <Switch
                  checked={leadaAccess}
                  onChange={(e) => {
                    setleadaAccess(e);
                    setUnsavedChanges(true);
                  }}
                />
              </Space>
            </Col>
          </Row>
          <Divider style={{ margin: "15px 0px 15px 0px" }} />
          <Row>
            <Col span={10}>
              <Space style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ConversationsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "flex" }}
                  />
                </div>

                <Typography>Conversations</Typography>
              </Space>
            </Col>
            <Col
              span={14}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Space>
                <Typography> Access </Typography>
                <Switch
                  checked={conversationsAccess}
                  onChange={(e) => {
                    setconversationsAccess(e);
                    setUnsavedChanges(true);
                  }}
                />
              </Space>
            </Col>
          </Row>
          <Divider style={{ margin: "15px 0px 15px 0px" }} />
          <Row>
            <Col span={10}>
              <Space style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TeamSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "flex" }}
                  />
                </div>

                <Typography>Team</Typography>
              </Space>
            </Col>
            <Col
              span={14}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Space>
                <Typography> Access </Typography>
                <Switch
                  checked={teamAccess}
                  onChange={(e) => {
                    setteamAccess(e);
                    setUnsavedChanges(true);
                  }}
                />
              </Space>
            </Col>
          </Row>
          <Divider style={{ margin: "15px 0px 15px 0px" }} />
          <Row>
            <Col span={10}>
              <Space style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CampaignsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "flex" }}
                  />
                </div>

                <Typography>Campaigns</Typography>
              </Space>
            </Col>
            <Col
              span={14}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Space>
                <Typography> Access </Typography>
                <Switch
                  checked={campaignsAccess}
                  onChange={(e) => {
                    setcampaignsAccess(e);
                    setUnsavedChanges(true);
                  }}
                />
              </Space>
            </Col>
          </Row>
          <Divider style={{ margin: "15px 0px 15px 0px" }} />
          <Row>
            <Col span={10}>
              <Space style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ReportsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "flex" }}
                  />
                </div>

                <Typography>Reports</Typography>
              </Space>
            </Col>
            <Col
              span={14}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Space>
                <Typography> Access </Typography>
                <Switch
                  checked={reportsAccess}
                  onChange={(e) => {
                    setreportsAccess(e);
                    setUnsavedChanges(true);
                  }}
                />
              </Space>
            </Col>
          </Row>
          <Divider style={{ margin: "15px 0px 15px 0px" }} />
        </>
      ) : (
        <>
          <Row>
            Assigned Websites {seletedUserDetails?.websites?.length || 0}
          </Row>
          <Row>
            <List
              style={{ width: "100%" }}
              dataSource={seletedUserDetails?.websites}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Typography
                        style={{ color: "#72779EF0", fontWeight: 400 }}
                      >
                        {item?.role_name}
                      </Typography>
                    }
                    description={
                      <>
                        <Row>
                          <Col span={10}>
                            <Tag
                              style={{
                                background: "#EDEAFF",
                                borderRadius: 5,
                              }}
                            >
                              <Space
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Avatar
                                  shape="square"
                                  size={18}
                                  src={
                                    item?.website_name
                                      ? getLogoUrlDomain(
                                          item?.website_name + ".com"
                                        )
                                      : ""
                                  }
                                />
                                <Typography
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {item?.website_name}
                                </Typography>
                              </Space>
                            </Tag>
                          </Col>
                          <Col
                            span={14}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "end",
                            }}
                          >
                            <Space
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <IoSettingsOutline
                                size={15}
                                style={{ display: "flex" }}
                              />
                              <Typography
                                onClick={() => {
                                  setselectedWebsite(item?.website_name);
                                  setselectedRoleId(item?.role_id);
                                  setselectedWebsiteId(item?.website_id);
                                  setaccesslevelData(item?.accesslevel);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                Access Level
                              </Typography>
                            </Space>
                          </Col>
                        </Row>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Row>
        </>
      )}
    </Modal>
  );
};

export const DeleteUser = ({
  isUserDeleteModalVisible,
  setisUserDeleteModalVisible,
  seletedUserDetails,
  openNotificationWithIcon,
  buttonLoader,
  setbuttonLoader,
  getAllClinicUserDetails,
  clinicDetails,
}) => {
  const handleDelete = async () => {
    setbuttonLoader(true);
    const token = localStorage.getItem("authToken");

    await axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/delete-user/${clinicDetails?.id}/${seletedUserDetails?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getAllClinicUserDetails();
        setbuttonLoader(false);
        setisUserDeleteModalVisible(false);
        openNotificationWithIcon(
          "success",
          "Lead",
          "User deleted successfully!"
        );
      })
      .catch((error) => {
        openNotificationWithIcon(
          "error",
          "Lead",
          error.response?.data?.message || "Failed to delete user"
        );
        setisUserDeleteModalVisible(false);
        setbuttonLoader(false);
      });
    setbuttonLoader(false);
  };
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => setisUserDeleteModalVisible(false)}
            icon={<IoChevronBackSharp />}
          />
          <Typography style={{ marginLeft: 10 }}>
            Delete Confirmation
          </Typography>
        </div>
      }
      visible={isUserDeleteModalVisible}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0px 10px 10px 0px",
          }}
        >
          <Space>
            <Button onClick={() => setisUserDeleteModalVisible(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleDelete}
              loading={buttonLoader}
            >
              Yes
            </Button>
          </Space>
        </div>
      }
      closable={false}
      width={450}
      className="custom-modal"
    >
      <Typography style={{ padding: "0 10px" }}>
        Are you sure you want to delete this user?
      </Typography>
    </Modal>
  );
};

export const DeleteRole = ({
  isRoleDeleteModalVisible,
  setisRoleDeleteModalVisible,
  selectedRoleDetails,
  openNotificationWithIcon,
  buttonLoader,
  setbuttonLoader,
  handlegetAllRoles,
  getAllClinicUserDetails,
  rolesoptions,
  clinicDetails,
}) => {
  const handleChange = async (role_id, user_id, website_id) => {
    const token = localStorage.getItem("authToken");
    let data = {
      clinic_id: clinicDetails?.id,
      role_id: role_id,
      user_id: user_id,
      website_id: website_id,
    };

    setbuttonLoader(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/assignRoles`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          handlegetAllRoles();
          getAllClinicUserDetails();
          setisRoleDeleteModalVisible(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    setbuttonLoader(false);
  };

  const handleDeleteRole = async () => {
    setbuttonLoader(true);
    const token = localStorage.getItem("authToken");
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/delete-role/${selectedRoleDetails?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          openNotificationWithIcon(
            "success",
            "Settings",
            "Role deleted successfully"
          );
          setisRoleDeleteModalVisible(false);
          handlegetAllRoles();
        })
        .catch((err) => {
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    setbuttonLoader(false);
  };

  useEffect(() => {}, [selectedRoleDetails]);

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => setisRoleDeleteModalVisible(false)}
            icon={<IoChevronBackSharp />}
          />
          <Typography style={{ marginLeft: 10 }}>
            Delete Confirmation
          </Typography>
        </div>
      }
      visible={isRoleDeleteModalVisible}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0px 10px 10px 0px",
          }}
        >
          <Space>
            <Button onClick={() => setisRoleDeleteModalVisible(false)}>
              Cancel
            </Button>
            <Button
              danger
              type="primary"
              onClick={handleDeleteRole}
              loading={buttonLoader}
              disabled={selectedRoleDetails?.users?.length <= 0 ? false : true}
            >
              Delete
            </Button>
          </Space>
        </div>
      }
      closable={false}
      width={selectedRoleDetails?.users?.length <= 0 ? 450 : 750}
      className="custom-modal"
    >
      {selectedRoleDetails?.users?.length <= 0 ? (
        <Typography style={{ padding: "0 10px" }}>
          Are you sure you want to delete this role?
        </Typography>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TeamSVG
              color={"#72779E"}
              style={{ width: 15, display: "contents" }}
            />
            <Typography style={{ fontWeight: 600, marginLeft: 5 }}>
              Delete {selectedRoleDetails?.role_name} Role
            </Typography>
          </div>
          <Divider style={{ margin: "10px 0px" }} />
          <Row
            style={{
              background: "#FFDBDB",
              padding: 10,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Col span={2}>
              <MdOutlineErrorOutline
                style={{ color: "#E21D12", fontSize: 30 }}
              />
            </Col>
            <Col span={22}>
              <Typography style={{ color: "#E21D12" }}>
                The following users are assigned to this role. Please select a
                new role for each user before deleting.
              </Typography>
            </Col>
          </Row>
          <List
            style={{
              height: "50vh",
              overflow: "auto",
              padding: "10px 10px 100px 10px",
            }}
            itemLayout="horizontal"
            dataSource={selectedRoleDetails?.users}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    item?.profile_picture ? (
                      <Avatar src={item?.profile_picture} size={40} />
                    ) : (
                      <Avatar
                        size={40}
                        style={{ background: item?.avatar_color }}
                      >
                        {getInitials(item?.dentist_full_name)}
                      </Avatar>
                    )
                  }
                  description={
                    <>
                      <Row style={{ display: "flex", alignItems: "center" }}>
                        <Col span={8}>
                          <Typography>{item?.dentist_full_name}</Typography>
                          <Typography>{item?.email}</Typography>
                        </Col>
                        <Col span={8}>
                          <Space>
                            <Avatar
                              shape="square"
                              size={20}
                              src={
                                item?.website_url &&
                                isValidUrl(item?.website_url)
                                  ? getLogoUrl(item?.website_url)
                                  : ""
                              }
                            />
                            <Typography>{item?.website_name}</Typography>
                          </Space>
                        </Col>
                        <Col
                          span={8}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                          }}
                        >
                          <Space>
                            <Select
                              defaultValue={selectedRoleDetails.role_name}
                              style={{
                                width: 180,
                              }}
                              placeholder="Select role"
                              onChange={(e, text) => {
                                handleChange(
                                  text?.item?.id,
                                  item?.id,
                                  item?.website_id
                                );
                              }}
                              options={rolesoptions}
                            />
                          </Space>
                        </Col>
                      </Row>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </>
      )}
    </Modal>
  );
};

export const BlockIpModal = ({
  isBlockIpModalVisible,
  setisBlockIpModalVisible,
  openNotificationWithIcon,
  loginUserDetails,
  buttonLoader,
  setbuttonLoader,
  getAllBlockDetails,
}) => {
  const [BlockIPform] = Form?.useForm();
  const [blockType, setBlockType] = useState("");
  const handleSubmitBlockIP = async (values) => {
    setbuttonLoader(true);
    values.clinic_id = loginUserDetails?.clinic_id;
    try {
      const token = localStorage.getItem("authToken");

      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/createBlockLead`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setisBlockIpModalVisible();
          getAllBlockDetails();
          openNotificationWithIcon(
            "success",
            "Settings",
            "Block created  successfully"
          );
        })
        .catch((err) => {
          console.log(err?.response?.data);
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
        });
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Settings",
        err?.response?.data?.message || err?.message
      );
    }
    setbuttonLoader(false);
  };
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => {
              setisBlockIpModalVisible(false);
              BlockIPform.resetFields();
            }}
            icon={<IoChevronBackSharp />}
          />
          <Typography style={{ marginLeft: 10 }}>Block</Typography>
        </div>
      }
      visible={isBlockIpModalVisible}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0px 10px 10px 0px",
          }}
        >
          <Space>
            <Button
              onClick={() => {
                setisBlockIpModalVisible(false);
                BlockIPform.resetFields();
              }}
            >
              Cancel
            </Button>

            <Button
              danger
              type="primary"
              icon={<MdOutlineBlock />}
              onClick={() => {
                BlockIPform?.submit();
              }}
              loading={buttonLoader}
            >
              Block
            </Button>
          </Space>
        </div>
      }
      closable={false}
      width={500}
      className="custom-modal"
    >
      <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        <RiUserForbidLine style={{ color: "#72779E" }} />
        <Typography style={{ fontWeight: 600, marginLeft: 5 }}>
          Block an IP address or phone number.
        </Typography>
      </div>
      <Typography className="custom-text1" style={{ marginBottom: 20 }}>
        Prevent submissions from a specific IP address or phone number.
      </Typography>
      <Form
        onFinish={handleSubmitBlockIP}
        form={BlockIPform}
        layout="vertical"
        style={{ padding: "10px 0px" }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="block_type"
              label={
                <div className="custom-text1">
                  What would you like to block?
                  <span style={{ color: "red" }}>*</span>
                </div>
              }
              rules={[
                {
                  required: true,
                  message: "Please select a type to block",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select a block type"
                optionFilterProp="children"
                onSelect={(e) => {
                  setBlockType(e);
                }}
              >
                {BlockIPTypeOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            {blockType === "IP" || blockType === "both" ? (
              <Form.Item
                name="block_ip_address"
                label={
                  <div className="custom-text1">
                    Enter the IP address
                    <span style={{ color: "red" }}>*</span>
                  </div>
                }
                rules={[
                  {
                    required: true,
                    message: "Please enter IP address",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Enter IP address"
                />
              </Form.Item>
            ) : (
              ""
            )}
          </Col>
          <Col span={24}>
            {blockType === "Number" || blockType === "both" ? (
              <Form.Item
                name="block_phone_number"
                label={
                  <div className="custom-text1">
                    Enter the phone number
                    <span style={{ color: "red" }}>*</span>
                  </div>
                }
                rules={[
                  {
                    required: true,
                    message: "Please enter phone number",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Enter phone number"
                />
              </Form.Item>
            ) : (
              ""
            )}
          </Col>
          <Col span={24}>
            <Form.Item
              name="block_reason"
              label={<div className="custom-text1">Reason</div>}
            >
              <TextArea
                placeholder="Enter the reason for blocking this IP address (e.g., spam, fake inquiries)."
                autoSize={{
                  minRows: 2,
                  maxRows: 6,
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Divider />
    </Modal>
  );
};

export const UpdateBlockIpModal = ({
  isupdateBlockIpModalVisible,
  setisupdateBlockIpModalVisible,
  openNotificationWithIcon,
  loginUserDetails,
  buttonLoader,
  setbuttonLoader,
  getAllBlockDetails,
  selectedblocklead,
}) => {
  const [updateBlockIPform] = Form?.useForm();
  const [blockType, setBlockType] = useState("");
  const handleSubmitBlockIP = async (values) => {
    setbuttonLoader(true);
    values.clinic_id = loginUserDetails?.clinic_id;
    values.block_id = selectedblocklead?.id;

    try {
      const token = localStorage.getItem("authToken");

      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/updateBlockLead`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setisupdateBlockIpModalVisible();
          getAllBlockDetails();
          openNotificationWithIcon(
            "success",
            "Settings",
            "Block created  successfully"
          );
        })
        .catch((err) => {
          console.log(err?.response?.data);
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.error || err?.message
          );
        });
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Settings",
        err?.response?.data?.error || err?.message
      );
    }
    setbuttonLoader(false);
  };
  useEffect(() => {
    updateBlockIPform?.setFieldValue(
      "block_type",
      selectedblocklead?.block_type
    );
    updateBlockIPform?.setFieldValue(
      "block_ip_address",
      selectedblocklead?.block_ip_address
    );
    updateBlockIPform?.setFieldValue(
      "block_phone_number",
      selectedblocklead?.block_phone_number
    );
    updateBlockIPform?.setFieldValue(
      "block_reason",
      selectedblocklead?.block_reason
    );
    setBlockType(selectedblocklead?.block_type);
  }, [selectedblocklead]);
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => {
              setisupdateBlockIpModalVisible(false);
              updateBlockIPform.resetFields();
            }}
            icon={<IoChevronBackSharp />}
          />
          <Typography style={{ marginLeft: 10 }}>Block</Typography>
        </div>
      }
      visible={isupdateBlockIpModalVisible}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0px 10px 10px 0px",
          }}
        >
          <Space>
            <Button
              onClick={() => {
                setisupdateBlockIpModalVisible(false);
                updateBlockIPform.resetFields();
              }}
            >
              Cancel
            </Button>

            <Button
              danger
              type="primary"
              icon={<MdOutlineBlock />}
              onClick={() => {
                updateBlockIPform?.submit();
              }}
              loading={buttonLoader}
            >
              Block
            </Button>
          </Space>
        </div>
      }
      closable={false}
      width={500}
      className="custom-modal"
    >
      <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        <RiUserForbidLine style={{ color: "#72779E" }} />
        <Typography style={{ fontWeight: 600, marginLeft: 5 }}>
          Block an IP address or phone number.
        </Typography>
      </div>
      <Typography className="custom-text1" style={{ marginBottom: 20 }}>
        Prevent submissions from a specific IP address or phone number.
      </Typography>
      <Form
        onFinish={handleSubmitBlockIP}
        form={updateBlockIPform}
        layout="vertical"
        style={{ padding: "10px 0px" }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="block_type"
              label={
                <div className="custom-text1">
                  What would you like to block?
                  <span style={{ color: "red" }}>*</span>
                </div>
              }
              rules={[
                {
                  required: true,
                  message: "Please select a type to block",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select a block type"
                optionFilterProp="children"
                onSelect={(e) => {
                  setBlockType(e);
                }}
              >
                {BlockIPTypeOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            {blockType === "IP" || blockType === "both" ? (
              <Form.Item
                name="block_ip_address"
                label={
                  <div className="custom-text1">
                    Enter the IP address
                    <span style={{ color: "red" }}>*</span>
                  </div>
                }
                rules={[
                  {
                    required: true,
                    message: "Please enter IP address",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Enter IP address"
                />
              </Form.Item>
            ) : (
              ""
            )}
          </Col>
          <Col span={24}>
            {blockType === "Number" || blockType === "both" ? (
              <Form.Item
                name="block_phone_number"
                label={
                  <div className="custom-text1">
                    Enter the phone number
                    <span style={{ color: "red" }}>*</span>
                  </div>
                }
                rules={[
                  {
                    required: true,
                    message: "Please enter phone number",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Enter phone number"
                />
              </Form.Item>
            ) : (
              ""
            )}
          </Col>
          <Col span={24}>
            <Form.Item
              name="block_reason"
              label={<div className="custom-text1">Reason</div>}
            >
              <TextArea
                placeholder="Enter the reason for blocking this IP address (e.g., spam, fake inquiries)."
                autoSize={{
                  minRows: 2,
                  maxRows: 6,
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Divider />
    </Modal>
  );
};

export const DeleteWebsite = ({
  websitedeleteConfirmation,
  setwebsitedeleteConfirmation,
  seletedwebsitefordelete,
  buttonLoader,
  setbuttonLoader,
  handleClinicDetails,
  openNotificationWithIcon,
}) => {
  const handleDeleteWebsite = async () => {
    setbuttonLoader(true);
    const token = localStorage.getItem("authToken");

    let data = {
      clinic_id: seletedwebsitefordelete?.clinic_id,
      website_id: seletedwebsitefordelete?.id,
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/deleteClinicWebsite`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          handleClinicDetails();
          setwebsitedeleteConfirmation(false);
          openNotificationWithIcon(
            "success",
            "Settings",
            "Website deleted successfully"
          );
          setbuttonLoader(false);
        })
        .catch((err) => {
          console.log(err?.response?.data?.message);
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
        });
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Settings",
        err?.response?.data?.message || err?.message
      );
    }
    console.log(seletedwebsitefordelete);
    setbuttonLoader(false);
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => setwebsitedeleteConfirmation(false)}
            icon={<IoChevronBackSharp />}
          />
          <Typography style={{ marginLeft: 10 }}>
            Delete Confirmation
          </Typography>
        </div>
      }
      visible={websitedeleteConfirmation}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0px 10px 10px 0px",
          }}
        >
          <Space>
            <Button onClick={() => setwebsitedeleteConfirmation(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                handleDeleteWebsite();
              }}
              loading={buttonLoader}
            >
              Delete
            </Button>
          </Space>
        </div>
      }
      closable={false}
      width={seletedwebsitefordelete?.userWebsiteRoles?.length <= 0 ? 450 : 600}
      className="custom-modal"
    >
      {seletedwebsitefordelete?.userWebsiteRoles?.length <= 0 ? (
        <>
          <Typography style={{ padding: "0 10px" }}>
            Are you sure you want to delete this website?
          </Typography>
        </>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TeamSVG
              color={"#72779E"}
              style={{ width: 15, display: "contents" }}
            />
            <Typography style={{ fontWeight: 600, marginLeft: 5 }}>
              Delete {seletedwebsitefordelete?.website_user_name} Website
            </Typography>
          </div>
          <Divider style={{ margin: "10px 0px" }} />
          <Row>
            <Col span={22}>
              <Typography className="custom-text1">
                Are you sure you want to delete this website? This website is
                currently accessible to the following users:
              </Typography>
            </Col>
          </Row>
          <List
            style={{
              height: "40vh",
              overflow: "auto",
              padding: "10px 10px 100px 10px",
            }}
            itemLayout="horizontal"
            dataSource={seletedwebsitefordelete?.userWebsiteRoles}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    item?.user?.profile_picture ? (
                      <Avatar src={item?.user?.profile_picture} size={40} />
                    ) : (
                      <Avatar
                        size={40}
                        style={{ background: item?.user?.avatar_color }}
                      >
                        {getInitials(item?.user?.dentist_full_name)}
                      </Avatar>
                    )
                  }
                  description={
                    <>
                      <Row style={{ display: "flex", alignItems: "center" }}>
                        <Col span={12}>
                          <Typography>
                            {item?.user?.dentist_full_name}
                          </Typography>
                          <Typography>{item?.user?.email}</Typography>
                        </Col>
                        <Col
                          span={12}
                          style={{ display: "flex", justifyContent: "end" }}
                        >
                          <Typography>{item?.role?.role_name}</Typography>
                        </Col>
                      </Row>
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <Row
            style={{
              background: "#FFDBDB",
              padding: 10,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Col span={2}>
              <MdOutlineErrorOutline
                style={{ color: "#E21D12", fontSize: 30 }}
              />
            </Col>
            <Col span={22}>
              <Typography style={{ color: "#E21D12" }}>
                Deleting this website will revoke access for all users and
                remove all associated data.
              </Typography>
            </Col>
          </Row>
        </>
      )}
    </Modal>
  );
};
