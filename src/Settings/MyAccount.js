/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Avatar,
  Typography,
  Space,
  Upload,
  Divider,
  Skeleton,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  OTPVerificationModal,
  UpdateEmailModal,
  UpdatePasswordModal,
} from "./Modal";
import CryptoJS from "crypto-js";
import axios from "axios";
import { getInitials } from "../Common/ReturnColumnValue";
import imageCompression from "browser-image-compression";

const { Text } = Typography;
const SECRET_KEY = "ed1fd0c7deea4aa7023c2195fb097a27";

// Decrypt password function
const decryptPassword = (encryptedPassword, iv) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedPassword,
    CryptoJS?.enc?.Utf8?.parse(SECRET_KEY),
    {
      iv: CryptoJS?.enc?.Base64?.parse(iv), // Convert IV from base64
    }
  );

  return bytes.toString(CryptoJS.enc.Utf8); // Return decrypted password as string
};

const MyAccount = ({ openNotificationWithIcon, loginUserDetails }) => {
  const [fullName, setfullName] = useState();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState();
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [profile_picture, setprofile_picture] = useState("");
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [isUpdateEmailModalVisible, setisUpdateEmailModalVisible] =
    useState(false);
  const [isUpdatePasswordModalVisible, setisUpdatePasswordModalVisible] =
    useState(false);
  const [isOTPVerificationModalVisible, setisOTPVerificationModalVisible] =
    useState(false);
  const [userDetails, setuserDetails] = useState();
  const [updateType, setupdateType] = useState();

  const handleInputChange = () => {
    setUnsavedChanges(true);
  };

  const handleProfileChange = async (file) => {
    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    try {
      let fileToUpload = file;

      if (file.size > maxSizeInBytes) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        fileToUpload = await imageCompression(file, options);
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setprofile_picture(e.target.result);
        setUnsavedChanges(true);
      };
      reader.readAsDataURL(fileToUpload);
    } catch (error) {
      console.error("Image compression failed:", error);
      alert("Image compression failed. Please try again with a smaller file.");
    }
  };

  const handleProfileDelete = () => {
    setprofile_picture();
    setUnsavedChanges(true);
  };

  const handleGetLoginUserDetails = async () => {
    const token = localStorage.getItem("authToken");
    setbuttonLoader(true);
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/getLoginUserDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setfullName(res?.data?.user?.dentist_full_name);
        setemail(res?.data?.user?.email);
        if (res?.data?.user?.password && res?.data?.user?.iv_encrypted_password)
          setpassword(
            decryptPassword(
              res?.data?.user?.password,
              res?.data?.user?.iv_encrypted_password
            )
          );
        setprofile_picture(res?.data?.user?.profile_picture);
        setuserDetails(res?.data?.user);
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

  const handleUpdateMyAccount = async () => {
    let data = {
      dentist_full_name: fullName,
      profile_picture: profile_picture,
    };
    const token = localStorage.getItem("authToken");
    setbuttonLoader(true);
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/user-update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res?.status === 200) {
          setUnsavedChanges(false);
          handleGetLoginUserDetails();
          openNotificationWithIcon(
            "success",
            "Settings",
            "Updated successfully"
          );
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
    console.log("My Account", loginUserDetails);
    setprofile_picture(loginUserDetails?.profile_picture);
    setfullName(loginUserDetails?.dentist_full_name);
    setemail(loginUserDetails?.email);
    setpassword(
      decryptPassword(
        loginUserDetails?.password,
        loginUserDetails?.iv_encrypted_password
      )
    );
    // handleGetLoginUserDetails();
  }, []);

  return (
    <>
      {buttonLoader ? (
        <Skeleton
          paragraph={{
            rows: 4,
          }}
        />
      ) : (
        <>
          <Card
            title={<Typography>My Account</Typography>}
            bordered={false}
            style={{ width: "100%" }}
            bodyStyle={{ padding: "24px" }}
          >
            {/* Profile Section */}
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Set Up Your Profile
                </Typography>
                <Text className="custom-text1">
                  Upload a photo to personalize your account.
                </Text>
              </Col>
              <Col span={12}>
                <Space>
                  {profile_picture ? (
                    <Avatar size={64} src={profile_picture} />
                  ) : (
                    <Avatar
                      style={{ background: loginUserDetails?.avatar_color }}
                      size={64}
                    >
                      {getInitials(fullName)}
                    </Avatar>
                  )}

                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      handleProfileChange(file);
                      return false; // Prevent auto-upload
                    }}
                  >
                    <Button type="link" icon={<EditOutlined />}>
                      Change profile
                    </Button>
                  </Upload>
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={handleProfileDelete}
                  >
                    Delete
                  </Button>
                </Space>
              </Col>
            </Row>
            <Divider />
            {/* Full Name Section */}
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>Full Name</Typography>
                <Text className="custom-text1">
                  Your name as it will appear across your profile.
                </Text>
              </Col>
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Input
                    value={fullName}
                    placeholder="First Name"
                    onChange={(e) => {
                      setfullName(e.target.value);
                      handleInputChange();
                    }}
                    style={{ width: "100%", margin: 1 }}
                  />
                </div>
              </Col>
            </Row>
            <Divider />
            {/* Email Address Section */}
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Email Address
                </Typography>
                <Text className="custom-text1">
                  The email address associated with your account.
                </Text>
              </Col>
              <Col span={12}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Input
                    value={email}
                    placeholder="Email Address"
                    disabled
                    style={{ width: "100%" }}
                  />
                  {/* <Button
                    type="link"
                    onClick={() => {
                      setisUpdateEmailModalVisible(true);
                      setupdateType("email");
                    }}
                  >
                    Change
                  </Button> */}
                </div>
              </Col>
            </Row>
            <Divider />
            {/* Password Section */}
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Your Password
                </Typography>
                <Text className="custom-text1">
                  Create a secure password for your account.
                </Text>
              </Col>
              <Col span={12}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: "100%", display: "flex" }}>
                    <Input.Password
                      value={password}
                      placeholder="Password"
                      style={{
                        width: "100%",
                        background: "rgba(0, 0, 0, 0.04)",
                      }}
                    />
                  </div>
                  <Button
                    type="link"
                    onClick={() => {
                      setisUpdatePasswordModalVisible(true);
                      setupdateType("password");
                    }}
                  >
                    Change
                  </Button>
                </div>
              </Col>
            </Row>
            <Divider />
            {/* Save Button and Unsaved Changes */}
            <Row justify="start">
              <Col>
                <Space align="center">
                  <Button
                    type="primary"
                    onClick={handleUpdateMyAccount}
                    disabled={!unsavedChanges}
                    style={{
                      backgroundColor: "#3900DB",
                      borderColor: "#3900DB",
                      color: "#fff",
                    }}
                  >
                    Save
                  </Button>
                  {unsavedChanges && (
                    <Text type="danger">You have unsaved changes</Text>
                  )}
                </Space>
              </Col>
            </Row>
          </Card>
        </>
      )}

      <UpdateEmailModal
        isUpdateEmailModalVisible={isUpdateEmailModalVisible}
        setisUpdateEmailModalVisible={setisUpdateEmailModalVisible}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        setisOTPVerificationModalVisible={setisOTPVerificationModalVisible}
        openNotificationWithIcon={openNotificationWithIcon}
        userDetails={userDetails}
        updateType={updateType}
      />
      <UpdatePasswordModal
        isUpdatePasswordModalVisible={isUpdatePasswordModalVisible}
        setisUpdatePasswordModalVisible={setisUpdatePasswordModalVisible}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        setisOTPVerificationModalVisible={setisOTPVerificationModalVisible}
        openNotificationWithIcon={openNotificationWithIcon}
        userDetails={userDetails}
        updateType={updateType}
      />
      <OTPVerificationModal
        isOTPVerificationModalVisible={isOTPVerificationModalVisible}
        setisOTPVerificationModalVisible={setisOTPVerificationModalVisible}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        openNotificationWithIcon={openNotificationWithIcon}
        userDetails={userDetails}
        updateType={updateType}
        handleGetLoginUserDetails={handleGetLoginUserDetails}
      />
    </>
  );
};

export default MyAccount;
