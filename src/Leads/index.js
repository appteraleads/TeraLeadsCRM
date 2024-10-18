/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
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
  Modal,
  Form,
  Input,
  Switch,
  Tooltip,
  Spin,
  TimePicker,
  DatePicker,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
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
import { ReactComponent as Moneybagsvg } from "../assets/IconSvg/Vector (2).svg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { FiCalendar } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { PiExportBold } from "react-icons/pi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import { GoMail } from "react-icons/go";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { IoCallOutline } from "react-icons/io5";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { IoChevronBackSharp } from "react-icons/io5";
import {
  mixedColors,
  leadStatusColorAndTextList,
} from "../Common/ColorHexCodeList";
import { FaCalendar } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { RiDeleteBin5Line } from "react-icons/ri";
const { Text } = Typography;
const { Header, Sider, Content } = Layout;
const { Option } = Select;

const leadsStatusList = [
  {
    label: "All Leads",
    value: "AllLeads",
  },
  {
    label: "Appointment",
    value: "Appointment",
  },
  {
    label: "Reschedule Requested",
    value: "RescheduleRequested",
  },

  {
    label: "No Show",
    value: "NoShow",
  },
  {
    label: "No Money",
    value: "NoMoney",
  },
  {
    label: "Undecided",
    value: "Undecided",
  },
  {
    label: "Lost",
    value: "Lost",
  },
  {
    lable: "Closed",
    value: "Closed",
  },
  {
    label: "Live Agent",
    value: "Live Agent",
  },
];

const creditScoreList = [
  {
    label: "Below 549",
    value: "Below 549",
  },
  {
    label: "550-599",
    value: "550-599",
  },
  {
    label: "600-649",
    value: "600-649",
  },
  {
    label: "650-699",
    value: "650-699",
  },
  {
    label: "Above 700",
    value: "Above 700",
  },
];

const getInitials = (name) => {
  const nameParts = name?.split(" ");
  const initials = nameParts?.map((part) => part[0]?.toUpperCase())?.join("");

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
const kanbanCardMenu = [
  {
    label: <>View Details</>,
    icon: <IoEyeOutline style={{ fontSize: 16 }} />,
    key: "1",
  },
  {
    label: <>Edit</>,
    icon: <CiEdit style={{ fontSize: 16 }} />,
    key: "2",
  },
  {
    label: <>Duplicate</>,
    icon: <HiOutlineDocumentDuplicate style={{ fontSize: 16 }} />,
    key: "3",
  },
  {
    label: <>Delete</>,
    icon: <RiDeleteBin5Line style={{ fontSize: 16 }} />,
    key: "4",
  },
];

const LeadsListcolumns = [
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
    width: 200,
    render: (text) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          style={{
            backgroundColor: mixedColors[Math.floor(Math.random() * 14) + 1],
          }}
        >
          {getInitials(text?.FirstName + " " + text?.LastName)}
        </Avatar>
        <span style={{ marginLeft: 10 }}>
          {text?.FirstName + "" + text?.LastName}
        </span>
      </div>
    ),
    sorter: {
      compare: (a, b) => a?.name - b?.name,
      multiple: 3,
    },
  },
  {
    title: "Phone Number",
    dataIndex: "Phone",
    width: 180,
    sorter: {
      compare: (a, b) => a?.phoneNumber - b?.phoneNumber,
      multiple: 3,
    },
  },
  {
    title: "Email",
    dataIndex: "Email",
    width: 180,
    sorter: {
      compare: (a, b) => a?.email - b?.email,
      multiple: 3,
    },
  },
  {
    title: "Lead Status",

    width: 150,
    render: (text) => (
      <Tag
        style={{
          backgroundColor: leadStatusColorAndTextList.find(
            (item) => item.status === text?.LeadStatus
          )?.backgroud,
          color: leadStatusColorAndTextList.find(
            (item) => item.status === text?.LeadStatus
          )?.color,
          border: "none",
        }}
      >
        {
          leadStatusColorAndTextList.find(
            (item) => item.status === text?.LeadStatus
          )?.text
        }
      </Tag>
    ),
    sorter: {
      compare: (a, b) => a?.status - b?.status,
      multiple: 3,
    },
  },

  {
    title: "Treatment",
    dataIndex: "Treatment",
    width: 150,
    render: (treatment) => (
      <div style={{ display: "flex", alignItems: "center" }}>{treatment}</div>
    ),
    sorter: {
      compare: (a, b) => a?.treatment - b?.treatment,
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
      compare: (a, b) => a?.financingScoreYN - b?.financingScoreYN,
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
        {leadType?.icon}
        <span style={{ marginLeft: 10 }}>{leadType?.type}</span>
      </div>
    ),
    sorter: {
      compare: (a, b) => a?.leadType - b?.leadType,
      multiple: 3,
    },
  },
  {
    title: "Assigned",
    width: 180,
    render: (text) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {text?.AssignTo ? (
          <>
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            ></Avatar>
            <span style={{ marginLeft: 10 }}>{text?.AssignTo}</span>
          </>
        ) : (
          <Tag />
        )}
      </div>
    ),
    sorter: {
      compare: (a, b) => a?.assigned - b?.assigned,
      multiple: 3,
    },
  },
];

const Leads = () => {
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarkey, setsidebarkey] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFinancingEnabled, setIsFinancingEnabled] = useState(false);
  const [pageLoader, setpageLoader] = useState(false);
  const [tableLoader, settableLoader] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [pagedataList, setpagedataList] = useState([]);
  const [kanbanData, setKanbanData] = useState([]);
  const [dragCardItemId, setdragCardItemId] = useState("");
  const [isAppointmentModalVisible, setisAppointmentModalVisible] =
    useState(false);
  const [isCloseLeadsPaymentModalVisible, setisCloseLeadsPaymentModalVisible] =
    useState(false);
  const [totalRecords, settotalRecords] = useState(0);
  let leadStatusKanbanSelect = "";

  const handlePageChange = (page, limit) => {
    handleGetAllleads(page, limit);
  };
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };
 const [isDragId,setisDragId]=useState(false)
  // Draggable Card Component
  // const DraggableCard = ({ item, columnId, index, moveCard,activeTab }) => {
    
  //   const [{ isDragging }, drag] = useDrag({
  //     type: "ITEM",
  //     item: { ...item, columnId, index, id:item?.id},
  //     collect: (monitor) => ({
  //       isDragging: !!monitor.isDragging(),
  //     }),
  //   });

  //   return (
      
  //     <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
  //       {
  //         isDragging?<Card style={{marginBottom: "16px",
  //           width: 280,
  //           minHeight:200,
  //           backgroundColor: "transparent",
  //           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  //           borderRadius: "10px",
  //           minWidth: 280,border:'1px dashed #B8BEC7'}}/>
  //       :
  //       <Card
  //         key={index}
  //         style={{
  //           marginBottom: "16px",
  //           width: 280,
  //           backgroundColor: "#fff",
  //           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  //           borderRadius: "8px",
  //           minWidth: 280,
  //         }}
  //         className="kanbanCard"
  //       >
  //         <Card.Meta
  //           avatar={
  //             <Avatar
  //               style={{
  //                 backgroundColor:
  //                   mixedColors[Math.floor(Math.random() * 14) + 1],
  //               }}
  //             >
  //               {getInitials(item?.FirstName + " " + item?.LastName)}
  //             </Avatar>
  //           }
  //           title={
  //             <div
  //               style={{
  //                 display: "flex",
  //                 justifyContent: "space-between",
  //               }}
  //             >
  //               <div style={{ display: "grid" }}>
  //                 <Text>{item?.FirstName + " " + item?.LastName}</Text>
  //                 <Text className="custom-text1">{item.Phone}</Text>
  //               </div>
  //               <div>
  //                 <Dropdown
  //                   menu={{
  //                     items: kanbanCardMenu,
  //                     onSelect: handleclinic,
  //                   }}
  //                 >
  //                   <BsThreeDots style={{ cursor: "pointer" }} />
  //                 </Dropdown>
  //               </div>
  //             </div>
  //           }
  //         />
  //         <br />
  //         <Divider style={{ margin: 0, padding: 0 }} />
  //         {/* Row for email */}
  //         <Row
  //           style={{
  //             marginTop: "8px",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <Col span={2}>
  //             <MdEmail
  //               className="custom-text1"
  //               style={{
  //                 fontSize: 16,
  //                 color: "#72779E",
  //                 display: "flex",
  //               }}
  //             />
  //           </Col>
  //           <Col span={22}>
  //             <Text>{item?.Email}</Text>
  //           </Col>
  //         </Row>

  //         {item.Treatment ? (
  //           <>
  //             <Divider style={{ margin: 0, padding: 0 }} />

  //             <Row
  //               align="middle"
  //               style={{
  //                 marginTop: "8px",
  //                 display: "flex",
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //               }}
  //             >
  //               <Col span={2}>
  //                 <Tooth
  //                   style={{
  //                     fontSize: 16,
  //                     color: "#72779E",
  //                     display: "flex",
  //                   }}
  //                 />
  //               </Col>
  //               <Col span={22}>
  //                 <Text>{item.Treatment}</Text>
  //               </Col>
  //             </Row>
  //           </>
  //         ) : (
  //           <></>
  //         )}

  //         {item.LeadType ? (
  //           <>
  //             <Divider style={{ margin: 0, padding: 0 }} />
  //             <Row
  //               align="middle"
  //               style={{
  //                 marginTop: "8px",
  //                 display: "flex",
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //                 marginBottom: 10,
  //               }}
  //             >
  //               <Col span={2}>
  //                 <RiUserFill
  //                   style={{
  //                     fontSize: 16,
  //                     color: "#72779E",
  //                     display: "flex",
  //                   }}
  //                 />
  //               </Col>
  //               <Col span={22}>
  //                 <Text type="secondary">{item.LeadType}</Text>
  //               </Col>
  //             </Row>
  //           </>
  //         ) : (
  //           <></>
  //         )}

  //         {item?.AppointmentDate || item?.AppointmentTime ? (
  //           <>
  //             <Divider style={{ margin: 0, padding: 0 }} />
  //             <Row
  //               align="middle"
  //               style={{
  //                 marginTop: "8px",
  //                 display: "flex",
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //                 marginBottom: 10,
  //               }}
  //             >
  //               <Col span={2}>
  //                 <RiCalendarScheduleLine
  //                   style={{
  //                     fontSize: 16,
  //                     color: "#72779E",
  //                     display: "flex",
  //                   }}
  //                 />
  //               </Col>
  //               <Col span={22}>
  //                 <Text>
  //                   {item?.AppointmentDate + " " + item?.AppointmentTime}
  //                 </Text>
  //               </Col>
  //             </Row>
  //           </>
  //         ) : (
  //           <></>
  //         )}
  //         {item?.CloseAmount ? (
  //           <>
  //             <Divider style={{ margin: 0, padding: 0 }} />
  //             <Row
  //               align="middle"
  //               style={{
  //                 marginTop: "8px",
  //                 display: "flex",
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //                 marginBottom: 10,
  //               }}
  //             >
  //               <Col span={2}>
  //                 <Moneysvg
  //                   style={{
  //                     width: 16,
  //                     color: "#72779E",
  //                     display: "flex",
  //                   }}
  //                 />
  //               </Col>
  //               <Col span={22}>
  //                 <Text>${item?.CloseAmount}</Text>
  //               </Col>
  //             </Row>
  //           </>
  //         ) : (
  //           <></>
  //         )}

  //         <Divider style={{ margin: 0, padding: 3 }} />
  //         <Row
  //           style={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //           }}
  //         >
  //           <Tooltip placement="top" title={"Phone Call"}>
  //             <IoCallOutline
  //               style={{
  //                 border: "1px solid #ddd",
  //                 borderRadius: 8,
  //                 height: 30,
  //                 width: 30,
  //                 padding: 5,
  //                 display: "flex",
  //                 justifyContent: "center",
  //               }}
  //               className="custom-IoCallOutline"
  //             />
  //           </Tooltip>
  //           <Tooltip placement="top" title={"Send SMS"}>
  //             <HiOutlineChatBubbleLeft
  //               style={{
  //                 border: "1px solid #ddd",
  //                 borderRadius: 8,
  //                 height: 30,
  //                 width: 30,
  //                 padding: 5,
  //                 display: "flex",
  //                 justifyContent: "center",
  //               }}
  //               className="custom-HiOutlineChatBubbleLeft"
  //             />
  //           </Tooltip>
  //           <Tooltip placement="top" title={"Send Mail"}>
  //             <GoMail
  //               style={{
  //                 border: "1px solid #ddd",
  //                 borderRadius: 8,
  //                 height: 30,
  //                 padding: 5,
  //                 width: 30,
  //                 display: "flex",
  //                 justifyContent: "center",
  //               }}
  //               className="custom-GoMail"
  //             />
  //           </Tooltip>

  //           <div
  //             style={{
  //               border: "1px solid #ddd",
  //               borderRadius: 8,
  //               height: 30,
  //               width: 50,
  //               display: "flex",
  //               justifyContent: "center",
  //               alignItems: "center",
  //             }}
  //           >
  //             <Avatar size={"small"}> A</Avatar>
  //             <MdOutlineKeyboardArrowDown />
  //           </div>

  //           <FiEye
  //             size={12}
  //             style={{
  //               border: "1px solid #ddd",
  //               borderRadius: 8,
  //               height: 30,
  //               padding: 5,
  //               width: 30,
  //               display: "flex",
  //               justifyContent: "center",
  //             }}
  //           />
  //         </Row>
  //       </Card>
  // }
  //     </div>
  //   );
  // };

  // Column Component
  // const Column = ({ columnId, kanbanData, setKanbanData }) => {
  //   let activeTab=false
  //   const [{ canDrop, isOver }, drop] = useDrop({
  //     accept: "ITEM",
  //     collect: (monitor) => ({
  //       canDrop: monitor.canDrop(),
  //       isOver: monitor.isOver(),
  //     }),
  //     drop: (draggedItem) => {
      
        
  //       handleDrop(draggedItem, columnId);
  //     },
  //   });

  //   const handleDrop = (draggedItem, targetColumnId) => {
      
      
  //     const sourceColumnId = draggedItem.columnId;
  //     const sourceIndex = draggedItem.index;
  //     setdragCardItemId(draggedItem?.id);
  //     if (targetColumnId === "Appointment") {
  //       setisAppointmentModalVisible(true);
  //     } else if (targetColumnId === "Closed") {
  //       setisCloseLeadsPaymentModalVisible(true);
  //     } else {
  //       handleUpdateLeadsTypeForDragItem(draggedItem?.id, targetColumnId);
  //     }

  //     // Remove the dragged item from the source column
  //     const updatedSourceColumn = [...kanbanData[sourceColumnId]];
  //     const [movedItem] = updatedSourceColumn.splice(sourceIndex, 1);

  //     // Add the dragged item to the target column
  //     const updatedTargetColumn = [...kanbanData[targetColumnId], movedItem];

  //     // Update the state with new columns
  //     setKanbanData({
  //       ...kanbanData,
  //       [sourceColumnId]: updatedSourceColumn,
  //       [targetColumnId]: updatedTargetColumn,
  //     });
  //   };

  //   return (
  //     <div ref={drop} style={{ flex: "0 0 300px" }}>  
  //       <div
  //         style={{
  //           marginBottom: "10px",
  //           padding: "10px",
  //           backgroundColor: "#fff",
  //           borderBottom: "1px solid #ddd",
  //           borderRight: "1px solid #ddd",
  //         }}
  //       >
  //         <Row justify="space-between" align="middle">
  //           <Col>
  //             <Text strong style={{ fontSize: "16px", display: "block" }}>
  //               {columnId}
  //             </Text>
  //             <Text
  //               style={{
  //                 color: "#a0a0a0",
  //                 display: "flex",
  //                 alignItems: "center",
  //               }}
  //             >
  //               <Moneysvg style={{ width: 16, marginRight: 10 }} />
  //               <span className="custom-text1">$140,330.00</span>
  //             </Text>
  //           </Col>
  //           <Col>
  //             <Badge
  //               className="custom-badge-primary"
  //               count={kanbanData[columnId].length}
  //             />
  //           </Col>
  //         </Row>
  //       </div>
  //       <div
  //         style={{
  //           maxHeight: "600px",
  //           overflowY: "auto",
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItems: "center",
  //         }}
  //       >
  //         <div
  //           style={{
  //             marginBottom: "16px",
  //             width: "90%",
  //             borderRadius: "8px",
  //             background: "#F5F5FA",
  //           }}
  //         >
  //           <Button
  //             type="dashed"
  //             block
  //             style={{ background: "#F5F5FA" }}
  //             onClick={() => {
  //               setIsModalVisible(true);
  //               form.setFieldsValue({
  //                 LeadStatus: columnId, // Set the value dynamically
  //               });
  //             }}
  //           >
  //             <FaPlus />
  //           </Button>
  //         </div>
  //         {kanbanData[columnId].map((item, index) => (
  //           <>
  //           {isOver&&canDrop && index===0?<Card style={{marginBottom: "16px",
  //             width: 280,
  //             minHeight:200,
  //             backgroundColor: "transparent",
  //             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  //             borderRadius: "10px",
  //             minWidth: 280,border:'1px dashed #3900DB'}}/>:
  //           <DraggableCard
  //           activeTab={activeTab}
  //             className=""
  //             key={index}
  //             item={item}
  //             columnId={columnId}
  //             index={index}
  //           />}
  //           </>
             
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  const handleSubmitCloseleadsPayment = async (values) => {
    setbuttonLoader(true);
    const data = {
      id: dragCardItemId,
      CloseAmount: values?.CloseAmount,
      LeadStatus: "Closed",
    };

    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/update-leads`,
        data
      )
      .then((res) => {
        console.log(res);
        setisCloseLeadsPaymentModalVisible(false);
        setbuttonLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setbuttonLoader(false);
      });
  };

  const handleCloseLeadPaymentModal = () => {
    setisCloseLeadsPaymentModalVisible(false);
  };

  const handleSubmitApointmentDateAndTime = async (values) => {
    setbuttonLoader(true);
    const data = {
      id: dragCardItemId,
      AppointmentDate: dayjs(values?.AppointmentDate).format("MMM DD YYYY"),
      AppointmentTime: dayjs(values?.AppointmentTime).format("hh:mm A"), // Example: "02:30 pm"
      AppointmentNotes: values?.AppointmentNotes,
      LeadStatus: "Appointment",
    };

    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/update-leads`,
        data
      )
      .then((res) => {
        setisAppointmentModalVisible(false);
        setbuttonLoader(false);
      })
      .catch((err) => {
        setbuttonLoader(false);
        console.log(err);
      });
  };

  const handleCancelApointmentDateAndTime = () => {
    setisAppointmentModalVisible(false);
  };

  const handleUpdateLeadsTypeForDragItem = (id, type) => {
    const data = {
      id: id,
      LeadStatus: type,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/update-leads`,
        data
      )
      .then((res) => {
        console.log(res);
        setisAppointmentModalVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitCreateleads = async (values) => {
    setbuttonLoader(true);
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/create-leads`,
        values
      )
      .then((res) => {
        handleGetAllleads();
        handleGetAllleadsKanbanView();
        setIsModalVisible(false);
        form.resetFields();
        setbuttonLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setbuttonLoader(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinancingChange = (checked) => {
    setIsFinancingEnabled(checked);
  };

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
          All Leads
          <Badge className="custom-badge-primary" count={totalRecords} />
        </span>
      ),
      children: (
        <div>
          <Table
            columns={LeadsListcolumns}
            dataSource={pagedataList}
            loading={tableLoader}
            size="small"
            pagination={false}
            rowKey="key"
            scroll={{
              x: "max-content",
              y: "60vh",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 10px",
              alignItems: "center",
            }}
          >
            <span className="custom-text1">
              Showing 1-10 Leads {totalRecords}
            </span>
            <div style={{ display: "flex", gap: "10px" }}>
              <Pagination
                size="small"
                total={totalRecords}
                onChange={handlePageChange}
                showSizeChanger
                itemRender={itemRender}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <Typography
          onClick={() => {
            handleGetAllleadsKanbanView();
          }}
        >
          Kanban
        </Typography>
      ),
      children: (
        <></>
        // <DndProvider backend={HTML5Backend}>
        //   <div
        //     style={{
        //       background: "#F5F5FA",
        //       minHeight: "600px",
        //       overflowX: "auto",
        //     }}
        //   >
        //     {pageLoader ? (
        //       <div
        //         style={{
        //           display: "flex",
        //           justifyContent: "center",
        //           marginTop: 250,
        //         }}
        //       >
        //         <Spin tip="Loading" size="large" />
        //       </div>
        //     ) : (
        //       <>
        //         <Row style={{ display: "flex", flexWrap: "nowrap" }}>
        //           {Object.keys(kanbanData).map((columnId) => (
        //             <Column
        //               key={columnId}
        //               columnId={columnId}
        //               kanbanData={kanbanData}
        //               setKanbanData={setKanbanData}
        //             />
        //           ))}
        //         </Row>
        //       </>
        //     )}
        //   </div>
        // </DndProvider>
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

  const handleGetAllleads = async (page, limit) => {
    settableLoader(true);
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-leads`, {
        params: {
          page: page || 1,
          limit: limit || 10,
        },
      })
      .then((res) => {
        settotalRecords(res?.data?.totalRecords);
        setpagedataList(res?.data?.leadsListData);
        settableLoader(false);
      })
      .catch((err) => {
        console.log(err);
        settableLoader(false);
      });
  };

  const handleGetAllleadsKanbanView = async () => {
    setpageLoader(true);
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth//get-kanban-leads`
      )
      .then((res) => {
        setKanbanData(res?.data);
        setpageLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setpageLoader(false);
      });
  };

  useEffect(() => {
    if (location.pathname === "/leads") {
      setsidebarkey("4");
    }
  }, [location]);

  useEffect(() => {
    handleGetAllleads();
  }, []);

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
          selectedKeys={[sidebarkey]}
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
                        value: "This month",
                        label: "This month",
                      },
                      {
                        value: "This year",
                        label: "This year",
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
                    onClick={showModal}
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
          {/* Create leads  */}
          <Modal
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  onClick={handleCancel}
                  icon={<IoChevronBackSharp />}
                ></Button>
                <Typography style={{ marginLeft: 10 }}>Create Leads</Typography>
              </div>
            }
            visible={isModalVisible}
            footer={null}
            closable={false}
            width={800}
            className="custom-modal"
          >
            {console.log(leadStatusKanbanSelect)}
            <Form
              form={form}
              onFinish={handleSubmitCreateleads}
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <Row style={{ margin: "10px 0px 10px 0px" }}>
                <Col span={12}>
                  <Space>
                    <RiUserFill
                      style={{
                        fontSize: 16,
                        color: "#72779E",
                        display: "flex",
                      }}
                    />
                    <Typography>Details</Typography>
                  </Space>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label={
                      <>
                        First Name<span style={{ color: "red" }}>*</span>{" "}
                      </>
                    }
                    name="FirstName"
                    rules={[{ required: true, message: "Please enter name !" }]}
                  >
                    <Input placeholder="Enter Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={
                      <>
                        Last Name<span style={{ color: "red" }}>*</span>{" "}
                      </>
                    }
                    name="LastName"
                    rules={[{ required: true, message: "Please enter name !" }]}
                  >
                    <Input placeholder="Enter Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={
                      <>
                        Lead Status<span style={{ color: "red" }}>*</span>{" "}
                      </>
                    }
                    name="LeadStatus"
                    rules={[
                      {
                        required: true,
                        message: "Please select lead status !",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Lead Status"
                      suffixIcon={
                        <MdOutlineKeyboardArrowDown style={{ fontSize: 20 }} />
                      }
                      value={leadStatusKanbanSelect}
                      options={leadsStatusList}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={
                      <>
                        Email<span style={{ color: "red" }}>*</span>{" "}
                      </>
                    }
                    name="Email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter valid email !",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Valid Email" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={
                      <>
                        Phone Number<span style={{ color: "red" }}>*</span>{" "}
                      </>
                    }
                    name="Phone"
                    rules={[
                      {
                        required: true,
                        message: "Please enter phone number !",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Phone Number" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={
                      <>
                        Select Treatment<span style={{ color: "red" }}>*</span>{" "}
                      </>
                    }
                    name="Treatment"
                    rules={[
                      {
                        required: true,
                        message: "Please select treatment !",
                      },
                    ]}
                  >
                    <Input
                      name="Treatment"
                      placeholder="Please Enter Treatment"
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ margin: "10px 0px 10px 0px" }}>
                <Col span={12}>
                  <Space
                    style={{
                      display: "flex",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Moneybagsvg
                      style={{
                        fontSize: 16,
                        color: "#72779E",
                        display: "flex",
                      }}
                    />
                    <Typography>Financing</Typography>
                    <Switch
                      checked={isFinancingEnabled}
                      onChange={onFinancingChange}
                    />
                  </Space>
                </Col>
              </Row>

              {isFinancingEnabled && (
                <>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="Credit Score" name="FinanceScore">
                        <Select
                          placeholder="Select Credit Score"
                          suffixIcon={
                            <MdOutlineKeyboardArrowDown
                              style={{ fontSize: 20 }}
                            />
                          }
                          options={creditScoreList}
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Co-signer above 650" name="CoSigner">
                        <Select
                          placeholder="Select Yes/No"
                          suffixIcon={
                            <MdOutlineKeyboardArrowDown
                              style={{ fontSize: 20 }}
                            />
                          }
                        >
                          <Option value="yes">Yes</Option>
                          <Option value="no">No</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item label="Home Owner" name="HomeOwner">
                        <Select
                          placeholder="Select Home Owner Status"
                          suffixIcon={
                            <MdOutlineKeyboardArrowDown
                              style={{ fontSize: 20 }}
                            />
                          }
                        >
                          <Option value="yes">Yes</Option>
                          <Option value="no">No</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Annual Salary" name="AnnualSalary">
                        <Input placeholder="Enter Lead Annual Salary" />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              <Row justify="end">
                <Button onClick={handleCancel} style={{ marginRight: 10 }}>
                  Cancel
                </Button>
                <Form.Item>
                  <Button
                    className="custom-primary-button"
                    htmlType="submit"
                    block
                    loading={buttonLoader}
                  >
                    Create Lead
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Modal>

          {/* add Appointment date and time  */}
          <Modal
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  onClick={handleCancelApointmentDateAndTime}
                  icon={<IoChevronBackSharp />}
                ></Button>
                <Typography style={{ marginLeft: 10 }}>
                  Appointment Details
                </Typography>
              </div>
            }
            visible={isAppointmentModalVisible}
            footer={null}
            closable={false}
            width={600}
            className="custom-modal"
          >
            <Form
              form={form}
              onFinish={handleSubmitApointmentDateAndTime}
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <Row style={{ margin: "10px 0px 10px 0px" }}>
                <Col span={12}>
                  <Space>
                    <FaCalendar
                      style={{
                        fontSize: 16,
                        color: "#72779E",
                        display: "flex",
                      }}
                    />
                    <Typography>Select Date And Time</Typography>
                  </Space>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label={
                      <>
                        Date<span style={{ color: "red" }}>*</span>{" "}
                      </>
                    }
                    name="AppointmentDate"
                    rules={[
                      { required: true, message: "Please select date !" },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={
                      <>
                        Time<span style={{ color: "red" }}>*</span>{" "}
                      </>
                    }
                    name="AppointmentTime"
                    rules={[
                      { required: true, message: "Please select time !" },
                    ]}
                  >
                    <TimePicker
                      use12Hours
                      format="h:mm a"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label={<>Notes</>} name="AppointmentNotes">
                    <Input.TextArea
                      placeholder="Please enter notes "
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="end">
                <Button
                  onClick={handleCancelApointmentDateAndTime}
                  style={{ marginRight: 10 }}
                >
                  Cancel
                </Button>
                <Form.Item>
                  <Button
                    className="custom-primary-button"
                    htmlType="submit"
                    block
                    loading={buttonLoader}
                  >
                    Create Appointment
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Modal>

          {/* add Close lead payment   */}
          <Modal
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  onClick={handleCloseLeadPaymentModal}
                  icon={<IoChevronBackSharp />}
                ></Button>
                <Typography style={{ marginLeft: 10 }}>
                  Record Payment
                </Typography>
              </div>
            }
            visible={isCloseLeadsPaymentModalVisible}
            footer={null}
            closable={false}
            width={600}
            className="custom-modal"
          >
            <Form
              form={form}
              onFinish={handleSubmitCloseleadsPayment}
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <Row style={{ margin: "10px 0px 10px 0px" }}>
                <Col span={12}>
                  <Space>
                    <Moneysvg
                      style={{
                        fontSize: 16,
                        color: "#72779E",
                        display: "flex",
                      }}
                    />
                    <Typography>Payment Collected</Typography>
                  </Space>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    label={
                      <>
                        Amount<span style={{ color: "red" }}>*</span>{" "}
                      </>
                    }
                    name="CloseAmount"
                    rules={[
                      {
                        required: true,
                        message: "Please enter payment collected !",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="end">
                <Button
                  onClick={handleCloseLeadPaymentModal}
                  style={{ marginRight: 10 }}
                >
                  Cancel
                </Button>
                <Form.Item>
                  <Button
                    className="custom-primary-button"
                    htmlType="submit"
                    block
                    loading={buttonLoader}
                  >
                    Close Lead
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Leads;
