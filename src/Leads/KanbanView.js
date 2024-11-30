import React, { useState } from "react";
import {
  Row,
  Col,
  Dropdown,
  Divider,
  Avatar,
  Button,
  Select,
  Badge,
  Card,
  Tooltip,
  Typography,
  Tag,
  Space,
} from "antd";
import { leadStatusColorAndTextList } from "../Common/CommonCodeList";
import { FaPlus } from "react-icons/fa6";
import { ReactComponent as Moneysvg } from "../assets/IconSvg/Vector(1).svg";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { CgShapeCircle } from "react-icons/cg";
import {
  RiCalendarScheduleLine,
  RiDeleteBin5Line,
  RiUserFill,
} from "react-icons/ri";
import dayjs from "dayjs";
import { BiSolidCircle } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { IoCallOutline, IoEyeOutline } from "react-icons/io5";
import { BsArrowClockwise, BsThreeDots } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import { MdEmail, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ReactComponent as Tooth } from "../assets/IconSvg/mdi_tooth.svg";
import { FiEye, FiPhoneCall } from "react-icons/fi";
import axios from "axios";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
const { Text } = Typography;

const KanbanView = ({
  handleGetAllleadsKanbanView,
  handleGetAllleads,
  openNotificationWithIcon,
  kanbanData,
  setKanbanData,
  setIsModalVisible,
  setkanbanAppointment,
  CreateLeadsform,
  setisLeadsDetailsModalVisible,
  setselectedItemDetails,
  setdragCardItemId,
  setisAppointmentModalVisible,
  setisCloseLeadsPaymentModalVisible,
  setisViewLeadModalEditable,
  setisDeleteConfirmationVisible,
  setisDuplicateConfirmationVisible,
  amountList,
  setisVisibleQuickConversation,
  setquickConversationView,
  setselectedConversationDetails,
}) => {
  const [dropIndex, setDropIndex] = useState(null);
  const [currentContainer, setCurrentContainer] = useState(null);
  const getInitials = (name) => {
    const nameParts = name?.split(" ");
    const initials = nameParts?.map((part) => part[0]?.toUpperCase())?.join("");
    return initials;
  };

  const calledAttemptsList = [
    { label: "⁠First call", value: "first call" },
    { label: "⁠⁠Second call", value: "⁠⁠second call" },
    { label: "⁠⁠Third call ", value: "⁠⁠third call " },
    { label: "No communication", value: "no communication" },
    { label: "Other", value: "other" },
  ];

  const handlekanbanCardMenu = (e, item) => {
    if (e?.key === "viewDetails") {
      setselectedItemDetails(item);
      setisLeadsDetailsModalVisible(true);
    } else if (e?.key === "edit") {
      setselectedItemDetails(item);
      setisViewLeadModalEditable(true);
      setisLeadsDetailsModalVisible(true);
    } else if (e?.key === "duplicate") {
      setselectedItemDetails(item);
      setisDuplicateConfirmationVisible(true);
    } else if (e?.key === "delete") {
      setselectedItemDetails(item);
      setisDeleteConfirmationVisible(true);
    }
  };

  const kanbanCardMenu = [
    {
      label: <>View Details</>,
      icon: <IoEyeOutline style={{ fontSize: 16 }} />,
      key: "viewDetails",
    },
    {
      label: <>Edit</>,
      icon: <CiEdit style={{ fontSize: 16 }} />,
      key: "edit",
    },
    // {
    //   label: <>Duplicate</>,
    //   icon: <HiOutlineDocumentDuplicate style={{ fontSize: 16 }} />,
    //   key: "duplicate",
    // },
    {
      label: <>Delete</>,
      icon: <RiDeleteBin5Line style={{ fontSize: 16 }} />,
      key: "delete",
    },
  ];

  const onDragEnd = async (result) => {
    setDropIndex(null); // Reset drop index when dragging ends
    const { destination, source } = result;
    setdragCardItemId(result?.draggableId);
    // If dropped outside the list or not moved
    if (!destination) return;
    let tempDragDetails = kanbanData[result?.source?.droppableId].find(
      (lead) => lead.id?.toString() === result?.draggableId
    );
    setselectedItemDetails(tempDragDetails);
    const sourceContainer = source.droppableId;
    const destinationContainer = destination.droppableId;
    if (
      result?.destination?.droppableId === "Appointment" &&
      sourceContainer !== destinationContainer
    ) {
      let temp = kanbanData[result?.source?.droppableId].find(
        (lead) => lead.id?.toString() === result?.draggableId
      );

      if (temp?.email && temp?.first_name && temp?.last_name) {
        setisAppointmentModalVisible(true);
        return;
      } else {
        // setisLeadsDetailsModalVisible(true);
        openNotificationWithIcon(
          "error",
          "Lead",
          "To continue, please make sure to include your email, first name, and last name."
        );
        return;
      }
    } else if (
      result?.destination?.droppableId === "Closed" &&
      sourceContainer !== destinationContainer
    ) {
      setisCloseLeadsPaymentModalVisible(true);
      return;
    } else if (sourceContainer !== destinationContainer) {
      await handleUpdateLeadsTypeForDragItem(
        result?.draggableId,
        result?.destination?.droppableId
      );
    }
    // If dragging within the same container
    if (sourceContainer === destinationContainer) {
      const updatedItems = Array.from(kanbanData[sourceContainer]);
      const [movedItem] = updatedItems.splice(source.index, 1);
      updatedItems.splice(destination.index, 0, movedItem);

      setKanbanData((prevItems) => ({
        ...prevItems,
        [sourceContainer]: updatedItems,
      }));
    } else {
      // If dragging between different containers
      const sourceItems = Array.from(kanbanData[sourceContainer]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      const destinationItems = Array.from(kanbanData[destinationContainer]);
      destinationItems.splice(destination.index, 0, movedItem);

      setKanbanData((prevItems) => ({
        ...prevItems,
        [sourceContainer]: sourceItems,
        [destinationContainer]: destinationItems,
      }));
    }
  };

  const onDragUpdate = (update) => {
    const { destination } = update;
    if (destination) {
      setDropIndex(destination.index);
      setCurrentContainer(destination.droppableId);
    } else {
      setDropIndex(null);
      setCurrentContainer(null);
    }
  };

  const handleupdateContact = (id, value) => {
    const data = {
      id: id,
      contacted_attempts: value,
    };
    const token = localStorage.getItem("authToken");
    axios
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
        handleGetAllleads();
        openNotificationWithIcon(
          "success",
          "Kanban Lead",
          "Lead Updated Successfully !"
        );
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Kanban View",
          err?.response?.data || err?.message
        );
      });
  };

  const handleUpdateLeadsTypeForDragItem = (id, type) => {
    const data = {
      id: id,
      lead_status: type,
    };
    const token = localStorage.getItem("authToken");
    axios
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
        handleGetAllleads();
        openNotificationWithIcon(
          "success",
          "Kanban Lead",
          "Lead Updated Successfully !"
        );
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Customize View",
          err?.response?.data || err?.message
        );
      });
  };

  const handleResendAppointmentMail = async (item) => {
    const token = localStorage.getItem("authToken");
    let data = {
      id: item?.id,
    };
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/resendAppointmentMail`,
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
          "Lead",
          "Appointment Mail Successfully  Send Please Check Your Inbox!"
        );
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Lead",
          err?.response?.data || err?.message
        );
      });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <div style={{ display: "flex", height: "75vh", overflow: "auto" }}>
          {Object?.keys(kanbanData)?.map((containerId) => (
            <>
              <Droppable key={containerId} droppableId={containerId}>
                {(provided, snap1) => (
                  <div key={containerId} style={{ flex: "0 0 300px" }}>
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        width: 330,
                        padding: "10px",
                        background: !snap1?.isDraggingOver
                          ? "#F8FAFF"
                          : "#E9EFFF",
                        border: !snap1?.isDraggingOver
                          ? "1px solid #E8EBEF"
                          : "1px solid #A07FFF",
                        borderRadius: "10px",
                        position: "relative",
                        margin: 10,
                        overflow: "auto",
                        height: "100vh",
                      }}
                    >
                      <Row
                        justify="space-between"
                        align="middle"
                        key={containerId}
                      >
                        <Col>
                          <Text
                            strong
                            style={{
                              fontSize: "16px",
                              display: "block",
                            }}
                          >
                            <Tag
                              style={{
                                backgroundColor:
                                  leadStatusColorAndTextList.find(
                                    (item) => item.status === containerId
                                  )?.backgroud,
                                color: leadStatusColorAndTextList.find(
                                  (item) => item.status === containerId
                                )?.color,
                                border: "none",
                                fontSize: 14,
                              }}
                            >
                              {
                                leadStatusColorAndTextList.find(
                                  (item) => item.status === containerId
                                )?.text
                              }
                            </Tag>
                          </Text>
                          <Text
                            style={{
                              color: "#a0a0a0",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Moneysvg style={{ width: 16, marginRight: 10 }} />
                            <span className="custom-text1">
                              $
                              {
                                amountList?.filter(
                                  (i) => i?.status === containerId
                                )[0]?.amount
                              }
                            </span>
                          </Text>
                        </Col>
                        <Col>
                          <Badge
                            style={{
                              backgroundColor: leadStatusColorAndTextList.find(
                                (item) => item.status === containerId
                              )?.backgroud,
                              color: leadStatusColorAndTextList.find(
                                (item) => item.status === containerId
                              )?.color,
                              borderRadius: 5,
                              border: "none",
                            }}
                            count={kanbanData[containerId]?.length}
                          />
                        </Col>
                        <div
                          style={{
                            marginBottom: "16px",
                            width: "100%",
                            borderRadius: "8px",
                            background: "#F5F5FA",
                          }}
                        >
                          <Button
                            type="dashed"
                            block
                            style={{ background: "#F5F5FA" }}
                            onClick={() => {
                              setIsModalVisible(true);
                              if (containerId === "Appointment") {
                                setkanbanAppointment(true);
                              }
                              CreateLeadsform.setFieldsValue({
                                lead_status: containerId,
                              });
                            }}
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </Row>
                      {kanbanData[containerId]?.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item?.id?.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                margin: 10,
                              }}
                            >
                              <Card className="kanban-custom-card">
                                <Card.Meta
                                  avatar={
                                    <Avatar
                                      style={{
                                        backgroundColor: item?.avatar_color,
                                      }}
                                    >
                                      {item?.first_name && item?.last_name
                                        ? getInitials(
                                            item?.first_name +
                                              " " +
                                              item?.last_name
                                          )
                                        : "CL"}
                                    </Avatar>
                                  }
                                  title={
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        paddingBottom: 10,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "grid",
                                        }}
                                      >
                                        <Text>
                                          {item?.first_name &&
                                          item?.last_name ? (
                                            item?.first_name +
                                            " " +
                                            item?.last_name
                                          ) : (
                                            <Tag />
                                          )}
                                        </Text>
                                        <Text className="custom-text1">
                                          {item?.LeadType === "Call_lead"
                                            ? item.phone_number
                                            : item.phone_number}
                                        </Text>
                                      </div>
                                      <div>
                                        <Dropdown
                                          menu={{
                                            items: kanbanCardMenu,
                                            onClick: (e) => {
                                              handlekanbanCardMenu(e, item);
                                            },
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
                                  }
                                />

                                <div
                                  className="containerStyle thumbStyle"
                                  style={{
                                    height: "130px",
                                    overflowY: "auto",
                                    // scrollbarColor: "auto",
                                    // scrollbarWidth: "auto",
                                  }}
                                >
                                  {item?.appointment_date_time ? (
                                    <>
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
                                          <RiCalendarScheduleLine
                                            style={{
                                              fontSize: 16,
                                              color: "#72779E",
                                              display: "flex",
                                            }}
                                          />
                                        </Col>
                                        <Col span={22}>
                                          <Text>
                                            {dayjs(
                                              item?.appointment_date_time
                                            ).format("MMM DD,YYYY hh:mm A")}
                                          </Text>
                                        </Col>
                                      </Row>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.appointment_date_time ? (
                                    <>
                                      <Row
                                        align="middle"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <Col span={2}></Col>
                                        <Col span={22}>
                                          {containerId === "Appointment" ? (
                                            <>
                                              <Space style={{ margin: 1 }}>
                                                {item?.appointment_status ===
                                                "Confirmed" ? (
                                                  <BiSolidCircle
                                                    style={{
                                                      fontSize: 16,
                                                      color: "green",
                                                      display: "flex",
                                                    }}
                                                  />
                                                ) : (
                                                  <CgShapeCircle
                                                    style={{
                                                      fontSize: 16,
                                                      color: "red",
                                                      display: "flex",
                                                    }}
                                                  />
                                                )}
                                                <Typography
                                                  style={{
                                                    color:
                                                      item?.appointment_status !==
                                                      "Confirmed"
                                                        ? "red"
                                                        : "green",
                                                  }}
                                                >
                                                  {item?.appointment_status}
                                                </Typography>

                                                {item?.appointment_status !==
                                                "Confirmed" ? (
                                                  <Space
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                      handleResendAppointmentMail(
                                                        item
                                                      );
                                                    }}
                                                  >
                                                    <BsArrowClockwise
                                                      style={{
                                                        fontSize: 16,
                                                        color: "blue",
                                                        display: "flex",
                                                      }}
                                                    />
                                                    <Typography
                                                      style={{
                                                        color: "blue",
                                                      }}
                                                    >
                                                      Re send
                                                    </Typography>
                                                  </Space>
                                                ) : (
                                                  <></>
                                                )}
                                              </Space>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </Col>
                                        <Divider
                                          style={{
                                            margin: 0,
                                            padding: 0,
                                          }}
                                        />
                                      </Row>
                                    </>
                                  ) : (
                                    <></>
                                  )}

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
                                      <Text>
                                        {item?.email ? item?.email : "-"}
                                      </Text>
                                    </Col>
                                  </Row>

                                  <>
                                    <Divider
                                      style={{
                                        margin: 0,
                                        padding: 0,
                                      }}
                                    />

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
                                        <Text>
                                          {item.treatment
                                            ? item?.treatment
                                            : "-"}
                                        </Text>
                                      </Col>
                                    </Row>
                                  </>

                                  {item.lead_type ? (
                                    <>
                                      <Divider
                                        style={{
                                          margin: 0,
                                          padding: 0,
                                        }}
                                      />
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
                                          <Text type="secondary">
                                            #{item.lead_type}
                                          </Text>
                                        </Col>
                                      </Row>
                                      <Divider
                                        style={{
                                          margin: 0,
                                          padding: 0,
                                        }}
                                      />
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  {containerId === "Contacted" ? (
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
                                        <FiPhoneCall
                                          style={{
                                            width: 16,
                                            color: "#72779E",
                                            display: "flex",
                                          }}
                                        />
                                      </Col>
                                      <Col span={22}>
                                        <Select
                                          placeholder="Select Attempts"
                                          style={{
                                            width: "100%",
                                          }}
                                          defaultValue={
                                            item?.contacted_attempts
                                          }
                                          size="small"
                                          suffixIcon={
                                            <MdOutlineKeyboardArrowDown
                                              style={{
                                                fontSize: 20,
                                              }}
                                            />
                                          }
                                          onChange={(e) => {
                                            handleupdateContact(item?.id, e);
                                          }}
                                          options={calledAttemptsList}
                                        ></Select>
                                      </Col>
                                    </Row>
                                  ) : (
                                    ""
                                  )}

                                  {item?.close_amount ? (
                                    <>
                                      <Divider
                                        style={{
                                          margin: 0,
                                          padding: 0,
                                        }}
                                      />
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
                                          <Moneysvg
                                            style={{
                                              width: 16,
                                              color: "#72779E",
                                              display: "flex",
                                            }}
                                          />
                                        </Col>
                                        <Col span={22}>
                                          <Text>${item?.close_amount}</Text>
                                        </Col>
                                      </Row>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>

                                <Row
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    height:40
                                  }}
                                >
                                  <Divider
                                    style={{
                                      margin: 0,
                                      padding: 3,
                                    }}
                                  />
                                  <Tooltip placement="top" title={"Phone Call"}>
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
                                      className="custom-IoCallOutline"
                                      onClick={() => {
                                        setisVisibleQuickConversation(true);
                                        setquickConversationView("call");
                                        setselectedConversationDetails(item);
                                      }}
                                    />
                                  </Tooltip>
                                  <Tooltip placement="top" title={"Send SMS"}>
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
                                      className="custom-HiOutlineChatBubbleLeft"
                                      onClick={() => {
                                        setisVisibleQuickConversation(true);
                                        setquickConversationView("sms");
                                        setselectedConversationDetails(item);
                                      }}
                                    />
                                  </Tooltip>
                                  <Tooltip placement="top" title={"Send Mail"}>
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
                                      className="custom-GoMail"
                                      onClick={() => {
                                        setisVisibleQuickConversation(true);
                                        setquickConversationView("email");
                                        setselectedConversationDetails(item);
                                      }}
                                    />
                                  </Tooltip>

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
                                  <Tooltip
                                    placement="top"
                                    title={"View Details"}
                                  >
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
                                      onClick={() => {
                                        setisLeadsDetailsModalVisible(true);
                                        setselectedItemDetails(item);
                                      }}
                                    />
                                  </Tooltip>
                                </Row>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {/* Dotted Box Logic */}
                      {dropIndex === 0 ? (
                        <>
                          {dropIndex !== null &&
                            currentContainer === containerId && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: `${dropIndex * 380}px`,
                                  left: "0",
                                  right: "0",
                                  margin: 20,
                                  marginTop: 100,
                                  height: "300px",
                                  border: "2px dashed #3900DB",
                                  borderRadius: "4px",
                                  pointerEvents: "none",
                                }}
                              />
                            )}
                        </>
                      ) : (
                        <>
                          {" "}
                          {dropIndex !== null &&
                            currentContainer === containerId && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: `${dropIndex * 380}px`,
                                  left: "0",
                                  right: "0",
                                  margin: 20,
                                  height: "280px",
                                  border: "2px dashed #3900DB",
                                  borderRadius: "4px",
                                  pointerEvents: "none",
                                }}
                              />
                            )}
                        </>
                      )}

                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default KanbanView;
