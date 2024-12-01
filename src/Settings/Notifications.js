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
  Checkbox,
  Skeleton,
} from "antd";
import { IoAlertCircleOutline } from "react-icons/io5";
import axios from "axios";

const { Text } = Typography;

const Notifications = ({ openNotificationWithIcon, loginUserDetails }) => {
  const [pageloader, setpageloader] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState();
  const [receiveNotificationsSMS, setreceiveNotificationsSMS] = useState();
  const [receiveNotificationsEmail, setreceiveNotificationsEmail] = useState();
  const [receiveInAppNotification, setreceiveInAppNotification] = useState();
  const [notifications_DND, setnotifications_DND] = useState();

  const [notifyAppointmentBooked, setnotifyAppointmentBooked] = useState();
  const [notifyLeadReschedule, setnotifyLeadReschedule] = useState();
  const [
    notifyAppointmentRescheduledCanceled,
    setnotifyAppointmentRescheduledCanceled,
  ] = useState();
  const [notifyAppointmentNear, setnotifyAppointmentNear] = useState();
  const [notifyConfirmedAppointment, setnotifyConfirmedAppointment] =
    useState();
  const [notifyNewLeadAdded, setnotifyNewLeadAdded] = useState();
  const [notifyLeadAssignments, setnotifyLeadAssignments] = useState();
  const [notifyMentionedLeadNotes, setnotifyMentionedLeadNotes] = useState();

  const [
    notifyConversationReceiveNewMessage,
    setnotifyConversationReceiveNewMessage,
  ] = useState();

  const [notifyCampaignSentScheduled, setnotifyCampaignSentScheduled] =
    useState();
  const [
    notifygetinsightsCampaignPerformance,
    setnotifygetinsightsCampaignPerformance,
  ] = useState();

  const [unsaveChanges, setunsaveChanges] = useState(false);
  const onChange = (key) => {
    console.log(key);
  };

  const handleSubmitNotificationsSetting = async () => {
    setbuttonLoader(true);
    let data = {
      user_id: loginUserDetails?.id,
      clinic_id: loginUserDetails?.clinic_id,
      receive_notifications_sms: receiveNotificationsSMS,
      receive_notifications_email: receiveNotificationsEmail,
      receive_inapp_notification: receiveInAppNotification,
      notifications_dnd: notifications_DND,
      notify_appointment_booked: notifyAppointmentBooked,
      notify_lead_reschedule: notifyLeadReschedule,
      notify_appointment_rescheduled_canceled:
        notifyAppointmentRescheduledCanceled,
      notify_confirmed_appointment: notifyConfirmedAppointment,
      notify_appointment_near: notifyAppointmentNear,
      notify_newlead_added: notifyNewLeadAdded,
      notify_lead_assignments: notifyLeadAssignments,
      notify_mentioned_lead_notes: notifyMentionedLeadNotes,
      notify_conversation_receive_newmessage:
        notifyConversationReceiveNewMessage,
      notify_campaign_sent_scheduled: notifyCampaignSentScheduled,
      notify_getinsights_campaign_performance:
        notifygetinsightsCampaignPerformance,
    };

    const token = localStorage.getItem("authToken");

    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/notification-settings`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res?.status === 200) {
          setunsaveChanges(false);
          handleGetNotificationsDetails();
          openNotificationWithIcon(
            "success",
            "Settings",
            "Updated successfully"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Settings",
          err?.response?.data?.message || err?.message
        );
      });
    console.log(data);
    setbuttonLoader(false);
  };

  const handleGetNotificationsDetails = async () => {
    setpageloader(true);
    const token = localStorage.getItem("authToken");
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/notification-settings?user_id=${loginUserDetails?.id}&clinic_id=${loginUserDetails?.clinic_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res?.data?.notificationSetting);
          setreceiveNotificationsSMS(
            res?.data?.notificationSetting?.receive_notifications_sms
          );
          setreceiveNotificationsEmail(
            res?.data?.notificationSetting?.receive_notifications_email
          );
          setreceiveInAppNotification(
            res?.data?.notificationSetting?.receive_inapp_notification
          );
          setnotifications_DND(
            res?.data?.notificationSetting?.notifications_dnd
          );

          setnotifyAppointmentBooked(
            res?.data?.notificationSetting?.notify_appointment_booked
          );
          setnotifyLeadReschedule(
            res?.data?.notificationSetting?.notify_lead_reschedule
          );

          setnotifyAppointmentRescheduledCanceled(
            res?.data?.notificationSetting
              ?.notify_appointment_rescheduled_canceled
          );
          setnotifyAppointmentNear(
            res?.data?.notificationSetting?.notify_appointment_near
          );
          setnotifyConfirmedAppointment(
            res?.data?.notificationSetting?.notify_confirmed_appointment
          );

          setnotifyNewLeadAdded(
            res?.data?.notificationSetting?.notify_newlead_added
          );
          setnotifyLeadAssignments(
            res?.data?.notificationSetting?.notify_lead_assignments
          );
          setnotifyMentionedLeadNotes(
            res?.data?.notificationSetting?.notify_mentioned_lead_notes
          );

          setnotifyConversationReceiveNewMessage(
            res?.data?.notificationSetting
              ?.notify_conversation_receive_newmessage
          );

          setnotifyCampaignSentScheduled(
            res?.data?.notificationSetting?.notify_campaign_sent_scheduled
          );
          setnotifygetinsightsCampaignPerformance(
            res?.data?.notificationSetting
              ?.notify_getinsights_campaign_performance
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    setpageloader(false);
  };

  const items = [
    {
      key: "1",
      label: "Genral",
      children: (
        <>
          {pageloader ? (
            <Skeleton />
          ) : (
            <Card bordered={false} style={{ width: "100%" }}>
              <Typography style={{ fontWeight: 600 }}>
                Notification Settings
              </Typography>
              <Divider />
              <Row align="middle" gutter={[16, 16]}>
                <Col span={12}>
                  <Typography style={{ fontWeight: 600 }}>
                    Notification Channels
                  </Typography>
                  <Text className="custom-text1">
                    How would you like to receive notifications?
                  </Text>
                </Col>
                <Col span={12}>
                  <Space>
                    <Checkbox
                      checked={receiveNotificationsSMS}
                      onChange={(e) => {
                        setreceiveNotificationsSMS(e?.target?.checked);
                        setunsaveChanges(true);
                      }}
                    >
                      Email
                    </Checkbox>
                    <Checkbox
                      checked={receiveNotificationsEmail}
                      onChange={(e) => {
                        setreceiveNotificationsEmail(e?.target?.checked);
                        setunsaveChanges(true);
                      }}
                    >
                      SMS
                    </Checkbox>
                    <Checkbox
                      checked={receiveInAppNotification}
                      onChange={(e) => {
                        setreceiveInAppNotification(e?.target?.checked);
                        setunsaveChanges(true);
                      }}
                    >
                      In-App Notifications
                    </Checkbox>
                  </Space>
                </Col>
              </Row>
              <Divider />
              <Row align="middle" gutter={[16, 16]}>
                <Col span={12}>
                  <Typography style={{ fontWeight: 600 }}>
                    Enable Do Not Disturb mode.
                  </Typography>
                  <Text className="custom-text1">
                    Automatically assign new leads or set a default owner for
                    unclaimed leads.
                  </Text>
                </Col>
                <Col span={12} align="end">
                  <Space>
                    <Typography>Rules</Typography>
                    <Switch
                      checked={notifications_DND}
                      onChange={(e) => {
                        setnotifications_DND(e);
                        setunsaveChanges(true);
                      }}
                    ></Switch>
                  </Space>
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
                    disabled={!unsaveChanges}
                    loading={buttonLoader}
                    onClick={() => {
                      handleSubmitNotificationsSetting();
                    }}
                  >
                    Save
                  </Button>
                  <Space style={{ marginLeft: 10 }}>
                    {unsaveChanges && (
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
      label: "Appointments",
      children: (
        <>
          {pageloader ? (
            <Skeleton />
          ) : (
            <Card bordered={false} style={{ width: "100%" }}>
              <Typography style={{ fontWeight: 600 }}>
                Appointment Notifications
              </Typography>
              <Divider />
              <Row align="middle" gutter={[16, 16]}>
                <Col span={12}>
                  <Typography style={{ fontWeight: 600 }}>
                    New Appointment Notification
                  </Typography>
                  <Text className="custom-text1">
                    Notify me when a new appointment is booked.
                  </Text>
                </Col>
                <Col span={12} align="end">
                  <Space>
                    <Typography>Get notified for new bookings</Typography>
                    <Switch
                      checked={notifyAppointmentBooked}
                      onChange={(e) => {
                        setnotifyAppointmentBooked(e);
                        setunsaveChanges(true);
                      }}
                    ></Switch>
                  </Space>
                </Col>
              </Row>
              <Divider />
              <Row align="middle" gutter={[16, 16]}>
                <Col span={12}>
                  <Typography style={{ fontWeight: 600 }}>
                    Appointment Reschedule Request
                  </Typography>
                  <Text className="custom-text1">
                    Notify me when a lead asked for reschedule
                  </Text>
                </Col>
                <Col span={12} align="end">
                  <Space>
                    <Typography>Stay informed about leads request.</Typography>
                    <Switch
                      checked={notifyLeadReschedule}
                      onChange={(e) => {
                        setnotifyLeadReschedule(e);
                        setunsaveChanges(true);
                      }}
                    ></Switch>
                  </Space>
                </Col>
              </Row>
              <Divider />
              <Row align="middle" gutter={[16, 16]}>
                <Col span={12}>
                  <Typography style={{ fontWeight: 600 }}>
                    Appointment Reschedule or Cancellation
                  </Typography>
                  <Text className="custom-text1">
                    Notify me when an appointment is rescheduled or canceled.
                  </Text>
                </Col>
                <Col span={12} align="end">
                  <Space>
                    <Typography>
                      Stay informed about changes to bookings.
                    </Typography>
                    <Switch
                      checked={notifyAppointmentRescheduledCanceled}
                      onChange={(e) => {
                        setnotifyAppointmentRescheduledCanceled(e);
                        setunsaveChanges(true);
                      }}
                    ></Switch>
                  </Space>
                </Col>
              </Row>
              <Divider />
              <Row align="middle" gutter={[16, 16]}>
                <Col span={12}>
                  <Typography style={{ fontWeight: 600 }}>
                    Confirmed Appointment
                  </Typography>
                  <Text className="custom-text1">
                    Notify me when an appointment is confirmed.
                  </Text>
                </Col>
                <Col span={12} align="end">
                  <Space>
                    <Typography>
                      Stay informed about confirmed appointments.
                    </Typography>
                    <Switch
                      checked={notifyConfirmedAppointment}
                      onChange={(e) => {
                        setnotifyConfirmedAppointment(e);
                        setunsaveChanges(true);
                      }}
                    ></Switch>
                  </Space>
                </Col>
              </Row>
              <Divider />
              <Row align="middle" gutter={[16, 16]}>
                <Col span={12}>
                  <Typography style={{ fontWeight: 600 }}>
                    Upcoming Appointment Reminder
                  </Typography>
                  <Text className="custom-text1">
                    Notify me when an assigned appointment is near.
                  </Text>
                </Col>
                <Col span={12} align="end">
                  <Space>
                    <Typography>
                      Get a reminder before your scheduled appointments.
                    </Typography>
                    <Switch
                      checked={notifyAppointmentNear}
                      onChange={(e) => {
                        setnotifyAppointmentNear(e);
                        setunsaveChanges(true);
                      }}
                    ></Switch>
                  </Space>
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
                    disabled={!unsaveChanges}
                    loading={buttonLoader}
                    onClick={() => {
                      handleSubmitNotificationsSetting();
                    }}
                  >
                    Save
                  </Button>
                  <Space style={{ marginLeft: 10 }}>
                    {unsaveChanges && (
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
      key: "3",
      label: "Leads",
      children: (
        <>
          <Card bordered={false} style={{ width: "100%" }}>
            <Typography style={{ fontWeight: 600 }}>
              Leads Notifications
            </Typography>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  New Lead Captured
                </Typography>
                <Text className="custom-text1">
                  Notify me when a new lead is added.
                </Text>
              </Col>
              <Col span={12} align="end">
                <Space>
                  <Typography>
                    Get alerts for every new lead captured.
                  </Typography>
                  <Switch
                    checked={notifyNewLeadAdded}
                    onChange={(e) => {
                      setnotifyNewLeadAdded(e);
                      setunsaveChanges(true);
                    }}
                  ></Switch>
                </Space>
              </Col>
            </Row>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Lead Assignment
                </Typography>
                <Text className="custom-text1">
                  Stay updated on lead assignments.
                </Text>
              </Col>
              <Col span={12} align="end">
                <Space>
                  <Typography>Stay informed about leads request.</Typography>
                  <Switch
                    checked={notifyLeadAssignments}
                    onChange={(e) => {
                      setnotifyLeadAssignments(e);
                      setunsaveChanges(true);
                    }}
                  ></Switch>
                </Space>
              </Col>
            </Row>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={11}>
                <Typography style={{ fontWeight: 600 }}>
                  Mention in Lead Notes
                </Typography>
                <Text className="custom-text1">
                  Notify me when I’m mentioned in lead notes.
                </Text>
              </Col>
              <Col span={13} align="end">
                <Space>
                  <Typography>
                    Get notified when team members mention you in a lead’s
                    notes.
                  </Typography>
                  <Switch
                    checked={notifyMentionedLeadNotes}
                    onChange={(e) => {
                      setnotifyMentionedLeadNotes(e);
                      setunsaveChanges(true);
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
                  disabled={!unsaveChanges}
                  loading={buttonLoader}
                  onClick={() => {
                    handleSubmitNotificationsSetting();
                  }}
                >
                  Save
                </Button>
                <Space style={{ marginLeft: 10 }}>
                  {unsaveChanges && (
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
    {
      key: "4",
      label: "Conversations",
      children: (
        <>
          <Card bordered={false} style={{ width: "100%" }}>
            <Typography style={{ fontWeight: 600 }}>
              Conversations Notifications
            </Typography>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  New Message Received
                </Typography>
                <Text className="custom-text1">
                  Notify me when I receive a new message.
                </Text>
              </Col>
              <Col span={12} align="end">
                <Space>
                  <Typography>Get alerts for incoming messages.</Typography>
                  <Switch
                    checked={notifyConversationReceiveNewMessage}
                    onChange={(e) => {
                      setnotifyConversationReceiveNewMessage(e);
                      setunsaveChanges(true);
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
                  disabled={!unsaveChanges}
                  loading={buttonLoader}
                  onClick={() => {
                    handleSubmitNotificationsSetting();
                  }}
                >
                  Save
                </Button>
                <Space style={{ marginLeft: 10 }}>
                  {unsaveChanges && (
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
    {
      key: "5",
      label: "Campaigns",
      children: (
        <>
          <Card bordered={false} style={{ width: "100%" }}>
            <Typography style={{ fontWeight: 600 }}>
              Campaigns Notifications
            </Typography>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Campaign Status Updates
                </Typography>
                <Text className="custom-text1">
                  Notify me when a campaign is sent or scheduled.
                </Text>
              </Col>
              <Col span={12} align="end">
                <Space>
                  <Typography>Track the progress of your campaigns.</Typography>
                  <Switch
                    checked={notifyCampaignSentScheduled}
                    onChange={(e) => {
                      setnotifyCampaignSentScheduled(e);
                      setunsaveChanges(true);
                    }}
                  ></Switch>
                </Space>
              </Col>
            </Row>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Campaign Performance Alerts
                </Typography>
                <Text className="custom-text1">
                  Get insights on campaign performance.
                </Text>
              </Col>
              <Col span={12} align="end">
                <Space>
                  <Typography>Get insights on campaign performance.</Typography>
                  <Switch
                    checked={notifygetinsightsCampaignPerformance}
                    onChange={(e) => {
                      setnotifygetinsightsCampaignPerformance(e);
                      setunsaveChanges(true);
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
                  disabled={!unsaveChanges}
                  loading={buttonLoader}
                  onClick={() => {
                    handleSubmitNotificationsSetting();
                  }}
                >
                  Save
                </Button>
                <Space style={{ marginLeft: 10 }}>
                  {unsaveChanges && (
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
    handleGetNotificationsDetails();
  }, []);
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        style={{ width: "100%", overflow: "auto", height: "75vh" }}
      />
    </>
  );
};

export default Notifications;
