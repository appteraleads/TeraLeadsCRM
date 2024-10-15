/* eslint-disable jsx-a11y/anchor-is-valid */
// src/App.js

import React, { useState } from "react";
import {
  Layout,
  theme,
  Menu,
  Table,
  Row,
  Col,
  Image,
  Space,
  Dropdown,
  Divider,
  Typography,
  Avatar,
  Button,
  Select,
  Tabs,
  Badge,
  Tag,
  Pagination,
  Checkbox,
  Card,
} from "antd";
import { PhoneOutlined, FileOutlined } from "@ant-design/icons";
import TeraleadsLogo from "../assets/logo/TeraleadsRemoveBg.png";
import { ReactComponent as Usersvg } from "../assets/IconSvg/solar_user-broken.svg";
import { ReactComponent as Dashboardsvg } from "../assets/IconSvg/icons8-home 1.svg";
import { ReactComponent as Appointmentssvg } from "../assets/IconSvg/basil_calendar-outline.svg";
import { ReactComponent as Reportsvg } from "../assets/IconSvg/hugeicons_analytics-up.svg";
import { ReactComponent as Callsvg } from "../assets/IconSvg/Vector.svg";
import { ReactComponent as Chatsvg } from "../assets/IconSvg/fluent_chat-16-regular.svg";
import { ReactComponent as Dentalsvg } from "../assets/IconSvg/Frame 2.svg";
import { ReactComponent as Moneysvg } from "../assets/IconSvg/Vector(1).svg";
import { ReactComponent as Tooth } from "../assets/IconSvg/mdi_tooth.svg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { FiCalendar } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { PiExportBold } from "react-icons/pi";
import { MdEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import { GoMail } from "react-icons/go";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { IoCallOutline } from "react-icons/io5";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const { Text } = Typography;
const { Header, Sider, Content } = Layout;

const kanbanData = {
  Leads: [
    {
      name: "Alexander Lopez",
      phone: "(702) 555-3456",
      email: "Alexander@gmail.com",
      info: "Other",
      type: "#Form_Lead",
    },
    {
      name: "Sophia Garcia",
      phone: "(214) 555-7890",
      email: "Alexander@gmail.com",
      info: "Other",
      type: "#Call_Lead",
    },
  ],
  Appointment: [
    {
      name: "Michael Johnson",
      phone: "(213) 555-2345",
      email: "JohnsonML@gmail.com",
      info: "All On 4 Implants - $15,995",
      type: "#Form_Lead",
    },
    {
      name: "Ethan Jones",
      phone: "(305) 555-4567",
      email: "Ethan@gmail.com",
      info: "All On 4 Implants Single Arch - $15,995",
      type: "#Form_Lead",
    },
  ],
  CantReach: [
    {
      name: "Michael Johnson",
      phone: "(213) 555-2345",
      email: "JohnsonML@gmail.com",
      info: "All On 4 Implants - $15,995",
      type: "#Form_Lead",
    },
    {
      name: "Ethan Jones",
      phone: "(305) 555-4567",
      email: "Ethan@gmail.com",
      info: "All On 4 Implants Single Arch - $15,995",
      type: "#Form_Lead",
    },
    {
      name: "Ethan Jones",
      phone: "(305) 555-4567",
      email: "Ethan@gmail.com",
      info: "All On 4 Implants Single Arch - $15,995",
      type: "#Form_Lead",
    },
  ],
  NoShow: [
    {
      name: "Michael Johnson",
      phone: "(213) 555-2345",
      email: "JohnsonML@gmail.com",
      info: "All On 4 Implants - $15,995",
      type: "#Form_Lead",
    },
    {
      name: "Ethan Jones",
      phone: "(305) 555-4567",
      email: "Ethan@gmail.com",
      info: "All On 4 Implants Single Arch - $15,995",
      type: "#Form_Lead",
    },
    {
      name: "Ethan Jones",
      phone: "(305) 555-4567",
      email: "Ethan@gmail.com",
      info: "All On 4 Implants Single Arch - $15,995",
      type: "#Form_Lead",
    },
  ],
  FakeLeads: [
    {
      name: "Michael Johnson",
      phone: "(213) 555-2345",
      email: "JohnsonML@gmail.com",
      info: "All On 4 Implants - $15,995",
      type: "#Form_Lead",
    },
    {
      name: "Ethan Jones",
      phone: "(305) 555-4567",
      email: "Ethan@gmail.com",
      info: "All On 4 Implants Single Arch - $15,995",
      type: "#Form_Lead",
    },
    {
      name: "Ethan Jones",
      phone: "(305) 555-4567",
      email: "Ethan@gmail.com",
      info: "All On 4 Implants Single Arch - $15,995",
      type: "#Form_Lead",
    },
  ],
};

const getInitials = (name) => {
  const nameParts = name.split(" ");
  const initials = nameParts.map((part) => part[0].toUpperCase()).join("");
  return initials;
};

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
      },
      {
        key: "2",
        icon: <Appointmentssvg style={{ width: 20 }} />,
        label: <span className="custom-text1">Appointments</span>,
      },
      {
        key: "3",
        icon: <Reportsvg style={{ width: 20 }} />,
        label: <span className="custom-text1">Reports</span>,
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
      },
      {
        key: "5",
        icon: <Callsvg style={{ width: 20 }} />,
        label: <span className="custom-text1">Calls</span>,
      },
      {
        key: "6",
        icon: <Chatsvg style={{ width: 20 }} />,
        label: <span className="custom-text1">Conversations</span>,
      },
    ],
  },
];

const commondropitems = [
  {
    key: "1",
    icon: <PiExportBold size={15} />,
    label: "Export",
  },
  {
    key: "2",
    icon: <MdEditNote size={15} />,
    label: "Edit",
  },
  {
    key: "3",
    icon: <MdDeleteOutline size={15} />,
    label: "Delete",
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

const pagedata = [
  {
    key: "1",
    name: "James Smith",
    phoneNumber: "(212) 555-1234",
    status: { text: "Appointment", color: "orange", icon: "📅" },
    assigned: "Adam Taimish",
    leadType: { type: "#Call_Lead", icon: <PhoneOutlined /> },
    financingScoreYN: "Y",
    treatment: "Other",
  },
  {
    key: "2",
    name: "Michael Johnson",
    phoneNumber: "(213) 555-2345",
    status: { text: "No Money", color: "yellow", icon: "💵" },
    assigned: "TeraAgent",
    leadType: { type: "#Form_Lead", icon: <FileOutlined /> },
    financingScoreYN: "N",
    treatment: "Other",
  },
  // Add more data entries...
];

const columns = [
  {
    title: <Checkbox />,
    width: 50,
    render: (text) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox />
      </div>
    ),
  },

  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 200,
    render: (text) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar style={{ backgroundColor: "#87d068" }}>
          {getInitials(text)}
        </Avatar>
        <span style={{ marginLeft: 10 }}>{text}</span>
      </div>
    ),
    sorter: {
      compare: (a, b) => a.name - b.name,
      multiple: 3,
    },
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: 180,
    sorter: {
      compare: (a, b) => a.phoneNumber - b.phoneNumber,
      multiple: 3,
    },
  },
  {
    title: "Lead Status",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (status) => (
      <Tag color={status.color}>
        {status.icon} {status.text}
      </Tag>
    ),
    sorter: {
      compare: (a, b) => a.status - b.status,
      multiple: 3,
    },
  },
  {
    title: "Assigned",
    dataIndex: "assigned",
    key: "assigned",
    width: 180,
    render: (assigned) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src={`https://randomuser.me/api/portraits/men/75.jpg`} />
        <span style={{ marginLeft: 10 }}>{assigned}</span>
      </div>
    ),
    sorter: {
      compare: (a, b) => a.assigned - b.assigned,
      multiple: 3,
    },
  },
  {
    title: "Treatment",
    dataIndex: "treatment",
    key: "treatment",
    width: 150,
    render: (treatment) => (
      <div style={{ display: "flex", alignItems: "center" }}>{treatment}</div>
    ),
    sorter: {
      compare: (a, b) => a.treatment - b.treatment,
      multiple: 3,
    },
  },

  {
    title: "Financing/Score	",
    dataIndex: "financingScoreYN",
    key: "financingScoreYN",
    width: 150,
    render: (financingScoreYN) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {financingScoreYN === "Y" ? "Yes" : "No"}
      </div>
    ),
    sorter: {
      compare: (a, b) => a.financingScoreYN - b.financingScoreYN,
      multiple: 3,
    },
  },
  {
    title: "Lead Type",
    dataIndex: "leadType",
    key: "leadType",
    width: 150,
    render: (leadType) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {leadType.icon}
        <span style={{ marginLeft: 10 }}>{leadType.type}</span>
      </div>
    ),
    sorter: {
      compare: (a, b) => a.financingScoreYN - b.financingScoreYN,
      multiple: 3,
    },
  },
  {
    title: "Lead Type",
    dataIndex: "leadType",
    key: "leadType",
    render: (leadType) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {leadType.icon}
        <span style={{ marginLeft: 10 }}>{leadType.type}</span>
      </div>
    ),
    sorter: {
      compare: (a, b) => a.financingScoreYN - b.financingScoreYN,
      multiple: 3,
    },
  },
  {
    title: "Lead Type",
    dataIndex: "leadType",
    key: "leadType",
    render: (leadType) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {leadType.icon}
        <span style={{ marginLeft: 10 }}>{leadType.type}</span>
      </div>
    ),
    sorter: {
      compare: (a, b) => a.financingScoreYN - b.financingScoreYN,
      multiple: 3,
    },
  },
];

// Draggable Card Component
const DraggableCard = ({ item, columnId, index, moveCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { ...item, columnId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card
        key={index}
        style={{
          marginBottom: "16px",
          width: 280,
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          minWidth: 280,
        }}
        className="kanbanCard"
      >
        <Card.Meta
          avatar={<Avatar> {getInitials(item.name[0])}</Avatar>}
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "grid" }}>
                <Text>{item.name}</Text>
                <Text className="custom-text1">{item.phone}</Text>
              </div>
              <div>
                <BsThreeDots style={{ cursor: "pointer" }} />
              </div>
            </div>
          }
        />
        <br />
        <Divider style={{ margin: 0, padding: 0 }} />
        {/* Row for email */}
        <Row
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col span={2}>
            <MdEmail
              className="custom-text1"
              style={{
                fontSize: 16,
                color: "#72779E",
                display: "flex",
              }}
            />
          </Col>
          <Col span={22}>
            <Text>{item.email}</Text>
          </Col>
        </Row>
        <Divider style={{ margin: 0, padding: 0 }} />
        {/* Row for info */}
        <Row
          align="middle"
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col span={2}>
            <Tooth
              style={{
                fontSize: 16,
                color: "#72779E",
                display: "flex",
              }}
            />
          </Col>
          <Col span={22}>
            <Text>{item.info}</Text>
          </Col>
        </Row>
        <Divider style={{ margin: 0, padding: 0 }} />
        {/* Row for type */}
        <Row
          align="middle"
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Col span={2}>
            <RiUserFill
              style={{
                fontSize: 16,
                color: "#72779E",
                display: "flex",
              }}
            />
          </Col>
          <Col span={22}>
            <Text type="secondary">{item.type}</Text>
          </Col>
        </Row>

        <Divider style={{ margin: 0, padding: 3 }} />
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IoCallOutline
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              height: 30,
              width: 30,
              padding: 5,
              display: "flex",
              justifyContent: "center",
            }}
          />

          <HiOutlineChatBubbleLeft
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              height: 30,
              width: 30,
              padding: 5,
              display: "flex",
              justifyContent: "center",
            }}
          />

          <GoMail
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              height: 30,
              padding: 5,
              width: 30,
              display: "flex",
              justifyContent: "center",
            }}
          />

          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              height: 30,
              width: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar size={"small"}> A</Avatar>
            <MdOutlineKeyboardArrowDown />
          </div>

          <FiEye
            size={12}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              height: 30,
              padding: 5,
              width: 30,
              display: "flex",
              justifyContent: "center",
            }}
          />
        </Row>
      </Card>
    </div>
  );
};

// Column Component
const Column = ({ columnId, kanbanData, setKanbanData }) => {
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (draggedItem) => {
      handleDrop(draggedItem, columnId);
    },
  });

  const handleDrop = (draggedItem, targetColumnId) => {
    const sourceColumnId = draggedItem.columnId;
    const sourceIndex = draggedItem.index;

    // Remove the dragged item from the source column
    const updatedSourceColumn = [...kanbanData[sourceColumnId]];
    const [movedItem] = updatedSourceColumn.splice(sourceIndex, 1);

    // Add the dragged item to the target column
    const updatedTargetColumn = [...kanbanData[targetColumnId], movedItem];

    // Update the state with new columns
    setKanbanData({
      ...kanbanData,
      [sourceColumnId]: updatedSourceColumn,
      [targetColumnId]: updatedTargetColumn,
    });
  };

  return (
    <div ref={drop} style={{ flex: "0 0 300px" }}>
      <div
        style={{
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
          borderRight: "1px solid #ddd",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Text strong style={{ fontSize: "16px", display: "block" }}>
              {columnId}
            </Text>
            <Text
              style={{
                color: "#a0a0a0",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Moneysvg style={{ width: 16, marginRight: 10 }} />
              <span className="custom-text1">$140,330.00</span>
            </Text>
          </Col>
          <Col>
            <Badge
              className="custom-badge-primary"
              count={kanbanData[columnId].length}
            />
          </Col>
        </Row>
      </div>
      <div
        style={{
          maxHeight: "600px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginBottom: "16px",
            width: "90%",
            borderRadius: "8px",
            background: "#F5F5FA",
          }}
        >
          <Button type="dashed" block style={{ background: "#F5F5FA" }}>
            <FaPlus />
          </Button>
        </div>
        {kanbanData[columnId].map((item, index) => (
          <DraggableCard
            key={index}
            item={item}
            columnId={columnId}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const Leads = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [currentPage, setCurrentPage] = useState(1);

  const [kanbanData, setKanbanData] = useState({
    Leads: [
      {
        name: "Alexander Lopez",
        phone: "(702) 555-3456",
        email: "Alexander@gmail.com",
        info: "Other",
        type: "#Form_Lead",
      },
      {
        name: "Sophia Garcia",
        phone: "(214) 555-7890",
        email: "Alexander@gmail.com",
        info: "Other",
        type: "#Call_Lead",
      },
    ],
    Appointment: [
      {
        name: "Michael Johnson",
        phone: "(213) 555-2345",
        email: "JohnsonML@gmail.com",
        info: "All On 4 Implants - $15,995",
        type: "#Form_Lead",
      },
      {
        name: "Ethan Jones",
        phone: "(305) 555-4567",
        email: "Ethan@gmail.com",
        info: "All On 4 Implants Single Arch - $15,995",
        type: "#Form_Lead",
      },
    ],
    CantReach: [
      {
        name: "Michael Johnson",
        phone: "(213) 555-2345",
        email: "JohnsonML@gmail.com",
        info: "All On 4 Implants - $15,995",
        type: "#Form_Lead",
      },
      {
        name: "Ethan Jones",
        phone: "(305) 555-4567",
        email: "Ethan@gmail.com",
        info: "All On 4 Implants Single Arch - $15,995",
        type: "#Form_Lead",
      },
    ],
    NoShow: [
      {
        name: "Michael Johnson",
        phone: "(213) 555-2345",
        email: "JohnsonML@gmail.com",
        info: "All On 4 Implants - $15,995",
        type: "#Form_Lead",
      },
      {
        name: "Ethan Jones",
        phone: "(305) 555-4567",
        email: "Ethan@gmail.com",
        info: "All On 4 Implants Single Arch - $15,995",
        type: "#Form_Lead",
      },
    ],
    FakeLeads: [
      {
        name: "Michael Johnson",
        phone: "(213) 555-2345",
        email: "JohnsonML@gmail.com",
        info: "All On 4 Implants - $15,995",
        type: "#Form_Lead",
      },
      {
        name: "Ethan Jones",
        phone: "(305) 555-4567",
        email: "Ethan@gmail.com",
        info: "All On 4 Implants Single Arch - $15,995",
        type: "#Form_Lead",
      },
    ],
  });

  const pageSize = 10;
  const onClick = (e) => {
    console.log("click ", e);
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <div className="pagination-link">
          <a
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <IoIosArrowBack /> Previous
          </a>
        </div>
      );
    }
    if (type === "next") {
      return (
        <div className="pagination-link">
          <a
            className="pagination-link"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeftƒ: "10px",
            }}
          >
            Next <IoIosArrowForward />
          </a>
        </div>
      );
    }
    return originalElement;
  };

  const initialItems = [
    {
      key: "1",
      label: (
        <span>
          All Leads <Badge className="custom-badge-primary" count={55} />
        </span>
      ),
      children: (
        <div>
          <Table
            columns={columns}
            dataSource={pagedata.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )}
            size="small"
            pagination={false}
            rowKey="key"
            scroll={{
              x: "max-content",
              y: "60vh",
            }}
          />

          {/* Custom pagination */}

          {/* Custom pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 10px",
              alignItems: "center",
            }}
          >
            <span className="custom-text1">
              Showing {(currentPage - 1) * pageSize + 1} -{" "}
              {Math.min(currentPage * pageSize, pagedata.length)} of{" "}
              {pagedata.length} leads
            </span>
            <div style={{ display: "flex", gap: "10px" }}>
              <Pagination size="small" total={500} itemRender={itemRender} />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Kanban",
      children: (
        <DndProvider backend={HTML5Backend}>
          <div  
            style={{
              background: "#F5F5FA",
              minHeight: "600px",
              overflowX: "auto",
            }}
          >
            <Row style={{ display: "flex", flexWrap: "nowrap" }}>
              {Object.keys(kanbanData).map((columnId) => (
                <Column
                  key={columnId}
                  columnId={columnId}
                  kanbanData={kanbanData}
                  setKanbanData={setKanbanData}
                />
              ))}
            </Row>
          </div>
        </DndProvider>
      ),
    },
    {
      key: "3",
      label: "Report",
      children: "Content of Tab Pane 3",
    },
  ];

  const handleclinic = ({ key }) => {
    console.log("handle clinic");
  };

  const onChange = (newActiveKey) => {
    setCurrentPage(1);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={230}
        style={{
          background: colorBgContainer,
          borderRight: "1px solid #E8EBEF",
        }}
      >
        <div style={{ padding: "10px", color: "white" }}>
          <Image style={{ margin: 10 }} width={100} src={TeraleadsLogo} />
        </div>
        <Divider style={{ margin: 0, background: "#E8EBEF" }} />
        <Menu
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={sidebaritems}
          style={{ padding: 10 }}
        />
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
            background: "#fff",
            borderBottom: "1px solid #E8EBEF",
          }}
        >
          <Row style={{ borderLeft: "1px solid #E8EBEF", height: 64 }}>
            <Col
              span={12}
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
        <Header
          style={{
            padding: 0,
            background: "#fff",
            borderBottom: "1px solid #E8EBEF",
            height: 80,
          }}
        >
          <Row style={{ borderLeft: "1px solid #E8EBEF" }}>
            <Col
              span={15}
              style={{
                display: "flex",
                alignItems: "center",
                padding: 10,
                height: "80px",
              }}
            >
              <Usersvg />
              <Space style={{ margin: 10 }}>
                <Typography style={{ fontWeight: "bold" }}>Leads</Typography>
              </Space>
              <Space style={{ margin: 10 }}>
                <div
                  style={{
                    width: "auto",
                    height: 70,
                    background: "#F3FBE8",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Typography className="primary-text-color">
                    Overview
                  </Typography>
                  <Typography>
                    36 Leads last 30 days <span> 3%</span>
                  </Typography>
                </div>
              </Space>
              <Space style={{ margin: 10 }}>
                <div
                  style={{
                    width: "auto",
                    height: 70,
                    background: "#E8F9FB",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Typography className="primary-text-color">
                    Appointments
                  </Typography>
                  <Typography>10 Booked</Typography>
                </div>
              </Space>
              <Space style={{ margin: 10 }}>
                <div
                  style={{
                    width: "auto",
                    height: 70,
                    background: "#FEF7EA",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Typography className="primary-text-color">
                    Closed Leads
                  </Typography>
                  <Typography>5 Closed </Typography>
                </div>
              </Space>
              <Space style={{ margin: 10 }}>
                <div
                  style={{
                    width: "auto",
                    height: 70,
                    background: "#F7F7F8",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Typography className="primary-text-color">
                    Revenue{" "}
                  </Typography>
                  <Typography>
                    $140,330.00 <span> 5%</span>
                  </Typography>
                </div>
              </Space>
            </Col>
            <Col
              span={9}
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
                <Space style={{ margin: 5 }}>
                  <Select
                    placeholder="Select"
                    suffixIcon={
                      <FiCalendar style={{ fontSize: 20, display: "flex" }} />
                    }
                    prefixIcon={
                      <FiCalendar style={{ fontSize: 20, display: "flex" }} />
                    }
                    style={{
                      width: "200px",
                    }}
                    options={[
                      {
                        value: "Custom",
                        label: "Custom",
                      },
                      {
                        value: "Today",
                        label: "Today",
                      },
                      {
                        value: "Last 7 days",
                        label: "Last 7 days",
                      },
                      {
                        value: "Last 14 days",
                        label: "Last 14 days",
                      },
                      {
                        value: "Last 30 days",
                        label: "Last 30 days",
                      },
                      {
                        value: "Last 3 months",
                        label: "Last 3 months",
                      },
                      {
                        value: "Last 6 months",
                        label: "Last 6 months",
                      },
                      {
                        value: "This year",
                        label: "This year",
                      },
                      {
                        value: "This month",
                        label: "This month",
                      },
                      {
                        value: "All time",
                        label: "All time",
                      },
                    ]}
                  />
                </Space>

                <Space style={{ margin: 5 }}>
                  <Dropdown
                    menu={{
                      items: commondropitems,
                      onSelect: handleclinic,
                    }}
                  >
                    <Button icon={<HiDotsVertical />} size={20} />
                  </Dropdown>
                </Space>
                <Space style={{ margin: 5 }}>
                  <Button
                    type="primary"
                    icon={<LuPlus style={{ color: "#fff" }} />}
                    size={20}
                  >
                    Create Lead{" "}
                  </Button>
                </Space>
              </Col>
            </Col>
          </Row>
        </Header>
        <Content>
          <Tabs defaultActiveKey="1" items={initialItems} onChange={onChange} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Leads;
