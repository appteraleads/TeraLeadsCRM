import React from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Typography,
  Space,
  Divider,
  Tabs,
  Upload,
  Table,
} from "antd";
import { IoAlertCircleOutline } from "react-icons/io5";
import { UploadOutlined } from "@ant-design/icons";
import { IoIosSearch } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
const { Text } = Typography;

const ConversationsSetting = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const dataSource = [
    {
      key: "1",
      template_name: "Appointment Reminder",
      type: "SMS",
      preview:
        "Hi {Lead_Name}, your appointment is confirmed for {Appointment_Date} at {Appointment_Time}.",
    },
    {
      key: "2",
      template_name: "Missed Appointment Follow-Up",
      type: "Email",
      preview:
        "Dear {Lead_Name}, we noticed you missed your appointment. Please contact us to reschedule.",
    },
    {
      key: "3",
      template_name: "Payment Reminder",
      type: "SMS",
      preview:
        "Hi {Lead_Name}, your payment of {Closed_Amount} is due on {Appointment_Date}.",
    },
    {
      key: "4",
      template_name: "Appointment Reschedule",
      type: "Email",
      preview:
        "Dear {Lead_Name}, your appointment has been rescheduled to {Appointment_Date} at {Appointment_Time}.",
    },
    {
      key: "5",
      template_name: "Welcome Message",
      type: "Email",
      preview:
        "Welcome to {Clinic_Name}, {Lead_Name}! We’re excited to assist you.",
    },
  ];
  const columns = [
    {
      title: "Template Name",
      render: (text) => <>{text?.template_name}</>,
    },
    {
      title: "Type",
      render: (text) => <>{text?.type}</>,
      width: 50,
    },
    {
      title: "Preview",
      render: (text) => <>{text?.preview}</>,
    },
    {
      title: "Action",
      width: 100,
      render: () => <Button icon={<HiDotsHorizontal />}></Button>,
    },
  ];
  const templateitems = [
    {
      label: "All Templates",
      key: "1",
      children: (
        <>
          <Table
            dataSource={dataSource}
            columns={columns}
            scroll={{
              x: "max-content",
              y: "40vh",
            }}
          />
        </>
      ),
    },
    {
      label: "SMS Templates ",
      key: "2",
      children: (
        <>
          <Table
            dataSource={dataSource}
            columns={columns}
            scroll={{
              x: "max-content",
              y: "40vh",
            }}
          />
        </>
      ),
    },
    {
      label: "Email Templates ",
      key: "3",
      children: (
        <>
          <Table
            dataSource={dataSource}
            columns={columns}
            scroll={{
              x: "max-content",
              y: "40vh",
            }}
          />
        </>
      ),
    },
  ];
  const items = [
    {
      key: "1",
      label: "SMS Settings",
      children: (
        <>
          <Card bordered={false} style={{ width: "100%" }}>
            <Typography>
              Set preferences for your SMS communication.{" "}
            </Typography>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>Sender ID</Typography>
                <Text className="custom-text1">
                  The name displayed to recipients as the SMS sender.
                </Text>
              </Col>
              <Col span={12}>
                <Typography>Sender ID</Typography>
                <Input />
              </Col>
            </Row>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Default Number
                </Typography>
                <Text className="custom-text1">
                  Set the default phone number for sending SMS messages.
                </Text>
              </Col>
              <Col span={12}>
                <Typography>Phone Number</Typography>
                <Input className="custom-text1"></Input>
              </Col>
            </Row>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Default Country Code
                </Typography>
                <Text className="custom-text1">
                  Automatically add the selected country code to numbers.
                </Text>
              </Col>
              <Col span={12}>
                <Typography>Country</Typography>
                <Input className="custom-text1"></Input>
              </Col>
            </Row>

            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                <Button type="primary">Save</Button>
                <Space style={{ marginLeft: 10 }}>
                  <IoAlertCircleOutline
                    size={20}
                    className="custom-text1"
                    style={{ display: "flex" }}
                  />
                  <Text className="custom-text1">You have unsaved changes</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </>
      ),
    },
    {
      key: "2",
      label: "Email Settings",
      children: (
        <>
          <Card bordered={false} style={{ width: "100%" }}>
            <Typography>
              Configure your email communication preferences.
            </Typography>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Default Email Address
                </Typography>
                <Text className="custom-text1">
                  This email will be displayed as the sender address.
                </Text>
              </Col>
              <Col span={12}>
                <Typography>Email</Typography>
                <Input />
              </Col>
            </Row>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Email Forwarding
                </Typography>
                <Text className="custom-text1">
                  Automatically forward received emails to another email
                  address.
                </Text>
              </Col>
              <Col span={12}>
                <Typography>Email</Typography>
                <Input />
              </Col>
            </Row>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Email Signature
                </Typography>
                <Text className="custom-text1">
                  A signature that appears at the end of all outgoing emails.
                </Text>
                <Upload>
                  <Button icon={<UploadOutlined />}>
                    Upload HTML Signature
                  </Button>
                </Upload>
              </Col>
              <Col span={12}>
                <Input />
              </Col>
            </Row>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                <Button type="primary">Save</Button>
                <Space style={{ marginLeft: 10 }}>
                  <IoAlertCircleOutline
                    size={20}
                    className="custom-text1"
                    style={{ display: "flex" }}
                  />
                  <Text className="custom-text1">You have unsaved changes</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </>
      ),
    },
    {
      key: "3",
      label: "Saved Responses ",
      children: (
        <>
          <Card bordered={false} style={{ width: "100%" }}>
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Saved Responses
                </Typography>
                <Text className="custom-text1">
                  View, create, and manage your saved response templates.
                </Text>
              </Col>
              <Col span={12} align="end">
                <Space>
                  <Button icon={<IoIosSearch />} />
                  <Button type="primary"> + New Template</Button>
                </Space>
              </Col>
            </Row>
            <Divider style={{margin:'10px 0px'}} />
            <Tabs
              defaultActiveKey="1"
              items={templateitems}
              onChange={onChange}
              style={{ width: "100%", overflow: "auto", height: "75vh" }}
            />
          </Card>
        </>
      ),
    },
  ];
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

export default ConversationsSetting;
