/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Space,
  notification,
  Layout,
  Dropdown,
  Tabs,
  Form,
} from "antd";
import { LuPlus } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { PiExportBold } from "react-icons/pi";
import { ReactComponent as Appointmentssvg } from "../assets/IconSvg/basil_calendar-outline.svg";
import { Content } from "antd/es/layout/layout";
import Overview from "./Overview";
import Calendar from "./CustomCalendar";
import AppointmentsList from "./AppointmentsList";
import dayjs from "dayjs";
import moment from "moment";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CreateAppointment, LeadListAccodingToStatus } from "./Modal";
import axios from "axios";
import {
  CloseLeadPayment,
  ViewLeadDetailsShort,
  ViewUpdateLeadDetails,
} from "../Leads/Modals";
dayjs.extend(customParseFormat);

const dateCheck = (appointmentDate) => {
  const today = dayjs().startOf("day");
  const tomorrow = today.add(1, "day");
  const appointmentDay = dayjs(appointmentDate, "MMM DD YYYY").startOf("day");
  if (appointmentDay.isValid()) {
    let displayDate;
    if (appointmentDay.isSame(today)) {
      displayDate = "Today";
    } else if (appointmentDay.isSame(tomorrow)) {
      displayDate = "Tomorrow";
    } else {
      displayDate = appointmentDay.format("MMM D, YYYY");
    }

    return displayDate;
  } else {
    console.log("Invalid date:", appointmentDate);
    return "Invalid Date";
  }
};

const commondropitems = [
  {
    key: "excel",
    icon: <PiExportBold size={15} />,
    label: <Typography>Export As Excel</Typography>,
  },
  {
    key: "csv",
    icon: <PiExportBold size={15} />,
    label: <Typography>Export As CSV</Typography>,
  },
];

const headerStyles = {
  padding: 0,
  background: "#fff",

  height: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const leftColStyles = {
  display: "flex",
  alignItems: "center",
  paddingLeft: 10,
};

const rightColStyles = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  paddingRight: 10,
};

const Appointments = ({
  searchContent,
  openNotificationWithIcon,
  setisVisibleQuickConversation,
  setquickConversationView,
  setselectedConversationDetails,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [ViewUpdateLeadform] = Form.useForm();
  const [RecordPaymentform] = Form.useForm();
  const [defaultActiveKey, setdefaultActiveKey] = useState(1);
  const [selectedItemDetails, setselectedItemDetails] = useState([]);
  const [isAppointmentModalVisible, setisAppointmentModalVisible] =
    useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [pageLoader, setpageLoader] = useState(false);
  const [todaysAppointmentsCount, settodaysAppointmentsCount] = useState(0);
  const [totalAppointmentsCount, settotalAppointmentsCount] = useState(0);

  const [total_noShow, settotal_noShow] = useState(0);
  const [confirmedAppointmentsCount, setconfirmedAppointmentsCount] =
    useState(0);
  const [notConfirmedAppointmentsCount, setnotConfirmedAppointmentsCount] =
    useState(0);
  const [appointmentsData, setappointmentsData] = useState([]);
  const [pastappointmentsData, setpastappointmentsData] = useState([]);
  const [isLeadsDetailsModalVisible, setisLeadsDetailsModalVisible] =
    useState(false);
  const [isViewLeadModalEditable, setisViewLeadModalEditable] = useState(false);
  const [isCloseLeadsPaymentModalVisible, setisCloseLeadsPaymentModalVisible] =
    useState(false);
  const [
    isModalVisibleViewLeadDetailsShort,
    setisModalVisibleViewLeadDetailsShort,
  ] = useState(false);
  const [loadingleadsList, setloadingleadsList] = useState(false);

  const [visibleleadNotConfirmDropdown, setvisibleleadNotConfirmDropdown] =
    useState(false);
  const [leadsListNotConfirmDetails, setleadsListNotConfirmDetails] = useState(
    []
  );
  const [
    isModalVisibleLeadListAccodingToStatus,
    setisModalVisibleLeadListAccodingToStatus,
  ] = useState();
  const [selectedCardTitle, setselectedCardTitle] = useState("");
  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const onChange = (newActiveKey) => {
    setdefaultActiveKey(parseInt(newActiveKey));
    if (newActiveKey === "1") {
      handleGetAppointmentOverview();
    } else if (newActiveKey === "2") {
    } else if (newActiveKey === "3") {
    }
  };

  const handleGetAllLeadStatusNotConfirm = async (searchTerm) => {
    setloadingleadsList(true);
    const token = localStorage.getItem("authToken");
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-AllLeadStatusNotConfirm`,
        {
          params: { search: searchTerm },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setloadingleadsList(false);
        setleadsListNotConfirmDetails(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        setloadingleadsList(false);
        openNotificationWithIcon(
          "error",
          "Appointment",
          err?.response?.data?.message || err?.message
        );
      });
  };

  const handleSubmitCloseleadsPayment = async (values) => {
    setbuttonLoader(true);
    const token = localStorage.getItem("authToken");
    const data = {
      id: selectedItemDetails?.id,
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
          "Successfully  Closed! Great work!"
        );
        setisCloseLeadsPaymentModalVisible(false);
        setisLeadsDetailsModalVisible(false);
        setbuttonLoader(false);
        handleGetAppointmentOverview();
        RecordPaymentform.resetFields();
      })
      .catch((err) => {
        console.log(err);

        openNotificationWithIcon("error", "Close Lead",err?.response?.data?.message || err?.message);
        RecordPaymentform.resetFields();
        setbuttonLoader(false);
      });
  };
  const handleCancelApointment = async () => {
    const token = localStorage.getItem("authToken");
    let data = {
      id: selectedItemDetails?.id,
      lead_status: "Appointment",
      appointment_status: "Cancelled",
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
        handleGetAppointmentOverview();
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
      });
  };
  const handleSubmitUpdateleads = async (values) => {
    values.id = selectedItemDetails?.id;
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
        handleGetAppointmentOverview();
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
        ViewUpdateLeadform.resetFields();
        openNotificationWithIcon(
          "error",
          "Lead",
          err?.response?.data?.message || err?.message
        );
      });
    setbuttonLoader(false);
  };

  const handleGetAppointmentOverview = async (search, searchType) => {
    setpageLoader(true);

    let data = {
      search: search || "",
      searchType: searchType?.trim() || "",
    };

    const token = localStorage.getItem("authToken");
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-AppointmentOverview`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          settodaysAppointmentsCount(res?.data?.overview?.today_appointments);
          settotalAppointmentsCount(res?.data?.overview?.total_appointments);
          setconfirmedAppointmentsCount(
            res?.data?.overview?.confirmed_appointments
          );
          settotal_noShow(res?.data?.overview?.total_noShow);
          setnotConfirmedAppointmentsCount(
            res?.data?.overview?.not_confirmed_appointments
          );
          setappointmentsData(res?.data?.upcomingappointments || []);
          setpastappointmentsData(res?.data?.pastAppointments || []);
        })
        .catch((err) => {
          openNotificationWithIcon(
            "error",
            "Lead",
            err?.response?.data?.message || err?.message
          );
        });
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Lead",
        err?.response?.data?.message || err?.message
      );
    } finally {
      setpageLoader(false);
    }
  };

  useEffect(() => {
    handleGetAppointmentOverview(searchContent, "text");
  }, [searchContent]);

  return (
    <>
      {contextHolder}
      <Layout>
        <Layout.Header style={headerStyles}>
          <div style={leftColStyles}>
            <Appointmentssvg />
            <Space style={{ marginLeft: 10 }}>
              <Typography style={{ fontWeight: "bold" }}>
                Appointments
              </Typography>
            </Space>
          </div>
          <div style={rightColStyles}>
            <Space>
              <Dropdown menu={{ items: commondropitems }} placement="bottom">
                <Button icon={<HiDotsVertical />} size={20} />
              </Dropdown>
              <Button
                onClick={() => {
                  setisAppointmentModalVisible(true);
                }}
                type="primary"
                icon={<LuPlus style={{ color: "#fff" }} />}
              >
                Appointment
              </Button>
            </Space>
          </div>
        </Layout.Header>
        <Content>
          <Tabs
            activeKey={defaultActiveKey?.toString()}
            onChange={onChange}
            items={[
              {
                label: "Overview",
                key: "1",
                children: (
                  <Overview
                    setdefaultActiveKey={setdefaultActiveKey}
                    pageLoader={pageLoader}
                    todaysAppointmentsCount={todaysAppointmentsCount}
                    totalAppointmentsCount={totalAppointmentsCount}
                    confirmedAppointmentsCount={confirmedAppointmentsCount}
                    notConfirmedAppointmentsCount={
                      notConfirmedAppointmentsCount
                    }
                    appointmentsData={appointmentsData}
                    pastappointmentsData={pastappointmentsData}
                    dateCheck={dateCheck}
                    handleGetAppointmentOverview={handleGetAppointmentOverview}
                    setisLeadsDetailsModalVisible={
                      setisLeadsDetailsModalVisible
                    }
                    selectedItemDetails={selectedItemDetails}
                    setselectedItemDetails={setselectedItemDetails}
                    total_noShow={total_noShow}
                    setisModalVisibleViewLeadDetailsShort={
                      setisModalVisibleViewLeadDetailsShort
                    }
                    handleGetAllLeadStatusNotConfirm={
                      handleGetAllLeadStatusNotConfirm
                    }
                    loadingleadsList={loadingleadsList}
                    visibleleadNotConfirmDropdown={
                      visibleleadNotConfirmDropdown
                    }
                    setvisibleleadNotConfirmDropdown={
                      setvisibleleadNotConfirmDropdown
                    }
                    leadsListNotConfirmDetails={leadsListNotConfirmDetails}
                    openNotificationWithIcon={openNotificationWithIcon}
                    setisModalVisibleLeadListAccodingToStatus={
                      setisModalVisibleLeadListAccodingToStatus
                    }
                    setselectedCardTitle={setselectedCardTitle}
                  />
                ),
              },
              {
                label: "Calendar",
                key: "2",
                children: (
                  <Calendar
                    openNotificationWithIcon={openNotificationWithIcon}
                    setisModalVisibleViewLeadDetailsShort={
                      setisModalVisibleViewLeadDetailsShort
                    }
                    setselectedItemDetails={setselectedItemDetails}
                  />
                ),
              },
              {
                label: "List",
                key: "3",
                children: (
                  <AppointmentsList
                    openNotificationWithIcon={openNotificationWithIcon}
                    dateCheck={dateCheck}
                    setselectedItemDetails={setselectedItemDetails}
                    setisModalVisibleViewLeadDetailsShort={
                      setisModalVisibleViewLeadDetailsShort
                    }
                  />
                ),
              },
            ]}
          />
          <CreateAppointment
            handleGetAppointmentOverview={handleGetAppointmentOverview}
            openNotificationWithIcon={openNotificationWithIcon}
            isAppointmentModalVisible={isAppointmentModalVisible}
            setisAppointmentModalVisible={setisAppointmentModalVisible}
            setbuttonLoader={setbuttonLoader}
            disabledDate={disabledDate}
            buttonLoader={buttonLoader}
            selectedItemDetails={selectedItemDetails}
            setselectedItemDetails={setselectedItemDetails}
          />

          <ViewLeadDetailsShort
            isModalVisibleViewLeadDetailsShort={
              isModalVisibleViewLeadDetailsShort
            }
            setisModalVisibleViewLeadDetailsShort={
              setisModalVisibleViewLeadDetailsShort
            }
            selectedItemDetails={selectedItemDetails}
            setisLeadsDetailsModalVisible={setisLeadsDetailsModalVisible}
            setisViewLeadModalEditable={setisViewLeadModalEditable}
            setisVisibleQuickConversation={setisVisibleQuickConversation}
            setquickConversationView={setquickConversationView}
            setselectedConversationDetails={setselectedConversationDetails}
          />

          <ViewUpdateLeadDetails
            openNotificationWithIcon={openNotificationWithIcon}
            selectedItemDetails={selectedItemDetails}
            setisLeadsDetailsModalVisible={setisLeadsDetailsModalVisible}
            setisViewLeadModalEditable={setisViewLeadModalEditable}
            buttonLoader={buttonLoader}
            isLeadsDetailsModalVisible={isLeadsDetailsModalVisible}
            isViewLeadModalEditable={isViewLeadModalEditable}
            setbuttonLoader={setbuttonLoader}
            setisAppointmentModalVisible={setisAppointmentModalVisible}
            handleSubmitUpdateleads={handleSubmitUpdateleads}
            ViewUpdateLeadform={ViewUpdateLeadform}
            setisCloseLeadsPaymentModalVisible={
              setisCloseLeadsPaymentModalVisible
            }
            setisVisibleQuickConversation={setisVisibleQuickConversation}
            setquickConversationView={setquickConversationView}
            setselectedConversationDetails={setselectedConversationDetails}
            handleCancelApointment={handleCancelApointment}
          />

          <CloseLeadPayment
            handleSubmitCloseleadsPayment={handleSubmitCloseleadsPayment}
            isCloseLeadsPaymentModalVisible={isCloseLeadsPaymentModalVisible}
            setisCloseLeadsPaymentModalVisible={
              setisCloseLeadsPaymentModalVisible
            }
            buttonLoader={buttonLoader}
            RecordPaymentform={RecordPaymentform}
          />

          <LeadListAccodingToStatus
            selectedCardTitle={selectedCardTitle}
            setselectedCardTitle={setselectedCardTitle}
            isModalVisibleLeadListAccodingToStatus={
              isModalVisibleLeadListAccodingToStatus
            }
            setisModalVisibleLeadListAccodingToStatus={
              setisModalVisibleLeadListAccodingToStatus
            }
            setselectedItemDetails={setselectedItemDetails}
            setisModalVisibleViewLeadDetailsShort={
              setisModalVisibleViewLeadDetailsShort
            }
          />
        </Content>
      </Layout>
    </>
  );
};

export default Appointments;
