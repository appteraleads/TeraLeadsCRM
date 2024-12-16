/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Space,
  Divider,
  Tabs,
  Switch,
  Select,
  Modal,
  DatePicker,
  TimePicker,
  Empty,
  Dropdown,
  Spin,
  Skeleton,
} from "antd";
import { IoAlertCircleOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { RiZzzFill } from "react-icons/ri";
import {
  CustomTimeZonesList,
  dateFormats,
  daysOfWeek,
} from "../Common/CommonCodeList";
import { AppointmentsSVG } from "../Common/SettingSidebarIconsSvg";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import dayjs from "dayjs";
import axios from "axios";
const { Text } = Typography;
const { Option } = Select;
const AppointmentsSetting = ({
  openNotificationWithIcon,
  loginUserDetails,
}) => {
  const [pageloader, setpageloader] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone // Default to user's local timezone
  );
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [appointmentDaysOfWeek, setappointmentDaysOfWeek] = useState();
  const [appointmentDateFormate, setappointmentDateFormate] = useState();
  const [appointmentDuration, setappointmentDuration] = useState();

  const [appointmentcloseDates, setappointmentcloseDates] = useState([]);
  const [appointmentFromTime, setappointmentFromTime] = useState();
  const [appointmentEndTime, setappointmentEndTime] = useState();
  const [isAddNewDateModalVisible, setisAddNewDateModalVisible] =
    useState(false);
  const [currentActiveTab, setcurrentActiveTab] = useState("1");
  const [closeAppointmentDetails, setcloseAppointmentDetails] = useState([]);
  const [loaderAvailability, setloaderAvailability] = useState(false);
  const [updateCloseDate, setupdateCloseDate] = useState(false);
  const [seletedCloseDetails, setseletedCloseDetails] = useState(false);

  const [appointmentRemindersSMS, setappointmentRemindersSMS] = useState(false);
  const [appointmentRemindersEmail, setappointmentRemindersEmail] =
    useState(false);
  const [appointmentReminders3days, setappointmentReminders3days] =
    useState(false);
  const [appointmentReminders24hours, setappointmentReminders24hours] =
    useState(false);
  const [appointmentReminders1hours, setappointmentReminders1hours] =
    useState(false);
  const [appointmentConfirmationRequest, setappointmentConfirmationRequest] =
    useState(false);
  const [cancellationNotification, setcancellationNotification] =
    useState(false);
  const [appointmentsSettingDetails, setappointmentsSettingDetails] =
    useState(false);
  const [unsavedchanges, setunsavedchanges] = useState(false);

  const handleClinicCloseDate = async () => {
    setbuttonLoader(true);
    if (appointmentcloseDates?.length < 0) {
      openNotificationWithIcon("error", "Settings", "Please select date");
    } else if (!appointmentFromTime) {
      openNotificationWithIcon("error", "Settings", "Please select start time");
    } else if (!appointmentEndTime) {
      openNotificationWithIcon("error", "Settings", "Please select start time");
    } else {
      const token = localStorage.getItem("authToken");
      const data = {
        clinic_id: loginUserDetails?.clinic_id,
        appointment_close_dates: appointmentcloseDates,
        appointment_from_time: appointmentFromTime,
        appointment_end_time: appointmentEndTime,
      };

      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/clinicclosedates`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setisAddNewDateModalVisible(false);
          setappointmentEndTime();
          setappointmentFromTime();
          setappointmentcloseDates([]);
          handlegGtClinicCloseDatesByClinicId();
          openNotificationWithIcon(
            "success",
            "Settings",
            "Special closure days created successfully"
          );
        })
        ?.catch((err) => {
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
        });
    }

    setbuttonLoader(false);
  };

  const handleUpdateClinicCloseDate = async () => {
    setbuttonLoader(true);
    if (appointmentcloseDates?.length < 0) {
      openNotificationWithIcon("error", "Settings", "Please select date");
    } else if (!appointmentFromTime) {
      openNotificationWithIcon("error", "Settings", "Please select start time");
    } else if (!appointmentEndTime) {
      openNotificationWithIcon("error", "Settings", "Please select start time");
    } else {
      const token = localStorage.getItem("authToken");
      const data = {
        clinic_id: loginUserDetails?.clinic_id,
        appointment_close_dates: appointmentcloseDates?.toString(),
        appointment_from_time: appointmentFromTime,
        appointment_end_time: appointmentEndTime,
      };

      await axios
        .put(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/clinicclosedates/${seletedCloseDetails?.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setisAddNewDateModalVisible(false);
          setappointmentEndTime();
          setappointmentFromTime();
          setappointmentcloseDates([]);
          handlegGtClinicCloseDatesByClinicId();

          openNotificationWithIcon(
            "success",
            "Settings",
            "Special closure days updated successfully"
          );
        })
        ?.catch((err) => {
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
        });
    }
    setbuttonLoader(false);
  };

  const handledeleteClinicCloseDate = async (id) => {
    setbuttonLoader(true);

    const token = localStorage.getItem("authToken");

    await axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/clinicclosedates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        handlegGtClinicCloseDatesByClinicId();
        openNotificationWithIcon(
          "success",
          "Settings",
          "Special closure day delete successfully"
        );
      })
      ?.catch((err) => {
        openNotificationWithIcon(
          "error",
          "Settings",
          err?.response?.data?.message || err?.message
        );
      });

    setbuttonLoader(false);
  };

  const handlegGtClinicCloseDatesByClinicId = async () => {
    const token = localStorage.getItem("authToken");
    setloaderAvailability(true);
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/clinicclosedates/clinic/${loginUserDetails?.clinic_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setcloseAppointmentDetails(res?.data || []);
        setloaderAvailability(false);
      })
      ?.catch((err) => {
        openNotificationWithIcon(
          "error",
          "Settings",
          err?.response?.data?.message || err?.message
        );
      });
    setloaderAvailability(false);
  };

  const onChange = (key) => {
    handlegGtClinicCloseDatesByClinicId();
    setcurrentActiveTab(key);
  };

  const handlesubmitAppointmentsSettingDetails = async () => {
    const token = localStorage.getItem("authToken");

    let data = {
      clinic_id: loginUserDetails?.clinic_id,
      appointment_time_zone: selectedTimezone ? selectedTimezone : undefined,
      appointment_days_week: appointmentDaysOfWeek
        ? appointmentDaysOfWeek
        : undefined,
      appointment_date_format: appointmentDateFormate
        ? appointmentDateFormate
        : undefined,
      appointment_duration: appointmentDuration
        ? appointmentDuration
        : undefined,
      appointment_reminders_sms: appointmentRemindersSMS,
      appointment_reminders_email: appointmentRemindersEmail,
      appointment_reminders_3days: appointmentReminders3days,
      appointment_reminders_24hours: appointmentReminders24hours,
      appointment_reminders_1hours: appointmentReminders1hours,
      appointment_confirmation_request: appointmentConfirmationRequest,
      cancellation_notification: cancellationNotification,
    };

    await axios
      .post(
        appointmentsSettingDetails?.id
          ? `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/appointment-settings/${appointmentsSettingDetails?.id}`
          : `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/appointment-settings`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setunsavedchanges(false);
        openNotificationWithIcon(
          "success",
          "Settings",
          "Appointments updated successfully"
        );
      })
      ?.catch((err) => {
        openNotificationWithIcon(
          "error",
          "Settings",
          err?.response?.data?.message || err?.message
        );
      });
  };

  const handlesGetAppointmentsSettingDetails = async () => {
    setpageloader(true);
    const token = localStorage.getItem("authToken");
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/appointment-settings/${loginUserDetails?.clinic_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setappointmentsSettingDetails(res?.data);
        setSelectedTimezone(res?.data?.appointment_time_zone);
        setappointmentDaysOfWeek(res?.data?.appointment_days_week);
        setappointmentDateFormate(res?.data?.appointment_date_format);
        setappointmentDuration(res?.data?.appointment_duration);
        setappointmentRemindersSMS(res?.data?.appointment_reminders_sms);
        setappointmentRemindersEmail(res?.data?.appointment_reminders_email);
        setappointmentReminders3days(res?.data?.appointment_reminders_3days);
        setappointmentReminders24hours(
          res?.data?.appointment_reminders_24hours
        );
        setappointmentReminders1hours(res?.data?.appointment_reminders_1hours);
        setappointmentConfirmationRequest(
          res?.data?.appointment_confirmation_request
        );
        setcancellationNotification(res?.data?.cancellation_notification);
      })
      ?.catch((err) => {
       console.log(err)
      });
    setpageloader(false);
  };

  const items = [
    {
      key: "1",
      label: "Calendar settings ",
      children: (
        <>
          {pageloader ? (
            <Skeleton />
          ) : (
            <Card bordered={false} style={{ width: "100%" }}>
              <Typography style={{ fontWeight: 600 }}>
                Calendar settings{" "}
              </Typography>
              <Divider />
              <Row align="middle" gutter={[16, 16]}>
                <Col span={12}>
                  <Typography style={{ fontWeight: 600 }}>Timezone</Typography>
                  <Text className="custom-text1">
                    Select your clinic’s local timezone to ensure accurate
                    appointment scheduling.
                  </Text>
                </Col>
                <Col span={12}>
                  <Typography>Timezone</Typography>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select a time zone"
                    optionFilterProp="children"
                    value={selectedTimezone}
                    onChange={(e) => {
                      setSelectedTimezone(e);
                      setunsavedchanges(true);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {CustomTimeZonesList.map((tz) => (
                      <Option key={tz.value} value={tz.value}>
                        {tz.label}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
              <Divider />
              <Row align="middle" gutter={[16, 16]}>
                <Col span={12}>
                  <Typography style={{ fontWeight: 600 }}>
                    Starting Day of the Week
                  </Typography>
                  <Text className="custom-text1">
                    Choose the first day of your weekly calendar view.
                  </Text>
                </Col>
                <Col span={12}>
                  <Typography>Weekdays</Typography>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select a week"
                    optionFilterProp="children"
                    value={appointmentDaysOfWeek}
                    onChange={(e) => {
                      setappointmentDaysOfWeek(e);
                      setunsavedchanges(true);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {daysOfWeek.map((tz) => (
                      <Option key={tz.value} value={tz.value}>
                        {tz.label}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
              <Divider />
              <Row align="middle" gutter={[16, 16]}>
                <Col span={12}>
                  <Typography style={{ fontWeight: 600 }}>
                    Date Format
                  </Typography>
                  <Text className="custom-text1">
                    Set your preferred format for displaying dates (e.g.,
                    MM/DD/YYYY).
                  </Text>
                </Col>
                <Col span={12}>
                  <Typography>Format</Typography>

                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select a date formate"
                    optionFilterProp="children"
                    value={appointmentDateFormate}
                    onChange={(e) => {
                      setappointmentDateFormate(e);
                      setunsavedchanges(true);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {dateFormats.map((tz) => (
                      <Option key={tz.value} value={tz.value}>
                        {tz.label}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
              <Divider />
              <Row align="middle" gutter={[16, 16]}>
                <Col span={12}>
                  <Typography style={{ fontWeight: 600 }}>
                    Default Appointment Duration
                  </Typography>
                  <Text className="custom-text1">
                    Define the default length of each appointment.
                  </Text>
                </Col>
                <Col span={12}>
                  <Typography>Duration</Typography>

                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select a duration"
                    value={appointmentDuration}
                    onChange={(e) => {
                      setappointmentDuration(e);
                      setunsavedchanges(true);
                    }}
                  >
                    <Option value="30">30 minutes</Option>
                    <Option value="45">45 minutes</Option>
                    <Option value="60">1 hour</Option>
                  </Select>
                </Col>
              </Row>
              <Divider />
              <Row align="middle" gutter={[16, 16]}>
                <Col
                  span={12}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Button
                    type="primary"
                    disabled={!unsavedchanges}
                    onClick={() => {
                      handlesubmitAppointmentsSettingDetails();
                    }}
                  >
                    Save
                  </Button>
                  <Space style={{ marginLeft: 10 }}>
                    {unsavedchanges && (
                      <>
                        <IoAlertCircleOutline
                          size={20}
                          className="custom-text1"
                          style={{ display: "flex", color: "red" }}
                        />

                        <Text type="danger">You have unsaved changes</Text>
                      </>
                    )}
                  </Space>
                </Col>
              </Row>
            </Card>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Availability",
      children: (
        <>
          <Card bordered={false} style={{ width: "100%" }}>
            <Row align="middle" gutter={[16, 16]}>
              <Col
                span={24}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #F0F0F0",
                  borderRadius: 10,
                  padding: 10,
                  background: "#F7F9FE",
                }}
              >
                <Space style={{ marginLeft: 10 }}>
                  <IoAlertCircleOutline
                    size={20}
                    className="custom-text1"
                    style={{ display: "flex" }}
                  />
                  <Text className="custom-text1">
                    Regular clinic hours are set in clinic details settings. For
                    holidays or special hours, you’re in the right place.
                  </Text>
                </Space>
                <Button type="primary">Manage Regular Hours</Button>
              </Col>
            </Row>
            <Divider />
            <Row align="start" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Special Closure Days
                </Typography>
                <Text className="custom-text1">
                  Add specific dates when your clinic will be closed.
                </Text>
                <Button
                  className="custom-text1"
                  onClick={() => {
                    setisAddNewDateModalVisible(true);
                  }}
                >
                  + Add New Date
                </Button>
              </Col>
              <Col
                span={12}
                style={{ maxHeight: "53vh", overflow: "auto", padding: 10 }}
              >
                {!loaderAvailability ? (
                  closeAppointmentDetails?.length > 0 ? (
                    <>
                      {closeAppointmentDetails?.map((closeData) => {
                        return (
                          <>
                            <Row
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "5px 0px",
                              }}
                            >
                              <Typography>
                                {closeData?.appointment_close_dates
                                  ? dayjs(
                                      closeData?.appointment_close_dates,
                                      "YYYY-MMM-DD"
                                    ).format("MMMM DD , YYYY")
                                  : ""}
                              </Typography>
                              <Space>
                                <Button icon={<RiZzzFill />} disabled>
                                  {closeData?.appointment_from_time}-{" "}
                                  {closeData?.appointment_end_time}
                                </Button>
                                <Dropdown
                                  menu={{
                                    items: [
                                      {
                                        key: "Edit",
                                        icon: <FaRegEdit size={15} />,
                                        label: <Typography>Edit</Typography>,
                                        onClick: () => {
                                          setappointmentEndTime(
                                            closeData?.appointment_end_time
                                          );
                                          setappointmentFromTime(
                                            closeData?.appointment_from_time
                                          );
                                          if (
                                            Array.isArray(appointmentcloseDates)
                                          ) {
                                            const updatedDates = [
                                              ...appointmentcloseDates,
                                              closeData?.appointment_close_dates,
                                            ];
                                            setappointmentcloseDates(
                                              updatedDates
                                            );
                                          }
                                          setseletedCloseDetails(closeData);
                                          setupdateCloseDate(true);
                                          setisAddNewDateModalVisible(true);
                                        },
                                      },
                                      {
                                        key: "Delete",
                                        icon: <MdDeleteOutline size={15} />,
                                        label: <Typography>Delete</Typography>,
                                        onClick: () => {
                                          handledeleteClinicCloseDate(
                                            closeData?.id
                                          );
                                        },
                                      },
                                    ],
                                  }}
                                  placement="bottomLeft"
                                >
                                  <Button icon={<BsThreeDots />} size={20} />
                                </Dropdown>
                              </Space>
                            </Row>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <Row
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "5px 0px",
                      }}
                    >
                      <Empty />
                    </Row>
                  )
                ) : (
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "5px 0px",
                    }}
                  >
                    <Spin />
                  </Row>
                )}
              </Col>
            </Row>
          </Card>
        </>
      ),
    },
    {
      key: "3",
      label: "Reminders",
      children: (
        <>
          <Card bordered={false} style={{ width: "100%" }}>
            <Typography style={{ fontWeight: 600 }}>
              Appointment Reminders
            </Typography>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Reminder Channels
                </Typography>
                <Text className="custom-text1">
                  How would you like to send reminders?
                </Text>
              </Col>
              <Col span={12} align="end">
                <div style={{ padding: "5px 0px" }}>
                  <Space>
                    <Typography>Email</Typography>
                    <Switch
                      checked={appointmentRemindersSMS}
                      onChange={(e) => {
                        setappointmentRemindersSMS(e);
                        setunsavedchanges(true);
                      }}
                    ></Switch>
                  </Space>
                </div>
                <div style={{ padding: "5px 0px" }}>
                  <Space>
                    <Typography
                      checked={appointmentRemindersEmail}
                      onChange={(e) => {
                        setappointmentRemindersEmail(e);
                        setunsavedchanges(true);
                      }}
                    >
                      SMS
                    </Typography>
                    <Switch></Switch>
                  </Space>
                </div>
              </Col>
            </Row>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Upcoming Appointment Reminder
                </Typography>
                <Text className="custom-text1">
                  Send a reminder before the appointment.
                </Text>
              </Col>
              <Col span={12} align="end">
                <div style={{ padding: "5px 0px" }}>
                  <Space>
                    <Typography>3 days before</Typography>
                    <Switch
                      checked={appointmentReminders3days}
                      onChange={(e) => {
                        setappointmentReminders3days(e);
                        setunsavedchanges(true);
                      }}
                    ></Switch>
                  </Space>
                </div>
                <div style={{ padding: "5px 0px" }}>
                  <Space>
                    <Typography>24 hours before</Typography>
                    <Switch
                      checked={appointmentReminders24hours}
                      onChange={(e) => {
                        setappointmentReminders24hours(e);
                        setunsavedchanges(true);
                      }}
                    ></Switch>
                  </Space>
                </div>
                <div style={{ padding: "5px 0px" }}>
                  <Space>
                    <Typography>1 hour before</Typography>
                    <Switch
                      checked={appointmentReminders1hours}
                      onChange={(e) => {
                        setappointmentReminders1hours(e);
                        setunsavedchanges(true);
                      }}
                    ></Switch>
                  </Space>
                </div>
              </Col>
            </Row>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={11}>
                <Typography style={{ fontWeight: 600 }}>
                  Appointment Confirmation Request
                </Typography>
                <Text className="custom-text1">
                  Ask patients to confirm their appointments.
                </Text>
              </Col>
              <Col span={13} align="end">
                <Space>
                  <Typography>Confirmation</Typography>
                  <Switch
                    checked={appointmentConfirmationRequest}
                    onChange={(e) => {
                      setappointmentConfirmationRequest(e);
                      setunsavedchanges(true);
                    }}
                  ></Switch>
                </Space>
              </Col>
            </Row>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={11}>
                <Typography style={{ fontWeight: 600 }}>
                  Cancellation Notification
                </Typography>
                <Text className="custom-text1">
                  Notify leads when their appointment is canceled.
                </Text>
              </Col>
              <Col span={13} align="end">
                <Space>
                  <Typography>Cancellation</Typography>
                  <Switch
                    checked={cancellationNotification}
                    onChange={(e) => {
                      setcancellationNotification(e);
                      setunsavedchanges(true);
                    }}
                  ></Switch>
                </Space>
              </Col>
            </Row>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                <Button
                  type="primary"
                  disabled={!unsavedchanges}
                  onClick={() => {
                    handlesubmitAppointmentsSettingDetails();
                  }}
                >
                  Save
                </Button>
                <Space style={{ marginLeft: 10 }}>
                  {unsavedchanges && (
                    <>
                      <IoAlertCircleOutline
                        size={20}
                        className="custom-text1"
                        style={{ display: "flex", color: "red" }}
                      />

                      <Text type="danger">You have unsaved changes</Text>
                    </>
                  )}
                </Space>
              </Col>
            </Row>
          </Card>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (currentActiveTab === "2") {
      console.log(currentActiveTab);
    }
  }, [currentActiveTab]);

  useEffect(() => {
    handlesGetAppointmentsSettingDetails();
  }, []);
  return (
    <>
      <Tabs
        activeKey={currentActiveTab}
        items={items}
        onChange={onChange}
        style={{ width: "100%", overflow: "auto", height: "78vh" }}
      />

      <Modal
        className="custom-modal-lead-details "
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <AppointmentsSVG color={"#72779E"} style={{ width: 20 }} />
            <Typography style={{ marginLeft: 5 }}>
              Special Closure Days
            </Typography>
          </div>
        }
        visible={isAddNewDateModalVisible}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "0px 10px 10px 0px",
            }}
          >
            <Space>
              <Button
                onClick={() => {
                  setisAddNewDateModalVisible(false);
                  setappointmentEndTime();
                  setappointmentFromTime();
                  setappointmentcloseDates([]);
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  if (!updateCloseDate) {
                    handleClinicCloseDate();
                  } else {
                    handleUpdateClinicCloseDate();
                  }
                }}
                loading={buttonLoader}
              >
                {!updateCloseDate ? "Save" : "Update"}
              </Button>
            </Space>
          </div>
        }
        closable={false}
        width={450}
      >
        <Row gutter={20}>
          <Col span={24} style={{ padding: 10 }}>
            <Typography className="custom-text1">Date</Typography>
            <DatePicker
              multiple
              value={
                appointmentcloseDates?.length > 0
                  ? appointmentcloseDates?.map((i) => {
                      return dayjs(i, "YYYY-MMM-DD");
                    })
                  : []
              }
              style={{ width: "100%" }}
              format="YYYY-MMM-DD"
              className="custom-text1"
              onChange={(e) => {
                if (e?.length > 0) {
                  setappointmentcloseDates(
                    e.map((i) => {
                      return i?.format("YYYY-MMM-DD");
                    })
                  );
                } else {
                  setappointmentcloseDates([]);
                }
              }}
              placeholder="Select date"
            />
          </Col>
          <Col span={24} style={{ padding: 10 }}>
            <Typography className="custom-text1">From</Typography>
            <TimePicker
              format={"hh:mm A"}
              value={
                appointmentFromTime
                  ? dayjs(appointmentFromTime, "hh:mm A")
                  : null
              }
              onChange={(time) =>
                setappointmentFromTime(dayjs(time).format("hh:mm A"))
              }
              placeholder="Select start time"
              style={{ width: "100%" }}
              className="custom-text1"
            />
          </Col>
          <Col span={24} style={{ padding: 10 }}>
            <Typography className="custom-text1">To</Typography>
            <TimePicker
              format={"hh:mm A"}
              value={
                appointmentEndTime ? dayjs(appointmentEndTime, "hh:mm A") : null
              }
              onChange={(time) =>
                setappointmentEndTime(dayjs(time).format("hh:mm A"))
              }
              placeholder="Select end time"
              style={{ width: "100%" }}
              className="custom-text1"
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AppointmentsSetting;
