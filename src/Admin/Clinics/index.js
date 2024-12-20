/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Input,
  List,
  Row,
  Space,
  Spin,
  Tag,
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
  SettingOutlined,
} from "@ant-design/icons";
import { ClinicsSVG } from "../../Common/SettingSidebarIconsSvg";
import {
  CreateNewClinicModal,
  DeleteClinicModalToConfirm,
  VieworEditClinicDetailsModal,
} from "./Modal";
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

  const [
    visibleDeleteClinicModalToConfirm,
    setvisibleDeleteClinicModalToConfirm,
  ] = useState(false);
  const renderListItem = (item) => (
    <List.Item
      style={{
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
              <div style={{ display: "grid", alignItems: "center" }}>
                <Text type="secondary">{item.clinic_name}</Text>
                <Space>
                  <Typography className="custom-text1">
                    {item?.websites?.length || 0} Websites
                  </Typography>
                  <Typography className="custom-text1">
                    {item?.userClinicRoles?.length || 0} Users
                  </Typography>
                </Space>
              </div>
            </Space>
            <Space>
              <Tag
                style={{
                  width: "100%",
                  margin: "3px 0px",
                  background: "#DBEFCF",
                  border: "none",
                }}
              >
                2421 Leads this month
              </Tag>
              <Button
                style={{ width: "100%", margin: "3px 0px" }}
                icon={<EyeOutlined />}
                onClick={() => {}}
              >
                View Dashboard
              </Button>
              <Button
                style={{ width: "100%", margin: "3px 0px" }}
                icon={<SettingOutlined />}
                onClick={() => {
                  setopenModeClinicDetails("view");
                  setselectedClinicDetails(item);
                  setisVieworEditClinicDetailsModal(true);
                }}
              >
                Manage Clinic
              </Button>
            </Space>
          </div>
        }
      />
    </List.Item>
  );

  const renderGridItem = (item) => (
    <List.Item style={{ padding: "16px" }}>
      <Card
        hoverable
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          transition: "transform 0.2s",
          background: "#FCFCFC",
          border: "1px solid #E8EBEF",
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
            marginBottom: 10,
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
        <div
          style={{
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Tag
            style={{
              width: "100%",
              margin: "3px 0px",
              background: "#DBEFCF",
              border: "none",
            }}
          >
            2421 Leads this month
          </Tag>
          <Button
            style={{ width: "100%", margin: "3px 0px" }}
            icon={<EyeOutlined />}
            onClick={() => {}}
          >
            View Dashboard
          </Button>
          <Button
            style={{ width: "100%", margin: "3px 0px" }}
            icon={<SettingOutlined />}
            onClick={() => {
              setopenModeClinicDetails("view");
              setselectedClinicDetails(item);
              setisVieworEditClinicDetailsModal(true);
            }}
          >
            Manage Clinic
          </Button>
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
            {viewMode !== "list" ? (
              <Button
                icon={<UnorderedListOutlined />}
                type={"default"}
                onClick={() => setViewMode("list")}
              />
            ) : (
              <Button
                icon={<AppstoreOutlined />}
                type={"default"}
                onClick={() => setViewMode("grid")}
              />
            )}
          </Space>
        </Col>
      </Row>
      <Divider style={{ margin: 0 }} />
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
              <>
                <List
                  itemLayout="horizontal"
                  dataSource={allClinicDetails}
                  renderItem={(item) => renderListItem(item)}
                />
                <Divider style={{ margin: 0 }} />
              </>
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
                grid={{ column: 4 }}
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
        setselectedClinicDetails={setselectedClinicDetails}
        openNotificationWithIcon={openNotificationWithIcon}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        getAllClinicDetails={getAllClinicDetails}
        setopenModeClinicDetails={setopenModeClinicDetails}
        setvisibleDeleteClinicModalToConfirm={setvisibleDeleteClinicModalToConfirm}
      />

      <DeleteClinicModalToConfirm
        visibleDeleteClinicModalToConfirm={visibleDeleteClinicModalToConfirm}
        setvisibleDeleteClinicModalToConfirm={
          setvisibleDeleteClinicModalToConfirm
        }
        selectedClinicDetails={selectedClinicDetails}
        openNotificationWithIcon={openNotificationWithIcon}
        setisVieworEditClinicDetailsModal={setisVieworEditClinicDetailsModal}
        getAllClinicDetails={getAllClinicDetails}
      />
    </>
  );
};

export default Clinics;
