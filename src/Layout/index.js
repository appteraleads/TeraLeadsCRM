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
  Checkbox,
} from "antd";
import { IoTime } from "react-icons/io5";
import TeraleadsLogo from "../assets/logo/TeraleadsRemoveBg.png";
import { ReactComponent as Usersvg } from "../assets/IconSvg/solar_user-broken.svg";
import { ReactComponent as Dashboardsvg } from "../assets/IconSvg/icons8-home 1.svg";
import { ReactComponent as Appointmentssvg } from "../assets/IconSvg/basil_calendar-outline.svg";
import { ReactComponent as Reportsvg } from "../assets/IconSvg/hugeicons_analytics-up.svg";
import { ReactComponent as Callsvg } from "../assets/IconSvg/Vector.svg";
import { ReactComponent as Chatsvg } from "../assets/IconSvg/fluent_chat-16-regular.svg";
import { IoIosLogOut } from "react-icons/io";
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
import { FaClinicMedical } from "react-icons/fa";
import { MdOutlineZoomInMap } from "react-icons/md";
import dayjs from "dayjs";
import { Content } from "antd/es/layout/layout";
import { LuLogOut } from "react-icons/lu";
const Conversations = React.lazy(() => import("../Conversations"));
const QuickConversation = React.lazy(() =>
  import("../Common/QuickConversation")
);
const Appointments = React.lazy(() => import("../Appointments/index"));
const Leads = React.lazy(() => import("../Leads"));
const Settings = React.lazy(() => import("../Settings"));
const Reports = React.lazy(() => import("../Reports"));

const { Header, Sider } = Layout;
const { Option } = Select;
const CustomLayout = ({ loginUserDetails ,setloginUserDetails}) => {
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
  const [loadingNotification, setloadingNotification] = useState(false);
  const [isNotificationDropdownVisible, setisNotificationDropdownVisible] =
    useState(false);
  const [notificationDetailsList, setnotificationDetailsList] = useState([]);
  const [unreadCount, setunreadCount] = useState(0);
  const [isLeadsDetailsModalVisible, setisLeadsDetailsModalVisible] =
    useState(false);
  const [selectedItemDetails, setselectedItemDetails] = useState([]);
  const [userSeletedWebsiteList, setuserSeletedWebsiteList] = useState([]);
  const [clinicUsers, setclinicUsers] = useState([]);
  const [visibleprofileMenu, setvisibleprofileMenu] = useState(false);
  const handlesetvisibleNotificationDropdown = (visible) => {
    if (visible) {
      handleGetNotificationDetails();
    }
    setisNotificationDropdownVisible(visible);
  };

  const handlesetvisibleprofileMenu = (visible) => {
    setvisibleprofileMenu(visible);
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
                    navigate("/appointments");
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
                        className="multi-line-ellipsis"
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
                        className="multi-line-ellipsis"
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
                        className="multi-line-ellipsis"
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
                        className="multi-line-ellipsis"
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

  const profileMenu = (
    <Menu>
      <div
        style={{
          padding: "10px 10px 0px 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography className="custom-text1" style={{ fontSize: 15 }}>
          Account
        </Typography>
      </div>
      <div
        style={{
          width: 250,
        }}
      >
        <Space style={{ padding: 10 }}>
          {loginUserDetails?.profile_picture ? (
            <Avatar size={34} src={loginUserDetails?.profile_picture} />
          ) : (
            <Avatar
              size={34}
              style={{ background: loginUserDetails?.avatar_color }}
            >
              {getInitials(loginUserDetails?.dentist_full_name)}
            </Avatar>
          )}
          <div>
            <Typography
              style={{
                fontWeight: "bold",
              }}
            >
              {loginUserDetails?.dentist_full_name}
            </Typography>

            <Typography
              className="custom-text1"
              style={{ overflow: "hidden", textOverflow: "ellipsis",whiteSpace: 'nowrap',width: '180px' }}
            >
              {loginUserDetails?.email}
            </Typography>
          </div>
        </Space>
        <Divider style={{ margin: 0 }} />
        <Space
          style={{ padding: 10, cursor: "pointer" }}
          onClick={() => {
            navigate("/settings");
            setvisibleprofileMenu(false);
          }}
        >
          <div style={{ display: "flex", width: 20 }}>
            <SettingsSVG color={"#72779E"} />
          </div>
          <Typography style={{ fontWeight: 500 }}>Settings</Typography>
        </Space>
        <Divider style={{ margin: 0 }} />
        <Space
          style={{ padding: 10, cursor: "pointer" }}
          onClick={() => {
            navigate("/login");
            localStorage.clear();
            setvisibleprofileMenu(false);
          }}
        >
          <div style={{ display: "flex", width: 20 }}>
            <LuLogOut style={{ fontSize: 18, color: "#72779E" }} />
          </div>
          <Typography style={{ fontWeight: 500 }}>Logout</Typography>
        </Space>
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

  const handleCheckboxChange = (websiteUserName, checked) => {
    setuserSeletedWebsiteList((prev) => {
      if (checked) {
        // Add website_user_name if not already in the list
        return prev.includes(websiteUserName)
          ? prev
          : [...prev, websiteUserName];
      } else {
        // Remove website_user_name if unchecked
        return prev.filter((name) => name !== websiteUserName);
      }
    });
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
    ...(Array.isArray(loginUserDetails?.userClinicRoles) &&
    loginUserDetails.userClinicRoles.length > 0
      ? loginUserDetails.userClinicRoles.map((item) => ({
          key: item?.clinic?.id,
          type: "group",
          label: (
            <Space>
              {item?.clinic?.clinic_favicon ? (
                <Image
                  src={item?.clinic?.clinic_favicon}
                  width={20}
                  height={20}
                />
              ) : (
                <Avatar shape="square" size={20} />
              )}
              <Typography>
                {item?.clinic?.clinic_name || "Unnamed Clinic"}
              </Typography>
            </Space>
          ),

          children:
            (Array.isArray(item?.clinic?.websites) &&
              item?.clinic?.websites.length > 0 &&
              item?.clinic?.websites.map((web) => ({
                key: web?.id,
                label: (
                  <Space>
                    <Checkbox
                      checked={userSeletedWebsiteList.includes(
                        web.website_user_name
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          web?.website_user_name,
                          e.target.checked
                        )
                      }
                    ></Checkbox>
                    <Avatar
                      shape="square"
                      size={20}
                      src={
                        web?.website_url && isValidUrl(web?.website_url)
                          ? getLogoUrl(web?.website_url)
                          : ""
                      }
                    />
                    <Typography>
                      {web?.website_url || "Unnamed Website"}
                    </Typography>
                  </Space>
                ),
              }))) ||
            [],
        }))
      : []),
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
        setnotificationDetailsList(res?.data?.notifications);
        setunreadCount(res?.data?.unreadCount);
      })
      .catch((err) => {
        setloadingNotification(false);
        console.log(err);
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
    let temp = loginUserDetails?.userClinicRoles?.flatMap(
      (clinicRole) =>
        clinicRole?.clinic?.websites?.map(
          (website) => website?.website_user_name
        ) || []
    );
    let tempUserData = [];

    loginUserDetails?.userClinicRoles?.forEach((clinicRole) => {
      clinicRole?.clinic?.websites?.forEach((website) => {
        website?.userWebsiteRoles?.forEach((userRole) => {
          const userId = userRole?.user?.id;

          // Determine if the invitation is accepted for the current user
          const invitationAccepted = loginUserDetails?.userWebsiteRoles?.some(
            (item) => item?.user_id === userId && item?.invitation_accepted
          );

          // Create a user object with website details
          const userObject = {
            ...userRole?.user,
            invitation_accepted: invitationAccepted,
            websites: [
              {
                website_name: website?.website_user_name,
                role_name: userRole?.role?.role_name,
                website_id: website?.id,
                role_id: userRole?.role?.id,
                accesslevel: userRole?.accesslevel,
              },
            ],
          };

          // Check if the user already exists in `tempUserData`
          const existingUserIndex = tempUserData.findIndex(
            (user) => user?.id === userId
          );

          if (existingUserIndex >= 0) {
            // If user exists, update their websites array and invitation status
            const existingUser = tempUserData[existingUserIndex];
            existingUser.websites.push({
              website_name: website?.website_user_name,
              role_name: userRole?.role?.role_name,
              website_id: website?.id,
              role_id: userRole?.role?.id,
              accesslevel: userRole?.accesslevel,
            });

            // Update invitation_accepted to ensure it's up-to-date
            existingUser.invitation_accepted = invitationAccepted;
          } else {
            // If user doesn't exist, add the new user object
            tempUserData.push(userObject);
          }
        });
      });
    });

    setclinicUsers(tempUserData || []);
    setuserSeletedWebsiteList(temp || []);
  }, [loginUserDetails]);

  useEffect(() => {
    if (location.pathname === "/leads") {
      setsidebarkey("4");
      setdefaultValueSearch("leads");
    } else if (location.pathname === "/appointments") {
      setsidebarkey("2");
      setdefaultValueSearch("appointments");
    } else if (location.pathname === "/reports") {
      setsidebarkey("3");
      setdefaultValueSearch("reports");
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
            <Menu
              onClick={onClick}
              selectedKeys={[sidebarkey]}
              mode="inline"
              items={sidebaritems}
              style={{ padding: 10, background: "none", flexGrow: 1 }}
            />

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
                <Avatar
                  shape="square"
                  size={40}
                  src={
                    loginUserDetails?.userClinicRoles?.[0]?.clinic
                      ?.clinic_favicon
                  }
                />
                <Dropdown
                  menu={{
                    items: clinicdropitems,
                    onSelect: handleclinic,
                  }}
                >
                  <Space style={{ margin: 10 }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      {
                        loginUserDetails?.userClinicRoles?.[0]?.clinic
                          ?.clinic_name
                      }
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
                      className="custom-text1"
                      onClick={exitFullScreen}
                      style={{
                        fontSize: 22,
                        display: "flex",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <MdZoomOutMap
                      className="custom-text1"
                      onClick={enterFullScreen}
                      style={{
                        fontSize: 22,
                        display: "flex",
                        cursor: "pointer",
                      }}
                    />
                  )}
                  <Dropdown
                    overlay={profileMenu}
                    trigger={["click"]}
                    placement="bottomLeft"
                    visible={visibleprofileMenu}
                    onVisibleChange={handlesetvisibleprofileMenu}
                  >
                    <Space style={{ cursor: "pointer" }}>
                      {loginUserDetails?.profile_picture ? (
                        <Avatar
                          size={34}
                          src={loginUserDetails?.profile_picture}
                        />
                      ) : (
                        <Avatar
                          size={34}
                          style={{ background: loginUserDetails?.avatar_color }}
                        >
                          {getInitials(loginUserDetails?.dentist_full_name)}
                        </Avatar>
                      )}

                      <Typography
                        style={{
                          fontWeight: "bold",
                          maxWidth: 100,
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
                  </Dropdown>
                </Space>
              </Col>
            </Row>
          </Header>
          <Content>
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
                userSeletedWebsiteList={userSeletedWebsiteList}
                clinicUsers={clinicUsers}
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
                userSeletedWebsiteList={userSeletedWebsiteList}
              />
            ) : sidebarkey === "3" ? (
              <Reports
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
                setloginUserDetails={setloginUserDetails}
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
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default CustomLayout;
