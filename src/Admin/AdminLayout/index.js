import React, { useRef, useState } from "react";
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
  notification,
  List,
  Badge,
} from "antd";
import { IoTime } from "react-icons/io5";
import TeraleadsLogo from "../../assets/logo/TeraleadsRemoveBg.png";
import { ReactComponent as Usersvg } from "../../assets/IconSvg/solar_user-broken.svg";
import { ReactComponent as Appointmentssvg } from "../../assets/IconSvg/basil_calendar-outline.svg";
import { ReactComponent as Chatsvg } from "../../assets/IconSvg/fluent_chat-16-regular.svg";
import { ReactComponent as LogoCircle } from "../../assets/logo/teracrmlogoCircle.svg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { IoIosNotificationsOutline } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import {
  AdminSVG,
  BillingPlanSVG,
  ClinicsSVG,
  SettingsSVG,
  TeamSVG,
} from "../../Common/SettingSidebarIconsSvg";
import axios from "axios";
import { getInitials } from "../../Common/ReturnColumnValue";
import { MdOutlineZoomInMap } from "react-icons/md";
import dayjs from "dayjs";
import { Content } from "antd/es/layout/layout";
import Clinics from "../Clinics";
import { LuLogOut } from "react-icons/lu";

const { Header, Sider } = Layout;

const AdminLayout = ({ loginUserDetails }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [sidebarkey, setsidebarkey] = useState("1");
  const containerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loadingNotification, setloadingNotification] = useState(false);
  const [isNotificationDropdownVisible, setisNotificationDropdownVisible] =
    useState(false);
  const [notificationDetailsList, setnotificationDetailsList] = useState([]);
  const [unreadCount, setunreadCount] = useState(0);
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
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "180px",
              }}
            >
              {loginUserDetails?.email}
            </Typography>
          </div>
        </Space>
        <Divider style={{ margin: 0 }} />
        <Space
          style={{ padding: 10, cursor: "pointer" }}
          onClick={() => {
            // navigate("/settings");
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
      key: "Admin",
      label: "Admin",
      type: "group",
      children: [
        {
          key: "1",
          icon: (
            <div style={{ display: "flex", width: 20 }}>
              <ClinicsSVG color={sidebarkey === "1" ? "#3900DB" : "#72779E"} />
            </div>
          ),
          label: <span className="custom-text1">Clinics</span>,
          onClick: () => navigate("/admin/clinics"),
        },
        {
          key: "2",
          icon: (
            <div style={{ display: "flex", width: 20 }}>
              <TeamSVG color={sidebarkey === "2" ? "#3900DB" : "#72779E"} />
            </div>
          ),
          label: <span className="custom-text1">Teams</span>,
          onClick: () => navigate("/admin/teams"),
        },
        {
          key: "3",
          icon: (
            <div style={{ display: "flex", width: 20 }}>
              <BillingPlanSVG
                color={sidebarkey === "3" ? "#3900DB" : "#72779E"}
              />
            </div>
          ),
          label: <span className="custom-text1">Billing</span>,
          onClick: () => navigate("/admin/billing"),
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
    onClick: () => navigate("/admin/settings"),
  };

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      duration: 3,
    });
  };

  const handleClickSidebarMenu = (e) => {
    setsidebarkey(e?.key);
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
              onClick={(e) => {
                handleClickSidebarMenu(e);
              }}
              selectedKeys={[sidebarkey]}
              mode="inline"
              items={sidebaritems}
              style={{ padding: 10, background: "none", flexGrow: 1 }}
            />

            {/* Settings item positioned at the bottom */}
            <Menu
              mode="inline"
              onClick={(e) => {
                handleClickSidebarMenu(e);
              }}
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
                span={12}
                style={{ display: "flex", alignItems: "center", padding: 10 }}
              >
                <AdminSVG />
                <Typography style={{ fontWeight: 600, marginLeft: 5 }}>
                  System Admin
                </Typography>
              </Col>

              <Col
                span={12}
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
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    placement="bottomCenter"
                    visible={isNotificationDropdownVisible}
                    onVisibleChange={handlesetvisibleNotificationDropdown}
                  >
                    {unreadCount <= 0 ? (
                      <IoIosNotificationsOutline
                        className="custom-text1"
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
                            className="custom-text1"
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
          <Content style={{ padding: 20 }}>
            {sidebarkey === "1" ? (
              <Clinics
                loginUserDetails={loginUserDetails}
                openNotificationWithIcon={openNotificationWithIcon}
              />
            ) : (
              ""
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
