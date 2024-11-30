import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Row,
  Col,
  Image,
  Space,
  Dropdown,
  Divider,
  Typography,
  Avatar,
  Input,
  notification,
  Select,
} from "antd";

import TeraleadsLogo from "../assets/logo/TeraleadsRemoveBg.png";
import { ReactComponent as Usersvg } from "../assets/IconSvg/solar_user-broken.svg";
import { ReactComponent as Dashboardsvg } from "../assets/IconSvg/icons8-home 1.svg";
import { ReactComponent as Appointmentssvg } from "../assets/IconSvg/basil_calendar-outline.svg";
import { ReactComponent as Reportsvg } from "../assets/IconSvg/hugeicons_analytics-up.svg";
import { ReactComponent as Callsvg } from "../assets/IconSvg/Vector.svg";
import { ReactComponent as Chatsvg } from "../assets/IconSvg/fluent_chat-16-regular.svg";
import { ReactComponent as Dentalsvg } from "../assets/IconSvg/Frame 2.svg";
import { ReactComponent as LogoCircle } from "../assets/logo/teracrmlogoCircle.svg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SettingsSVG } from "../Common/SettingSidebarIconsSvg";
import axios from "axios";
import { getInitials } from "../Common/ReturnColumnValue";
import { FaClinicMedical, FaPlus } from "react-icons/fa";
import { icons } from "antd/es/image/PreviewGroup";
const Conversations = React.lazy(() => import("../Conversations"));
const QuickConversation = React.lazy(() =>
  import("../Common/QuickConversation")
);
const Appointments = React.lazy(() => import("../Appointments/index"));
const Leads = React.lazy(() => import("../Leads"));
const Settings = React.lazy(() => import("../Settings"));

const { Header, Sider } = Layout;
const { Option } = Select;
const CustomLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [sidebarkey, setsidebarkey] = useState("1");
  const [defaultValueSearch, setdefaultValueSearch] = useState("");
  const [searchContent, setsearchContent] = useState();
  const [isVisibleQuickConversation, setisVisibleQuickConversation] =
    useState(false);
  const [quickConversationView, setquickConversationView] = useState(null);
  const [selectedConversationDetails, setselectedConversationDetails] =
    useState();

  const [loginUserDetails, setloginUserDetails] = useState();

  const sidebaritems = [
    {
      key: "Home",
      label: "Home",
      type: "group",
      children: [
        {
          key: "1",
          icon: <Dashboardsvg style={{ width: 20 }} />,
          label: <span className="custom-text1">Dashboard</span>,
          onClick: () => navigate("/dashboard"),
        },
        {
          key: "2",
          icon: <Appointmentssvg style={{ width: 20 }} />,
          label: <span className="custom-text1">Appointments</span>,
          onClick: () => navigate("/appointments"),
        },
        {
          key: "3",
          icon: <Reportsvg style={{ width: 20 }} />,
          label: <span className="custom-text1">Reports</span>,
          onClick: () => navigate("/reports"),
        },
      ],
    },
    {
      key: "grp",
      label: "Contacts",
      type: "group",
      children: [
        {
          key: "4",
          icon: <Usersvg style={{ width: 20 }} />,
          label: <span className="custom-text1">Leads</span>,
          onClick: () => navigate("/leads"),
        },
        {
          key: "5",
          icon: <Callsvg style={{ width: 20 }} />,
          label: <span className="custom-text1">Calls</span>,
          onClick: () => navigate("/calls"),
        },
        {
          key: "6",
          icon: <Chatsvg style={{ width: 20 }} />,
          label: <span className="custom-text1">Conversations</span>,
          onClick: () => navigate("/conversations"),
        },
      ],
    },
  ];

  const settingsItem = {
    key: "7",
    icon: (
      <div style={{ display: "flex", width: 20 }}>
        <SettingsSVG color={sidebarkey === "7" ? "#3900DB" : "#72779E"} />
      </div>
    ),
    label: <span className="custom-text1">Settings</span>,
    onClick: () => navigate("/settings"),
  };

  const clinicdropitems = [
    {
      key: "1",
      label: "My Clinic",
      icon: <FaClinicMedical />,
      disabled: true,
    },
    {
      type: "divider",
    },

    // ...loginUserDetails?.Clinic.map((clinic) => ({
    //   key: clinic.id,
    //   label: clinic.name,
    //   icon: <Image src={clinic.imageUrl} alt={clinic.name} width={20} height={20} />,
    // })),
    {
      key: "4",
      label: <Typography style={{ color: "#3900DB" }}> New Clinic</Typography>,
      icon: <FaPlus style={{ color: "#3900DB" }} />,
    },
  ];

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      duration: 3,
    });
  };

  const handleclinic = ({ key }) => {
    console.log("handle clinic");
  };

  const selectbefore = (
    <Select
      style={{ width: 140, borderLeft: "1px solid #d9d9d9" }}
      placeholder="Search for"
      className="custom-select"
      value={defaultValueSearch?.toString()}
    >
      <Option value="leads">Leads</Option>
      <Option value="appointment">Appointment</Option>
      <Option value="conversations">Conversations</Option>
    </Select>
  );

  const onClick = (e) => {
    console.log("click ", e);
  };

  const handleGetLoginUserDetails = async () => {
    const token = localStorage.getItem("authToken");

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
        console.log("login details", res?.data?.user);
        setloginUserDetails(res?.data?.user);
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Settings",
          err?.response?.data?.message || err?.message
        );
      });
  };

  useEffect(() => {
    handleGetLoginUserDetails();
  }, []);

  useEffect(() => {
    if (location.pathname === "/leads") {
      setsidebarkey("4");
      setdefaultValueSearch("leads");
    } else if (location.pathname === "/appointments") {
      setsidebarkey("2");
      setdefaultValueSearch("appointments");
    } else if (location.pathname === "/conversations") {
      setsidebarkey("6");
      setdefaultValueSearch("conversations");
    } else if (location.pathname === "/settings") {
      setsidebarkey("7");
      setdefaultValueSearch("settings");
    }
  }, [location]);

  return (
    <>
      <Layout>
        {contextHolder}

        <Sider
          width={230}
          style={{
            background:
              "linear-gradient(180deg, #FFFBFE 0%, #FEF7FE 51.48%, #F5F8FF 100%)",
            borderRight: "1px solid #E8EBEF",
          }}
          // collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              padding: "10px",
              height: 65,
              color: "white",
              display: collapsed ? "flex" : "",
              alignItems: collapsed ? "center" : "",
              justifyContent: collapsed ? "center" : "",
            }}
          >
            {collapsed ? (
              <LogoCircle style={{ width: 25 }} />
            ) : (
              <Image style={{ margin: 10 }} width={100} src={TeraleadsLogo} />
            )}
          </div>
          <Divider style={{ margin: 0, background: "#E8EBEF" }} />
          <div
            style={{ display: "flex", flexDirection: "column", height: "90%" }}
          >
            {/* Main Menu items */}
            <Menu
              onClick={onClick}
              selectedKeys={[sidebarkey]}
              mode="inline"
              items={sidebaritems}
              style={{ padding: 10, background: "none", flexGrow: 1 }}
            />

            {/* Settings item positioned at the bottom */}
            <Menu
              mode="inline"
              style={{ padding: 10, background: "none" }}
              items={[
                {
                  key: settingsItem.key,
                  icon: settingsItem.icon,
                  label: settingsItem.label,
                  onClick: settingsItem.onClick,
                },
              ]}
            />
          </div>
        </Sider>
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            className="site-layout-sub-header-background"
            style={{
              padding: 0,
              background:
                "linear-gradient(90deg, #FFFBFE 0%, #FEF7FE 51.48%, #F5F8FF 100%)",
              borderBottom: "1px solid #E8EBEF",
            }}
          >
            <Row
              style={{
                borderLeft: "1px solid #E8EBEF",
                height: 64,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Col
                span={6}
                style={{ display: "flex", alignItems: "center", padding: 10 }}
              >
                <Dentalsvg />
                <Dropdown
                  menu={{
                    items: clinicdropitems,
                    onSelect: handleclinic,
                  }}
                >
                  <Space style={{ margin: 10 }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Chicago implant Clinic
                    </Typography>
                    <MdOutlineKeyboardArrowDown
                      style={{ fontSize: 20, display: "flex" }}
                    />
                  </Space>
                </Dropdown>
              </Col>
              <Col
                span={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                <Input
                  className="custom-search"
                  placeholder="Search...."
                  onChange={(e) => {
                    setsearchContent(e?.target?.value);
                  }}
                  addonAfter={selectbefore}
                  addonBefore={<CiSearch style={{ fontSize: 20 }} />}
                />
              </Col>
              <Col
                span={6}
                style={{ display: "flex", alignItems: "center", padding: 10 }}
              >
                <Col
                  span={24}
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    justifyItems: "center",
                  }}
                >
                  <Space style={{ margin: 10 }}>
                    <FiPlusCircle style={{ fontSize: 22, display: "flex" }} />
                    <IoIosNotificationsOutline
                      style={{ fontSize: 25, display: "flex" }}
                    />
                    <MdZoomOutMap style={{ fontSize: 22, display: "flex" }} />
                    {loginUserDetails?.profile_picture ? (
                      <Avatar src={loginUserDetails?.profile_picture} />
                    ) : (
                      <Avatar>
                        {getInitials(loginUserDetails?.dentist_full_name)}
                      </Avatar>
                    )}

                    <Typography
                      style={{
                        fontWeight: "bold",
                        width: 120,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {loginUserDetails?.dentist_full_name}
                    </Typography>
                    <MdOutlineKeyboardArrowDown
                      style={{ fontSize: 20, display: "flex" }}
                    />
                  </Space>
                </Col>
              </Col>
            </Row>
          </Header>

          {sidebarkey === "4" ? (
            <Leads
              searchContent={searchContent}
              setisVisibleQuickConversation={setisVisibleQuickConversation}
              setquickConversationView={setquickConversationView}
              setselectedConversationDetails={setselectedConversationDetails}
              loginUserDetails={loginUserDetails}
            />
          ) : sidebarkey === "6" ? (
            <Conversations
              searchContent={searchContent}
              loginUserDetails={loginUserDetails}
            />
          ) : sidebarkey === "2" ? (
            <Appointments
              searchContent={searchContent}
              openNotificationWithIcon={openNotificationWithIcon}
              setisVisibleQuickConversation={setisVisibleQuickConversation}
              setquickConversationView={setquickConversationView}
              setselectedConversationDetails={setselectedConversationDetails}
              loginUserDetails={loginUserDetails}
            />
          ) : sidebarkey === "7" ? (
            <Settings
              openNotificationWithIcon={openNotificationWithIcon}
              loginUserDetails={loginUserDetails}
            />
          ) : (
            ""
          )}

          <QuickConversation
            openNotificationWithIcon={openNotificationWithIcon}
            selectedConversationDetails={selectedConversationDetails}
            setselectedConversationDetails={setselectedConversationDetails}
            isVisibleQuickConversation={isVisibleQuickConversation}
            setisVisibleQuickConversation={setisVisibleQuickConversation}
            quickConversationView={quickConversationView}
            setquickConversationView={setquickConversationView}
            loginUserDetails={loginUserDetails}
          />
        </Layout>
      </Layout>
    </>
  );
};

export default CustomLayout;
