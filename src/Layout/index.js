import React, { useEffect, useRef, useState } from "react";
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
  List,
  Badge,
} from "antd";
import { IoTime } from "react-icons/io5";
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
import { MdOutlineZoomInMap } from "react-icons/md";
import dayjs from "dayjs";

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
  const containerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loginUserDetails, setloginUserDetails] = useState();
  const [loadingNotification, setloadingNotification] = useState(false);
  const [isNotificationDropdownVisible, setisNotificationDropdownVisible] =
    useState(false);
  const [notificationDetailsList, setnotificationDetailsList] = useState([]);
  const [unreadCount, setunreadCount] = useState(0);
  const [isLeadsDetailsModalVisible, setisLeadsDetailsModalVisible] =
    useState(false);
  const [selectedItemDetails, setselectedItemDetails] = useState([]);
  const handlesetvisibleNotificationDropdown = (visible) => {
    if (visible) {
      handleGetNotificationDetails();
    }
    setisNotificationDropdownVisible(visible);
  };

  const enterFullScreen = () => {
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else if (containerRef.current.webkitRequestFullscreen) {
      containerRef.current.webkitRequestFullscreen(); // For Safari
    } else if (containerRef.current.msRequestFullscreen) {
      containerRef.current.msRequestFullscreen(); // For IE11
    }
    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // For Safari
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen(); // For IE11
    }
    setIsFullScreen(false);
  };

  const menu = (
    <Menu>
      <div
        style={{
          padding: 10,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #E8EBEF",
        }}
      >
        <IoIosNotificationsOutline style={{ fontSize: 18 }} />
        <Typography style={{ padding: "0px 0px 0px 5px", fontSize: 15 }}>
          Notifications
        </Typography>
      </div>

      <div
        style={{
          width: 350,
          maxHeight: "260px",
          overflowY: "auto",
          padding: "0px 0px 10px 0px ",
        }}
      >
        <List
          loading={loadingNotification}
          dataSource={notificationDetailsList}
          style={{ width: "100%" }}
          renderItem={(noti) => (
            <List.Item
              style={{
                cursor: "pointer",
                background: noti?.status === "unread" ? "#F4F7FC" : "",
              }}
            >
              {noti?.type === "Appointments" ? (
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "0px 5px 0px 5px ",
                  }}
                  onClick={() => {
                    handleMarkAllReadNotification(noti?.id);
                  }}
                >
                  <Col span={4}>
                    <Appointmentssvg
                      style={{
                        padding: 10,
                        borderRadius: 50,
                        border: "1px solid #E8EBEF",
                        background: "#fff",
                        width: 15,
                        height: 15,
                      }}
                    />
                  </Col>
                  <Col span={20}>
                    <Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: noti?.message?.trim(),
                        }}
                      />
                    </Typography>
                    <Space style={{ display: "flex", alignItems: "center" }}>
                      <IoTime style={{ display: "flex", color: "#72779E" }} />
                      <Typography className="custom-text1">
                        {dayjs(noti?.created_at).format("hh:mm A")}
                      </Typography>
                    </Space>
                  </Col>
                </Row>
              ) : noti?.type === "Leads" ? (
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "0px 5px 0px 5px ",
                  }}
                  onClick={() => {
                    navigate("/leads");
                    handleMarkAllReadNotification(noti?.id);
                    setselectedItemDetails(noti?.metadata);
                    setisLeadsDetailsModalVisible(true);
                    setisNotificationDropdownVisible(false);
                  }}
                >
                  <Col span={4}>
                    <Usersvg
                      style={{
                        padding: 10,
                        borderRadius: 50,
                        border: "1px solid #E8EBEF",
                        background: "#fff",
                        width: 15,
                        height: 15,
                      }}
                    />
                  </Col>
                  <Col span={20}>
                    <Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: noti?.message?.trim(),
                        }}
                      />
                    </Typography>
                    <Space style={{ display: "flex", alignItems: "center" }}>
                      <IoTime style={{ display: "flex", color: "#72779E" }} />
                      <Typography className="custom-text1">
                        {dayjs(noti?.created_at).format("hh:mm A")}
                      </Typography>
                    </Space>
                  </Col>
                </Row>
              ) : noti?.type === "Conversations" ? (
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Col span={4}>
                    <Chatsvg
                      style={{
                        padding: 10,
                        borderRadius: 50,
                        border: "1px solid #E8EBEF",
                        width: 15,
                        height: 15,
                      }}
                    />
                  </Col>
                  <Col span={20}>
                    <Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: noti?.message?.trim(),
                        }}
                      />
                    </Typography>
                    <Typography>
                      {dayjs(noti?.created_at).format("hh:mm A")}
                    </Typography>
                  </Col>
                </Row>
              ) : noti?.type === "Campaigns" ? (
                <Row
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Col span={4}>
                    <Usersvg
                      style={{
                        padding: 10,
                        borderRadius: 50,
                        border: "1px solid #E8EBEF",
                        width: 15,
                        height: 15,
                      }}
                    />
                  </Col>
                  <Col span={20}>
                    <Typography>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: noti?.message?.trim(),
                        }}
                      />
                    </Typography>
                    <Typography>
                      {dayjs(noti?.created_at).format("hh:mm A")}
                    </Typography>
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </List.Item>
          )}
        />
      </div>
    </Menu>
  );

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
        handleGetNotificationDetails(res?.data?.user?.id);
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

  const handleGetNotificationDetails = async (id) => {
    const token = localStorage.getItem("authToken");
    setloadingNotification(true);
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/notification/${
          loginUserDetails?.id ? loginUserDetails?.id : id
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setloadingNotification(false);
        console.log("notifications details", res?.data?.notifications);
        setnotificationDetailsList(res?.data?.notifications);
        setunreadCount(res?.data?.unreadCount);
      })
      .catch((err) => {
        setloadingNotification(false);
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Settings",
          err?.response?.data?.message || err?.message
        );
      });
  };

  const handleMarkAllReadNotification = async (id) => {
    const token = localStorage.getItem("authToken");
    setloadingNotification(true);
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/notification/mark-read/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        handleGetNotificationDetails();
      })
      .catch((err) => {
        setloadingNotification(false);
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
      <Layout ref={containerRef}>
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
                      {loginUserDetails?.clinic_name}
                    </Typography>
                    <MdOutlineKeyboardArrowDown
                      style={{ fontSize: 20, display: "flex" }}
                    />
                  </Space>
                </Dropdown>
              </Col>
              <Col
                span={11}
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
                span={7}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  padding: 10,
                }}
              >
                <Space
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "end",
                    justifyItems: "center",
                  }}
                >
                  <FiPlusCircle style={{ fontSize: 22, display: "flex" }} />
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    placement="bottomCenter"
                    visible={isNotificationDropdownVisible}
                    onVisibleChange={handlesetvisibleNotificationDropdown}
                  >
                    {unreadCount <= 0 ? (
                      <IoIosNotificationsOutline
                        onClick={() => {
                          setisNotificationDropdownVisible(true);
                        }}
                        style={{
                          fontSize: 25,
                          display: "flex",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0px 5px 0px 5px",
                        }}
                      >
                        <Badge count={unreadCount} color="#3900DB">
                          <IoIosNotificationsOutline
                            onClick={() => {
                              setisNotificationDropdownVisible(true);
                            }}
                            style={{
                              fontSize: 25,
                              display: "flex",
                              cursor: "pointer",
                            }}
                          />
                        </Badge>
                      </div>
                    )}
                  </Dropdown>
                  {isFullScreen ? (
                    <MdOutlineZoomInMap
                      onClick={exitFullScreen}
                      style={{
                        fontSize: 22,
                        display: "flex",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <MdZoomOutMap
                      onClick={enterFullScreen}
                      style={{
                        fontSize: 22,
                        display: "flex",
                        cursor: "pointer",
                      }}
                    />
                  )}

                  {loginUserDetails?.profile_picture ? (
                    <Avatar src={loginUserDetails?.profile_picture} />
                  ) : (
                    <Avatar
                      style={{ background: loginUserDetails?.avatar_color }}
                    >
                      {getInitials(loginUserDetails?.dentist_full_name)}
                    </Avatar>
                  )}

                  <Typography
                    style={{
                      fontWeight: "bold",
                      width: 100,
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
            </Row>
          </Header>

          {sidebarkey === "4" ? (
            <Leads
              searchContent={searchContent}
              isLeadsDetailsModalVisible={isLeadsDetailsModalVisible}
              setisLeadsDetailsModalVisible={setisLeadsDetailsModalVisible}
              selectedItemDetails={selectedItemDetails}
              setselectedItemDetails={setselectedItemDetails}
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
