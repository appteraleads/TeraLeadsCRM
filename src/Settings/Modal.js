/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Row,
  Select,
  Space,
  Switch,
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
import { IoChevronBackSharp } from "react-icons/io5";
import { MdOutlineBlock, MdOutlineErrorOutline } from "react-icons/md";
import { getInitials } from "../Common/ReturnColumnValue";
import { RiUserForbidLine } from "react-icons/ri";
import { BlockIPTypeOptions } from "../Common/CommonCodeList";
const { TextArea } = Input;

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
    console.log(values);
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
    console.log(values);
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
          console.log(res?.data);
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

export const RolesAndPermissionsModal = ({
  rolesAndPermissionsModal,
  setrolesAndPermissionsModal,
  buttonLoader,
  setbuttonLoader,
  openNotificationWithIcon,
  handlegetAllRoles,
}) => {
  const [RolesAndPermissionsModalform] = Form.useForm();
  const [roleName, setroleName] = useState();
  const [fullaccessPermission, setfullaccessPermission] = useState(false);
  const [appointmentsAccessType, setappointmentsAccessType] = useState();
  const [leadAccessType, setleadAccessType] = useState();
  const [conversationAccessType, setconversationAccessType] = useState();
  const [teamAccessType, setteamAccessType] = useState();
  const [campaignsAccessType, setcampaignsAccessType] = useState();
  const [reportsAccessType, setreportsAccessType] = useState();
  const [selectedPermissionList, setselectedPermissionList] = useState([]);
  const [reviewAllPermission, setreviewAllPermission] = useState(false);
  const [disableDropDown, setdisableDropDown] = useState(false);

  const handlePermissionChange = (checked, permissionCode) => {
    const updatedPermissionList = [...selectedPermissionList];

    if (checked) {
      if (!updatedPermissionList.includes(permissionCode)) {
        updatedPermissionList.push(permissionCode);
      }
    } else {
      const index = updatedPermissionList.indexOf(permissionCode);
      if (index > -1) {
        updatedPermissionList.splice(index, 1);
      }
    }
    setselectedPermissionList(updatedPermissionList);
  };

  const handleReview = () => {
    setreviewAllPermission(true);
  };

  const handleSubmitRolesAndPermissions = async () => {
    const token = localStorage.getItem("authToken");
    setbuttonLoader(true);
    let data = {
      role_name: roleName,
      permission_group: selectedPermissionList.join(","),
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
          {reviewAllPermission ? (
            <Button
              onClick={() => {
                setreviewAllPermission(false);
              }}
              icon={<IoChevronBackSharp />}
            ></Button>
          ) : (
            ""
          )}

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
              {!reviewAllPermission ? (
                <Button
                  type="primary"
                  onClick={() => {
                    RolesAndPermissionsModalform?.submit();
                  }}
                  loading={buttonLoader}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => {
                    handleSubmitRolesAndPermissions();
                  }}
                  loading={buttonLoader}
                >
                  Create
                </Button>
              )}
            </Space>
          </div>
        </>
      }
      closable={false}
      width={600}
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
            {!reviewAllPermission ? "Create New Role" : "Review Roles"}
          </Typography>
        </div>
        {!reviewAllPermission ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Switch
              checked={fullaccessPermission}
              onChange={(e) => {
                if (e) {
                  setappointmentsAccessType("fullaccess");
                  setleadAccessType("fullaccess");
                  setconversationAccessType("fullaccess");
                  setteamAccessType("fullaccess");
                  setcampaignsAccessType("fullaccess");
                  setreportsAccessType("fullaccess");
                  const updatedPermissionList = [...selectedPermissionList];
                  updatedPermissionList.push(
                    "AAT:FA",
                    "LAT:E:DL",
                    "COAT:FA",
                    "TAT:FA",
                    "CPAT:FA",
                    "RAT:FA"
                  );
                  setselectedPermissionList(updatedPermissionList);
                  setdisableDropDown(true);
                } else {
                  setselectedPermissionList([]);
                  setdisableDropDown(false);
                }
                setfullaccessPermission(e);
              }}
            ></Switch>
            <Typography style={{ fontWeight: 600, marginLeft: 5 }}>
              Full Access
            </Typography>
          </div>
        ) : (
          ""
        )}
      </div>
      <Divider style={{ margin: "10px 0px" }} />
      <Form
        onFinish={handleReview}
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
              {!reviewAllPermission ? (
                <Input
                  style={{ width: "100%" }}
                  value={roleName}
                  onChange={(e) => {
                    setroleName(e?.target?.value);
                  }}
                />
              ) : (
                <Typography>{roleName}</Typography>
              )}
            </Form.Item>
            <div style={{ height: "50vh", overflow: "auto", paddingRight: 20 }}>
              {/* Appointment */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AppointmentsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "contents" }}
                  />
                  <Typography style={{ fontWeight: 500, marginLeft: 8 }}>
                    Appointments
                  </Typography>
                </div>
                <Divider style={{ margin: "10px 0px" }} />
                <Row>
                  {!reviewAllPermission ? (
                    <Typography
                      className="custom-text1"
                      style={{ marginBottom: 8 }}
                    >
                      Access Type
                    </Typography>
                  ) : (
                    ""
                  )}

                  {!reviewAllPermission ? (
                    <Select
                      style={{
                        width: "100%",
                        marginBottom: 10,
                      }}
                      disabled={disableDropDown}
                      value={appointmentsAccessType}
                      onSelect={(e) => {
                        setappointmentsAccessType(e);
                        if (e === "fullaccess") {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          if (!updatedPermissionList.includes("AAT:FA")) {
                            updatedPermissionList.push("AAT:FA");
                          }
                          setselectedPermissionList(updatedPermissionList);
                        } else {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          const index = updatedPermissionList.indexOf("AAT:FA");
                          if (index > -1) {
                            updatedPermissionList.splice(index, 1);
                          }
                          setselectedPermissionList(updatedPermissionList);
                        }
                      }}
                      placeholder="Select"
                      optionFilterProp="label"
                      options={[
                        {
                          value: "view",
                          label: "View",
                        },
                        {
                          value: "edit",
                          label: "Edit",
                        },
                        {
                          value: "fullaccess",
                          label: "Full Access",
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}

                  {appointmentsAccessType && (
                    <div>
                      {!reviewAllPermission ? (
                        <Typography
                          className="custom-text1"
                          style={{ fontWeight: 500, marginBottom: 8 }}
                        >
                          Permissions
                        </Typography>
                      ) : (
                        ""
                      )}

                      <Space direction="vertical">
                        {appointmentsAccessType === "view" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("AAT:V:AAA") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>Access all appointments</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <>
                                <Checkbox
                                  style={{ marginBottom: 5 }}
                                  onChange={(e) => {
                                    handlePermissionChange(
                                      e.target.checked,
                                      "AAT:V:AAA"
                                    );
                                  }}
                                  checked={selectedPermissionList.includes(
                                    "AAT:V:AAA"
                                  )}
                                >
                                  Access all appointments
                                </Checkbox>
                              </>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("AAT:V:VOAA") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> View only assigned appointments.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "AAT:V:VOAA"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "AAT:V:VOAA"
                                )}
                              >
                                View only assigned appointments.
                              </Checkbox>
                            )}
                          </>
                        )}

                        {appointmentsAccessType === "edit" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList?.includes("AAT:E:AVP") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> All “View” permissions.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "AAT:E:AVP"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "AAT:E:AVP"
                                )}
                              >
                                All “View” permissions.
                              </Checkbox>
                            )}

                            {reviewAllPermission ? (
                              selectedPermissionList.includes("AAT:E:RCUA") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>
                                    Reschedule, cancel, or update appointments.
                                  </li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "AAT:E:RCUA"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "AAT:E:RCUA"
                                )}
                              >
                                Reschedule, cancel, or update appointments.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("AAT:E:CNA") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Create new appointments.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "AAT:E:CNA"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "AAT:E:CNA"
                                )}
                              >
                                Create new appointments.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes(
                                "AAT:E:MTSFSD"
                              ) ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>
                                    {" "}
                                    Manage time slots for specific dates.
                                  </li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "AAT:E:MTSFSD"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "AAT:E:MTSFSD"
                                )}
                              >
                                Manage time slots for specific dates.
                              </Checkbox>
                            )}
                          </>
                        )}
                        {appointmentsAccessType === "fullaccess" && (
                          <Typography
                            style={{ color: "#595959" }}
                            onChange={(e) => {
                              handlePermissionChange(
                                e.target.checked,
                                "AAT:FA"
                              );
                            }}
                            checked={selectedPermissionList.includes("AAT:FA")}
                          >
                            Full Access
                          </Typography>
                        )}
                      </Space>
                    </div>
                  )}
                </Row>
              </div>
              {/* Leads */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LeadsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "contents" }}
                  />
                  <Typography style={{ fontWeight: 500, marginLeft: 8 }}>
                    Leads
                  </Typography>
                </div>

                <Divider style={{ margin: "10px 0px" }} />

                <Row>
                  {!reviewAllPermission ? (
                    <Typography
                      className="custom-text1"
                      style={{ marginBottom: 8 }}
                    >
                      Access Type
                    </Typography>
                  ) : (
                    ""
                  )}
                  {!reviewAllPermission ? (
                    <Select
                      style={{
                        width: "100%",
                        marginBottom: 10,
                      }}
                      disabled={disableDropDown}
                      value={leadAccessType}
                      onSelect={(e) => {
                        setleadAccessType(e);
                        if (e === "fullaccess") {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          if (!updatedPermissionList.includes("LAT:FA")) {
                            updatedPermissionList.push("LAT:FA");
                          }
                          setselectedPermissionList(updatedPermissionList);
                        } else {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          const index = updatedPermissionList.indexOf("LAT:FA");
                          if (index > -1) {
                            updatedPermissionList.splice(index, 1);
                          }
                          setselectedPermissionList(updatedPermissionList);
                        }
                      }}
                      placeholder="Select"
                      optionFilterProp="label"
                      options={[
                        {
                          value: "view",
                          label: "View",
                        },
                        {
                          value: "edit",
                          label: "Edit",
                        },
                        {
                          value: "fullaccess",
                          label: "Full Access",
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}

                  {leadAccessType && (
                    <div>
                      {!reviewAllPermission ? (
                        <Typography
                          className="custom-text1"
                          style={{ fontWeight: 500, marginBottom: 8 }}
                        >
                          Permissions
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Space direction="vertical">
                        {leadAccessType === "view" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes(
                                "LAT:V:AALITS"
                              ) ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>Access all leads in the system.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:V:AALITS"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:V:AALITS"
                                )}
                              >
                                Access all leads in the system.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:V:VOAL") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> View only assigned leads.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:V:VOAL"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:V:VOAL"
                                )}
                              >
                                View only assigned leads.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:V:SLD") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> See lead details</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:V:SLD"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:V:SLD"
                                )}
                              >
                                See lead details
                              </Checkbox>
                            )}
                          </>
                        )}
                        {leadAccessType === "edit" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:E:AVP") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> All “View” permissions.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:E:AVP"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:E:AVP"
                                )}
                              >
                                All “View” permissions.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:E:ANL") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Add new leads.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:E:ANL"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:E:ANL"
                                )}
                              >
                                Add new leads.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:E:ULD") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Update lead details</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:E:ULD"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:E:ULD"
                                )}
                              >
                                Update lead details
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:E:RLTTM") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Reassign leads to team members.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:E:RLTTM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:E:RLTTM"
                                )}
                              >
                                Reassign leads to team members.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:E:DL") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Delete leads.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:E:DL"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:E:DL"
                                )}
                              >
                                Delete leads.
                              </Checkbox>
                            )}
                          </>
                        )}
                        {leadAccessType === "fullaccess" && (
                          <Typography style={{ color: "#595959" }}>
                            Full Access
                          </Typography>
                        )}
                      </Space>
                    </div>
                  )}
                </Row>
              </div>
              {/* Conversationa */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ConversationsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "contents" }}
                  />
                  <Typography style={{ fontWeight: 500, marginLeft: 8 }}>
                    Conversation
                  </Typography>
                </div>

                <Divider style={{ margin: "10px 0px" }} />

                <Row>
                  {!reviewAllPermission ? (
                    <Typography
                      className="custom-text1"
                      style={{ marginBottom: 8 }}
                    >
                      Access Type
                    </Typography>
                  ) : (
                    ""
                  )}
                  {!reviewAllPermission ? (
                    <Select
                      style={{
                        width: "100%",
                        marginBottom: 10,
                      }}
                      disabled={disableDropDown}
                      value={conversationAccessType}
                      onSelect={(e) => {
                        setconversationAccessType(e);
                        if (e === "fullaccess") {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          if (!updatedPermissionList.includes("COAT:FA")) {
                            updatedPermissionList.push("COAT:FA");
                          }
                          setselectedPermissionList(updatedPermissionList);
                        } else {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          const index =
                            updatedPermissionList.indexOf("COAT:FA");
                          if (index > -1) {
                            updatedPermissionList.splice(index, 1);
                          }
                          setselectedPermissionList(updatedPermissionList);
                        }
                      }}
                      placeholder="Select"
                      optionFilterProp="label"
                      options={[
                        {
                          value: "limited",
                          label: "Limited",
                        },
                        {
                          value: "fullaccess",
                          label: "Full Access",
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}

                  {conversationAccessType && (
                    <div>
                      {!reviewAllPermission ? (
                        <Typography
                          className="custom-text1"
                          style={{ fontWeight: 500, marginBottom: 8 }}
                        >
                          Permissions
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Space direction="vertical">
                        {conversationAccessType === "limited" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CAT:L:ASC") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Access SMS conversations</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CAT:L:ASC"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CAT:L:ASC"
                                )}
                              >
                                Access SMS conversations
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CAT:L:AEC") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Access email conversations</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CAT:L:AEC"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CAT:L:AEC"
                                )}
                              >
                                Access email conversations
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CAT:L:AOAC") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Access only assigned conversations.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CAT:L:AOAC"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CAT:L:AOAC"
                                )}
                              >
                                Access only assigned conversations.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CAT:L:SAR") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Send and reply</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CAT:L:SAR"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CAT:L:SAR"
                                )}
                              >
                                Send and reply
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CAT:L:ARCTM") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>
                                    {" "}
                                    Assign or reassign conversations to team
                                    members.
                                  </li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CAT:L:ARCTM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CAT:L:ARCTM"
                                )}
                              >
                                Assign or reassign conversations to team
                                members.
                              </Checkbox>
                            )}
                          </>
                        )}

                        {conversationAccessType === "fullaccess" && (
                          <Typography style={{ color: "#595959" }}>
                            Full Access
                          </Typography>
                        )}
                      </Space>
                    </div>
                  )}
                </Row>
              </div>
              {/* Team */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TeamSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "contents" }}
                  />
                  <Typography style={{ fontWeight: 500, marginLeft: 8 }}>
                    Team
                  </Typography>
                </div>

                <Divider style={{ margin: "10px 0px" }} />

                <Row>
                  {!reviewAllPermission ? (
                    <Typography
                      className="custom-text1"
                      style={{ marginBottom: 8 }}
                    >
                      Access Type
                    </Typography>
                  ) : (
                    ""
                  )}
                  {!reviewAllPermission ? (
                    <Select
                      style={{
                        width: "100%",
                        marginBottom: 10,
                      }}
                      disabled={disableDropDown}
                      value={teamAccessType}
                      onSelect={(e) => {
                        setteamAccessType(e);
                        if (e === "fullaccess") {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          if (!updatedPermissionList.includes("TAT:FA")) {
                            updatedPermissionList.push("TAT:FA");
                          }
                          setselectedPermissionList(updatedPermissionList);
                        } else {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          const index = updatedPermissionList.indexOf("TAT:FA");
                          if (index > -1) {
                            updatedPermissionList.splice(index, 1);
                          }
                          setselectedPermissionList(updatedPermissionList);
                        }
                      }}
                      placeholder="Select"
                      optionFilterProp="label"
                      options={[
                        {
                          value: "view",
                          label: "View",
                        },
                        {
                          value: "edit",
                          label: "Edit",
                        },
                        {
                          value: "fullaccess",
                          label: "Full Access",
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}
                  {teamAccessType && (
                    <div>
                      {!reviewAllPermission ? (
                        <Typography
                          className="custom-text1"
                          style={{ fontWeight: 500, marginBottom: 8 }}
                        >
                          Permissions
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Space direction="vertical">
                        {teamAccessType === "view" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("TAT:V:SLATM") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>See a list of all team members.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "TAT:V:SLATM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "TAT:V:SLATM"
                                )}
                              >
                                See a list of all team members.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes(
                                "TAT:V:VRPAEM"
                              ) ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>
                                    {" "}
                                    View roles and permissions assigned to each
                                    member.
                                  </li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "TAT:V:VRPAEM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "TAT:V:VRPAEM"
                                )}
                              >
                                View roles and permissions assigned to each
                                member.
                              </Checkbox>
                            )}
                          </>
                        )}
                        {teamAccessType === "edit" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("TAT:E:AVP") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>All “View” permissions.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ color: "#595959" }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "TAT:E:AVP"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "TAT:E:AVP"
                                )}
                              >
                                All “View” permissions.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("TAT:E:IRTM") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Invite or remove team members.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ color: "#595959" }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "TAT:E:IRTM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "TAT:E:IRTM"
                                )}
                              >
                                Invite or remove team members.
                              </Checkbox>
                            )}
                          </>
                        )}
                        {teamAccessType === "fullaccess" && (
                          <Typography style={{ color: "#595959" }}>
                            Full Access
                          </Typography>
                        )}
                      </Space>
                    </div>
                  )}
                </Row>
              </div>
              {/* Campaigns */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CampaignsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "contents" }}
                  />
                  <Typography style={{ fontWeight: 500, marginLeft: 8 }}>
                    Campaigns
                  </Typography>
                </div>

                <Divider style={{ margin: "10px 0px" }} />

                <Row>
                  {!reviewAllPermission ? (
                    <Typography
                      className="custom-text1"
                      style={{ marginBottom: 8 }}
                    >
                      Access Type
                    </Typography>
                  ) : (
                    ""
                  )}
                  {!reviewAllPermission ? (
                    <Select
                      style={{
                        width: "100%",
                        marginBottom: 10,
                      }}
                      disabled={disableDropDown}
                      value={campaignsAccessType}
                      onSelect={(e) => {
                        setcampaignsAccessType(e);
                        if (e === "fullaccess") {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          if (!updatedPermissionList.includes("CPAT:FA")) {
                            updatedPermissionList.push("CPAT:FA");
                          }
                          setselectedPermissionList(updatedPermissionList);
                        } else {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          const index =
                            updatedPermissionList.indexOf("CPAT:FA");
                          if (index > -1) {
                            updatedPermissionList.splice(index, 1);
                          }
                          setselectedPermissionList(updatedPermissionList);
                        }
                      }}
                      placeholder="Select"
                      optionFilterProp="label"
                      options={[
                        {
                          value: "view",
                          label: "View",
                        },
                        {
                          value: "edit",
                          label: "Edit",
                        },
                        {
                          value: "fullaccess",
                          label: "Full Access",
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}

                  {campaignsAccessType && (
                    <div>
                      {!reviewAllPermission ? (
                        <Typography
                          className="custom-text1"
                          style={{ fontWeight: 500, marginBottom: 8 }}
                        >
                          Permissions
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Space direction="vertical">
                        {campaignsAccessType === "view" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes(
                                "CPAT:V:SLATM"
                              ) ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>
                                    {" "}
                                    Access all campaigns (SMS and email).
                                  </li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CPAT:V:SLATM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CPAT:V:SLATM"
                                )}
                              >
                                Access all campaigns (SMS and email).
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CPAT:V:VPM") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>View performance metrics</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CPAT:V:VPM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CPAT:V:VPM"
                                )}
                              >
                                View performance metrics
                              </Checkbox>
                            )}
                          </>
                        )}
                        {campaignsAccessType === "edit" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CPAT:E:AVP") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> All “View” permissions.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ color: "#595959" }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CPAT:E:AVP"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CPAT:E:AVP"
                                )}
                              >
                                All “View” permissions.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CPAT:E:CNSC") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Create new SMS campaigns</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ color: "#595959" }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CPAT:E:CNSC"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CPAT:E:CNSC"
                                )}
                              >
                                Create new SMS campaigns
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CPAT:E:CNEC") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Create new email campaigns</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ color: "#595959" }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CPAT:E:CNEC"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CPAT:E:CNEC"
                                )}
                              >
                                Create new email campaigns
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CPAT:E:EDEC") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Edit or delete existing campaigns.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ color: "#595959" }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CPAT:E:EDEC"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CPAT:E:EDEC"
                                )}
                              >
                                Edit or delete existing campaigns.
                              </Checkbox>
                            )}
                          </>
                        )}
                        {campaignsAccessType === "fullaccess" && (
                          <Typography style={{ color: "#595959" }}>
                            Full Access
                          </Typography>
                        )}
                      </Space>
                    </div>
                  )}
                </Row>
              </div>
              {/* Reports */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ReportsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "contents" }}
                  />
                  <Typography style={{ fontWeight: 500, marginLeft: 8 }}>
                    Reports
                  </Typography>
                </div>

                <Divider style={{ margin: "10px 0px" }} />

                <Row>
                  {!reviewAllPermission ? (
                    <Typography
                      className="custom-text1"
                      style={{ marginBottom: 8 }}
                    >
                      Access Type
                    </Typography>
                  ) : (
                    ""
                  )}
                  {!reviewAllPermission ? (
                    <Select
                      style={{
                        width: "100%",
                        marginBottom: 10,
                      }}
                      disabled={disableDropDown}
                      value={reportsAccessType}
                      onSelect={(e) => {
                        setreportsAccessType(e);
                        if (e === "fullaccess") {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          if (!updatedPermissionList.includes("RAT:FA")) {
                            updatedPermissionList.push("RAT:FA");
                          }
                          setselectedPermissionList(updatedPermissionList);
                        } else {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          const index = updatedPermissionList.indexOf("RAT:FA");
                          if (index > -1) {
                            updatedPermissionList.splice(index, 1);
                          }
                          setselectedPermissionList(updatedPermissionList);
                        }
                      }}
                      placeholder="Select"
                      optionFilterProp="label"
                      options={[
                        {
                          value: "limited",
                          label: "Limited",
                        },

                        {
                          value: "fullaccess",
                          label: "Full Access",
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}

                  {reportsAccessType && (
                    <div>
                      {!reviewAllPermission ? (
                        <Typography
                          className="custom-text1"
                          style={{ fontWeight: 500, marginBottom: 8 }}
                        >
                          Permissions
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Space direction="vertical">
                        {reportsAccessType === "limited" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("RAT:L:LR") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Leads reports</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "RAT:L:LR"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "RAT:L:LR"
                                )}
                              >
                                Leads reports
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("RAT:L:AR") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Appointments reports</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "RAT:L:AR"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "RAT:L:AR"
                                )}
                              >
                                Appointments reports
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("RAT:L:FR") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Financial reports</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "RAT:L:FR"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "RAT:L:FR"
                                )}
                              >
                                Financial reports
                              </Checkbox>
                            )}
                          </>
                        )}

                        {reportsAccessType === "fullaccess" && (
                          <Typography style={{ color: "#595959" }}>
                            Full Access
                          </Typography>
                        )}
                      </Space>
                    </div>
                  )}
                </Row>
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
}) => {
  const [RolesAndPermissionsModalform] = Form.useForm();
  const [roleName, setroleName] = useState();
  const [fullaccessPermission, setfullaccessPermission] = useState(false);
  const [appointmentsAccessType, setappointmentsAccessType] = useState();
  const [leadAccessType, setleadAccessType] = useState();
  const [conversationAccessType, setconversationAccessType] = useState();
  const [teamAccessType, setteamAccessType] = useState();
  const [campaignsAccessType, setcampaignsAccessType] = useState();
  const [reportsAccessType, setreportsAccessType] = useState();
  const [selectedPermissionList, setselectedPermissionList] = useState();
  const [reviewAllPermission, setreviewAllPermission] = useState(false);
  const [disableDropDown, setdisableDropDown] = useState(false);

  const handlePermissionChange = (checked, permissionCode) => {
    const updatedPermissionList = [...selectedPermissionList];

    if (checked) {
      if (!updatedPermissionList.includes(permissionCode)) {
        updatedPermissionList.push(permissionCode);
      }
    } else {
      const index = updatedPermissionList.indexOf(permissionCode);
      if (index > -1) {
        updatedPermissionList.splice(index, 1);
      }
    }
    setselectedPermissionList(updatedPermissionList);
  };

  const handleReview = () => {
    setreviewAllPermission(true);
  };

  const handleSubmitRolesAndPermissions = async () => {
    const token = localStorage.getItem("authToken");
    setbuttonLoader(true);

    let data = {
      id: selectedRoleDetails?.id,
      role_name: roleName,
      permission_group: selectedPermissionList.join(","),
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
    setselectedPermissionList(temp);
    RolesAndPermissionsModalform?.setFieldValue(
      "role_name",
      selectedRoleDetails?.role_name
    );
    setroleName(selectedRoleDetails?.role_name);
  }, [selectedRoleDetails]);
  return (
    <Modal
      style={{ top: 20 }}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          {reviewAllPermission ? (
            <Button
              onClick={() => {
                setreviewAllPermission(false);
              }}
              icon={<IoChevronBackSharp />}
            ></Button>
          ) : (
            ""
          )}

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
              {!reviewAllPermission ? (
                <Button
                  type="primary"
                  onClick={() => {
                    RolesAndPermissionsModalform?.submit();
                  }}
                  loading={buttonLoader}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => {
                    handleSubmitRolesAndPermissions();
                  }}
                  loading={buttonLoader}
                >
                  Update
                </Button>
              )}
            </Space>
          </div>
        </>
      }
      closable={false}
      width={600}
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
            {!reviewAllPermission ? "Update New Role" : "Review Roles"}
          </Typography>
        </div>
        {!reviewAllPermission ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Switch
              checked={fullaccessPermission}
              onChange={(e) => {
                if (e) {
                  setappointmentsAccessType("fullaccess");
                  setleadAccessType("fullaccess");
                  setconversationAccessType("fullaccess");
                  setteamAccessType("fullaccess");
                  setcampaignsAccessType("fullaccess");
                  setreportsAccessType("fullaccess");
                  const updatedPermissionList = [...selectedPermissionList];
                  updatedPermissionList.push(
                    "AAT:FA",
                    "LAT:E:DL",
                    "COAT:FA",
                    "TAT:FA",
                    "CPAT:FA",
                    "RAT:FA"
                  );
                  setselectedPermissionList(updatedPermissionList);
                  setdisableDropDown(true);
                } else {
                  setselectedPermissionList([]);
                  setdisableDropDown(false);
                }
                setfullaccessPermission(e);
              }}
            ></Switch>
            <Typography style={{ fontWeight: 600, marginLeft: 5 }}>
              Full Access
            </Typography>
          </div>
        ) : (
          ""
        )}
      </div>
      <Divider style={{ margin: "10px 0px" }} />
      <Form
        onFinish={handleReview}
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
              {!reviewAllPermission ? (
                <Input
                  style={{ width: "90%" }}
                  value={roleName}
                  onChange={(e) => {
                    setroleName(e?.target?.value);
                  }}
                />
              ) : (
                <Typography>{roleName}</Typography>
              )}
            </Form.Item>
            <div style={{ height: "50vh", overflow: "auto", paddingRight: 20 }}>
              {/* Appointment */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AppointmentsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "contents" }}
                  />
                  <Typography style={{ fontWeight: 500, marginLeft: 8 }}>
                    Appointments
                  </Typography>
                </div>
                <Divider style={{ margin: "10px 0px" }} />
                <Row>
                  {!reviewAllPermission ? (
                    <Typography
                      className="custom-text1"
                      style={{ marginBottom: 8 }}
                    >
                      Access Type
                    </Typography>
                  ) : (
                    ""
                  )}

                  {!reviewAllPermission ? (
                    <Select
                      style={{
                        width: "100%",
                        marginBottom: 10,
                      }}
                      disabled={disableDropDown}
                      value={appointmentsAccessType}
                      onSelect={(e) => {
                        setappointmentsAccessType(e);
                        if (e === "fullaccess") {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          if (!updatedPermissionList.includes("AAT:FA")) {
                            updatedPermissionList.push("AAT:FA");
                          }
                          setselectedPermissionList(updatedPermissionList);
                        } else {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          const index = updatedPermissionList.indexOf("AAT:FA");
                          if (index > -1) {
                            updatedPermissionList.splice(index, 1);
                          }
                          setselectedPermissionList(updatedPermissionList);
                        }
                      }}
                      placeholder="Select"
                      optionFilterProp="label"
                      options={[
                        {
                          value: "view",
                          label: "View",
                        },
                        {
                          value: "edit",
                          label: "Edit",
                        },
                        {
                          value: "fullaccess",
                          label: "Full Access",
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}

                  {appointmentsAccessType && (
                    <div>
                      {!reviewAllPermission ? (
                        <Typography
                          className="custom-text1"
                          style={{ fontWeight: 500, marginBottom: 8 }}
                        >
                          Permissions
                        </Typography>
                      ) : (
                        ""
                      )}

                      <Space direction="vertical">
                        {appointmentsAccessType === "view" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("AAT:V:AAA") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>Access all appointments</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <>
                                <Checkbox
                                  style={{ marginBottom: 5 }}
                                  onChange={(e) => {
                                    handlePermissionChange(
                                      e.target.checked,
                                      "AAT:V:AAA"
                                    );
                                  }}
                                  checked={selectedPermissionList.includes(
                                    "AAT:V:AAA"
                                  )}
                                >
                                  Access all appointments
                                </Checkbox>
                              </>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("AAT:V:VOAA") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> View only assigned appointments.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "AAT:V:VOAA"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "AAT:V:VOAA"
                                )}
                              >
                                View only assigned appointments.
                              </Checkbox>
                            )}
                          </>
                        )}

                        {appointmentsAccessType === "edit" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList?.includes("AAT:E:AVP") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> All “View” permissions.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "AAT:E:AVP"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "AAT:E:AVP"
                                )}
                              >
                                All “View” permissions.
                              </Checkbox>
                            )}

                            {reviewAllPermission ? (
                              selectedPermissionList.includes("AAT:E:RCUA") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>
                                    Reschedule, cancel, or update appointments.
                                  </li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "AAT:E:RCUA"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "AAT:E:RCUA"
                                )}
                              >
                                Reschedule, cancel, or update appointments.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("AAT:E:CNA") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Create new appointments.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "AAT:E:CNA"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "AAT:E:CNA"
                                )}
                              >
                                Create new appointments.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes(
                                "AAT:E:MTSFSD"
                              ) ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>
                                    {" "}
                                    Manage time slots for specific dates.
                                  </li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "AAT:E:MTSFSD"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "AAT:E:MTSFSD"
                                )}
                              >
                                Manage time slots for specific dates.
                              </Checkbox>
                            )}
                          </>
                        )}
                        {appointmentsAccessType === "fullaccess" && (
                          <Typography
                            style={{ color: "#595959" }}
                            onChange={(e) => {
                              handlePermissionChange(
                                e.target.checked,
                                "AAT:FA"
                              );
                            }}
                            checked={selectedPermissionList.includes("AAT:FA")}
                          >
                            Full Access
                          </Typography>
                        )}
                      </Space>
                    </div>
                  )}
                </Row>
              </div>
              {/* Leads */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LeadsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "contents" }}
                  />
                  <Typography style={{ fontWeight: 500, marginLeft: 8 }}>
                    Leads
                  </Typography>
                </div>

                <Divider style={{ margin: "10px 0px" }} />

                <Row>
                  {!reviewAllPermission ? (
                    <Typography
                      className="custom-text1"
                      style={{ marginBottom: 8 }}
                    >
                      Access Type
                    </Typography>
                  ) : (
                    ""
                  )}
                  {!reviewAllPermission ? (
                    <Select
                      style={{
                        width: "100%",
                        marginBottom: 10,
                      }}
                      disabled={disableDropDown}
                      value={leadAccessType}
                      onSelect={(e) => {
                        setleadAccessType(e);
                        if (e === "fullaccess") {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          if (!updatedPermissionList.includes("LAT:FA")) {
                            updatedPermissionList.push("LAT:FA");
                          }
                          setselectedPermissionList(updatedPermissionList);
                        } else {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          const index = updatedPermissionList.indexOf("LAT:FA");
                          if (index > -1) {
                            updatedPermissionList.splice(index, 1);
                          }
                          setselectedPermissionList(updatedPermissionList);
                        }
                      }}
                      placeholder="Select"
                      optionFilterProp="label"
                      options={[
                        {
                          value: "view",
                          label: "View",
                        },
                        {
                          value: "edit",
                          label: "Edit",
                        },
                        {
                          value: "fullaccess",
                          label: "Full Access",
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}

                  {leadAccessType && (
                    <div>
                      {!reviewAllPermission ? (
                        <Typography
                          className="custom-text1"
                          style={{ fontWeight: 500, marginBottom: 8 }}
                        >
                          Permissions
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Space direction="vertical">
                        {leadAccessType === "view" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes(
                                "LAT:V:AALITS"
                              ) ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>Access all leads in the system.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:V:AALITS"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:V:AALITS"
                                )}
                              >
                                Access all leads in the system.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:V:VOAL") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> View only assigned leads.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:V:VOAL"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:V:VOAL"
                                )}
                              >
                                View only assigned leads.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:V:SLD") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> See lead details</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:V:SLD"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:V:SLD"
                                )}
                              >
                                See lead details
                              </Checkbox>
                            )}
                          </>
                        )}
                        {leadAccessType === "edit" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:E:AVP") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> All “View” permissions.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:E:AVP"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:E:AVP"
                                )}
                              >
                                All “View” permissions.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:E:ANL") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Add new leads.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:E:ANL"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:E:ANL"
                                )}
                              >
                                Add new leads.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:E:ULD") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Update lead details</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:E:ULD"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:E:ULD"
                                )}
                              >
                                Update lead details
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:E:RLTTM") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Reassign leads to team members.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:E:RLTTM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:E:RLTTM"
                                )}
                              >
                                Reassign leads to team members.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("LAT:E:DL") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Delete leads.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "LAT:E:DL"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "LAT:E:DL"
                                )}
                              >
                                Delete leads.
                              </Checkbox>
                            )}
                          </>
                        )}
                        {leadAccessType === "fullaccess" && (
                          <Typography style={{ color: "#595959" }}>
                            Full Access
                          </Typography>
                        )}
                      </Space>
                    </div>
                  )}
                </Row>
              </div>
              {/* Conversationa */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ConversationsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "contents" }}
                  />
                  <Typography style={{ fontWeight: 500, marginLeft: 8 }}>
                    Conversation
                  </Typography>
                </div>

                <Divider style={{ margin: "10px 0px" }} />

                <Row>
                  {!reviewAllPermission ? (
                    <Typography
                      className="custom-text1"
                      style={{ marginBottom: 8 }}
                    >
                      Access Type
                    </Typography>
                  ) : (
                    ""
                  )}
                  {!reviewAllPermission ? (
                    <Select
                      style={{
                        width: "100%",
                        marginBottom: 10,
                      }}
                      disabled={disableDropDown}
                      value={conversationAccessType}
                      onSelect={(e) => {
                        setconversationAccessType(e);
                        if (e === "fullaccess") {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          if (!updatedPermissionList.includes("COAT:FA")) {
                            updatedPermissionList.push("COAT:FA");
                          }
                          setselectedPermissionList(updatedPermissionList);
                        } else {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          const index =
                            updatedPermissionList.indexOf("COAT:FA");
                          if (index > -1) {
                            updatedPermissionList.splice(index, 1);
                          }
                          setselectedPermissionList(updatedPermissionList);
                        }
                      }}
                      placeholder="Select"
                      optionFilterProp="label"
                      options={[
                        {
                          value: "limited",
                          label: "Limited",
                        },
                        {
                          value: "fullaccess",
                          label: "Full Access",
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}

                  {conversationAccessType && (
                    <div>
                      {!reviewAllPermission ? (
                        <Typography
                          className="custom-text1"
                          style={{ fontWeight: 500, marginBottom: 8 }}
                        >
                          Permissions
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Space direction="vertical">
                        {conversationAccessType === "limited" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CAT:L:ASC") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Access SMS conversations</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CAT:L:ASC"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CAT:L:ASC"
                                )}
                              >
                                Access SMS conversations
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CAT:L:AEC") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Access email conversations</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CAT:L:AEC"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CAT:L:AEC"
                                )}
                              >
                                Access email conversations
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CAT:L:AOAC") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Access only assigned conversations.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CAT:L:AOAC"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CAT:L:AOAC"
                                )}
                              >
                                Access only assigned conversations.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CAT:L:SAR") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Send and reply</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CAT:L:SAR"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CAT:L:SAR"
                                )}
                              >
                                Send and reply
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CAT:L:ARCTM") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>
                                    {" "}
                                    Assign or reassign conversations to team
                                    members.
                                  </li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CAT:L:ARCTM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CAT:L:ARCTM"
                                )}
                              >
                                Assign or reassign conversations to team
                                members.
                              </Checkbox>
                            )}
                          </>
                        )}

                        {conversationAccessType === "fullaccess" && (
                          <Typography style={{ color: "#595959" }}>
                            Full Access
                          </Typography>
                        )}
                      </Space>
                    </div>
                  )}
                </Row>
              </div>
              {/* Team */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <TeamSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "contents" }}
                  />
                  <Typography style={{ fontWeight: 500, marginLeft: 8 }}>
                    Team
                  </Typography>
                </div>

                <Divider style={{ margin: "10px 0px" }} />

                <Row>
                  {!reviewAllPermission ? (
                    <Typography
                      className="custom-text1"
                      style={{ marginBottom: 8 }}
                    >
                      Access Type
                    </Typography>
                  ) : (
                    ""
                  )}
                  {!reviewAllPermission ? (
                    <Select
                      style={{
                        width: "100%",
                        marginBottom: 10,
                      }}
                      disabled={disableDropDown}
                      value={teamAccessType}
                      onSelect={(e) => {
                        setteamAccessType(e);
                        if (e === "fullaccess") {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          if (!updatedPermissionList.includes("TAT:FA")) {
                            updatedPermissionList.push("TAT:FA");
                          }
                          setselectedPermissionList(updatedPermissionList);
                        } else {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          const index = updatedPermissionList.indexOf("TAT:FA");
                          if (index > -1) {
                            updatedPermissionList.splice(index, 1);
                          }
                          setselectedPermissionList(updatedPermissionList);
                        }
                      }}
                      placeholder="Select"
                      optionFilterProp="label"
                      options={[
                        {
                          value: "view",
                          label: "View",
                        },
                        {
                          value: "edit",
                          label: "Edit",
                        },
                        {
                          value: "fullaccess",
                          label: "Full Access",
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}
                  {teamAccessType && (
                    <div>
                      {!reviewAllPermission ? (
                        <Typography
                          className="custom-text1"
                          style={{ fontWeight: 500, marginBottom: 8 }}
                        >
                          Permissions
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Space direction="vertical">
                        {teamAccessType === "view" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("TAT:V:SLATM") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>See a list of all team members.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "TAT:V:SLATM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "TAT:V:SLATM"
                                )}
                              >
                                See a list of all team members.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes(
                                "TAT:V:VRPAEM"
                              ) ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>
                                    {" "}
                                    View roles and permissions assigned to each
                                    member.
                                  </li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "TAT:V:VRPAEM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "TAT:V:VRPAEM"
                                )}
                              >
                                View roles and permissions assigned to each
                                member.
                              </Checkbox>
                            )}
                          </>
                        )}
                        {teamAccessType === "edit" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("TAT:E:AVP") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>All “View” permissions.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ color: "#595959" }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "TAT:E:AVP"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "TAT:E:AVP"
                                )}
                              >
                                All “View” permissions.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("TAT:E:IRTM") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Invite or remove team members.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ color: "#595959" }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "TAT:E:IRTM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "TAT:E:IRTM"
                                )}
                              >
                                Invite or remove team members.
                              </Checkbox>
                            )}
                          </>
                        )}
                        {teamAccessType === "fullaccess" && (
                          <Typography style={{ color: "#595959" }}>
                            Full Access
                          </Typography>
                        )}
                      </Space>
                    </div>
                  )}
                </Row>
              </div>
              {/* Campaigns */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CampaignsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "contents" }}
                  />
                  <Typography style={{ fontWeight: 500, marginLeft: 8 }}>
                    Campaigns
                  </Typography>
                </div>

                <Divider style={{ margin: "10px 0px" }} />

                <Row>
                  {!reviewAllPermission ? (
                    <Typography
                      className="custom-text1"
                      style={{ marginBottom: 8 }}
                    >
                      Access Type
                    </Typography>
                  ) : (
                    ""
                  )}
                  {!reviewAllPermission ? (
                    <Select
                      style={{
                        width: "100%",
                        marginBottom: 10,
                      }}
                      disabled={disableDropDown}
                      value={campaignsAccessType}
                      onSelect={(e) => {
                        setcampaignsAccessType(e);
                        if (e === "fullaccess") {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          if (!updatedPermissionList.includes("CPAT:FA")) {
                            updatedPermissionList.push("CPAT:FA");
                          }
                          setselectedPermissionList(updatedPermissionList);
                        } else {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          const index =
                            updatedPermissionList.indexOf("CPAT:FA");
                          if (index > -1) {
                            updatedPermissionList.splice(index, 1);
                          }
                          setselectedPermissionList(updatedPermissionList);
                        }
                      }}
                      placeholder="Select"
                      optionFilterProp="label"
                      options={[
                        {
                          value: "view",
                          label: "View",
                        },
                        {
                          value: "edit",
                          label: "Edit",
                        },
                        {
                          value: "fullaccess",
                          label: "Full Access",
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}

                  {campaignsAccessType && (
                    <div>
                      {!reviewAllPermission ? (
                        <Typography
                          className="custom-text1"
                          style={{ fontWeight: 500, marginBottom: 8 }}
                        >
                          Permissions
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Space direction="vertical">
                        {campaignsAccessType === "view" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes(
                                "CPAT:V:SLATM"
                              ) ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>
                                    {" "}
                                    Access all campaigns (SMS and email).
                                  </li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CPAT:V:SLATM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CPAT:V:SLATM"
                                )}
                              >
                                Access all campaigns (SMS and email).
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CPAT:V:VPM") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li>View performance metrics</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CPAT:V:VPM"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CPAT:V:VPM"
                                )}
                              >
                                View performance metrics
                              </Checkbox>
                            )}
                          </>
                        )}
                        {campaignsAccessType === "edit" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CPAT:E:AVP") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> All “View” permissions.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ color: "#595959" }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CPAT:E:AVP"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CPAT:E:AVP"
                                )}
                              >
                                All “View” permissions.
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CPAT:E:CNSC") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Create new SMS campaigns</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ color: "#595959" }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CPAT:E:CNSC"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CPAT:E:CNSC"
                                )}
                              >
                                Create new SMS campaigns
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CPAT:E:CNEC") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Create new email campaigns</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ color: "#595959" }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CPAT:E:CNEC"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CPAT:E:CNEC"
                                )}
                              >
                                Create new email campaigns
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("CPAT:E:EDEC") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Edit or delete existing campaigns.</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ color: "#595959" }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "CPAT:E:EDEC"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "CPAT:E:EDEC"
                                )}
                              >
                                Edit or delete existing campaigns.
                              </Checkbox>
                            )}
                          </>
                        )}
                        {campaignsAccessType === "fullaccess" && (
                          <Typography style={{ color: "#595959" }}>
                            Full Access
                          </Typography>
                        )}
                      </Space>
                    </div>
                  )}
                </Row>
              </div>
              {/* Reports */}
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ReportsSVG
                    color={"#72779E"}
                    style={{ width: 12, display: "contents" }}
                  />
                  <Typography style={{ fontWeight: 500, marginLeft: 8 }}>
                    Reports
                  </Typography>
                </div>

                <Divider style={{ margin: "10px 0px" }} />

                <Row>
                  {!reviewAllPermission ? (
                    <Typography
                      className="custom-text1"
                      style={{ marginBottom: 8 }}
                    >
                      Access Type
                    </Typography>
                  ) : (
                    ""
                  )}
                  {!reviewAllPermission ? (
                    <Select
                      style={{
                        width: "100%",
                        marginBottom: 10,
                      }}
                      disabled={disableDropDown}
                      value={reportsAccessType}
                      onSelect={(e) => {
                        setreportsAccessType(e);
                        if (e === "fullaccess") {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          if (!updatedPermissionList.includes("RAT:FA")) {
                            updatedPermissionList.push("RAT:FA");
                          }
                          setselectedPermissionList(updatedPermissionList);
                        } else {
                          const updatedPermissionList = [
                            ...selectedPermissionList,
                          ];
                          const index = updatedPermissionList.indexOf("RAT:FA");
                          if (index > -1) {
                            updatedPermissionList.splice(index, 1);
                          }
                          setselectedPermissionList(updatedPermissionList);
                        }
                      }}
                      placeholder="Select"
                      optionFilterProp="label"
                      options={[
                        {
                          value: "limited",
                          label: "Limited",
                        },

                        {
                          value: "fullaccess",
                          label: "Full Access",
                        },
                      ]}
                    />
                  ) : (
                    ""
                  )}

                  {reportsAccessType && (
                    <div>
                      {!reviewAllPermission ? (
                        <Typography
                          className="custom-text1"
                          style={{ fontWeight: 500, marginBottom: 8 }}
                        >
                          Permissions
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Space direction="vertical">
                        {reportsAccessType === "limited" && (
                          <>
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("RAT:L:LR") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Leads reports</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "RAT:L:LR"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "RAT:L:LR"
                                )}
                              >
                                Leads reports
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("RAT:L:AR") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Appointments reports</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "RAT:L:AR"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "RAT:L:AR"
                                )}
                              >
                                Appointments reports
                              </Checkbox>
                            )}
                            {reviewAllPermission ? (
                              selectedPermissionList.includes("RAT:L:FR") ? (
                                <ul
                                  style={{
                                    padding: 0,
                                    margin: "0px 0px 0px 20px",
                                  }}
                                >
                                  <li> Financial reports</li>
                                </ul>
                              ) : (
                                ""
                              )
                            ) : (
                              <Checkbox
                                style={{ marginBottom: 5 }}
                                onChange={(e) => {
                                  handlePermissionChange(
                                    e.target.checked,
                                    "RAT:L:FR"
                                  );
                                }}
                                checked={selectedPermissionList.includes(
                                  "RAT:L:FR"
                                )}
                              >
                                Financial reports
                              </Checkbox>
                            )}
                          </>
                        )}

                        {reportsAccessType === "fullaccess" && (
                          <Typography style={{ color: "#595959" }}>
                            Full Access
                          </Typography>
                        )}
                      </Space>
                    </div>
                  )}
                </Row>
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
}) => {
  const [InviteTeamMemberform] = Form.useForm();
  const [options, setoptions] = useState([]);

  const handleSendInviteTeamMember = async (values) => {
    const token = localStorage.getItem("authToken");
    setbuttonLoader(true);
    values.clinic_id = loginUserDetails?.clinic_id;
    values.clinic_name = loginUserDetails?.clinic_name;
    values.clinic_website = loginUserDetails?.clinic_website;
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/inviteTeamMember`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
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
    if (loginUserDetails?.clinic_name) {
      InviteTeamMemberform?.setFieldValue(
        "clinic_name",
        loginUserDetails.clinic_name
      );
      InviteTeamMemberform?.setFieldValue(
        "clinic_website",
        loginUserDetails.clinic_website
      );
    }
  }, [isInviteTeamMemberModalVisible, loginUserDetails]);
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
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
              <Button
                type="primary"
                loading={buttonLoader}
                onClick={() => {
                  InviteTeamMemberform.submit();
                }}
              >
                Send Invitation
              </Button>
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
              <Input style={{ width: "100%" }} />
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
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label={
                <div className="custom-text1">
                  Role<span style={{ color: "red" }}>*</span>
                </div>
              }
              name="role_id"
              rules={[
                {
                  required: true,
                  message: "Please select a role!",
                },
              ]}
            >
              <Select
                style={{
                  width: "100%",
                }}
                options={options}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
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
}) => {
  const handleDelete = async () => {
    setbuttonLoader(true);
    const token = localStorage.getItem("authToken");
    await axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/delete-user/${seletedUserDetails?.id}`,
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
}) => {
  const handleChange = async (value, item) => {
    const token = localStorage.getItem("authToken");
    let data = {
      role_id: value?.id,
      role_name: value?.role_name,
      user_id: item?.id,
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

  useEffect(() => {
    console.log(selectedRoleDetails);
  }, [selectedRoleDetails]);

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
              disabled={selectedRoleDetails?.userCount <= 0 ? false : true}
            >
              Delete
            </Button>
          </Space>
        </div>
      }
      closable={false}
      width={selectedRoleDetails?.userCount <= 0 ? 450 : 650}
      className="custom-modal"
    >
      {selectedRoleDetails?.userCount <= 0 ? (
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
                      <Row>
                        <Col span={12}>
                          <Typography>{item.dentist_full_name}</Typography>
                          <Typography>{item.email}</Typography>
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
                            <Select
                              value={item.role_name}
                              style={{
                                width: 180,
                              }}
                              placeholder="Select role"
                              onChange={(e, data) => {
                                handleChange(data?.item, item);
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
          console.log(res);
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
    let data = {};
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
