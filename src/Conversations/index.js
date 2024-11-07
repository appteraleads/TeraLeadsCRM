import React, { useEffect, useState } from "react";
import {
  Layout,
  List,
  Avatar,
  Typography,
  Input,
  Button,
  Dropdown,
  Menu,
  Badge,
  Row,
  Col,
  Space,
  Divider,
  Empty,
  Tooltip,
  DatePicker,
  notification,
  Spin,
  Modal,
  Form,
} from "antd";
import {
  SendOutlined,
  PaperClipOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { BsLightning } from "react-icons/bs";
import { LuSend } from "react-icons/lu";
import { LuFilter } from "react-icons/lu";
import { HiPlus } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import { BsChatLeft } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import LeadDetails from "./LeadDetails";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsArrowsAngleContract } from "react-icons/bs";
import { BsArrowsAngleExpand } from "react-icons/bs";
import axios from "axios";
import { getInitials } from "../Common/ReturnColumnValue";
import { mixedColors } from "../Common/ColorHexCodeList";
import dayjs from "dayjs";
import { LiaUserTagSolid } from "react-icons/lia";
const { Sider, Content } = Layout;

const { Text, Title } = Typography;
 
const ChatUI = () => {
  const [emailSend] = Form.useForm();
  const [selectedLead, setselectedLead] = useState([]);
  const [messageType, setMessageType] = useState("SMS");
  const [sendTiming, setSendTiming] = useState("Send Now");
  const [leadsListData, setleadsListData] = useState([]);
  const [conversationsListData, setconversationsListData] = useState([]);
  const [pageLoader, setpageLoader] = useState(false);
  const [chatLoader, setchatLoader] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState();
  const [sendContent, setsendContent] = useState("");
  const [selectScheduleDateTime, setselectScheduleDateTime] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [isEmailModalOpen, setisEmailModalOpen] = useState(false);
  const [isTextEditorVisible, setisTextEditorVisible] = useState(true);
  const [toEmail, settoEmail] = useState();
  const [notes, setnotes] = useState([]);

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      duration: 3,
    });
  };

  const handleMenuClick = (e) => {
    if (e.key === "sms" || e.key === "email") {
      setMessageType(e.key === "sms" ? "SMS" : "Email");
    } else if (e.key === "sendNow" || e.key === "schedule") {
      setSendTiming(e.key === "sendNow" ? "Send Now" : "Schedule");
    }
  };

  const EmailContentDisplay = ({ emailContent }) => {
    // Replace new line characters with <br />
    const formattedContent = emailContent.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));

    return (
      <div style={{ whiteSpace: "pre-wrap" }}>
        <div>{formattedContent}</div>
      </div>
    );
  };

  const messageTypeMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="sms">SMS</Menu.Item>
      <Menu.Item key="email">Email</Menu.Item>
    </Menu>
  );

  const emailListMenu = (
    <Menu
      onClick={(e) => {
        settoEmail(e.key);
      }}
    >
      <Menu.Item key="adam@teraleads.com" value="adam@teraleads.com">
        adam@teraleads.com
      </Menu.Item>
      <Menu.Item key="app@teraleads.com" value="app@teraleads.com">
        app@teraleads.com
      </Menu.Item>
      <Menu.Item key="noor@teraleads.com" value="noor@teraleads.com">
        noor@teraleads.com
      </Menu.Item>
    </Menu>
  );

  const sendTimingMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="sendNow">Send Now</Menu.Item>
      <Menu.Item key="schedule">Schedule</Menu.Item>
    </Menu>
  );

  const selectContact = (contact) => {
    setselectedLead(contact);
    setnotes(contact?.Notes)
  };

  const filteredLeads =
    leadsListData?.filter((contact) =>
      contact?.first_name?.toLowerCase()
    ) || [];

  const handleSubmitEmail = async (values) => {
    setbuttonLoader(true);
    if (sendTiming === "Schedule" && !selectScheduleDateTime) {
      openNotificationWithIcon(
        "error",
        "Conversations",
        "Please Select Schedule Date and Time!"
      );
    } else if (!selectedLead?.phone_number) {
      openNotificationWithIcon("error", "Conversations", "Please Select Lead!");
    } else if (!values?.subject) {
      openNotificationWithIcon(
        "error",
        "Conversations",
        "Please Enter  Subject!"
      );
    } else if (!values?.message) {
      openNotificationWithIcon(
        "error",
        "Conversations",
        "Please Enter  Message!"
      );
    } else if (!toEmail) {
      openNotificationWithIcon(
        "error",
        "Conversations",
        "Please Select  To Email!"
      );
    } else {
      const token = localStorage.getItem("authToken");
      let data = {
        to: toEmail,
        from: "app@teraleads.com",
        subject: values?.subject,
        text: values?.message,
        lead_id: selectedLead?.id,
        user_name: selectedLead?.user_name,
        lead_type: selectedLead?.LeadType,
        send_type: sendTiming,
        schedule_date_time: selectScheduleDateTime
          ? selectScheduleDateTime?.format("YYYY-MM-DD hh:mm:ss A")
          : undefined,
      };

      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/sendEmail`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          getSelectedleadConversation(selectedLead);
          setsendContent();
          setbuttonLoader(false);
          setisEmailModalOpen(false);
          setisTextEditorVisible(true);
          setselectScheduleDateTime("");
          emailSend.resetFields();
        })
        .catch((err) => {
          setbuttonLoader(false);
          console.log(err);
        });
    }
    setbuttonLoader(false);
  };

  const handleSendSMS = async () => {
    setbuttonLoader(true);
    if (sendTiming === "Schedule" && !selectScheduleDateTime) {
      openNotificationWithIcon(
        "error",
        "Conversations",
        "Please Select Schedule Date and Time!"
      );
    } else if (!selectedLead?.phone_number) {
      openNotificationWithIcon("error", "Conversations", "Please Select Lead!");
    } else if (!sendContent) {
      openNotificationWithIcon(
        "error",
        "Conversations",
        "Please Enter  Message!"
      );
    } else {
      const token = localStorage.getItem("authToken");
      let data = {
        text: sendContent,
        to: selectedLead?.phone_number,
        from: "+13083050002",
        lead_id: selectedLead?.id,
        user_name: selectedLead?.user_name,
        lead_type: selectedLead?.lead_type,
        send_type: sendTiming,
        schedule_date_time: selectScheduleDateTime
          ? selectScheduleDateTime?.format("YYYY-MM-DD hh:mm:ss A")
          : undefined,
      };

      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/sendMessage`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          getSelectedleadConversation(selectedLead);
          setsendContent("");
          setbuttonLoader(false);
        })
        .catch((err) => {
          setbuttonLoader(false);
          console.log(err);
        });
    }
    setbuttonLoader(false);
  };

  const getSelectedleadConversation = async (item) => {
    setchatLoader(true);
    const token = localStorage.getItem("authToken");
    let data = {
      lead_id: item?.id,
    };
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-conversationByLeadId`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setconversationsListData(res?.data?.conversations || []);
        setchatLoader(false);
      })
      .catch((err) => {
        setchatLoader(false);
        console.log(err);
      });
  };

  const getAllLeadsForConversation = async (page, limit) => {
    setpageLoader(true);
    const token = localStorage.getItem("authToken");
    let data = {
      page: 1,
      limit: 15,
    };
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-allLeadsForConversation`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const tempResponse = res?.data?.leadsListData?.map((data, index) => {
          data.Name = `${data?.first_name || ""} ${data?.last_name || ""} `;
          data.PhoneNumber = data?.phone_number || data?.phone_number;
          data.avatarColor = mixedColors[Math.floor(Math.random() * 14)];
          data.key = index + 1;
          return data;
        });
        setleadsListData(tempResponse);
        setpageLoader(false);
      })
      .catch((err) => {
        setpageLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getAllLeadsForConversation();
  }, []);

  return (
    <Layout style={{ background: "#f8f9fa" }}>
      {contextHolder}
      {/* Sidebar for Contacts */}
      <Sider
        width={320}
        style={{
          background: "#fff",
          borderRight: "1px solid #e6e6e6",
        }}
      >
        <div style={{ borderBottom: "1px solid #E8EBEF", height: 50 }}>
          <div
            style={{
              padding: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Title style={{ margin: 0, fontWeight: 500, fontSize: 16 }}>
                Conversations
              </Title>
            </div>
            <div>
              <Space style={{ margin: 5 }}>
                <LuFilter style={{ cursor: "pointer" }} />
                <HiPlus style={{ cursor: "pointer" }} />
              </Space>
            </div>
          </div>
        </div>

        <List
          style={{ height: "86vh", overflow: "auto" }}
          itemLayout="horizontal"
          loading={pageLoader}
          dataSource={filteredLeads}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: 10,
                cursor: "pointer",
                color: item?.id === selectedLead?.id ? "#e6f7ff" : "#fff",
              }}
              onClick={() => {
                selectContact(item);
                getSelectedleadConversation(item);
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={40}
                    style={{
                      backgroundColor: item?.avatarColor,
                    }}
                  >
                    {getInitials(item?.first_name + " " + item?.last_name)}
                  </Avatar>
                }
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      strong
                      style={{
                        color: item?.unseenCount > 0 ? "#3900DB" : "#72779E",
                      }}
                    >
                      {item?.first_name + " " + item?.last_name}
                    </Text>
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "12px",
                        color: item?.unseenCount > 0 ? "#3900DB" : "#72779E",
                      }}
                    >
                      {item?.latestConversation?.created_on
                        ? dayjs(item?.latestConversation?.created_on).format(
                            "hh:mm"
                          )
                        : ""}
                    </Text>
                  </div>
                }
                description={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Space>
                        {item?.latestConversation?.record_type ? (
                          item?.latestConversation?.record_type ===
                          "message" ? (
                            <BsChatLeft
                              style={{
                                color: "#D56700",
                                fontSize: 12,
                              }}
                            />
                          ) : (
                            <CiMail
                              style={{
                                color: "#4938CD",
                                fontSize: 16,
                              }}
                            />
                          )
                        ) : (
                          ""
                        )}
                      </Space>
                      <span
                        style={{
                          marginLeft: 5,
                          color: item?.unseenCount > 0 ? "#263445" : "#72779E",
                          width: 160,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item?.latestConversation?.message}
                      </span>
                    </div>

                    {item.unseenCount > 0 && (
                      <Badge
                        count={item?.unseenCount}
                        style={{
                          backgroundColor: "#3900DB",
                          borderRadius: 5,
                        }}
                      />
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Sider>

      <Row style={{ background: "#FCFDFF", height: "95vh" }}>
        <Col
          style={{
            background: "#FCFDFF",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: 600,
          }}
        >
          <div
            style={{
              padding: "15px",
              borderBottom: "1px solid #e6e6e6",
              display: "flex",
              height: 50,
              alignItems: "center",
            }}
          >
            {Object.keys(selectedLead).length > 0 ? (
              <>
                <Avatar
                  style={{
                    marginRight: "10px",
                    backgroundColor: selectedLead?.avatarColor,
                  }}
                >
                  {getInitials(
                    selectedLead?.first_name + " " + selectedLead?.last_name
                  )}
                </Avatar>
                <Typography style={{ margin: 0 }}>
                  {selectedLead.first_name && selectedLead?.last_name
                    ? selectedLead.first_name + " " + selectedLead?.last_name
                    : selectedLead?.phone_number}
                </Typography>
              </>
            ) : (
              ""
            )}
          </div>
          <Content style={{ flex: "1 1 auto", padding: 10 }}>
            {/* Chat Header */}

            {!chatLoader ? (
              <div
                style={{
                  flex: 1,
                  background: "#FCFDFF",
                  padding: "10px",
                  overflowY: "auto",
                  borderRadius: "8px",
                  marginTop: "0px",
                  maxHeight: "calc(100% - 10px)",
                }}
              >
                {conversationsListData?.length > 0 ? (
                  conversationsListData?.map((msg, index) => (
                    <div key={index}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent:
                            msg.direction === "Outbound"
                              ? "flex-end"
                              : "flex-start",
                        }}
                      >
                        {/* Avatar for incoming messages */}
                        {msg.direction !== "Outbound" && (
                          <Tooltip title={selectedLead.WebsiteName}>
                            <Avatar
                              style={{
                                marginRight: "10px",
                              }}
                              icon={<UserOutlined />}
                            >
                              {selectedLead.WebsiteName}
                            </Avatar>
                          </Tooltip>
                        )}

                        <div
                          style={{
                            background:
                              msg.direction === "Outbound" ? "#EFEEFF" : "#fff",
                            borderRadius:
                              msg.direction === "You"
                                ? "15px 15px 5px 15px"
                                : "15px 15px 15px 5px",
                            padding: "10px",
                            maxWidth: "60%",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                            margin:
                              msg.direction === "Outbound"
                                ? "0 10px 0 0"
                                : "0 0 0 10px",
                          }}
                        >
                          {msg?.record_type === "SMS" ? (
                            <Text>{msg.message} </Text>
                          ) : (
                            <EmailContentDisplay emailContent={msg.message} />
                          )}
                        </div>

                        {/* Avatar for outgoing messages */}
                        {msg.direction === "Outbound" && (
                          <Avatar
                            style={{
                              marginLeft: "10px",
                              backgroundColor: selectedLead?.avatarColor,
                            }}
                          >
                            {getInitials(
                              selectedLead?.first_name +
                                " " +
                                selectedLead?.last_name
                            )}
                          </Avatar>
                        )}
                      </div>
                      {/* Timestamp Outside Message Content Box */}
                      <div
                        style={{
                          fontSize: "12px",
                          marginLeft:
                            msg.direction !== "Outbound" ? "50px" : "",
                          marginRight:
                            msg.direction === "Outbound" ? "50px" : "",
                          color: "#aaa",
                          alignItems: "center",
                          textAlign:
                            msg.direction === "Outbound" ? "right" : "left",
                          marginTop: "10px", // Adjusted margin for closer alignment
                        }}
                      >
                        {msg.direction !== "Outbound" ? (
                          <>
                            {msg?.record_type === "Email" ? (
                              <Badge
                                count={
                                  <CiMail
                                    style={{
                                      color: "#6A6A8B",
                                      fontSize: 10,
                                      padding: 2,
                                    }}
                                  />
                                }
                                style={{
                                  backgroundColor: "#E8E5FF",
                                  borderRadius: "50%",
                                  height: "15px",
                                  width: "15px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              />
                            ) : (
                              <Badge
                                count={
                                  <MessageOutlined
                                    style={{
                                      color: "#6A6A8B",
                                      fontSize: 10,
                                      padding: 2,
                                    }}
                                  />
                                }
                                style={{
                                  backgroundColor: "#FFFBCC",
                                  borderRadius: "50%",
                                  height: "15px",
                                  width: "15px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              />
                            )}
                            {msg?.record_type === "Email" ? (
                              <span className="custom-text1">Email</span>
                            ) : (
                              <span className="custom-text1">SMS</span>
                            )}

                            <Divider
                              type="vertical"
                              style={{ margin: 5, fontSize: 10 }}
                            />
                            <span className="custom-text1">
                              {dayjs(msg.received_at)?.format("hh:mm A")}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="custom-text1">
                              {dayjs(msg.Created_On)?.format("hh:mm A")}
                            </span>
                            <Divider
                              type="vertical"
                              style={{ margin: 5, fontSize: 10 }}
                            />
                            {msg?.record_type === "Email" ? (
                              <Badge
                                count={
                                  <CiMail
                                    style={{
                                      color: "#6A6A8B",
                                      fontSize: 10,
                                      padding: 2,
                                    }}
                                  />
                                }
                                style={{
                                  backgroundColor: "#E8E5FF",
                                  borderRadius: "50%",
                                  height: "15px",
                                  width: "15px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              />
                            ) : (
                              <Badge
                                count={
                                  <MessageOutlined
                                    style={{
                                      color: "#6A6A8B",
                                      fontSize: 10,
                                      padding: 2,
                                    }}
                                  />
                                }
                                style={{
                                  backgroundColor: "#FFFBCC",
                                  borderRadius: "50%",
                                  height: "15px",
                                  width: "15px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              />
                            )}
                            {msg?.record_type === "Email" ? (
                              <span className="custom-text1">Email</span>
                            ) : (
                              <span className="custom-text1">SMS</span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <Empty description="No SMS available" />
                )}
              </div>
            ) : (
              <div
                style={{
                  background: "#FCFDFF",
                  padding: "10px",
                  justifyContent: "center",
                  marginTop: "200px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Spin />
              </div>
            )}
          </Content>
          {isTextEditorVisible ? (
            <div
              style={{
                width: "96%",
                borderRadius: "8px",
                padding: "10px",
                margin: "0px 0px 10px 10px",
                border: "1px solid #E8EBEF",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                marginBottom: 40,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Space
                  style={{
                    marginBottom: "12px",
                    width: "100%",
                    display: messageType === "Email" ? "ruby" : "",
                  }}
                >
                  <Dropdown
                    overlay={messageTypeMenu}
                    trigger={["click"]}
                    icon={<SendOutlined />}
                  >
                    <Space
                      style={{
                        padding: 5,
                        borderRadius: 5,
                        border: "1px solid #E8EBEF",
                        margin: messageType === "Email" ? 5 : "",
                      }}
                    >
                      {messageType === "SMS" ? (
                        <Badge
                          count={
                            <MessageOutlined
                              style={{
                                color: "#6A6A8B",
                                fontSize: 10,
                                padding: 2,
                              }}
                            />
                          }
                          style={{
                            backgroundColor: "#FFFBCC",
                            borderRadius: "50%",
                            height: "20px",
                            width: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      ) : (
                        <Badge
                          count={
                            <CiMail
                              style={{
                                color: "#6A6A8B",
                                fontSize: 10,
                                padding: 2,
                              }}
                            />
                          }
                          style={{
                            backgroundColor: "#E8E5FF",
                            borderRadius: "50%",
                            height: "20px",
                            width: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      )}

                      <Typography>{messageType}</Typography>
                      <MdOutlineKeyboardArrowDown
                        style={{ fontSize: 20, display: "flex" }}
                      />
                    </Space>
                  </Dropdown>

                  {messageType === "Email" ? (
                    <Dropdown
                      overlay={emailListMenu}
                      trigger={["click"]}
                      icon={<SendOutlined />}
                    >
                      <Space
                        style={{
                          padding: 5,
                          borderRadius: 5,
                          border: "1px solid #E8EBEF",
                          margin: messageType === "Email" ? 5 : "",
                        }}
                      >
                        <LuSend style={{ fontSize: 20, display: "flex" }} />
                        <Typography>{toEmail}</Typography>
                        <MdOutlineKeyboardArrowDown
                          style={{ fontSize: 20, display: "flex" }}
                        />
                      </Space>
                    </Dropdown>
                  ) : (
                    ""
                  )}

                  <Dropdown
                    overlay={sendTimingMenu}
                    trigger={["click"]}
                    icon={<SendOutlined />}
                  >
                    <Space
                      style={{
                        padding: 5,
                        borderRadius: 5,
                        border: "1px solid #E8EBEF",
                        margin: messageType === "Email" ? 5 : "",
                      }}
                    >
                      <IoMdTime style={{ fontSize: 20, display: "flex" }} />
                      <Typography>{sendTiming}</Typography>
                      <MdOutlineKeyboardArrowDown
                        style={{ fontSize: 20, display: "flex" }}
                      />
                    </Space>
                  </Dropdown>
                  {sendTiming === "Schedule" ? (
                    <>
                      <DatePicker
                        defaultValue={selectScheduleDateTime}
                        showTime
                        disabledDate={(current) => current && current < dayjs().startOf('day')}
                        format="YYYY-MM-DD hh:mm A"
                        onChange={(e) => setselectScheduleDateTime(e)}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </Space>
                {!isEmailModalOpen ? (
                  <Button
                    type="text"
                    onClick={() => {
                      setisEmailModalOpen(true);
                      setisTextEditorVisible(false);
                    }}
                    icon={<BsArrowsAngleExpand />}
                  />
                ) : (
                  ""
                )}
              </div>
              {messageType === "Email" ? (
                <Form
                  form={emailSend}
                  onFinish={handleSubmitEmail}
                  layout="vertical"
                >
                  <Form.Item name="subject">
                    <Input
                      placeholder="Subject"
                      bordered={false}
                      style={{ borderBottom: "1px solid #f0f0f0" }}
                    />
                  </Form.Item>
                  <Form.Item name="message">
                    <Input.TextArea
                      placeholder="Write your message here..."
                      bordered={false}
                      style={{ resize: "none", height: "80px" }}
                    />
                  </Form.Item>
                </Form>
              ) : (
                <Input.TextArea
                  rows={3}
                  value={sendContent}
                  onChange={(e) => setsendContent(e?.target?.value)}
                  placeholder="Write your message here..."
                  style={{
                    width: "100%", // Full width for the text area
                    border: "none",
                    marginBottom: "12px",
                    resize: "none",
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <PaperClipOutlined
                    style={{
                      fontSize: "16px",
                      color: "#72779E",
                      cursor: "pointer",
                    }}
                  />
                  <Divider type="vertical" style={{ fontSize: 20 }} />
                  <LiaUserTagSolid
                    style={{
                      fontSize: "16px",
                      color: "#72779E",
                      cursor: "pointer",
                    }}
                  />
                  <span>Variables</span>
                  <Divider type="vertical" style={{ fontSize: 20 }} />
                  <BsLightning
                    style={{
                      fontSize: "14px",
                      color: "#72779E",
                      cursor: "pointer",
                    }}
                  />
                  <span>Templates</span>
                </div>
                <div>
                  <Button
                    loading={buttonLoader}
                    onClick={() => {
                      messageType === "Email"
                        ? emailSend.submit()
                        : handleSendSMS();
                    }}
                    style={{ borderRadius: "8px" }}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </Col>
      </Row>

      <Col span={6}>
        <LeadDetails
          selectedLead={selectedLead}
          openNotificationWithIcon={openNotificationWithIcon}
          notes={notes}
          setnotes={setnotes}
        />
      </Col>

      <Modal
        visible={isEmailModalOpen}
        width={800}
        bodyStyle={{ padding: "16px", fontFamily: "Arial, sans-serif" }}
        style={{ top: 20, borderRadius: "8px", overflow: "hidden" }}
        closeIcon={
          <BsArrowsAngleContract
            onClick={() => {
              setisEmailModalOpen(false);
              setisTextEditorVisible(true);
            }}
            style={{ fontSize: "16px" }}
          />
        }
        title={
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Space style={{ marginBottom: "12px", width: "100%" }}>
                <Dropdown
                  overlay={messageTypeMenu}
                  trigger={["click"]}
                  icon={<SendOutlined />}
                >
                  <Space
                    style={{
                      padding: 5,
                      borderRadius: 10,
                      border: "1px solid #E8EBEF",
                    }}
                  >
                    {messageType === "SMS" ? (
                      <Badge
                        count={
                          <MessageOutlined
                            style={{ color: "#6A6A8B", fontSize: 14 }}
                          />
                        }
                        style={{
                          backgroundColor: "#FFFBCC",
                          borderRadius: "50%",
                          height: "25px",
                          width: "25px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    ) : (
                      <Badge
                        count={
                          <CiMail
                            style={{ color: "#6A6A8B", width: 15, height: 15 }}
                          />
                        }
                        style={{
                          backgroundColor: "#E8E5FF",
                          borderRadius: "50%",
                          height: "20px",
                          width: "20px",
                          padding: 3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    )}

                    <Typography style={{ fontWeight: 400 }}>
                      {messageType}
                    </Typography>
                    <MdOutlineKeyboardArrowDown
                      style={{ fontSize: 20, display: "flex" }}
                    />
                  </Space>
                </Dropdown>
                {messageType === "Email" ? (
                  <Dropdown
                    overlay={emailListMenu}
                    trigger={["click"]}
                    icon={<SendOutlined />}
                  >
                    <Space
                      style={{
                        padding: 5,
                        borderRadius: 10,
                        border: "1px solid #E8EBEF",
                      }}
                    >
                      <LuSend style={{ fontSize: 20, display: "flex" }} />
                      <Typography style={{ fontWeight: 400 }}>
                        {toEmail}
                      </Typography>
                      <MdOutlineKeyboardArrowDown
                        style={{ fontSize: 20, display: "flex" }}
                      />
                    </Space>
                  </Dropdown>
                ) : (
                  ""
                )}
                <Dropdown
                  overlay={sendTimingMenu}
                  trigger={["click"]}
                  icon={<SendOutlined />}
                >
                  <Space
                    style={{
                      padding: 5,
                      borderRadius: 10,
                      border: "1px solid #E8EBEF",
                    }}
                  >
                    <IoMdTime style={{ fontSize: 20, display: "flex" }} />
                    <Typography style={{ fontWeight: 400 }}>
                      {sendTiming}
                    </Typography>
                    <MdOutlineKeyboardArrowDown
                      style={{ fontSize: 20, display: "flex" }}
                    />
                  </Space>
                </Dropdown>
                {sendTiming === "Schedule" ? (
                  <>
                    <DatePicker
                      defaultValue={selectScheduleDateTime}
                      showTime
                      format="YYYY-MM-DD hh:mm A"
                      onChange={(e) => setselectScheduleDateTime(e)}
                    />
                  </>
                ) : (
                  ""
                )}
              </Space>
            </div>
          </>
        }
        footer={
          <>
            <Divider style={{ margin: 5 }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <PaperClipOutlined
                  style={{
                    fontSize: "16px",
                    color: "#72779E",
                    cursor: "pointer",
                  }}
                />
                <Divider type="vertical" style={{ fontSize: 20 }} />
                <LiaUserTagSolid
                  style={{
                    fontSize: "16px",
                    color: "#72779E",
                    cursor: "pointer",
                  }}
                />
                <span>Variables</span>
                <Divider type="vertical" style={{ fontSize: 20 }} />
                <BsLightning
                  style={{
                    fontSize: "14px",
                    color: "#72779E",
                    cursor: "pointer",
                  }}
                />
                <span>Templates</span>
              </div>
              <div>
                <Button
                  onClick={() => {
                    messageType === "Email"
                      ? emailSend.submit()
                      : handleSendSMS();
                  }}
                  loading={buttonLoader}
                >
                  Send
                </Button>
              </div>
            </div>
          </>
        }
      >
        <Form form={emailSend} onFinish={handleSubmitEmail} layout="vertical">
          <Form.Item name="subject">
            <Input
              placeholder="Subject"
              bordered={false}
              style={{ borderBottom: "1px solid #f0f0f0" }}
            />
          </Form.Item>
          <Form.Item name="message">
            <Input.TextArea
              placeholder="Write your message here..."
              bordered={false}
              style={{ resize: "none", height: "500px" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ChatUI;
