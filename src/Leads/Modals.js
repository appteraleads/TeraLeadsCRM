import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Input,
  Timeline,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  Tag,
  Typography,
  Form,
  DatePicker,
  TimePicker,
} from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { BsThreeDots } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { IoMdMic } from "react-icons/io";
import { IoChevronBackSharp, IoEyeOutline } from "react-icons/io5";
import { MdOutlineError, MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  RiDeleteBin5Line,
  RiUserFill,
  RiVerifiedBadgeFill,
} from "react-icons/ri";
import { TiUser } from "react-icons/ti";
import { leadStatusColorAndTextList } from "../Common/ColorHexCodeList";
import { FiEdit } from "react-icons/fi";
import {
  AudioOutlined,
  CalendarOutlined,
  FileAddOutlined,
  FileTextOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { ReactComponent as Moneysvg } from "../assets/IconSvg/Vector(1).svg";
import { ReactComponent as Moneybagsvg } from "../assets/IconSvg/Vector (2).svg";
import axios from "axios";
import dayjs from "dayjs";
import Notes from "./Notes";
import { FaCalendar } from "react-icons/fa";
import { useEffect, useState } from "react";
const { Text, Title } = Typography;
const { Option } = Select;

const engagementData = [
  {
    icon: (
      <AudioOutlined
        style={{
          fontSize: 20,
          border: "1px solid #E9EBED",
          borderRadius: "50%",
          padding: 8,
        }}
      />
    ),
    title: "Michael received a call from the AI Assistant.",
    datetime: <span className="custom-text">Oct 10, 2024 - 3:00 PM</span>,
    actions: (
      <Space>
        <Button icon={<AudioOutlined />}>Play Call Record</Button>
        <Button icon={<FileTextOutlined />}>View Transcription</Button>
      </Space>
    ),
  },
  {
    icon: (
      <MailOutlined
        style={{
          fontSize: 20,
          border: "1px solid #E9EBED",
          borderRadius: "50%",
          padding: 8,
        }}
      />
    ),
    title: "Michael received a follow-up email.",
    datetime: <span className="custom-text">Oct 11, 2024 - 9:00 AM</span>,
  },
  {
    icon: (
      <PhoneOutlined
        style={{
          fontSize: 20,
          border: "1px solid #E9EBED",
          borderRadius: "50%",
          padding: 8,
        }}
      />
    ),
    title: (
      <span>
        Michael had a phone call with{" "}
        <Text className="custom-text-link">@Adam Taimish</Text>.
      </span>
    ),
    datetime: <span className="custom-text">Oct 12, 2024 - 4:15 PM</span>,
  },
  {
    icon: (
      <CalendarOutlined
        style={{
          fontSize: 20,
          border: "1px solid #E9EBED",
          borderRadius: "50%",
          padding: 8,
        }}
      />
    ),
    title: "Michael scheduled a consultation for Oct 18, 2024 - 1:00 PM.",
    datetime: <span className="custom-text">Oct 13, 2024 - 1:30 PM</span>,
    actions: <Button icon={<CalendarOutlined />}>Appointment Details</Button>,
  },
  {
    icon: (
      <CalendarOutlined
        style={{
          fontSize: 20,
          border: "1px solid #E9EBED",
          borderRadius: "50%",
          padding: 8,
        }}
      />
    ),
    title: (
      <span>
        Michael attended the consultation appointment with
        <Text className="custom-text-link">@Dr Raouf</Text>.
      </span>
    ),
    datetime: <span className="custom-text">Oct 18, 2024 - 1:00 PM</span>,
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
    value: "LiveAgent",
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

export const ViewUpdateLeadDetails = ({
  handleGetAllleads,
  handleGetAllleadsKanbanView,
  openNotificationWithIcon,
  selectedItemDetails,
  setisLeadsDetailsModalVisible,
  setisViewLeadModalEditable,
  buttonLoader,
  isLeadsDetailsModalVisible,
  isViewLeadModalEditable,
  setbuttonLoader,
  setisAppointmentModalVisible
}) => {
  const [ViewUpdateLeadform] = Form.useForm();
  const [treatmentOptions, settreatmentOptions] = useState([]);
  const [selectedOption, setselectedOption] = useState([]);

  const handleSubmitUpdateleads = async (values) => {
    values.id = selectedItemDetails?.id;
    console.log(values);
    setbuttonLoader(true);
    const token = localStorage.getItem("authToken");
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/update-leads`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      )
      .then((res) => {
        handleGetAllleads();
        handleGetAllleadsKanbanView();
        ViewUpdateLeadform.resetFields();
        setbuttonLoader(false);
        setisLeadsDetailsModalVisible(false);
        setisViewLeadModalEditable(false);
        openNotificationWithIcon(
          "success",
          "Lead",
          "Lead Updated Successfully !"
        );
      })
      .catch((err) => {
        console.log(err);
        ViewUpdateLeadform.resetFields();

        openNotificationWithIcon(
          "error",
          "Lead",
          err?.response?.data?.message || err?.message
        );
      });
    setbuttonLoader(false);
  };

  const getTreatmentUrlList = async () => {
    const token = localStorage.getItem("authToken");
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-treatmentOptions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        settreatmentOptions(res?.data?.treatmentOptionList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTreatmentUrlList();
  }, []);

  return (
    <Modal
      style={{ top: 10 }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={() => {
                setisLeadsDetailsModalVisible(false);
                setisViewLeadModalEditable(false);
              }}
              icon={<IoChevronBackSharp />}
            ></Button>
            <Typography style={{ marginLeft: 10 }}>Lead Details</Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IoMdMic style={{ fontSize: 16 }} />
            <Typography>AI Agent</Typography>
            <Switch defaultChecked style={{ marginLeft: 10 }} />
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                height: 30,
                width: 50,
                display: "flex",
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar size={"small"}> A</Avatar>
              <MdOutlineKeyboardArrowDown />
            </div>
            <div style={{ marginLeft: 10 }}>
              <Button
              style={{background:'none'}}
                onClick={() => {
                  setisViewLeadModalEditable(true);
                }}
                icon={<FiEdit />}
              ></Button>
            </div>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                height: 30,
                width: 30,
                display: "flex",
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Dropdown
                menu={{
                  items: kanbanCardMenu,
                  // onSelect: handleclinic,
                }}
              >
                <BsThreeDots
                  style={{
                    cursor: "pointer",
                  }}
                />
              </Dropdown>
            </div>
          </div>
        </div>
      }
      open={isLeadsDetailsModalVisible}
      closable={false}
      width={900}
      className="custom-modal-lead-details "
      footer={[
        isViewLeadModalEditable ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Typography style={{ marginLeft: 10, display: "flex" }}>
                <MdOutlineError
                  style={{
                    fontSize: 20,
                    color: "#72779E",
                    display: "flex",
                  }}
                />
                You have unsaved changes
              </Typography>
            </div>
            <div>
              <Button
                onClick={() => {
                  setisLeadsDetailsModalVisible(false);
                  setisViewLeadModalEditable(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                loading={buttonLoader}
                onClick={() => {
                  ViewUpdateLeadform.submit();
                }}
                style={{ marginLeft: 10 }}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          ""
        ),
      ]}
    >
      {/* Modal Header */}

      <Row align="middle" gutter={16} style={{ marginBottom: 10, margin: 15 }}>
        {/* Avatar Column */}
        <Col>
          <Avatar size={45} style={{ backgroundColor: "#650ACC" }}>
            {getInitials(
              selectedItemDetails?.first_name +
                " " +
                selectedItemDetails?.last_name
            )}
          </Avatar>
        </Col>

        {/* Details Column */}
        <Col span={22}>
          <Row>
            <Col span={24}>
              {/* Lead ID */}
              <Text type="secondary" style={{ fontSize: "14px" }}>
                #{selectedItemDetails?.id || "-"}
              </Text>
            </Col>
            <Col span={24}>
              {/* Lead Name and Verified Tag */}
              <Title level={4} style={{ marginTop: 0 }}>
                {selectedItemDetails?.first_name || "-"}{" "}
                {selectedItemDetails?.last_name}{" "}
                <Tag
                  style={{
                    color: "#12B80F",
                    display: "inline-flex",
                    background: "none",
                    border: "none",
                  }}
                >
                  <RiVerifiedBadgeFill
                    style={{
                      color: "#12B80F",
                      fontSize: 14,
                      margin: "3px 3px",
                    }}
                  />
                  Verified
                </Tag>
              </Title>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Action Buttons */}
      <div className="lead-modal-actions" style={{ margin: 15 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space size="middle">
              <Button icon={<PhoneOutlined />}>Call</Button>
              <Button icon={<MessageOutlined />}>SMS</Button>
              <Button icon={<MailOutlined />}>Email</Button>
              <Button icon={<FileAddOutlined />}>Add Note</Button>
            </Space>
          </Col>
          <Col>
            <Button type="primary" className="book-appointment-btn" onClick={()=>{setisAppointmentModalVisible(true)}}>
              Book Appointment
            </Button>
          </Col>
        </Row>
      </div>

      {/* Tabs */}
      <Tabs
        defaultActiveKey="1"
        className="lead-modal-tabs"
        style={{ marginRight: 15 }}
      >
        <TabPane tab="Overview" key="1">
          <div className="overview-section">
            <Row
              gutter={[16, 16]}
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                margin: 10,
                padding: 15,
                border: "1px solid #E8EBEF",
                borderRadius: 10,
              }}
            >
              <Col>
                <Text className="custom-text1">Response Time</Text>
                <br />
                00:02:32
                <span className="text-success">+5% Faster</span>
              </Col>
              <Divider type="vertical" style={{ margin: 0, fontSize: 50 }} />
              <Col>
                <Text className="custom-text1">Treatment Value</Text>
                <br />
                {selectedItemDetails?.treatment_value
                  ? "$" + selectedItemDetails?.treatment_value
                  : 0}
              </Col>
              <Divider type="vertical" style={{ margin: 0, fontSize: 50 }} />
              <Col>
                <Text className="custom-text1">Status</Text>
                <br />
                {selectedItemDetails?.lead_status
                  ? leadStatusColorAndTextList.find(
                      (item) => item.status === selectedItemDetails?.lead_status
                    )?.text
                  : leadStatusColorAndTextList.find(
                      (item) => item.status === "AllLeads"
                    )?.text}
              </Col>
              <Divider type="vertical" style={{ margin: 0, fontSize: 50 }} />
              <Col>
                <Text className="custom-text1">Appointment</Text>
                <br />
                {selectedItemDetails?.appointment_status
                  ? selectedItemDetails?.appointment_status
                  : "Not Booked"}
              </Col>
            </Row>
            <div
              gutter={[16, 16]}
              style={{
                padding: 10,
                height: "40vh",
                overflow: "auto",
              }}
            >
              <Space
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                  marginTop: 10,
                }}
              >
                <TiUser
                  style={{
                    fontSize: 20,
                    color: "#72779E",
                    display: "flex",
                  }}
                />
                <Typography
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  Contact
                </Typography>
              </Space>

              <Form
                form={ViewUpdateLeadform}
                onFinish={handleSubmitUpdateleads}
                layout="vertical"
              >
                <Divider style={{ margin: "10px 0px 10px 0px" }}></Divider>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">Name</Typography>
                      {isViewLeadModalEditable ? (
                        <>
                          <Form.Item name="first_name">
                            <Input
                              defaultValue={selectedItemDetails?.first_name}
                              placeholder="Enter first name"
                            />
                          </Form.Item>
                          <Form.Item name="last_name">
                            <Input
                              defaultValue={selectedItemDetails?.last_name}
                              placeholder="Enter last name"
                            />
                          </Form.Item>
                        </>
                      ) : (
                        <Typography className="isViewLeadEditableText">
                          <div className="editableTextContainer">
                            {selectedItemDetails?.first_name || "-"}{" "}
                            {selectedItemDetails?.last_name}
                          </div>
                        </Typography>
                      )}
                    </div>
                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>

                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">
                        Lead Status
                      </Typography>
                      {isViewLeadModalEditable ? (
                        <>
                          <Form.Item name="lead_status">
                            <Select
                              defaultValue={selectedItemDetails?.lead_status}
                              style={{ width: "220px" }}
                              placeholder="Select Lead Status"
                              suffixIcon={
                                <MdOutlineKeyboardArrowDown
                                  style={{ fontSize: 20 }}
                                />
                              }
                              options={leadsStatusList}
                            ></Select>
                          </Form.Item>
                        </>
                      ) : (
                        <Typography className="isViewLeadEditableText">
                          <div className="editableTextContainer">
                            <Tag
                              style={{
                                backgroundColor:
                                  leadStatusColorAndTextList.find(
                                    (item) =>
                                      item.status ===
                                      selectedItemDetails?.lead_status
                                  )?.backgroud,
                                color: leadStatusColorAndTextList.find(
                                  (item) =>
                                    item.status ===
                                    selectedItemDetails?.lead_status
                                )?.color,
                                border: "none",
                              }}
                            >
                              {selectedItemDetails?.lead_status
                                ? leadStatusColorAndTextList.find(
                                    (item) =>
                                      item.status ===
                                      selectedItemDetails?.lead_status
                                  )?.text
                                : leadStatusColorAndTextList.find(
                                    (item) => item.status === "AllLeads"
                                  )?.text}
                            </Tag>
                          </div>
                        </Typography>
                      )}
                    </div>

                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">Email</Typography>
                      {isViewLeadModalEditable ? (
                        <>
                          <Form.Item name="email">
                            <Input
                              defaultValue={selectedItemDetails?.email}
                              style={{ width: "220px" }}
                              type="email"
                              placeholder="Enter Valid Email"
                            />
                          </Form.Item>
                        </>
                      ) : (
                        <Typography className="isViewLeadEditableText">
                          <div className="editableTextContainer">
                            <Typography className="custom-text-link">
                              {selectedItemDetails?.email || "-"}
                              {selectedItemDetails?.email_verify ===
                              "unverified" ? (
                                <></>
                              ) : (
                                <RiVerifiedBadgeFill
                                  style={{
                                    color: "#12B80F",
                                    fontSize: 14,
                                    marginLeft: 5,
                                  }}
                                />
                              )}
                            </Typography>
                          </div>
                        </Typography>
                      )}
                    </div>
                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">Lable</Typography>
                      {isViewLeadModalEditable ? (
                        <>
                          <Form.Item name="email">
                            <Input
                              style={{ width: "220px" }}
                              type="Lable"
                              placeholder="Enter Lable "
                            />
                          </Form.Item>
                        </>
                      ) : (
                        <Typography className="isViewLeadEditableText">
                          <div className="editableTextContainer">
                            <Typography className="custom-text-link">
                              -
                            </Typography>
                          </div>
                        </Typography>
                      )}
                    </div>
                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">
                        Phone Number
                      </Typography>
                      {isViewLeadModalEditable ? (
                        <>
                          <Form.Item name="phone_number">
                            <Input
                              defaultValue={selectedItemDetails?.phone_number}
                              style={{ width: "220px" }}
                              placeholder="Enter Phone Number"
                            />
                          </Form.Item>
                        </>
                      ) : (
                        <Typography className="isViewLeadEditableText custom-text-link">
                          {selectedItemDetails?.phone_number}
                          {selectedItemDetails?.phone_verify ===
                          "unverified" ? (
                            <></>
                          ) : (
                            <RiVerifiedBadgeFill
                              style={{
                                color: "#12B80F",
                                fontSize: 14,
                                marginLeft: 5,
                              }}
                            />
                          )}
                        </Typography>
                      )}
                    </div>
                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">
                        Lead Source
                      </Typography>
                      {isViewLeadModalEditable ? (
                        <>
                          <Form.Item name="LeadSource">
                            <Input
                              defaultValue={selectedItemDetails?.LeadSource}
                              style={{ width: "220px" }}
                              placeholder="Please Enter Lead Source"
                            />
                          </Form.Item>
                        </>
                      ) : (
                        <Typography className="isViewLeadEditableText">
                          <div className="editableTextContainer">
                            {selectedItemDetails?.LeadSource || "-"}
                          </div>
                        </Typography>
                      )}
                    </div>
                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">
                        How to Contact
                      </Typography>
                      <Typography>Phone Number</Typography>
                    </div>
                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">
                        Lead Type
                      </Typography>
                      <Typography>
                        {selectedItemDetails?.LeadType ? "#" : ""}
                        {selectedItemDetails?.LeadType || "-"}
                      </Typography>
                    </div>
                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>

                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">Clinic</Typography>
                      {isViewLeadModalEditable ? (
                        <>
                          <Form.Item name="clinic_name">
                            <Select
                              showSearch
                              style={{ width: "220px" }}
                              placeholder="Tags Mode"
                              onSelect={(e, data) => {
                                setselectedOption(data?.treatment_options);
                              }}
                              options={treatmentOptions?.map((item) => {
                                return {
                                  label: item?.url,
                                  value: item?.url,
                                  ...item,
                                };
                              })}
                            />
                          </Form.Item>
                        </>
                      ) : (
                        <Typography className="isViewLeadEditableText">
                          <div className="editableTextContainer">
                            {selectedItemDetails?.LeadSource || "-"}
                          </div>
                        </Typography>
                      )}
                    </div>
                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">
                        Treatment
                      </Typography>
                      {isViewLeadModalEditable ? (
                        <>
                          <Form.Item name="treatment">
                            <Select
                              showSearch
                              style={{ width: "220px" }}
                              placeholder="Tags Mode"
                              onSelect={(e, data) => {
                                setselectedOption(data?.treatment_options);
                              }}
                              options={selectedOption?.map((item) => {
                                return {
                                  label: item,
                                  value: item,
                                };
                              })}
                            />
                          </Form.Item>
                        </>
                      ) : (
                        <Typography className="isViewLeadEditableText">
                          <div className="editableTextContainer">
                            {selectedItemDetails?.treatment || "-"}
                          </div>
                        </Typography>
                      )}
                    </div>
                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>

                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">
                        Description
                      </Typography>
                      {isViewLeadModalEditable ? (
                        <>
                          <Form.Item name="description">
                            <Input
                              defaultValue={selectedItemDetails?.description}
                              style={{ width: "220px" }}
                              placeholder="Description"
                            />
                          </Form.Item>
                        </>
                      ) : (
                        <Typography className="isViewLeadEditableText">
                          <div className="editableTextContainer">
                            {selectedItemDetails?.Description || "-"}
                          </div>
                        </Typography>
                      )}
                    </div>
                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>
                </Row>
                <Space
                  style={{
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    marginTop: 10,
                  }}
                >
                  <Moneybagsvg
                    style={{
                      fontSize: 16,
                      color: "#72779E",
                      display: "flex",
                    }}
                  />
                  <Typography
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Financing
                  </Typography>
                </Space>

                <Divider style={{ margin: "10px 0px 10px 0px" }}></Divider>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">
                        Credit score
                      </Typography>
                      {isViewLeadModalEditable ? (
                        <>
                          <Form.Item name="finance_score">
                            <Select
                              defaultValue={selectedItemDetails?.finance_score}
                              style={{ width: "220px" }}
                              placeholder="Select Credit Score"
                              suffixIcon={
                                <MdOutlineKeyboardArrowDown
                                  style={{ fontSize: 20 }}
                                />
                              }
                              options={creditScoreList}
                            ></Select>
                          </Form.Item>
                        </>
                      ) : (
                        <Typography className="isViewLeadEditableText">
                          <div className="editableTextContainer">
                            {selectedItemDetails?.finance_score || "-"}
                          </div>
                        </Typography>
                      )}
                    </div>

                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>

                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">
                        Co-signer above 650
                      </Typography>
                      {isViewLeadModalEditable ? (
                        <>
                          <Form.Item name="co_signer">
                            <Select
                              defaultValue={
                                selectedItemDetails?.co_signer === "Y"
                                  ? "Yes"
                                  : "No"
                              }
                              style={{ width: "220px" }}
                              placeholder="Select Yes/No"
                              suffixIcon={
                                <MdOutlineKeyboardArrowDown
                                  style={{ fontSize: 20 }}
                                />
                              }
                            >
                              <Option value="Y">Yes</Option>
                              <Option value="N">No</Option>
                            </Select>
                          </Form.Item>
                        </>
                      ) : (
                        <Typography className="isViewLeadEditableText">
                          <div className="editableTextContainer">
                            <Typography>
                              {selectedItemDetails?.co_signer === "Y"
                                ? "Yes"
                                : "No"}
                            </Typography>
                          </div>
                        </Typography>
                      )}
                    </div>

                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">
                        Home Owner
                      </Typography>
                      {isViewLeadModalEditable ? (
                        <>
                          <Form.Item name="home_owner">
                            <Select
                              defaultValue={
                                selectedItemDetails?.home_owner === "Y"
                                  ? "Yes"
                                  : "No"
                              }
                              style={{ width: "220px" }}
                              placeholder="Select Home Owner Status"
                              suffixIcon={
                                <MdOutlineKeyboardArrowDown
                                  style={{ fontSize: 20 }}
                                />
                              }
                            >
                              <Option value="Y">Yes</Option>
                              <Option value="N">No</Option>
                            </Select>
                          </Form.Item>
                        </>
                      ) : (
                        <Typography className="isViewLeadEditableText">
                          <div className="editableTextContainer">
                            <Typography>
                              {selectedItemDetails?.home_owner === "Y"
                                ? "Yes"
                                : "No"}
                            </Typography>
                          </div>
                        </Typography>
                      )}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">
                        Annual Salary
                      </Typography>
                      {isViewLeadModalEditable ? (
                        <>
                          <Form.Item name="annual_salary">
                            <Input
                              defaultValue={selectedItemDetails?.annual_salary}
                              style={{ width: "220px" }}
                              placeholder="Enter Annual Salary"
                            />
                          </Form.Item>
                        </>
                      ) : (
                        <Typography className="isViewLeadEditableText">
                          <div className="editableTextContainer">
                            <Typography>
                              {selectedItemDetails?.annual_salary || "-"}
                            </Typography>
                          </div>
                        </Typography>
                      )}
                    </div>
                  </Col>
                </Row>

                <Space
                  style={{
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    marginTop: 10,
                  }}
                >
                  <MdOutlineError
                    style={{
                      fontSize: 20,
                      color: "#72779E",
                      display: "flex",
                    }}
                  />
                  <Typography
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Details
                  </Typography>
                </Space>
                <Divider style={{ margin: "10px 0px 10px 0px" }}></Divider>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">
                        Created Time
                      </Typography>
                      <Typography>
                        {dayjs(selectedItemDetails?.Created_On)?.format(
                          "YYYY-MM-DD hh:mm A"
                        ) || "-"}{" "}
                      </Typography>
                    </div>

                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>

                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className="custom-text1">
                        Unique ID
                      </Typography>
                      <Typography>{selectedItemDetails?.id || "-"} </Typography>
                    </div>

                    <Divider style={{ margin: "10px 0px 0px 0px" }} />
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </TabPane>

        <TabPane tab="Notes" key="2">
          <div style={{ height: "50vh", overflow: "auto", padding: 15 }}>
            {/* Render the comments */}
            {/* <List
                itemLayout="vertical"
                dataSource={commentsData}
                renderItem={(item) => (
                  <Card
                    style={{ border: "none" }}
                    className="custom-card-notes"
                  >
                    <List.Item
                      actions={item.actions ? [item.actions] : []}
                      style={{ borderBottom: "none" }}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} size={50} />}
                        title={
                          <span style={{ fontWeight: "bold" }}>
                            {item.author}
                          </span>
                        }
                        description={
                          <span style={{ color: "#888" }}>
                            {item.datetime}
                          </span>
                        }
                      />
                      <div
                        style={{
                          marginTop: "10px",
                          fontSize: "14px",
                          color: "#333",
                        }}
                      >
                        {item.content}
                      </div>
                    </List.Item>
                    <Divider style={{ margin: 0 }} />
                  </Card>
                )}
              /> */}
            {/* Write a Note Section */}
            <Notes
              selectedLeadDetails={selectedItemDetails}
              openNotificationWithIcon={openNotificationWithIcon}
            />
            <Card
              style={{
                border: "none",
              }}
              className="custom-card-notes"
            ></Card>
          </div>
        </TabPane>

        <TabPane tab="Activity" key="3">
          <Card
            title="Engagement History"
            style={{
              height: "50vh",
              overflow: "auto",
              border: 0,
            }}
          >
            <Timeline>
              {engagementData.map((item, index) => (
                <Timeline.Item key={index} dot={item.icon}>
                  <div style={{ marginLeft: 10 }}>
                    <Text>{item.title}</Text>
                    <div style={{ color: "#72779E", marginBottom: 8 }}>
                      {item.datetime}
                    </div>
                    {item.actions && (
                      <div style={{ marginBottom: 0 }}>{item.actions}</div>
                    )}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export const CloseLeadPayment = ({
  handleGetAllleads,
  handleGetAllleadsKanbanView,
  isCloseLeadsPaymentModalVisible,
  buttonLoader,
  setbuttonLoader,
  openNotificationWithIcon,
  dragCardItemId,
  setisCloseLeadsPaymentModalVisible,
}) => {
  const [RecordPaymentform] = Form.useForm();

  const handleCloseLeadPaymentModal = () => {
    setisCloseLeadsPaymentModalVisible(false);
    RecordPaymentform.resetFields();
  };
  const handleSubmitCloseleadsPayment = async (values) => {
    setbuttonLoader(true);
    const token = localStorage.getItem("authToken");
    const data = {
      id: dragCardItemId,
      close_amount: values?.CloseAmount,
      lead_status: "Closed",
    };
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/update-leads`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        openNotificationWithIcon(
          "success",
          "Congratulations!",
          "Successfully  closed! Great work!"
        );
        setisCloseLeadsPaymentModalVisible(false);
        setbuttonLoader(false);
        handleGetAllleadsKanbanView();
        handleGetAllleads();
        RecordPaymentform.resetFields();
      })
      .catch((err) => {
        console.log(err);

        openNotificationWithIcon("error", "Close Lead", err?.message);
        RecordPaymentform.resetFields();
        setbuttonLoader(false);
      });
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={handleCloseLeadPaymentModal}
            icon={<IoChevronBackSharp />}
          ></Button>
          <Typography style={{ marginLeft: 10 }}>Record Payment</Typography>
        </div>
      }
      visible={isCloseLeadsPaymentModalVisible}
      footer={null}
      closable={false}
      width={600}
      className="custom-modal"
    >
      <Form
        form={RecordPaymentform}
        onFinish={handleSubmitCloseleadsPayment}
        initialValues={{ remember: true }}
        layout="vertical"
      >
        <Row style={{ margin: "10px 0" }}>
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
                  Amount<span style={{ color: "red" }}>*</span>
                </>
              }
              name="CloseAmount"
              rules={[
                {
                  required: true,
                  message: "Please enter payment collected!",
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
              htmlType="submit" // Ensure this is set
              block
              loading={buttonLoader}
            >
              Close Lead
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export const AppointmentDateTime = ({
  handleGetAllleadsKanbanView,
  openNotificationWithIcon,
  setisAppointmentModalVisible,
  setbuttonLoader,
  dragCardItemId,
  isAppointmentModalVisible,
  disabledDate,
  buttonLoader,
  selectedItemDetails
}) => {
  const [AppointmentDetailsform] = Form.useForm();
  const handleSubmitApointmentDateAndTime = async (values) => {
    if(selectedItemDetails?.first_name && selectedItemDetails?.last_name && selectedItemDetails?.email){
      setbuttonLoader(true);
      const data = {
        id: selectedItemDetails?.id,
        appointment_date: dayjs(values?.AppointmentDate).format("MMM DD YYYY"),
        appointment_time: dayjs(values?.AppointmentTime).format("hh:mm A"), // Example: "02:30 pm"
        appointment_notes: values?.AppointmentNotes,
        lead_status: "Appointment",
      };
      const token = localStorage.getItem("authToken");
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/update-leads`,
  
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          handleGetAllleadsKanbanView();
          setisAppointmentModalVisible(false);
          setbuttonLoader(false);
          openNotificationWithIcon(
            "success",
            "Kanban Lead",
            "Lead Updated Successfully !"
          );
          AppointmentDetailsform.resetFields();
        })
        .catch((err) => {
          setbuttonLoader(false);
          console.log(err);
          AppointmentDetailsform.resetFields();
        });
    }else{
      openNotificationWithIcon(
        "error",
        "Lead",
        "To continue, please make sure to include your email, first name, and last name."
      );
    }

  };

  const handleCancelApointmentDateAndTime = () => {
    setisAppointmentModalVisible(false);
    AppointmentDetailsform.resetFields();
  };
  return (
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
        form={AppointmentDetailsform}
        onFinish={handleSubmitApointmentDateAndTime}
        initialValues={{ remember: true }}
        layout="vertical"
      >
        <Row style={{ margin: "10px 0" }}>
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
                  <span>Date</span>
                  <span style={{ color: "red" }}>*</span>
                </>
              }
              name="AppointmentDate"
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={
                <>
                  <span>Time</span>
                  <span style={{ color: "red" }}>*</span>
                </>
              }
              name="AppointmentTime"
              rules={[{ required: true, message: "Please select a time!" }]}
            >
              <TimePicker
                use12Hours
                format="h:mm a"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Notes" name="AppointmentNotes">
              <Input.TextArea
                placeholder="Please enter notes"
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
  );
};

export const CreateLeads = ({
  handleGetAllleads,
  handleGetAllleadsKanbanView,
  openNotificationWithIcon,
  isModalVisible,
  setIsFinancingEnabled,
  setIsModalVisible,
  setbuttonLoader,
  CreateLeadsform,
  setkanbanAppointment,
  kanbanAppointment,
  disabledDate,
  isFinancingEnabled,
  buttonLoader,
}) => {
  const [treatmentOptions, settreatmentOptions] = useState([]);
  const [selectedOption, setselectedOption] = useState([]);
  const handleSubmitCreateleads = async (values) => {
    setbuttonLoader(true);
    console.log(values);
    const token = localStorage.getItem("authToken");
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/create-leads`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        handleGetAllleads();
        handleGetAllleadsKanbanView();
        setIsModalVisible(false);
        CreateLeadsform.resetFields();
        setbuttonLoader(false);
        setkanbanAppointment(false);
        openNotificationWithIcon(
          "success",
          "Lead",
          "Manual lead created Successfully !"
        );
      })
      .catch((err) => {
        console.log(err);
        CreateLeadsform.resetFields();
        setIsModalVisible(false);
        openNotificationWithIcon(
          "error",
          "Lead",
          err?.response?.data?.message || err?.message
        );
      });
    setbuttonLoader(false);
  };

  const handleCancelCreateleads = () => {
    setkanbanAppointment(false);
    setIsModalVisible(false);
    CreateLeadsform.resetFields();
  };

  const onFinancingChange = (checked) => {
    setIsFinancingEnabled(checked);
  };

  const getTreatmentUrlList = async () => {
    const token = localStorage.getItem("authToken");
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-treatmentOptions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        settreatmentOptions(res?.data?.treatmentOptionList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTreatmentUrlList();
  }, [isModalVisible]);

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={handleCancelCreateleads}
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
      <Form
        form={CreateLeadsform}
        onFinish={handleSubmitCreateleads}
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
              name="first_name"
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
              name="last_name"
              rules={[{ required: true, message: "Please enter name !" }]}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              valuePropName="value"
              label={
                <>
                  Lead Status<span style={{ color: "red" }}>*</span>{" "}
                </>
              }
              name="lead_status"
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
              name="email"
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
              name="phone_number"
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
                  Select Clinic<span style={{ color: "red" }}>*</span>{" "}
                </>
              }
              name="clinic_name"
              rules={[
                {
                  required: true,
                  message: "Please Select Clinic !",
                },
              ]}
            >
              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder="Tags Mode"
                onSelect={(e, data) => {
                  setselectedOption(data?.treatment_options);
                }}
                options={treatmentOptions?.map((item) => {
                  return { label: item?.url, value: item?.url, ...item };
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={
                <>
                  Select Treatment<span style={{ color: "red" }}>*</span>{" "}
                </>
              }
              name="treatment"
              rules={[
                {
                  required: true,
                  message: "Please select treatment !",
                },
              ]}
            >
              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder="Tags Mode"
                options={selectedOption?.map((item) => {
                  return { label: item, value: item };
                })}
              />
            </Form.Item>
          </Col>

          {kanbanAppointment ? (
            <>
              <Col span={12}>
                <Form.Item
                  label={
                    <>
                      Date<span style={{ color: "red" }}>*</span>{" "}
                    </>
                  }
                  name="appointment_date"
                  rules={[{ required: true, message: "Please select date !" }]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    disabledDate={disabledDate}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={
                    <>
                      Time<span style={{ color: "red" }}>*</span>{" "}
                    </>
                  }
                  name="appointment_time"
                  rules={[{ required: true, message: "Please select time !" }]}
                >
                  <TimePicker
                    use12Hours
                    format="h:mm a"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </>
          ) : (
            ""
          )}
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
                <Form.Item label="Credit Score" name="finance_score">
                  <Select
                    placeholder="Select Credit Score"
                    suffixIcon={
                      <MdOutlineKeyboardArrowDown style={{ fontSize: 20 }} />
                    }
                    options={creditScoreList}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Co-signer above 650" name="co_signer">
                  <Select
                    placeholder="Select Yes/No"
                    suffixIcon={
                      <MdOutlineKeyboardArrowDown style={{ fontSize: 20 }} />
                    }
                  >
                    <Option value="Y">Yes</Option>
                    <Option value="N">No</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Home Owner" name="home_owner">
                  <Select
                    placeholder="Select Home Owner Status"
                    suffixIcon={
                      <MdOutlineKeyboardArrowDown style={{ fontSize: 20 }} />
                    }
                  >
                    <Option value="Y">Yes</Option>
                    <Option value="N">No</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Annual Salary" name="annual_salary">
                  <Input placeholder="Enter Lead Annual Salary" />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        <Row justify="end">
          <Button onClick={handleCancelCreateleads} style={{ marginRight: 10 }}>
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
  );
};

export const DeleteLead = ({
  handleGetAllleads,
  handleGetAllleadsKanbanView,
  isDeleteConfirmationVisible,
  setisDeleteConfirmationVisible,
  selectedItemDetails,
  openNotificationWithIcon,
  buttonLoader,
  setbuttonLoader,
}) => {
  const handleDelete = async () => {
    setbuttonLoader(true);
    const token = localStorage.getItem("authToken");
    await axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/deleteLeadById`,
        {
          data: {
            id: selectedItemDetails?.id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        handleGetAllleads();
        handleGetAllleadsKanbanView();
        setbuttonLoader(false);
        setisDeleteConfirmationVisible(false);
        openNotificationWithIcon(
          "success",
          "Lead",
          "Lead deleted successfully!"
        );
      })
      .catch((error) => {
        openNotificationWithIcon(
          "error",
          "Lead",
          error.response?.data?.message || "Failed to delete lead"
        );
        setisDeleteConfirmationVisible(false);
        setbuttonLoader(false);
      });
  };
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => setisDeleteConfirmationVisible(false)}
            icon={<IoChevronBackSharp />}
          />
          <Typography style={{ marginLeft: 10 }}>
            Delete Confirmation
          </Typography>
        </div>
      }
      visible={isDeleteConfirmationVisible}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0px 10px 10px 0px",
          }}
        >
          <Space>
            <Button onClick={() => setisDeleteConfirmationVisible(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleDelete}
              loading={buttonLoader}
            >
              Yes
            </Button>
          </Space>
        </div>
      }
      closable={false}
      width={450}
      className="custom-modal"
    >
      <Typography style={{ padding: "0 10px" }}>
        Are you sure you want to delete this lead?
      </Typography>
    </Modal>
  );
};

export const CreateDuplicateLead = ({
  handleGetAllleads,
  handleGetAllleadsKanbanView,
  isDuplicateConfirmationVisible,
  setisDuplicateConfirmationVisible,
  selectedItemDetails,
  openNotificationWithIcon,
  buttonLoader,
  setbuttonLoader,
}) => {
  const handleCreateDuplicateLead = async () => {
    // setbuttonLoader(true);
    const token = localStorage.getItem("authToken");

    let temp = { ...selectedItemDetails };
    delete temp.id;

    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/duplicate-leads`,
        temp,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setbuttonLoader(false);
        setisDuplicateConfirmationVisible(false);
        openNotificationWithIcon(
          "success",
          "Lead",
          "Duplicate lead successfully!"
        );
        handleGetAllleads();
        handleGetAllleadsKanbanView();
      })
      .catch((error) => {
        openNotificationWithIcon(
          "error",
          "Lead",
          error.response?.data?.message || "Failed to create duplicate lead"
        );
        setisDuplicateConfirmationVisible(false);
        setbuttonLoader(false);
      });
  };
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => setisDuplicateConfirmationVisible(false)}
            icon={<IoChevronBackSharp />}
          />
          <Typography style={{ marginLeft: 10 }}>
            Duplicate Confirmation
          </Typography>
        </div>
      }
      visible={isDuplicateConfirmationVisible}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0px 10px 10px 0px",
          }}
        >
          <Space>
            <Button onClick={() => setisDuplicateConfirmationVisible(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleCreateDuplicateLead}
              loading={buttonLoader}
            >
              Yes
            </Button>
          </Space>
        </div>
      }
      closable={false}
      width={450}
      className="custom-modal"
    >
      <Typography style={{ padding: "0 10px" }}>
        Are you sure you want to create duplicate lead?
      </Typography>
    </Modal>
  );
};
