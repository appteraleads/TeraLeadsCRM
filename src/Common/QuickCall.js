/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Badge,
  Button,
  Col,
  Empty,
  Input,
  Menu,
  Row,
  Space,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { MdOutlineRecentActors } from "react-icons/md";
import { getInitials } from "./ReturnColumnValue";
import {
  PhoneOutlined,
  CloseCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { TelnyxRTC } from "@telnyx/webrtc";
import axios from "axios";
const { Text } = Typography;
const QuickCall = ({
  isVisibleQuickConversation,
  quickConversationView,
  callSearch,
  setcallSearch,
  handleGetAllleadList,
  destinationNumber,
  handleDelete,
  loadingleadsList,
  leadsList,
  isQuickConversationCallingPadVisible,
  setdestinationNumber,
  setisQuickConversationCallingPadVisible,
  loginUserDetails,
  handleDial,
  selectedConversationDetails,
  setselectedConversationDetails,
  openNotificationWithIcon,
  recentCalllogsVisible,
  setrecentCalllogsVisible,
  handleGetAllCallLogsList,
  callLogsDetails,
}) => {
  const client = useRef(null);
  const audioElementRef = useRef(null);
  const ringtoneRef = useRef(new Audio("/ringtone.mp3"));
  const [call, setCall] = useState(null);
  const [callState, setCallState] = useState("idle");
  const [callDuration, setCallDuration] = useState(0);
  const [timer, setTimer] = useState(null);

  // Test the ringtone
  const testAudio = () => {
    ringtoneRef.current
      .play()
      .catch((error) => console.error("Error playing the sound:", error));
  };
  useEffect(() => {
    // ringtoneRef.current.play();
    client.current = new TelnyxRTC({
      login: "teracrmdev",
      password: "Teraleads123!",
      websocketHost: "wss://rtc.telnyx.com/call",
    });

    client.current.connect();

    client.current.on("telnyx.ready", () => {
      console.log("Telnyx client ready");
    });

    client.current.on("telnyx.error", (error) => {
      console.error("Telnyx client error:", error);
    });

    client.current.on("telnyx.notification", (notification) => {
      switch (notification.type) {
        case "callUpdate":
          if (notification?.call?.state === "ringing") {
            setCall(notification.call);
            setCallState("Calling...");
          } else if (notification.call.state === "active") {
            console.log(notification);
            setCallState("Active");
            audioElementRef.current.srcObject =
              notification?.call?.remoteStream;
            startTimer();
            ringtoneRef?.current?.pause();
            ringtoneRef.current.currentTime = 0;
          } else if (notification.call.state === "hangup") {
            updateCallLog(notification);
            console.log(notification);
            setisQuickConversationCallingPadVisible(false);
            cleanUpCall();
          }
          break;
        default:
          break;
      }
    });

    return () => {
      client.current.disconnect();
    };
  }, []);

  const CreateCallLog = async (item) => {
    const token = localStorage.getItem("authToken");
    let data = {
      lead_id: selectedConversationDetails?.id
        ? selectedConversationDetails?.id
        : "",
      clinic_id: loginUserDetails?.clinic_id ? loginUserDetails?.clinic_id : "",
      caller_number: item?.options?.callerNumber,
      recipient_id: "",
      phone_number: destinationNumber ? destinationNumber : destinationNumber,
      call_start: "",
      call_end: "",
      duration: "",
      call_status: callState,
      direction: item?.direction,
      recording_url: "",
      notes: "",
      session_id: item?.session?.sessionid,
      uuid: item?.session?.uuid,
    };

    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/createCallLog`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCallLog = async (item) => {
    console.log(item?.call?.prevState);
    const token = localStorage.getItem("authToken");
    let data = {
      call_start: "",
      call_end: "",
      duration: "",
      call_status: item?.call?.prevState,
      uuid: item?.call?.session?.uuid,
    };

    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/updateCallLog`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeCall = () => {
    console.log(loginUserDetails?.phone)
    if (destinationNumber?.trim() && destinationNumber) {
      const newCall = client.current.newCall({
        destinationNumber,
        callerNumber: "+12393459996",
        options: {
          audio: true,
          video: false,
        },
      });
      //+13083050002
      //+12393459996
      testAudio();
      setCall(newCall);
      setCallState("Calling...");
      setisQuickConversationCallingPadVisible(true);
      CreateCallLog(newCall);
    } else {
      openNotificationWithIcon(
        "error",
        "Conversatios",
        "Please enter phone number"
      );
    }
  };

  const hangUp = () => {
    if (call) {
      call.hangup();
      cleanUpCall();
    }
    setisQuickConversationCallingPadVisible(false);
  };

  const cleanUpCall = () => {
    stopTimer();
    setCall(null);
    setCallState("idle");
    setCallDuration(0);
    setisQuickConversationCallingPadVisible(false);
    ringtoneRef.current.pause();
    ringtoneRef.current.currentTime = 0;
  };

  const startTimer = () => {
    setTimer(
      setInterval(() => {
        setCallDuration((prevDuration) => prevDuration + 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    setdestinationNumber(selectedConversationDetails?.phone_number);
  }, [isVisibleQuickConversation]);

  return (
    <>
      {isVisibleQuickConversation && quickConversationView === "call" && (
        <>
          <div
            style={{
              position: "fixed",
              right: 90,
              bottom: 24,
              width: 300,
              height: 450,
              opacity: 1,
              borderRadius: 20,
              backgroundColor: "#111124",
              color: "#fff",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                position: "fixed",
                right: 90,
                width: 300,
                bottom: 24,
                height: 450,
                opacity: 1,
                borderRadius: 20,
                backgroundColor: "#111124",
                color: "#fff",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "20px",
              }}
            >
              {callSearch ? (
                <>
                  <Menu
                    style={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      border: "none",
                    }}
                  >
                    <Space
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 10,
                        padding: 2,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#7A7AA5",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setcallSearch(false);
                        }}
                      >
                        <IoChevronBack />
                        <span style={{ color: "#7A7AA5" }}>Back</span>
                      </div>
                      <Space>
                        <Input
                          placeholder="Search in your lead"
                          style={{
                            backgroundColor: "#2A2A3B",
                            color: "#fff",
                            fontSize: 14,
                            borderRadius: 10,
                            border: "1px solid #3A3A4D",
                          }}
                          onChange={(e) =>
                            handleGetAllleadList(e.target.value, "text")
                          }
                          suffix={
                            destinationNumber && (
                              <CloseCircleOutlined
                                onClick={handleDelete}
                                style={{
                                  color: "#fff",
                                  fontSize: 18,
                                  cursor: "pointer",
                                }}
                              />
                            )
                          }
                          className="custom-input"
                        />
                      </Space>
                    </Space>

                    <div
                      style={{
                        maxHeight: "350px",
                        overflowY: "auto",
                      }}
                    >
                      <Menu
                        style={{
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          border: "none",
                          width: "100%",
                        }}
                      >
                        {loadingleadsList ? (
                          <Menu.Item
                            key="loading"
                            style={{ color: "#72779E" }}
                            className="ant-menu-item ant-menu-item-selected"
                          >
                            <Spin style={{ marginRight: 10 }} size="small" />{" "}
                            Loading....
                          </Menu.Item>
                        ) : (
                          <>
                            {leadsList.length > 0 ? (
                              <>
                                {leadsList?.map((lead) => (
                                  <Menu.Item
                                    key={lead?.id}
                                    onClick={(e) => {
                                      setselectedConversationDetails(lead);
                                      setdestinationNumber(lead?.phone_number);
                                      setcallSearch(false);
                                    }}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginBottom: 20,
                                      padding: 5,
                                      backgroundColor: "transparent !important",
                                    }}
                                  >
                                    <Row
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "224px",
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
                                                lead?.first_name +
                                                  " " +
                                                  lead?.last_name
                                              )
                                            : lead?.phone_number}
                                        </Avatar>
                                        <div style={{ display: "grid" }}>
                                          <Text style={{ color: "#EBEBFF" }}>
                                            {lead?.first_name && lead?.last_name
                                              ? lead?.first_name +
                                                " " +
                                                lead?.last_name
                                              : lead?.phone_number}
                                          </Text>

                                          <Text style={{ color: "#72779E" }}>
                                            {lead?.phone_number
                                              ? lead?.phone_number
                                              : ""}
                                          </Text>
                                        </div>
                                      </Col>
                                      <Col span={3}>
                                        <Button
                                          className="custom-conversation-call-icon"
                                          icon={<PhoneOutlined />}
                                          style={{
                                            backgroundColor: "#23243B",
                                            border: "none",
                                            color: "#fff",
                                            width: 30,
                                            height: 30,
                                            fontSize: 16,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: 10,
                                          }}
                                        />
                                      </Col>
                                    </Row>
                                  </Menu.Item>
                                ))}
                              </>
                            ) : (
                              <Empty
                                className="custom-ant-empty-description"
                                description="No lead found"
                              />
                            )}
                          </>
                        )}
                      </Menu>
                    </div>
                  </Menu>
                </>
              ) : recentCalllogsVisible ? (
                <>
                  <>
                    <Menu
                      style={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        border: "none",
                      }}
                    >
                      <Space
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 10,
                          padding: 2,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: "#7A7AA5",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setrecentCalllogsVisible(false);
                          }}
                        >
                          <IoChevronBack />
                          <span style={{ color: "#7A7AA5" }}>Back</span>
                        </div>
                        <Space>
                          {/* <Input
                            placeholder="Search in your lead"
                            style={{
                              backgroundColor: "#2A2A3B",
                              color: "#fff",
                              fontSize: 14,
                              borderRadius: 10,
                              border: "1px solid #3A3A4D",
                            }}
                            onChange={(e) =>
                              handleGetAllleadList(e.target.value, "text")
                            }
                            suffix={
                              destinationNumber && (
                                <CloseCircleOutlined
                                  onClick={handleDelete}
                                  style={{
                                    color: "#fff",
                                    fontSize: 18,
                                    cursor: "pointer",
                                  }}
                                />
                              )
                            }
                            className="custom-input"
                          /> */}
                        </Space>
                      </Space>

                      <div
                        style={{
                          maxHeight: "350px",
                          overflowY: "auto",
                        }}
                      >
                        <Menu
                          style={{
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            border: "none",
                            width: "100%",
                          }}
                        >
                          {loadingleadsList ? (
                            <Menu.Item
                              key="loading"
                              style={{ color: "#72779E" }}
                              className="ant-menu-item ant-menu-item-selected"
                            >
                              <Spin style={{ marginRight: 10 }} size="small" />{" "}
                              Loading....
                            </Menu.Item>
                          ) : (
                            <>
                              {callLogsDetails?.length > 0 ? (
                                <>
                                  {callLogsDetails?.map((calldetail) => (
                                    <Menu.Item
                                      key={calldetail?.id}
                                      onClick={(e) => {
                                        setselectedConversationDetails(
                                          calldetail
                                        );
                                        setdestinationNumber(
                                          calldetail?.phone_number
                                        );
                                        setrecentCalllogsVisible(false);
                                      }}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: 20,
                                        padding: 10,
                                        height:50,
                                        backgroundColor:
                                          "transparent !important",
                                      }}
                                    >
                                      <Row
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          width: "224px",
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
                                              backgroundColor: calldetail?.Lead?.avatar_color?calldetail?.Lead?.avatar_color:"red",
                                              fontSize: 14,
                                              marginRight: 10,
                                            }}
                                          >
                                            {calldetail?.Lead?.first_name &&
                                            calldetail?.Lead?.last_name
                                              ? getInitials(
                                                  calldetail?.Lead?.first_name +
                                                    " " +
                                                    calldetail?.Lead?.last_name
                                                )
                                              : calldetail?.phone_number}
                                          </Avatar>
                                          <div style={{ display: "grid" }}>
                                            <Text style={{ color: "#EBEBFF" }}>
                                              {calldetail?.Lead?.first_name &&
                                              calldetail?.Lead?.last_name
                                                ? calldetail?.Lead?.first_name +
                                                  " " +
                                                  calldetail?.Lead?.last_name
                                                : calldetail?.Lead
                                                    ?.phone_number}
                                            </Text>

                                            <Text style={{ color: "#72779E" }}>
                                              {calldetail?.phone_number
                                                ? calldetail?.phone_number
                                                : ""}
                                            </Text>
                                          </div>
                                        </Col>
                                        <Col span={3}>
                                          <Badge size="small" count={calldetail?.total_count} style={{boxShadow:'none'}}>
                                            <Button
                                              className="custom-conversation-call-icon"
                                              icon={<PhoneOutlined />}
                                              style={{
                                                backgroundColor: "#23243B",
                                                border: "none",
                                                color: "#fff",
                                                width: 30,
                                                height: 30,
                                                fontSize: 16,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: 10,
                                              }}
                                            />
                                          </Badge>
                                        </Col>
                                      </Row>
                                    </Menu.Item>
                                  ))}
                                </>
                              ) : (
                                <Empty
                                  className="custom-ant-empty-description"
                                  description="No lead found"
                                />
                              )}
                            </>
                          )}
                        </Menu>
                      </div>
                    </Menu>
                  </>
                </>
              ) : isQuickConversationCallingPadVisible ? (
                <>
                  <Row>
                    <Col
                      span={24}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: 10,
                        height: "15vh",
                      }}
                    >
                      {selectedConversationDetails ? (
                        <Avatar
                          size={100}
                          style={{
                            backgroundColor:
                              selectedConversationDetails?.avatar_color
                                ? selectedConversationDetails?.avatar_color
                                : "#9400d3",
                            fontSize: 35,
                          }}
                        >
                          {selectedConversationDetails?.first_name &&
                          selectedConversationDetails?.last_name
                            ? getInitials(
                                selectedConversationDetails?.first_name +
                                  " " +
                                  selectedConversationDetails?.last_name
                              )
                            : ""}
                        </Avatar>
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col
                      span={24}
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        padding: 10,
                      }}
                    >
                      <Typography
                        style={{
                          color: "#EBEBFF",
                          fontSize: 20,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {selectedConversationDetails?.first_name &&
                        selectedConversationDetails?.last_name
                          ? selectedConversationDetails?.first_name +
                            " " +
                            selectedConversationDetails?.last_name
                          : ""}
                      </Typography>
                      <Typography
                        style={{
                          color: "#EBEBFF",
                          fontSize: 16,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {selectedConversationDetails?.phone_number
                          ? selectedConversationDetails?.phone_number
                          : destinationNumber}
                      </Typography>
                    </Col>

                    <Col
                      span={24}
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        padding: 10,
                      }}
                    >
                      <Typography
                        style={{
                          color: "#EBEBFF",
                          fontSize: 14,
                          padding: 20,
                        }}
                      >
                        {callState === "Calling..." && <>{callState}</>}

                        {callState === "Active" && (
                          <> ({formatDuration(callDuration)})</>
                        )}
                      </Typography>
                    </Col>
                  </Row>
                  {callState === "Calling..." && (
                    <>
                      <Button
                        type="primary"
                        danger
                        className="large-button"
                        onClick={hangUp}
                        style={{
                          color: "#fff",
                          width: "100%",
                          border: "none",
                          height: 35,
                          fontSize: 16,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 8,
                          marginTop: 100,
                        }}
                      >
                        Hang Up
                      </Button>
                    </>
                  )}

                  {callState === "Active" && (
                    <Button
                      icon={<PhoneOutlined />}
                      style={{
                        backgroundColor: "#DB0000",
                        borderColor: "#28a745",
                        color: "#fff",
                        width: "100%",
                        border: "none",
                        height: 35,
                        fontSize: 16,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8,
                        marginTop: 90,
                      }}
                      onClick={hangUp}
                    >
                      Cancel
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <div
                    style={{
                      backgroundColor: "#2A2A3B",
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 14,
                      marginBottom: 16,
                      padding: "8px 16px",
                      borderRadius: 10,
                      border: "1px solid #3A3A4D",
                    }}
                  >
                    From
                    {loginUserDetails?.Clinic?.clinic_phone_number
                      ? loginUserDetails?.Clinic?.clinic_phone_number
                      : "+12393459996"}
                  </div>

                  <Input
                    value={destinationNumber}
                    placeholder="Enter Phone Number"
                    style={{
                      backgroundColor: "#2A2A3B",
                      color: "#fff",
                      textAlign: "center", // Center text horizontally
                      fontSize: 14,
                      marginBottom: 16,
                      padding: "8px 16px", // Adjust padding to ensure proper vertical centering
                      borderRadius: 10,
                      border: "1px solid #3A3A4D",
                      display: "flex", // Add flexbox for vertical centering
                      alignItems: "center", // Vertically center text
                    }}
                    onChange={(e) => setdestinationNumber(e.target.value)}
                    suffix={
                      destinationNumber && (
                        <CloseCircleOutlined
                          onClick={handleDelete}
                          style={{
                            color: "#fff",
                            fontSize: 18,
                            cursor: "pointer",
                          }}
                        />
                      )
                    }
                  />

                  <style>
                    {`
             .ant-input::placeholder {
               color: #fff;
             }
           `}
                  </style>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 10,
                      marginBottom: 16,
                    }}
                  >
                    {[
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "+",
                      "0",
                      "#",
                    ].map((digit) => (
                      <Button
                        key={digit}
                        onClick={() => handleDial(digit)}
                        style={{
                          backgroundColor: "#2A2A3B",
                          color: "#fff",
                          fontSize: 20,
                          width: "100%",
                          height: 50,
                          borderRadius: 12,
                          border: "1px solid #3A3A4D",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {digit}
                      </Button>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Tooltip title={"Recent Calls"}>
                      <Button
                        icon={<MdOutlineRecentActors />}
                        style={{
                          backgroundColor: "#2A2A3B",
                          borderColor: "#3A3A4D",
                          color: "#fff",
                          width: "15%",
                          height: 35,
                          fontSize: 20,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: 10,
                          borderRadius: 5,
                        }}
                        onClick={() => {
                          setrecentCalllogsVisible(true);
                          handleGetAllCallLogsList();
                        }}
                      />
                    </Tooltip>
                    {callState === "idle" && (
                      <Button
                        onClick={() => {
                          makeCall();
                        }}
                        icon={<PhoneOutlined />}
                        style={{
                          backgroundColor: "#28a745",
                          borderColor: "#28a745",
                          color: "#fff",
                          width: "80%",
                          border: "none",
                          height: 35,
                          fontSize: 16,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 8,
                        }}
                      >
                        Call
                      </Button>
                    )}

                    <Tooltip title={"Contact"}>
                      <Button
                        icon={<UserOutlined />}
                        style={{
                          backgroundColor: "#2A2A3B",
                          borderColor: "#3A3A4D",
                          color: "#fff",
                          width: "15%",
                          height: 35,
                          fontSize: 20,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 10,
                          borderRadius: 5,
                        }}
                        onClick={() => {
                          setcallSearch(true);
                          handleGetAllleadList();
                        }}
                      />
                    </Tooltip>
                  </div>
                </>
              )}
            </div>
            <audio ref={audioElementRef} autoPlay className="audio" />
          </div>
        </>
      )}
    </>
  );
};

export default QuickCall;
