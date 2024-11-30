/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  List,
  Button,
  Divider,
  Typography,
  Space,
  Skeleton,
  Dropdown,
  Menu,
  Spin,
  Checkbox,
  Empty,
  Tabs,
} from "antd";
import "./style.css";
import { BsArrowClockwise } from "react-icons/bs";
import { ReactComponent as NextIcon } from "../assets/IconSvg/NextIcon.svg";
import { IoArrowForward } from "react-icons/io5";
import { getInitials } from "../Common/ReturnColumnValue";
import dayjs from "dayjs";
import Search from "antd/es/transfer/search";
import axios from "axios";
import { leadStatusColorAndTextListForCalender } from "../Common/CommonCodeList";
const { Text } = Typography;
const Overview = ({
  setdefaultActiveKey,
  pageLoader,
  todaysAppointmentsCount,
  totalAppointmentsCount,
  confirmedAppointmentsCount,
  notConfirmedAppointmentsCount,
  appointmentsData,
  pastappointmentsData,
  dateCheck,
  handleGetAppointmentOverview,
  setisLeadsDetailsModalVisible,
  selectedItemDetails,
  setselectedItemDetails,
  total_noShow,
  setisModalVisibleViewLeadDetailsShort,
  handleGetAllLeadStatusNotConfirm,
  loadingleadsList,
  visibleleadNotConfirmDropdown,
  setvisibleleadNotConfirmDropdown,
  leadsListNotConfirmDetails,
  openNotificationWithIcon,
  setisModalVisibleLeadListAccodingToStatus,
  setselectedCardTitle,
}) => {
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const handleVisibleChange = (visible) => {
    setvisibleleadNotConfirmDropdown(visible);
  };

  const items = [
    {
      key: "1",
      label: "Upcoming Appointments",
      children: (
        <>
          {pageLoader ? (
            <>
              <Skeleton />
            </>
          ) : (
            <>
              <List
                style={{
                  maxHeight: "45vh",
                  overflowY: "auto",
                }}
                itemLayout="horizontal"
                dataSource={appointmentsData}
                renderItem={(item) => {
                  return (
                    <List.Item>
                      <List.Item.Meta
                        description={
                          <Row
                            align="middle"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Col span={8}>
                              <Row
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Col>
                                  <Avatar
                                    style={{
                                      backgroundColor: item.avatar_color,
                                      marginRight: 10,
                                    }}
                                  >
                                    {getInitials(
                                      item?.first_name + " " + item?.last_name
                                    )}
                                  </Avatar>
                                </Col>
                                <Col>
                                  <strong style={{ color: "#000" }}>
                                    {item?.first_name + " " + item?.last_name}
                                  </strong>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "4px",
                                    }}
                                  >
                                    <div style={{ color: "#000" }}>
                                      {item.phone_number}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                            <Divider type="vertical" style={{ fontSize: 40 }} />
                            <Col span={5}>
                              <strong style={{ color: "#000" }}>Status</strong>
                              <div
                                style={{
                                  color:
                                    leadStatusColorAndTextListForCalender?.find(
                                      (i) =>
                                        i.status === item?.appointment_status
                                    )?.color,
                                }}
                              >
                                {
                                  leadStatusColorAndTextListForCalender?.find(
                                    (i) => i.status === item?.appointment_status
                                  )?.text
                                }
                              </div>
                            </Col>
                            <Divider type="vertical" style={{ fontSize: 40 }} />
                            <Col span={4}>
                              <strong style={{ color: "#000" }}>
                                {item?.appointment_date_time ? (
                                  <>
                                    {dateCheck(
                                      dayjs(item?.appointment_date_time).format(
                                        "MMM DD YYYY"
                                      )
                                    )}
                                  </>
                                ) : (
                                  "-"
                                )}
                              </strong>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginTop: "4px",
                                }}
                              >
                                <div className="custom-text1">
                                  {item?.appointment_date_time
                                    ? dayjs(item?.appointment_date_time).format(
                                        "hh:mm A"
                                      )
                                    : "-"}
                                </div>
                              </div>
                            </Col>
                            <Divider type="vertical" style={{ fontSize: 40 }} />
                            <Col span={4}>
                              <Button
                                type="link"
                                onClick={() => {
                                  setselectedItemDetails(item);
                                  setisModalVisibleViewLeadDetailsShort(true);
                                }}
                              >
                                View Details
                              </Button>
                            </Col>
                          </Row>
                        }
                      />
                    </List.Item>
                  );
                }}
              />
            </>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Past Appointment",
      children: (
        <>
          {pageLoader ? (
            <>
              <Skeleton />
            </>
          ) : (
            <>
              <List
                style={{
                  maxHeight: "45vh",
                  overflowY: "auto",
                }}
                itemLayout="horizontal"
                dataSource={pastappointmentsData}
                renderItem={(item) => {
                  return (
                    <List.Item>
                      <List.Item.Meta
                        description={
                          <Row
                            align="middle"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Col span={8}>
                              <Row
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Col>
                                  <Avatar
                                    style={{
                                      backgroundColor: item.avatar_color,
                                      marginRight: 10,
                                    }}
                                  >
                                    {getInitials(
                                      item?.first_name + " " + item?.last_name
                                    )}
                                  </Avatar>
                                </Col>
                                <Col>
                                  <strong style={{ color: "#000" }}>
                                    {item?.first_name + " " + item?.last_name}
                                  </strong>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginTop: "4px",
                                    }}
                                  >
                                    <div style={{ color: "#000" }}>
                                      {item.phone_number}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                            <Divider type="vertical" style={{ fontSize: 40 }} />
                            <Col span={5}>
                              <strong style={{ color: "#000" }}>Status</strong>
                              <div style={{color: leadStatusColorAndTextListForCalender?.find(
                                (i) =>
                                  i.status === item?.appointment_status
                              )?.color}}>
                               {
                               leadStatusColorAndTextListForCalender?.find(
                                (i) =>
                                  i.status === item?.appointment_status
                              )?.text}

                              </div>
                            </Col>
                            <Divider type="vertical" style={{ fontSize: 40 }} />
                            <Col span={4}>
                              <strong style={{ color: "#000" }}>
                                {item?.appointment_date_time ? (
                                  <>
                                    {dateCheck(
                                      dayjs(item?.appointment_date_time).format(
                                        "MMM DD YYYY"
                                      )
                                    )}
                                  </>
                                ) : (
                                  "-"
                                )}
                              </strong>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginTop: "4px",
                                }}
                              >
                                <div className="custom-text1">
                                  {item?.appointment_date_time
                                    ? dayjs(item?.appointment_date_time).format(
                                        "hh:mm A"
                                      )
                                    : "-"}
                                </div>
                              </div>
                            </Col>
                            <Divider type="vertical" style={{ fontSize: 40 }} />
                            <Col span={4}>
                              <Button
                                type="link"
                                onClick={() => {
                                  setselectedItemDetails(item);
                                  setisModalVisibleViewLeadDetailsShort(true);
                                }}
                              >
                                View Details
                              </Button>
                            </Col>
                          </Row>
                        }
                      />
                    </List.Item>
                  );
                }}
              />
            </>
          )}
        </>
      ),
    },
  ];
  const handleCheckboxChange = (leadId, checked) => {
    if (checked) {
      setSelectedLeads((prev) => [...prev, leadId]);
    } else {
      setSelectedLeads((prev) => prev.filter((id) => id !== leadId));
    }
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      const allLeadIds = leadsListNotConfirmDetails.map((lead) => lead.id);
      setSelectedLeads(allLeadIds);
    } else {
      setSelectedLeads([]);
    }
    setSelectAll(e.target.checked);
  };

  const handleSubmit = async () => {
    setbuttonLoader(true);
    try {
      if (selectedLeads?.length > 0) {
        const token = localStorage.getItem("authToken");
        await axios
          .post(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/bulk-resend-confirmation-mail`,
            { selectedLeads: selectedLeads },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setbuttonLoader(false);
            setvisibleleadNotConfirmDropdown(false);
            openNotificationWithIcon(
              "success",
              "Appointment",
              "Confirmation Email Sent Successfully"
            );
          })
          .catch((error) => {
            console.log(error);
            setbuttonLoader(false);
            openNotificationWithIcon(
              "error",
              "Appointment",
              error?.data?.message || error?.message
            );
          });
      } else {
        setbuttonLoader(false);
        openNotificationWithIcon(
          "error",
          "Appointment",
          "Please Select Lead For Resend Confirmation Mail"
        );
      }
    } catch (error) {
      setbuttonLoader(false);
      console.error("Error submitting selected leads:", error);
    }
  };
  const menu = (
    <Menu>
      <div style={{ padding: 10 }}>
        <Search
          placeholder="Search lead"
          onChange={(e) => {
            handleGetAllLeadStatusNotConfirm(e?.target?.value);
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
          width: 250,
          maxHeight: "220px",
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
              {/* "Select All" Checkbox */}
              <Menu.Item
                key="selectAll"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  style={{ marginRight: 10 }}
                />
                Select All
              </Menu.Item>

              {/* Individual Lead Items */}
              {leadsListNotConfirmDetails?.map((lead) => (
                <Menu.Item key={lead?.id}>
                  <Checkbox
                    style={{ marginRight: 10 }}
                    checked={selectedLeads.includes(lead?.id)} // Check if the lead is selected
                    onChange={(e) =>
                      handleCheckboxChange(lead?.id, e.target.checked)
                    }
                  />
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
              ))}
            </>
          )}
        </Menu>
      </div>
      <Divider style={{ margin: 0 }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Button
          size="small"
          onClick={() => {
            setvisibleleadNotConfirmDropdown(false);
            setSelectedLeads([]);
            setSelectAll(false);
          }}
        >
          Cancel
        </Button>
        <Button
          loading={buttonLoader}
          size="small"
          type="primary"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </div>
    </Menu>
  );
  useEffect(() => {
    handleGetAllLeadStatusNotConfirm();
    handleGetAppointmentOverview();
  }, []);
  return (
    <div style={{ padding: "20px 25px 20px 25px" }}>
      <Row justify="space-between" style={{ width: "100%" }}>
        <Col style={{ flex: 1, maxWidth: "19%" }}>
          <Card
            className="custom-card custom-card-today"
            title={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Today</Typography>
                <Typography className="custom-text1">
                  {dayjs().format("MMMM D, YYYY")}
                </Typography>
              </div>
            }
            style={{ cursor: "pointer" }}
          >
            <Typography
              style={{ fontSize: 25, fontWeight: 600 }}
              onClick={() => {
                setselectedCardTitle("Today");
                setisModalVisibleLeadListAccodingToStatus(true);
              }}
            >
              {todaysAppointmentsCount}
            </Typography>
            <Typography className="custom-text1">
              Confirmed Appointments
            </Typography>
          </Card>
        </Col>
        <Col style={{ flex: 1, maxWidth: "19%" }}>
          <Card
            className="custom-card custom-card-totalappointments"
            title={
              <>
                <Typography>Total Appointments</Typography>
              </>
            }
            bordered={true}
            style={{ cursor: "pointer" }}
          >
            <Typography
              style={{ fontSize: 25, fontWeight: 600 }}
              onClick={() => {
                setselectedCardTitle("Total Appointments");
                setisModalVisibleLeadListAccodingToStatus(true);
              }}
            >
              {totalAppointmentsCount}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography className="custom-text1">Appointments</Typography>
            </div>
          </Card>
        </Col>
        <Col style={{ flex: 1, maxWidth: "19%" }}>
          <Card
            className="custom-card custom-card-confirmedappointments"
            title={
              <>
                <Typography>Confirmed Appointments</Typography>
              </>
            }
            style={{ cursor: "pointer" }}
          >
            <Typography
              style={{ fontSize: 25, fontWeight: 600 }}
              onClick={() => {
                setselectedCardTitle("Confirmed Appointments");
                setisModalVisibleLeadListAccodingToStatus(true);
              }}
            >
              {confirmedAppointmentsCount}
            </Typography>
            <Typography className="custom-text1">Confirmed</Typography>
          </Card>
        </Col>
        <Col style={{ flex: 1, maxWidth: "19%" }}>
          <Card
            className="custom-card custom-card-notconfirmedappointments"
            title={
              <>
                <Typography>Not Confirmed Appointments</Typography>
              </>
            }
            style={{ cursor: "pointer" }}
          >
            <Typography
              style={{ fontSize: 25, fontWeight: 600 }}
              onClick={() => {
                setselectedCardTitle("Not Confirmed Appointments");
                setisModalVisibleLeadListAccodingToStatus(true);
              }}
            >
              {notConfirmedAppointmentsCount}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography className="custom-text1">Not Confirmed</Typography>
              <Space
                style={{
                  cursor: "pointer",
                }}
              >
                <BsArrowClockwise
                  style={{
                    fontSize: 15,
                    color: "#3900DB",
                    display: "flex",
                  }}
                />

                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  placement="bottomCenter"
                  visible={visibleleadNotConfirmDropdown}
                  onVisibleChange={handleVisibleChange}
                >
                  <Typography
                    style={{
                      color: "#3900DB",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleGetAllLeadStatusNotConfirm();
                    }}
                  >
                    Re send
                  </Typography>
                </Dropdown>
              </Space>
            </div>
          </Card>
        </Col>
        <Col style={{ flex: 1, maxWidth: "19%" }}>
          <Card
            className="custom-card custom-card-showuprate"
            title={
              <>
                <Typography>No Show Rate</Typography>
              </>
            }
          >
            <Typography
              onClick={() => {
                setselectedCardTitle("No Show Rate");
                setisModalVisibleLeadListAccodingToStatus(true);
              }}
              style={{
                fontSize: 25,
                fontWeight: 600,
                color: "#03A113",
                cursor: "pointer",
              }}
            >
              {parseInt(total_noShow) && parseInt(totalAppointmentsCount) ? (
                <>
                  {((total_noShow / totalAppointmentsCount) * 100).toFixed(2)}%
                </>
              ) : (
                "-"
              )}
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography className="custom-text1">No Show Rate</Typography>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ padding: "25px 0px 0px 5px" }}>
        <Col span={12}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <NextIcon style={{ width: "20px" }} />
            <Typography style={{ fontSize: 14, fontWeight: 500 }}>
              Nextup
            </Typography>
          </div>
          {pageLoader ? (
            <>
              <Skeleton
                avatar
                paragraph={{
                  rows: 3,
                }}
                style={{ padding: 15 }}
              />
            </>
          ) : (
            <>
              {appointmentsData.length > 0 ? (
                <>
                  <Card
                    style={{ marginTop: "20px" }}
                    className="custom-card-today custom-card"
                    title={
                      <>
                        <Row
                          align="middle"
                          gutter={[8, 8]}
                          style={{ padding: 15 }}
                        >
                          <Col>
                            <Avatar
                              size="medium"
                              style={{
                                backgroundColor:
                                  appointmentsData[0]?.avatar_color,
                              }}
                            >
                              {appointmentsData[0]?.first_name &&
                              appointmentsData[0]?.last_name
                                ? getInitials(
                                    appointmentsData[0]?.first_name +
                                      " " +
                                      appointmentsData[0]?.last_name
                                  )
                                : ""}
                            </Avatar>
                          </Col>
                          <Col flex="auto">
                            <div>
                              <strong>
                                {appointmentsData[0]?.first_name &&
                                appointmentsData[0]?.last_name
                                  ? appointmentsData[0]?.first_name +
                                    " " +
                                    appointmentsData[0]?.last_name
                                  : "-"}
                              </strong>
                            </div>
                            <div>{appointmentsData[0]?.phone_number}</div>
                          </Col>
                          <Col>
                            <Button
                              type="link"
                              onClick={() => {
                                setselectedItemDetails(appointmentsData[0]);

                                setisLeadsDetailsModalVisible(true);
                              }}
                            >
                              View Details
                            </Button>
                          </Col>
                        </Row>
                      </>
                    }
                  >
                    <Row
                      gutter={[8, 8]}
                      style={{
                        padding: 15,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Col>
                        <Typography className="custom-text1">Time</Typography>
                        <div>
                          {appointmentsData[0]?.appointment_date_time ? (
                            <>
                              {dateCheck(
                                dayjs(
                                  appointmentsData[0]?.appointment_date_time
                                ).format("MMM DD YYYY")
                              )}{" "}
                              {dayjs(
                                appointmentsData[0]?.appointment_date_time
                              ).format("hh:mm A")}
                            </>
                          ) : (
                            "-"
                          )}
                        </div>
                      </Col>
                      <Divider type="vertical" style={{ fontSize: 40 }} />
                      <Col>
                        <Typography className="custom-text1">
                          Duration
                        </Typography>
                        <div>
                          {appointmentsData[0]?.appointment_duration
                            ? appointmentsData[0]?.appointment_duration
                            : "-"}
                        </div>
                      </Col>
                      <Divider type="vertical" style={{ fontSize: 40 }} />
                      <Col>
                        <Typography className="custom-text1">
                          Assigned
                        </Typography>
                        <div>
                          {appointmentsData[0]?.assign_to
                            ? appointmentsData[0]?.assign_to
                            : "-"}
                        </div>
                      </Col>
                    </Row>
                    <Divider style={{ margin: 0 }} />
                    <div style={{ marginTop: 10 }}>
                      <Typography className="custom-text1">
                        Appointment Note
                      </Typography>
                      <div>{appointmentsData[0]?.appointment_notes}</div>
                    </div>
                  </Card>
                </>
              ) : (
                <>
                  <Empty style={{ marginTop: 20 }} />
                </>
              )}
            </>
          )}
        </Col>
        <Col span={12}>
          <Tabs
            tabBarExtraContent={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  justifyContent: "flex-end", // Align the content to the right
                  marginRight: 16, // Add space from the right edge
                }}
                onClick={() => setdefaultActiveKey(2)}
              >
                <Typography className="custom-text1" style={{ marginRight: 8 }}>
                  Show in Calendar
                </Typography>
                <IoArrowForward />
              </div>
            }
            items={items}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
