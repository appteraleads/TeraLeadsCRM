/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  List,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import { getInitials } from "../../Common/ReturnColumnValue";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { ClinicsSVG } from "../../Common/SettingSidebarIconsSvg";
import { CreateNewClinicModal, VieworEditClinicDetailsModal } from "./Modal";
import axios from "axios";

const { Text } = Typography;

const Clinics = ({ loginUserDetails, openNotificationWithIcon }) => {
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [iscrearteNewClinicModalVisible, setiscrearteNewClinicModalVisible] =
    useState(false);
  const [searchClinicVisible, setsearchClinicVisible] = useState(false);
  const [allClinicDetails, setallClinicDetails] = useState([]);
  const [pageloader, setpageloader] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [isVieworEditClinicDetailsModal, setisVieworEditClinicDetailsModal] =
    useState(false);
  const [openModeClinicDetails, setopenModeClinicDetails] = useState();
  const [selectedClinicDetails, setselectedClinicDetails] = useState([]);

  const renderListItem = (item) => (
    <List.Item
      style={{
        background: "#FCFCFC",
        border: "1px solid #E8EBEF",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
      }}
    >
      <List.Item.Meta
        description={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Space>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  shape="square"
                  size={40}
                  src={item?.clinic_favicon}
                ></Avatar>
              </div>
              <Text type="secondary">{item.clinic_name}</Text>
            </Space>
            <Space>
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setopenModeClinicDetails("edit");
                  setselectedClinicDetails(item);
                  setisVieworEditClinicDetailsModal(true);
                }}
              ></Button>
              <Button
                icon={<EyeOutlined />}
                onClick={() => {
                  setopenModeClinicDetails("view");
                  setselectedClinicDetails(item);
                  setisVieworEditClinicDetailsModal(true);
                }}
              ></Button>
            </Space>
          </div>
        }
      />
    </List.Item>
  );

  const renderGridItem = (item) => (
    <List.Item>
      <Card
        hoverable
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          transition: "transform 0.2s",
          background: "#FCFCFC",
          border: "1px solid #E8EBEF",
        }}
        onClick={() => {
          setopenModeClinicDetails("view");
          setselectedClinicDetails(item);
          setisVieworEditClinicDetailsModal(true);
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar shape="square" size={40} src={item?.clinic_favicon}></Avatar>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography style={{ fontWeight: 600 }}>
            {item?.clinic_name}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Space>
            <Typography className="custom-text1">
              {item?.websites?.length || 0} Websites
            </Typography>
            <Typography className="custom-text1">
              {item?.userClinicRoles?.length || 0} Users
            </Typography>
          </Space>
        </div>
      </Card>
    </List.Item>
  );

  const getAllClinicDetails = async (search) => {
    setpageloader(true);
    const token = localStorage.getItem("authToken");
    await axios
      .get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/api/v1/auth/getAllClinicDetails?search=${search || ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setpageloader(false);
        setallClinicDetails(res?.data?.clinics);
      })
      .catch((err) => {
        setpageloader(false);
        console.log(err?.response?.data?.message);
        openNotificationWithIcon(
          "error",
          "Error",
          err?.response?.data?.message || err?.message
        );
      });
  };

  useEffect(() => {
    getAllClinicDetails();
  }, []);

  return (
    <>
      <Card
        style={{
          width: "100%",
          boxShadow:
            "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 10px 0 rgba(0, 0, 0, 0.0)",
        }}
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
            >
              <Col span={2}>
                {loginUserDetails?.profile_picture ? (
                  <Avatar size={40} src={loginUserDetails?.profile_picture} />
                ) : (
                  <Avatar
                    size={40}
                    style={{ background: loginUserDetails?.avatar_color }}
                  >
                    {getInitials(loginUserDetails?.dentist_full_name)}
                  </Avatar>
                )}
              </Col>
              <Col>
                <Typography>{loginUserDetails?.dentist_full_name}</Typography>
                <Typography className="custom-text1">
                  Choose the clinic you want to access. You can switch between
                  clinics anytime.
                </Typography>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ display: "flex", justifyContent: "end" }}>
            <Button
              type="primary"
              icon={<PiPlusBold />}
              onClick={() => {
                setiscrearteNewClinicModalVisible(true);
              }}
            >
              New Clinic
            </Button>
          </Col>
        </Row>
      </Card>

      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Col>
          <Space
            style={{
              marginBottom: 24,
              justifyContent: "center",
              display: "flex",
            }}
          >
            <div style={{ display: "flex", width: 20 }}>
              <ClinicsSVG color={"#72779E"} />
            </div>
            <Typography>
              Clinics
              <span className="custom-text1">
                ({allClinicDetails?.length || 0})
              </span>
            </Typography>
          </Space>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Space
            style={{
              marginBottom: 24,
              justifyContent: "center",
              display: "flex",
            }}
          >
            {searchClinicVisible ? (
              <Input
                placeholder="Search clinic"
                onChange={(e) => {
                  getAllClinicDetails(e?.target?.value);
                }}
              />
            ) : (
              ""
            )}

            <Button
              icon={<SearchOutlined />}
              onClick={(e) => {
                searchClinicVisible
                  ? setsearchClinicVisible(false)
                  : setsearchClinicVisible(true);
              }}
            />

            <Button
              icon={<UnorderedListOutlined />}
              type={viewMode === "list" ? "primary" : "default"}
              onClick={() => setViewMode("list")}
            >
              List View
            </Button>
            <Button
              icon={<AppstoreOutlined />}
              type={viewMode === "grid" ? "primary" : "default"}
              onClick={() => setViewMode("grid")}
            >
              Grid View
            </Button>
          </Space>
        </Col>
      </Row>

      <div style={{ height: "67vh", overflow: "auto" }}>
        {viewMode === "list" ? (
          <>
            {pageloader ? (
              <Row
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 100,
                }}
              >
                <Spin></Spin>
              </Row>
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={allClinicDetails}
                renderItem={(item) => renderListItem(item)}
              />
            )}
          </>
        ) : (
          <>
            {pageloader ? (
              <Row
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 100,
                }}
              >
                <Spin></Spin>
              </Row>
            ) : (
              <List
                grid={{ gutter: 16, column: 5 }}
                dataSource={allClinicDetails}
                renderItem={(item) => renderGridItem(item)}
              />
            )}
          </>
        )}
      </div>

      <CreateNewClinicModal
        iscrearteNewClinicModalVisible={iscrearteNewClinicModalVisible}
        setiscrearteNewClinicModalVisible={setiscrearteNewClinicModalVisible}
        openNotificationWithIcon={openNotificationWithIcon}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        getAllClinicDetails={getAllClinicDetails}
      />

      <VieworEditClinicDetailsModal
        isVieworEditClinicDetailsModal={isVieworEditClinicDetailsModal}
        setisVieworEditClinicDetailsModal={setisVieworEditClinicDetailsModal}
        openModeClinicDetails={openModeClinicDetails}
        selectedClinicDetails={selectedClinicDetails}
        openNotificationWithIcon={openNotificationWithIcon}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        getAllClinicDetails={getAllClinicDetails}
      />
    </>
  );
};

export default Clinics;
