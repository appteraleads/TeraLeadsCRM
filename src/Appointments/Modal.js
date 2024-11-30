import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
  Form,
  DatePicker,
  Spin,
  Menu,
  Avatar,
  Empty,
} from "antd";

import { IoChevronBackSharp } from "react-icons/io5";

import axios from "axios";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { getInitials } from "../Common/ReturnColumnValue";

const { Option } = Select;

export const CreateAppointment = ({
  handleGetAppointmentOverview,
  openNotificationWithIcon,
  isAppointmentModalVisible,
  setisAppointmentModalVisible,
  setbuttonLoader,
  disabledDate,
  buttonLoader,
  selectedItemDetails,
  setselectedItemDetails,
}) => {
  const [AppointmentDetailsform] = Form.useForm();
  const [fetching, setFetching] = useState(false);
  const [leadoptions, setleadoptions] = useState([]);

  const handleGetAllleads = async (page, limit, search, searchType) => {
    setleadoptions([]);
    setFetching(true);
    const token = localStorage.getItem("authToken");
    let data = {
      page: page || 1,
      limit: limit || 10,
      search: search || "",
      searchType: searchType?.trim() || "",
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-leads`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const temp = res?.data?.leads?.map((item) => {
            return {
              lable: item?.first_name + " " + item?.last_name,
              value: item?.first_name + " " + item?.last_name,
              item: item,
            };
          });
          setleadoptions(temp);
          setFetching(false);
        })
        .catch((error) => {
          openNotificationWithIcon(
            "error",
            "Lead",
            error?.response?.data || error?.message
          );
        });
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmitApointmentDateAndTime = async (values) => {
    if (
      selectedItemDetails?.first_name &&
      selectedItemDetails?.last_name &&
      selectedItemDetails?.email
    ) {
      setbuttonLoader(true);

      const data = {
        id: selectedItemDetails?.id,
        appointment_date_time: dayjs(
          values?.appointment_date_time,
          "YYYY-MMM-DD hh:mm A"
        ).format("YYYY-MM-DD HH:mm:ss"),
        appointment_duration: values?.appointment_duration,
        appointment_notes: values?.AppointmentNotes,
        lead_status: "Appointment",
      };
      console.log(data);
      const token = localStorage.getItem("authToken");
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
          setisAppointmentModalVisible(false);
          setbuttonLoader(false);
          setselectedItemDetails([]);
          openNotificationWithIcon(
            "success",
            "Appointment",
            "Appointment Added Successfully !"
          );
          AppointmentDetailsform.resetFields();
        })
        .catch((err) => {
          setbuttonLoader(false);
          console.log(err);
          AppointmentDetailsform.resetFields();
        });
    } else {
      openNotificationWithIcon(
        "error",
        "Lead",
        "To continue, please make sure to include your email, first name, and last name."
      );
    }
  };

  const handleCancelApointmentDateAndTime = () => {
    setisAppointmentModalVisible(false);
    AppointmentDetailsform.resetFields();
  };

  useEffect(() => {
    handleGetAllleads();
  }, []);

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={handleCancelApointmentDateAndTime}
            icon={<IoChevronBackSharp />}
          ></Button>
          <Typography style={{ marginLeft: 10 }}>
            Create New Appointment
          </Typography>
        </div>
      }
      visible={isAppointmentModalVisible}
      footer={null}
      closable={false}
      width={600}
      className="custom-modal"
    >
      <Form
        form={AppointmentDetailsform}
        onFinish={handleSubmitApointmentDateAndTime}
        initialValues={{ remember: true }}
        layout="vertical"
      >
        <Row style={{ margin: "10px 0" }}>
          <Col span={12}>
            <Space>
              <Typography>
                Select Lead<span style={{ color: "red" }}>*</span>
              </Typography>
            </Space>
          </Col>
        </Row>

        <Row style={{ margin: "10px 0" }}>
          <Col span={24}>
            <Select
              style={{ width: "100%" }}
              placeholder="Select lead"
              onSelect={(e, data) => {
                console.log(data);
                setselectedItemDetails(data?.item);
              }}
              onSearch={(e) => {
                if (e) {
                  handleGetAllleads("", "", e, "text");
                }
              }}
              notFoundContent={fetching ? <Spin size="small" /> : null}
              options={leadoptions}
              showSearch
              allowClear
            />
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label={
                <>
                  <span>Date & Time</span>
                  <span style={{ color: "red" }}>*</span>
                </>
              }
              name="appointment_date_time"
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker
                className="custom-text1"
                showTime
                format="YYYY-MMM-DD hh:mm A"
                style={{ width: "100%" }}
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={
                <>
                  <span>Duration</span>
                  <span style={{ color: "red" }}>*</span>
                </>
              }
              name="appointment_duration"
              rules={[{ required: true, message: "Please select a duration!" }]}
            >
              <Select placeholder="Select Duration">
                <Option value="30" selected>
                  30 minutes
                </Option>
                <Option value="45">45 minutes</Option>
                <Option value="60">1 hour</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Notes" name="AppointmentNotes">
              <Input.TextArea
                placeholder="Please enter notes"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button
            onClick={handleCancelApointmentDateAndTime}
            style={{ marginRight: 10 }}
          >
            Cancel
          </Button>
          <Form.Item>
            <Button
              className="custom-primary-button"
              htmlType="submit"
              block
              loading={buttonLoader}
            >
              Create Appointment
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export const LeadListAccodingToStatus = ({
  selectedCardTitle,
  setselectedCardTitle,
  isModalVisibleLeadListAccodingToStatus,
  setisModalVisibleLeadListAccodingToStatus,
  setselectedItemDetails,
  setisModalVisibleViewLeadDetailsShort,
}) => {
  const [loadingleadsList, setloadingleadsList] = useState(false);
  const [leadsList, setleadsList] = useState([]);
  const handleCancel = () => {
    setselectedCardTitle("");
    setisModalVisibleLeadListAccodingToStatus(false);
  };

  const handleGetLeadListAccodingToStatus = async () => {
    setloadingleadsList(true);
    const token = localStorage.getItem("authToken");
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-LeadListAccodingToStatus`,
        {
          params: { type: selectedCardTitle?.trim() },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setloadingleadsList(false);

        setleadsList(res?.data?.leads || []);
      })
      .catch((err) => {
        console.log(err);
        setloadingleadsList(false);
      });
    setloadingleadsList(false);
  };

  useEffect(() => {
    handleGetLeadListAccodingToStatus();
  }, [selectedCardTitle]);
  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={handleCancel} icon={<IoChevronBackSharp />}></Button>
          <Typography style={{ marginLeft: 10 }}>
            {selectedCardTitle}
          </Typography>
        </div>
      }
      visible={isModalVisibleLeadListAccodingToStatus}
      footer={null}
      closable={false}
      width={300}
      className="custom-modal-lead-details "
    >
      <Row style={{ maxHeight: "40vh", overflow: "auto" }}>
        <Menu style={{ width: "100%", border: "none" }}>
          {loadingleadsList ? (
            <Menu.Item key="loading" disabled>
              <Spin style={{ marginRight: 10 }} size="small" /> Loading...
            </Menu.Item>
          ) : (
            <>
              {leadsList?.length > 0 ? (
                leadsList?.map((lead) => (
                  <Menu.Item
                    key={lead?.id}
                    onClick={() => {
                      setisModalVisibleLeadListAccodingToStatus(false);
                      setselectedItemDetails(lead);
                      setisModalVisibleViewLeadDetailsShort(true);
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
                    <Typography>
                      {lead?.first_name && lead?.last_name
                        ? lead?.first_name + " " + lead?.last_name
                        : lead?.phone_number}
                    </Typography>
                  </Menu.Item>
                ))
              ) : (
                <Empty />
              )}
            </>
          )}
        </Menu>
      </Row>
    </Modal>
  );
};
