/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Dropdown,
  Menu,
  Space,
  Typography,
  Input,
  Divider,
  Spin,
  Row,
  Col,
  DatePicker,
  Form,
  Empty,
} from "antd";
import {
  PhoneOutlined,
  MessageOutlined,
  MailOutlined,
  CloseOutlined,
  UserOutlined,
  PaperClipOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { LuSend } from "react-icons/lu";
import { IoMicOutline } from "react-icons/io5";
import { MdOutlinePermMedia } from "react-icons/md";
import { HiOutlineChatBubbleLeft, HiOutlineUser } from "react-icons/hi2";
import { ReactComponent as QuickSvg } from "../assets/IconSvg/mdi_thunder.svg";
import { TbExternalLink } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import dayjs from "dayjs";
import axios from "axios";
import { IoChevronBack } from "react-icons/io5";
import { getInitials } from "./ReturnColumnValue";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import Search from "antd/es/transfer/search";
import { GoMail } from "react-icons/go";
import QuickCall from "./QuickCall";
const { Text } = Typography;

const QuickConversation = ({
  openNotificationWithIcon,
  selectedConversationDetails,
  setselectedConversationDetails,
  isVisibleQuickConversation,
  setisVisibleQuickConversation,
  quickConversationView,
  setquickConversationView,
  loginUserDetails,
}) => {
  const [emailSend] = Form.useForm();
  const [destinationNumber, setdestinationNumber] = useState("");
  const [callSearch, setcallSearch] = useState(false);
  const [recentCalllogsVisible, setrecentCalllogsVisible] = useState(false);
  const [loadingleadsList, setloadingleadsList] = useState(false);
  const [leadsList, setleadsList] = useState([]);
  const [callLogsDetails, setcallLogsDetails] = useState([]);
  const [messageType, setMessageType] = useState("SMS");
  const [sendTiming, setSendTiming] = useState("Send Now");
  const [sendContent, setsendContent] = useState("");
  const [selectScheduleDateTime, setselectScheduleDateTime] = useState("");
  const [visibleleadListDropdown, setvisibleleadListDropdown] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [fromEmail, setfromEmail] = useState();
  const [toEmail, settoEmail] = useState();
  const toggleVisibility = (selectedView) => {
    setisVisibleQuickConversation(true);
    setquickConversationView(selectedView);
  };

  const [
    isQuickConversationCallingPadVisible,
    setisQuickConversationCallingPadVisible,
  ] = useState(false);

  const emailListMenu = (
    <Menu
      onClick={(e) => {
        setfromEmail(e.key);
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

  const menu = (
    <Menu>
      <div style={{ padding: 10 }}>
        <Space>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#7A7AA5",
              cursor: "pointer",
            }}
            onClick={() => {
              setvisibleleadListDropdown(false);
            }}
          >
            <IoChevronBack />
            <span style={{ color: "#7A7AA5" }}>Back</span>
          </div>

          <Search
            placeholder="Search in your lead"
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
        </Space>
      </div>

      <div
        style={{
          width: 295,
          height: "210px",
          overflowY: "auto",
        }}
      >
        <Menu>
          {loadingleadsList ? (
            <Menu.Item key="loading" disabled>
              <Spin style={{ marginRight: 10 }} size="small" /> Loading...
            </Menu.Item>
          ) : (
            <>
              {leadsList?.length > 0 ? (
                <>
                  {leadsList?.map((lead) => (
                    <Menu.Item
                      style={{ height: "fit-content" }}
                      key={lead?.id}
                      onClick={() => {
                        if (quickConversationView === "email") {
                          settoEmail(lead?.email);
                        } else {
                          setdestinationNumber(lead?.phone_number);
                        }
                        setvisibleleadListDropdown(false);
                      }}
                    >
                      <Row
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "250px",
                        }}
                      >
                        <Col
                          span={21}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                          }}
                        >
                          <Avatar
                            size={25}
                            style={{
                              backgroundColor: "red",
                              fontSize: 14,
                              marginRight: 10,
                            }}
                          >
                            {lead?.first_name && lead?.last_name
                              ? getInitials(
                                  lead?.first_name + " " + lead?.last_name
                                )
                              : lead?.phone_number}
                          </Avatar>
                          <div style={{ display: "grid" }}>
                            <Text style={{ color: "#000" }}>
                              {lead?.first_name && lead?.last_name
                                ? lead?.first_name + " " + lead?.last_name
                                : lead?.phone_number}
                            </Text>

                            <Text
                              style={{
                                color: "#72779E",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: 150,
                              }}
                            >
                              {quickConversationView === "email"
                                ? lead?.email
                                : lead?.phone_number}
                            </Text>
                          </div>
                        </Col>
                        <Col span={3}>
                          {quickConversationView === "email" ? (
                            <Button
                              className="custom-GoMail"
                              icon={<GoMail />}
                              style={{
                                color: "#000",
                                width: 30,
                                height: 30,
                                fontSize: 16,
                                padding: 10,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                              }}
                            />
                          ) : (
                            <Button
                              className="custom-conversation-chat-icon"
                              icon={<HiOutlineChatBubbleLeft />}
                              style={{
                                color: "#000",
                                width: 30,
                                height: 30,
                                fontSize: 16,
                                padding: 10,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                              }}
                            />
                          )}
                        </Col>
                      </Row>
                    </Menu.Item>
                  ))}
                </>
              ) : (
                <>
                  {" "}
                  <Empty description="No lead found" />
                </>
              )}
            </>
          )}
        </Menu>
      </div>
    </Menu>
  );

  const handleMenuClick = (e) => {
    if (e.key === "sms" || e.key === "email") {
      setMessageType(e.key === "sms" ? "SMS" : "Email");
    } else if (e.key === "sendNow" || e.key === "schedule") {
      setSendTiming(e.key === "sendNow" ? "Send Now" : "Schedule");
    }
  };

  const sendTimingMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="sendNow">Send Now</Menu.Item>
      <Menu.Item key="schedule">Schedule</Menu.Item>
    </Menu>
  );

  const handleClose = () => {
    setisVisibleQuickConversation(false);
    setquickConversationView(null);
    setdestinationNumber("");
    setvisibleleadListDropdown(false);
  };

  const handleDial = (digit) => {
    setdestinationNumber((prev) => prev + digit);
  };

  const handleDelete = () => {
    setdestinationNumber((prev) => prev.slice(0, -1));
  };

  const floatMenu = (
    <Menu
      style={{
        backgroundColor: "transparent",
        boxShadow: "none",
        border: "none",
        zIndex: 1000,
      }}
    >
      <Menu.Item
        key="call"
        onClick={() => toggleVisibility("call")}
        style={{
          marginBottom: "10px",
          background: " #fff",
          boxShadow:
            "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <PhoneOutlined style={{ marginRight: 10 }} /> New Call
      </Menu.Item>
      <Menu.Item
        key="sms"
        onClick={() => toggleVisibility("sms")}
        style={{
          marginBottom: "10px",
          background: " #fff",
          boxShadow:
            "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <MessageOutlined style={{ marginRight: 10 }} /> New SMS
      </Menu.Item>
      <Menu.Item
        key="email"
        onClick={() => toggleVisibility("email")}
        style={{
          marginBottom: "10px",
          background: " #fff",
          boxShadow:
            "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <MailOutlined style={{ marginRight: 10 }} /> New Email
      </Menu.Item>
    </Menu>
  );

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

  const handleGetAllCallLogsList = async (search, searchType) => {
    setloadingleadsList(true);
    const token = localStorage.getItem("authToken");
    // let data = {
    //   search: search || "",
    //   searchType: searchType?.trim() || "",
    // };

    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-CallLog`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log();
          setcallLogsDetails(res?.data);
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

  const handleSubmitEmail = async (values) => {
    setbuttonLoader(true);
    if (selectedConversationDetails) {
      if (sendTiming === "Schedule" && !selectScheduleDateTime) {
        openNotificationWithIcon(
          "error",
          "Quick Conversations",
          "Please Select Schedule Date and Time!"
        );
      } else if (!toEmail) {
        openNotificationWithIcon(
          "error",
          "Quick Conversations",
          "Please Select/Enter  To Email!"
        );
      } else if (!values?.subject) {
        openNotificationWithIcon(
          "error",
          "Quick Conversations",
          "Please Enter  Subject!"
        );
      } else if (!values?.message) {
        openNotificationWithIcon(
          "error",
          "Quick Conversations",
          "Please Enter  Message!"
        );
      } else if (!fromEmail) {
        openNotificationWithIcon(
          "error",
          "Quick Conversations",
          "Please Select  From Email!"
        );
      } else {
        const token = localStorage.getItem("authToken");
        let data = {
          to: toEmail,
          from: fromEmail,
          subject: values?.subject,
          text: values?.message,
          lead_id: selectedConversationDetails?.id,
          user_name: selectedConversationDetails?.user_name,
          lead_type: selectedConversationDetails?.LeadType,
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
            setselectScheduleDateTime("");
            emailSend.resetFields();
            setisVisibleQuickConversation(false);
            setbuttonLoader(false);
            openNotificationWithIcon(
              "success",
              "Quick Conversation",
              "Email Send Successfully!"
            );
          })
          .catch((err) => {
            setbuttonLoader(false);
            openNotificationWithIcon(
              "error",
              "Quick Conversations",
              err?.response?.data?.error || err?.message
            );
            console.log(err);
          });
      }
    } else {
      if (sendTiming === "Schedule" && !selectScheduleDateTime) {
        openNotificationWithIcon(
          "error",
          "Quick Conversations",
          "Please Select Schedule Date and Time!"
        );
      } else if (!toEmail) {
        openNotificationWithIcon(
          "error",
          "Quick Conversations",
          "Please Select/Enter  To Email!"
        );
      } else if (!values?.subject) {
        openNotificationWithIcon(
          "error",
          "Quick Conversations",
          "Please Enter  Subject!"
        );
      } else if (!values?.message) {
        openNotificationWithIcon(
          "error",
          "Quick Conversations",
          "Please Enter  Message!"
        );
      } else if (!fromEmail) {
        openNotificationWithIcon(
          "error",
          "Quick Conversations",
          "Please Select  From Email!"
        );
      } else {
        const token = localStorage.getItem("authToken");
        let data = {
          to: toEmail,
          from: fromEmail,
          subject: values?.subject,
          text: values?.message,
          type: "Direct",
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
            setselectScheduleDateTime("");
            emailSend.resetFields();
            setisVisibleQuickConversation(false);
            setbuttonLoader(false);
            openNotificationWithIcon(
              "success",
              "Quick Conversation",
              "Email Send Successfully!"
            );
          })
          .catch((err) => {
            setbuttonLoader(false);
            openNotificationWithIcon(
              "error",
              "Quick Conversations",
              err?.response?.data?.error || err?.message
            );
            console.log(err);
          });
      }
    }
    setbuttonLoader(false);
  };

  const handleSendSMS = async () => {
    setbuttonLoader(true);
    if (selectScheduleDateTime) {
      if (sendTiming === "Schedule" && !selectScheduleDateTime) {
        openNotificationWithIcon(
          "error",
          "Conversations",
          "Please Select Schedule Date and Time!"
        );
      } else if (!selectedConversationDetails?.phone_number) {
        openNotificationWithIcon(
          "error",
          "Conversations",
          "Please Select Lead!"
        );
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
          to: selectedConversationDetails?.phone_number,
          from: "+13083050002",
          lead_id: selectedConversationDetails?.id,
          user_name: selectedConversationDetails?.user_name,
          lead_type: selectedConversationDetails?.lead_type,
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
            setdestinationNumber("");
            setselectedConversationDetails("");
            setisVisibleQuickConversation(false);
            setbuttonLoader(false);
            openNotificationWithIcon(
              "success",
              "Quick Conversation",
              "SMS Send Successfully!"
            );
          })
          .catch((err) => {
            setbuttonLoader(false);
            openNotificationWithIcon(
              "error",
              "Quick Conversation",
              err?.data?.message || err?.message
            );
            console.log(err);
          });
      }
    } else {
      if (!destinationNumber) {
        openNotificationWithIcon(
          "error",
          "Conversations",
          "Please Enter Number!"
        );
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
          to: destinationNumber,
          from: "+13083050002",
          send_type: sendTiming,
          schedule_date_time: selectScheduleDateTime
            ? selectScheduleDateTime?.format("YYYY-MM-DD hh:mm:ss A")
            : undefined,
          type: "Direct",
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
            setdestinationNumber("");
            setselectedConversationDetails("");
            setisVisibleQuickConversation(false);
            setbuttonLoader(false);
            openNotificationWithIcon(
              "success",
              "Quick Conversation",
              "SMS Send Successfully!"
            );
          })
          .catch((err) => {
            setbuttonLoader(false);
            openNotificationWithIcon(
              "error",
              "Quick Conversation",
              err?.data?.message || err?.message
            );
            console.log(err);
          });
      }
    }

    setbuttonLoader(false);
  };

  useEffect(() => {
    setdestinationNumber(selectedConversationDetails?.phone_number);
    settoEmail(selectedConversationDetails?.email);
  }, [isVisibleQuickConversation]);

  return (
    <>
      <Dropdown overlay={floatMenu} trigger={["click"]}>
        <Button
          icon={
            isVisibleQuickConversation ? (
              <CloseOutlined style={{ color: "#fff" }} />
            ) : (
              <QuickSvg style={{ color: "#fff", width: 25 }} />
            )
          }
          onClick={isVisibleQuickConversation ? handleClose : null}
          style={{
            position: "fixed",
            right: 24,
            bottom: 24,
            background: "linear-gradient(180deg, #111124 0%, #1B0756 100%)",
            border: "none",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            color: "#fff",
            width: 50,
            height: 50,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
            zIndex: 1001, // Above overlay
          }}
        />
      </Dropdown>

      {isVisibleQuickConversation &&
        (quickConversationView === "email" ||
          quickConversationView === "sms" ||
          quickConversationView === "call") && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // 50% opacity
              zIndex: 999,
            }}
          />
        )}

      <QuickCall
        isVisibleQuickConversation={isVisibleQuickConversation}
        quickConversationView={quickConversationView}
        callSearch={callSearch}
        setcallSearch={setcallSearch}
        handleGetAllleadList={handleGetAllleadList}
        destinationNumber={destinationNumber}
        handleDelete={handleDelete}
        loadingleadsList={loadingleadsList}
        leadsList={leadsList}
        isQuickConversationCallingPadVisible={
          isQuickConversationCallingPadVisible
        }
        setdestinationNumber={setdestinationNumber}
        setisQuickConversationCallingPadVisible={
          setisQuickConversationCallingPadVisible
        }
        loginUserDetails={loginUserDetails}
        handleDial={handleDial}
        selectedConversationDetails={selectedConversationDetails}
        setselectedConversationDetails={setselectedConversationDetails}
        openNotificationWithIcon={openNotificationWithIcon}
        recentCalllogsVisible={recentCalllogsVisible}
        setrecentCalllogsVisible={setrecentCalllogsVisible}
        handleGetAllCallLogsList={handleGetAllCallLogsList}
        callLogsDetails={callLogsDetails}
      />

      {isVisibleQuickConversation && quickConversationView === "sms" && (
        <Card
          style={{
            position: "fixed",
            right: 90,
            bottom: 24,
            width: 600,
            opacity: 1,
            borderRadius: 8,
            backgroundColor: "#fff",
            color: "#fff",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space
              align="center"
              style={{ justifyContent: "space-between", width: "100%" }}
            >
              <Space>
                <Dropdown overlay={sendTimingMenu} trigger={["click"]}>
                  <Space
                    style={{
                      padding: 5,
                      borderRadius: 5,
                      border: "1px solid #E8EBEF",
                      margin: sendTiming === "Email" ? 5 : "",
                    }}
                  >
                    <IoMdTime style={{ fontSize: 20, display: "flex" }} />
                    <Typography>{sendTiming}</Typography>
                    <MdOutlineKeyboardArrowDown
                      style={{ fontSize: 20, display: "flex" }}
                    />
                  </Space>
                </Dropdown>
                {sendTiming === "Schedule" && (
                  <DatePicker
                    defaultValue={selectScheduleDateTime}
                    showTime
                    disabledDate={(current) =>
                      current && current < dayjs().startOf("day")
                    }
                    format="YYYY-MM-DD hh:mm A"
                    onChange={(e) => setselectScheduleDateTime(e)}
                  />
                )}
              </Space>
              <Space>
                <TbExternalLink style={{ display: "flex" }} />
                <Text type="secondary"> Conversations </Text>
              </Space>
            </Space>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Input
                placeholder="Phone number"
                value={destinationNumber}
                onChange={(e) => {
                  setdestinationNumber(e.target.value);
                }}
                style={{ border: "none", padding: 0, marginBottom: 2 }}
              />
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                placement="topLeft"
                visible={visibleleadListDropdown}
                onVisibleChange={() => {
                  setvisibleleadListDropdown(true);
                }}
              >
                <Space
                  style={{
                    cursor: "pointer",
                    background: "#E8EBEF",
                    display: "flex",
                    alignItems: "center",
                    padding: "5px 5px 0px 5px",
                    borderRadius: 5,
                    color: "#000",
                  }}
                  onClick={() => {
                    handleGetAllleadList();
                  }}
                >
                  <HiOutlineUser size={18} />
                  <MdKeyboardArrowDown size={18} />
                </Space>
              </Dropdown>
            </div>

            <Divider style={{ margin: 0 }} />

            <Input.TextArea
              placeholder="Write your message here..."
              onChange={(e) => {
                setsendContent(e?.target?.value);
              }}
              autoSize={{ minRows: 4, maxRows: 6 }}
              style={{ border: "none", padding: 0, marginBottom: 16 }}
            />

            <Divider style={{ margin: 0 }} />

            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <Space style={{ margin: 5 }}>
                <Button icon={<IoMicOutline />} type="text" />
                <Button icon={<MdOutlinePermMedia />} type="text" />
                <Button icon={<PaperClipOutlined />} type="text" />
                <Divider type="vertical" style={{ margin: 0 }} />
                <Button icon={<UserOutlined />} type="text">
                  Variables
                </Button>
                <Divider type="vertical" style={{ margin: 0 }} />
                <Button icon={<ThunderboltOutlined />} type="text">
                  Templates
                </Button>
              </Space>
              <Button
                loading={buttonLoader}
                onClick={() => {
                  handleSendSMS();
                }}
              >
                Send
              </Button>
            </Space>
          </Space>
        </Card>
      )}

      {isVisibleQuickConversation && quickConversationView === "email" && (
        <Card
          style={{
            position: "fixed",
            right: 90,
            bottom: 24,
            width: 800,
            borderRadius: 8,
            backgroundColor: "#fff",
            color: "#fff",
            opacity: 1,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 1000, // Ensure it is on top of the overlay
          }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space
              align="center"
              style={{ justifyContent: "space-between", width: "100%" }}
            >
              <Space>
                <Dropdown overlay={emailListMenu} trigger={["click"]}>
                  <Space
                    style={{
                      padding: 5,
                      borderRadius: 5,
                      border: "1px solid #E8EBEF",
                      margin: messageType === "Email" ? 5 : "",
                      color: "rgba(0, 0, 0, 0.88)",
                    }}
                  >
                    <LuSend style={{ fontSize: 20, display: "flex" }} />
                    <Typography>{fromEmail}</Typography>
                    <MdOutlineKeyboardArrowDown
                      style={{ fontSize: 20, display: "flex" }}
                    />
                  </Space>
                </Dropdown>
                <Dropdown overlay={sendTimingMenu} trigger={["click"]}>
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
                {sendTiming === "Schedule" && (
                  <DatePicker
                    defaultValue={selectScheduleDateTime}
                    showTime
                    disabledDate={(current) =>
                      current && current < dayjs().startOf("day")
                    }
                    format="YYYY-MM-DD hh:mm A"
                    onChange={(e) => setselectScheduleDateTime(e)}
                  />
                )}
              </Space>
              <Space>
                <TbExternalLink style={{ display: "flex" }} />
                <Text type="secondary" style={{ fontSize: 15 }}>
                  Conversations
                </Text>
              </Space>
            </Space>
            <Form
              form={emailSend}
              onFinish={handleSubmitEmail}
              layout="vertical"
            >
              <Form.Item name="toEmail">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Input
                    placeholder="To"
                    value={toEmail}
                    style={{ border: "none" }}
                    onChange={(e) => {
                      settoEmail(e?.target?.value);
                    }}
                  />
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    placement="topLeft"
                    visible={visibleleadListDropdown}
                    onVisibleChange={(e) => {
                      setvisibleleadListDropdown(true);
                    }}
                  >
                    <Space
                      style={{
                        cursor: "pointer",
                        background: "#E8EBEF",
                        display: "flex",
                        alignItems: "center",
                        padding: "5px 5px 0px 5px",
                        borderRadius: 5,
                      }}
                      onClick={() => {
                        handleGetAllleadList();
                      }}
                    >
                      <HiOutlineUser size={18} />
                      <MdKeyboardArrowDown size={18} />
                    </Space>
                  </Dropdown>
                </div>
              </Form.Item>
              <Divider style={{ margin: 0 }} />
              <Form.Item name="subject">
                <Input placeholder="Subject" style={{ border: "none" }} />
              </Form.Item>
              <Divider style={{ margin: 0 }} />
              <Form.Item name="message">
                <Input.TextArea
                  placeholder="Write your message here..."
                  bordered={false}
                  style={{ resize: "none", height: "80px", border: "none" }}
                />
              </Form.Item>
            </Form>
            <Divider style={{ margin: 0 }} />
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <Space>
                <Button icon={<PaperClipOutlined />} type="text" />
                <Divider type="vertical" style={{ margin: 0 }} />
                <Button icon={<UserOutlined />} type="text">
                  Variables
                </Button>
                <Divider type="vertical" style={{ margin: 0 }} />
                <Button icon={<ThunderboltOutlined />} type="text">
                  Templates
                </Button>
              </Space>
              <Button loading={buttonLoader} onClick={() => emailSend.submit()}>
                Send
              </Button>
            </Space>
          </Space>
        </Card>
      )}
    </>
  );
};

export default QuickConversation;
