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
  FloatButton,
  Select,
} from "antd";
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import TeraleadsLogo from "../assets/logo/TeraleadsRemoveBg.png";
import { ReactComponent as Usersvg } from "../assets/IconSvg/solar_user-broken.svg";
import { ReactComponent as Dashboardsvg } from "../assets/IconSvg/icons8-home 1.svg";
import { ReactComponent as Appointmentssvg } from "../assets/IconSvg/basil_calendar-outline.svg";
import { ReactComponent as Reportsvg } from "../assets/IconSvg/hugeicons_analytics-up.svg";
import { ReactComponent as Callsvg } from "../assets/IconSvg/Vector.svg";
import { ReactComponent as Chatsvg } from "../assets/IconSvg/fluent_chat-16-regular.svg";
import { ReactComponent as Dentalsvg } from "../assets/IconSvg/Frame 2.svg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Conversations from "../Conversations";
import Leads from "../Leads";
const { Header, Sider } = Layout;
const { Option } = Select;
const CustomLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [contextHolder] = notification.useNotification();
  const [sidebarkey, setsidebarkey] = useState("1");
  const [defaultValueSearch, setdefaultValueSearch] = useState("");

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
      label: "Group",
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

  const clinicdropitems = [
    {
      label: "Clicic 1",
      key: "1",
    },
    {
      label: "Clicic 2",
      key: "2",
    },
    {
      label: "Clicic 3",
      key: "3",
    },
  ];

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

  useEffect(() => {
    if (location.pathname === "/leads") {
      setsidebarkey("4");
      setdefaultValueSearch("leads");
    } else if (location.pathname === "/conversations") {
      setsidebarkey("6");
      setdefaultValueSearch("conversations");
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
        >
          <div style={{ padding: "10px", color: "white" }}>
            <Image style={{ margin: 10 }} width={100} src={TeraleadsLogo} />
          </div>
          <Divider style={{ margin: 0, background: "#E8EBEF" }} />
          <Menu
            onClick={onClick}
            selectedKeys={[sidebarkey]}
            mode="inline"
            items={sidebaritems}
            style={{ padding: 10, background: "none" }}
          />
        </Sider>
        <Layout>
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
                    <Avatar>A</Avatar>
                    <Typography style={{ fontWeight: "bold" }}>
                      Adam Taimish
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
            <Leads />
          ) : sidebarkey === "6" ? (
            <Conversations />
          ) : (
            ""
          )}

          <FloatButton.Group
            trigger="click"
            className="float-button"

            style={{
              insetInlineEnd: 34,
          
            }}
            icon={<CustomerServiceOutlined />}
          >
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
          </FloatButton.Group>
        </Layout>
      </Layout>
    </>
  );
};

export default CustomLayout;
