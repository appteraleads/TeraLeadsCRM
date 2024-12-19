/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";

import { Modal, List, Typography } from "antd"; // Import Ant Design components
import "./style.css"; // Import custom styles
import { leadStatusColorAndTextListForCalender } from "../Common/CommonCodeList";
import axios from "axios";

const CustomCalendar = ({
  openNotificationWithIcon,
  setisModalVisibleViewLeadDetailsShort,
  setselectedItemDetails,
  userSeletedWebsiteList
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalEvents, setModalEvents] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [calendarView, setCalendarView] = useState("timeGridWeek");


  const handleGetCalenderDataForAppointment = async (
    startDate,
    endDate,
    viewType
  ) => {
    const token = localStorage.getItem("authToken");
    let tempData = {
      type: viewType,
      data: {
        start: moment(startDate).format("YYYY-MM-DD"),
        end: moment(endDate).format("YYYY-MM-DD"),
      },
      websiteNames: userSeletedWebsiteList || [],
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-calenderDataForAppointment`,
        tempData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Process leads and convert them into FullCalendar events
      const events = res?.data?.appointmentData?.map((lead) => {
        // Title for the event
        const eventTitle = `${lead.first_name} ${lead.last_name}`;

        return {
          id: lead?.id,
          title: eventTitle,
          start: moment(
            lead?.appointment_date_time,
            "YYYY-MM-DD HH:mm:ss"
          ).toDate(),
          end: moment(
            lead?.appointment_date_time_end,
            "YYYY-MM-DD HH:mm:ss"
          ).toDate(),
          leadDetails: lead,
        };
      });

      setCalendarEvents(events);
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Lead",
        err?.response?.data?.message || err?.message
      );
    }
  };

  const handleSelectEvent = (info) => {
    setisModalVisibleViewLeadDetailsShort(true);
    setselectedItemDetails(info.event.extendedProps.leadDetails);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEventContent = (eventInfo) => {
    const { start, end } = eventInfo.event;
    const startTime = moment(start).format("hh:mm A");
    const endTime = moment(end).format("hh:mm A");

    const leadDetails = eventInfo.event.extendedProps.leadDetails;

    let eventStyle;
    if (leadDetails?.appointment_status) {
      eventStyle = leadStatusColorAndTextListForCalender.find(
        (item) => item.status === leadDetails?.appointment_status
      );
    } else {
      eventStyle = leadStatusColorAndTextListForCalender.find(
        (item) => item.status === leadDetails?.lead_status
      );
    }

    const backgroundColor = eventStyle?.backgroud || "#F6F7FD";
    const textColor = eventStyle?.color || "#000";
    const appointmentStatus = eventStyle?.text || "No status";
    const borderLeftColor = eventStyle?.color || "#4682b4";

    return (
      <div
        style={{
          backgroundColor: backgroundColor,
          borderRadius: "4px",
          borderLeft: `5px solid ${borderLeftColor}`,
          padding: "5px",
          width: "100%",
          minHeight: "40px", // Set a minimum height to accommodate content
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          style={{
            fontSize: 12,
            color: textColor,
            fontWeight: "bold",
          }}
        >
          {appointmentStatus}
        </Typography>
        <Typography
          style={{
            fontSize: 14,
            color: "#192739F0",
            fontWeight: 600,
          }}
        >
          {eventInfo.event.title}
        </Typography>

        <Typography style={{ fontSize: 10, color: "gray" }}>
          {startTime} - {endTime}
        </Typography>
      </div>
    );
  };

  useEffect(() => {
    const now = new Date();
    handleGetCalenderDataForAppointment(
      now,
      moment(now).add(1, "week").toDate(),
      calendarView
    );
  }, [calendarView,userSeletedWebsiteList]);

  return (
    <div style={{ height: "80vh", padding: 10 ,overflow:'auto'}}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={calendarView}
        events={calendarEvents}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        eventClick={handleSelectEvent}
        datesSet={(dateInfo) =>
          handleGetCalenderDataForAppointment(
            dateInfo.start,
            dateInfo.end,
            dateInfo.view.type
          )
        }
        eventContent={handleEventContent}
        height="auto"
        dayMaxEvents={2}
        dayMaxEventRows={2} // Limit the number of events per day in week view
        moreLinkText={(num) => `+${num} more`} // Show more link if events exceed the max limit
      />

      {/* Modal for showing events on a selected day */}
      <Modal
        title="Events"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <List
          dataSource={modalEvents}
          renderItem={(event) => {
            const startTime = moment(event.start).format("YYYY-MM-DD hh:mm A");
            const endTime = moment(event.end).format("hh:mm A");
            return (
              <List.Item>
                <List.Item.Meta
                  title={event.title}
                  description={`${startTime} - ${endTime}`}
                />
              </List.Item>
            );
          }}
        />
      </Modal>
    </div>
  );
};

export default CustomCalendar;
