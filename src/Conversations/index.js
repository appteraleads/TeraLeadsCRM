/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
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
  Upload,
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
import dayjs from "dayjs";
import { LiaUserTagSolid } from "react-icons/lia";
import EmailChatUI from "./EmailChatUI";
import Search from "antd/es/transfer/search";
import { useLocation } from "react-router-dom";
const { Sider, Content } = Layout;
const { Text, Title } = Typography;
const MemoizedList = React.memo(List);
const Conversations = ({ searchContent }) => {
  const socketUrl = "ws://localhost:8081";
  const location = useLocation();
  const [emailSend] = Form.useForm();
  const [selectedLead, setselectedLead] = useState([]);
  const [messageType, setMessageType] = useState("SMS");
  const [sendTiming, setSendTiming] = useState("Send Now");
  const [leadsData, setleadData] = useState([]);
  const [emailConversationsListData, setemailConversationsListData] = useState(
    []
  );
  const [smsConversationsListData, setsmsConversationsListData] = useState([]);
  const [chatLoader, setchatLoader] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState();
  const [sendContent, setsendContent] = useState("");
  const [selectScheduleDateTime, setselectScheduleDateTime] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [isEmailModalOpen, setisEmailModalOpen] = useState(false);
  const [isTextEditorVisible, setisTextEditorVisible] = useState(true);
  const [toEmail, settoEmail] = useState();
  const [notes, setnotes] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [leadsList, setleadsList] = useState([]);
  const [loadingleadsList, setloadingleadsList] = useState();
  const [visibleleadListDropdown, setvisibleleadListDropdown] = useState(false);
  const handleFileChange = ({ fileList }) => setFileList(fileList);
  const handleFileRemove = (file) => {
    setFileList((prevFileList) =>
      prevFileList.filter((f) => f.uid !== file.uid)
    );
  };

  const menu = (
    <Menu>
      <div style={{ padding: 10 }}>
        <Search
          placeholder="Search lead"
          onChange={(e) => {
            handleGetAllleadList(e?.target?.value, "text");
          }}
          size="small"
          style={{
            padding: 20,
            borderRadius: "20px",
            width: "100%",
          }}
        />
        <Divider style={{ margin: "10px 0px 10px 0px" }} />
        <Typography style={{ padding: "0px 10px 0px 10px" }}>
          All Leads
        </Typography>
      </div>

      <div
        style={{
          width: 300,
          maxHeight: "310px",
          overflowY: "auto",
        }}
      >
        <Menu>
          {loadingleadsList ? (
            <Menu.Item key="loading" disabled>
              <Spin style={{ marginRight: 10 }} size="small" /> Loading...
            </Menu.Item>
          ) : (
            leadsList?.map((lead) => (
              <Menu.Item
                key={lead?.id}
                onClick={() => {
                  setvisibleleadListDropdown(false);
                  handleLeadConversationTrueFlase(lead);
                  setselectedLead(lead);
                  setvisibleleadListDropdown(false);
                }}
              >
                <Avatar
                  size={25}
                  style={{
                    backgroundColor: lead?.avatar_color,
                    fontSize: 14,
                    marginRight: 10,
                  }}
                >
                  {lead?.first_name && lead?.last_name
                    ? getInitials(lead?.first_name + " " + lead?.last_name)
                    : lead?.phone_number}
                </Avatar>
                <Text>
                  {lead?.first_name && lead?.last_name
                    ? lead?.first_name + " " + lead?.last_name
                    : lead?.phone_number}
                </Text>
              </Menu.Item>
            ))
          )}
        </Menu>
      </div>
    </Menu>
  );

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

  const handleLeadConversationTrueFlase = async (item) => {
    const token = localStorage.getItem("authToken");
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/conversations/LeadTF/${item?.id}`;

    try {
      await axios({
        method: "PUT",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {});
    } catch (error) {
      console.error(error);
    }
  };

  const handleConversationsUnseen = async (item) => {
    const token = localStorage.getItem("authToken");
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/conversations/unseen/${item?.id}`;

    try {
      await axios({
        method: "PUT",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {});
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleGetAllleadList = async (search, searchType) => {
    setloadingleadsList(true);
    const token = localStorage.getItem("authToken");
    let data = {
      search: search || "",
      searchType: searchType?.trim() || "",
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-allLeadsListForConversation`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setleadsList(res?.data?.leadsListData);
        })
        .catch((err) => {
          openNotificationWithIcon(
            "error",
            "Conversatios",
            err?.response?.data || err?.message
          );
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    setloadingleadsList(false);
  };
  const handlesetvisibleleadListDropdown = (visible) => {
    setvisibleleadListDropdown(visible);
  };
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("WebSocket connection established"),
    onClose: (event) => console.log("WebSocket connection closed:", event),
    onError: (error) => console.error("WebSocket error:", error),
    shouldReconnect: () => true, // Reconnect on close
  });

  useEffect(() => {
    if (
      location.pathname === "/conversations" &&
      readyState === WebSocket.OPEN
    ) {
      sendMessage(JSON.stringify({ type: "conversation" }));
    }
  }, [location.pathname, readyState, sendMessage]);

  useEffect(() => {
    if (
      location.pathname === "/conversations" &&
      readyState === WebSocket.OPEN
    ) {
      const interval = setInterval(() => {
        sendMessage(JSON.stringify({ type: "conversation" }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [location.pathname, readyState, sendMessage]);

  // Handle the response from the WebSocket server
  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data = JSON.parse(lastMessage?.data);
        const tempResponse = data?.conversations;

        // Check if the response is different before updating the state
        if (JSON.stringify(tempResponse) !== JSON.stringify(leadsData)) {
          setleadData(tempResponse);
        }
        if (selectedLead && tempResponse) {
          let temp = tempResponse?.filter(
            (item) => item?.id === selectedLead?.id
          )[0];
          if (temp) {
            setnotes(temp?.Notes);
            setemailConversationsListData(temp?.Conversations?.emails);
            setsmsConversationsListData(temp?.Conversations?.sms);
          } else {
            setnotes([]);
            setemailConversationsListData([]);
            setsmsConversationsListData([]);
          }
        }
      } catch (error) {
        console.log("Error parsing message:", error);
      }
    }
  }, [lastMessage, leadsData]);

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
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  placement="bottomCenter"
                  visible={visibleleadListDropdown}
                  onVisibleChange={handlesetvisibleleadListDropdown}
                >
                  <HiPlus
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleGetAllleadList();
                    }}
                  />
                </Dropdown>
              </Space>
            </div>
          </div>
        </div>
        <MemoizedList
          style={{ height: "86vh", overflow: "auto" }}
          itemLayout="horizontal"
          dataSource={leadsData}
          renderItem={(item) => (
            <List key={item.id}>
              <List.Item
                style={{
                  padding: 10,
                  cursor: "pointer",
                  color: item?.id === selectedLead?.id ? "#e6f7ff" : "#fff",
                }}
                onClick={() => {
                  handleConversationsUnseen(item);
                  setselectedLead(item);
                  setnotes(item?.Notes?.reverse());
                  setemailConversationsListData(item?.Conversations?.emails);
                  setsmsConversationsListData(item?.Conversations?.sms);
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={40}
                      style={{
                        backgroundColor: item?.avatar_color,
                      }}
                    >
                      {item?.first_name && item?.last_name
                        ? getInitials(item?.first_name + " " + item?.last_name)
                        : item?.phone_number}
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
                        {item?.first_name && item?.last_name
                          ? item?.first_name + " " + item?.last_name
                          : item?.phone_number}
                      </Text>

                      <Text
                        type="secondary"
                        style={{
                          fontSize: "12px",
                          color: item?.unseenCount > 0 ? "#3900DB" : "#72779E",
                        }}
                      >
                        {item?.latestMessages?.length > 0
                          ? item?.latestMessages[0]?.record_type === messageType
                            ? dayjs(
                                item?.latestMessages?.filter(
                                  (i) => messageType === i?.record_type
                                )[0]?.created_on
                              ).format("hh:mm A")
                            : item?.latestMessages[0]?.record_type ===
                              messageType
                            ? dayjs(
                                item?.latestMessages?.filter(
                                  (i) => messageType === i?.record_type
                                )[0]?.created_on
                              ).format("hh:mm A")
                            : ""
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
                          {item?.Conversations?.length > 0 ? (
                            item?.Conversations[0]?.record_type === "SMS" ? (
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
                            color:
                              item?.unseenCount > 0 ? "#263445" : "#72779E",
                            width: 160,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {
                            item?.latestMessages?.filter(
                              (i) => messageType === i?.record_type
                            )[0]?.message
                          }
                        </span>
                      </div>

                      {item?.unseenCount > 0 && (
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
              <Divider style={{ margin: 0 }} />
            </List>
          )}
        />
      </Sider>

      <Row >
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
            {Object.keys(selectedLead)?.length > 0 ? (
              <>
                <Avatar
                  style={{
                    marginRight: "10px",
                    backgroundColor: selectedLead?.avatar_color,
                  }}
                >
                  {selectedLead?.first_name && selectedLead?.last_name
                    ? getInitials(
                        selectedLead?.first_name + " " + selectedLead?.last_name
                      )
                    : selectedLead?.phone_number}
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
                {messageType === "Email" ? (
                  <>
                    <EmailChatUI
                      selectedLead={selectedLead}
                      emailConversationsListData={emailConversationsListData}
                      getInitials={getInitials}
                    />
                  </>
                ) : (
                  <>
                    {smsConversationsListData?.length > 0 ? (
                      smsConversationsListData?.map((msg, index) => (
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
                                  msg.direction === "Outbound"
                                    ? "#EFEEFF"
                                    : "#fff",
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
                                <EmailContentDisplay
                                  emailContent={msg.message}
                                />
                              )}
                            </div>

                            {msg.direction === "Outbound" && (
                              <Avatar
                                style={{
                                  marginLeft: "10px",
                                  backgroundColor: selectedLead?.avatar_color,
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
                              marginTop: "10px",
                            }}
                          >
                            {msg.direction !== "Outbound" ? (
                              <>
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
                                <span className="custom-text1">SMS</span>
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
                                  {dayjs(msg.created_on)?.format("hh:mm A")}
                                </span>
                                <Divider
                                  type="vertical"
                                  style={{ margin: 5, fontSize: 10 }}
                                />

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
                                <span className="custom-text1">SMS</span>
                              </>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <Empty description="No SMS available" />
                    )}
                  </>
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
                        disabledDate={(current) =>
                          current && current < dayjs().startOf("day")
                        }
                        format="YYYY-MM-DD hh:mm A"
                        onChange={(e) => setselectScheduleDateTime(e)}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </Space>
                {messageType === "Email" ? (
                  !isEmailModalOpen ? (
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
                  )
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
              <div style={{ padding: "0px 0" }}>
                {/* Fixed UI Section */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div style={{ marginBottom: "10px" }}>
                      {fileList.map((file) => (
                        <div
                          key={file.uid}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            marginBottom: "5px",
                          }}
                        >
                          <PaperClipOutlined
                            style={{ fontSize: "16px", color: "#72779E" }}
                          />
                          <span>{file.name}</span>
                          <Button
                            size="small"
                            type="link"
                            onClick={() => handleFileRemove(file)}
                            style={{ color: "#ff4d4f" }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>{" "}
                    <Upload
                      multiple
                      fileList={fileList}
                      onChange={handleFileChange}
                      beforeUpload={() => false}
                      showUploadList={false} // Prevent default UI list rendering
                    >
                      <PaperClipOutlined
                        style={{
                          fontSize: "16px",
                          color: "#72779E",
                          cursor: "pointer",
                        }}
                      />
                    </Upload>
                    <Divider type="vertical" style={{ height: "20px" }} />
                    <LiaUserTagSolid
                      style={{
                        fontSize: "16px",
                        color: "#72779E",
                        cursor: "pointer",
                      }}
                    />
                    <span style={{ color: "#72779E" }}>Variables</span>
                    <Divider type="vertical" style={{ height: "20px" }} />
                    <BsLightning
                      style={{
                        fontSize: "14px",
                        color: "#72779E",
                        cursor: "pointer",
                      }}
                    />
                    <span style={{ color: "#72779E" }}>Templates</span>
                  </div>

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

export default Conversations;
