import React, { useState } from "react";
import { Layout, Menu, Row, Col, Space, Divider, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  MyAccountSVG,
  ClinicDetailsSVG,
  TeamSVG,
  AICallsSVG,
  BillingPlanSVG,
  NotificationsSVG,
  ConversationalAISVG,
  LeadsSVG,
  CampaignsSVG,
  AutomationsSVG,
  ReportsSVG,
  AppointmentsSVG,
  SettingsSVG,
} from "../Common/SettingSidebarIconsSvg";

import "./style.css";
import MyAccount from "./MyAccount";
import ClinicDetails from "./ClinicDetails";
import Notifications from "./Notifications";
import AppointmentsSetting from "./AppointmentsSetting";
import ConversationsSetting from "./ConversationsSetting";
import LeadsSetting from "./LeadsSetting";
import TeamSetting from "./TeamSetting";
const { Header, Sider } = Layout;

const SettingsLayout = ({ openNotificationWithIcon, loginUserDetails }) => {
  const [settingSidebarKey, setsettingSidebarKey] = useState("1");
  const [settingSidebarValue, setsettingSidebarValue] = useState("My Account");

  const sidebaritems = [
    {
      key: "Account",
      label: "Account",
      type: "group",
      children: [
        {
          key: "1",
          icon: (
            <div>
              <MyAccountSVG
                color={
                  settingSidebarValue === "My Account" ? "#3900DB" : "#72779E"
                }
                style={{ width: 20 }}
              />
            </div>
          ),
          label: (
            <span className="custom-text1" style={{ padding: 2 }}>
              My Account
            </span>
          ),
          onClick: () => setsettingSidebarValue("My Account"),
        },
        ...(loginUserDetails?.id ===
        loginUserDetails?.userClinicRoles?.[0]?.clinic?.owner_id
          ? [
              {
                key: "2",
                icon: (
                  <div>
                    <ClinicDetailsSVG
                      color={
                        settingSidebarValue === "Clinic Details"
                          ? "#3900DB"
                          : "#72779E"
                      }
                      style={{ width: 20 }}
                    />
                  </div>
                ),
                label: (
                  <span className="custom-text1" style={{ padding: 2 }}>
                    Clinic Details
                  </span>
                ),
                onClick: () => setsettingSidebarValue("Clinic Details"),
              },
              {
                key: "3",
                icon: (
                  <div>
                    <TeamSVG
                      color={
                        settingSidebarValue === "Team" ? "#3900DB" : "#72779E"
                      }
                      style={{ width: 20 }}
                    />
                  </div>
                ),
                label: (
                  <span className="custom-text1" style={{ padding: 2 }}>
                    Team
                  </span>
                ),
                onClick: () => setsettingSidebarValue("Team"),
              },
            ]
          : []),

        {
          key: "4",
          icon: (
            <div>
              <BillingPlanSVG
                color={
                  settingSidebarValue === "Billing & Plan"
                    ? "#3900DB"
                    : "#72779E"
                }
                style={{ width: 20 }}
              />
            </div>
          ),
          label: (
            <span className="custom-text1" style={{ padding: 2 }}>
              Billing & Plan
            </span>
          ),
          onClick: () => setsettingSidebarValue("Billing & Plan"),
        },
        {
          key: "5",
          icon: (
            <div>
              <NotificationsSVG
                color={
                  settingSidebarValue === "Notifications"
                    ? "#3900DB"
                    : "#72779E"
                }
                style={{ width: 20 }}
              />
            </div>
          ),
          label: (
            <span className="custom-text1" style={{ padding: 2 }}>
              Notifications
            </span>
          ),
          onClick: () => setsettingSidebarValue("Notifications"),
        },
      ],
    },
    {
      key: "AIAgent",
      label: "AI Agent",
      type: "group",
      children: [
        {
          key: "6",
          icon: (
            <div>
              <AICallsSVG
                color={
                  settingSidebarValue === "AI Calls" ? "#3900DB" : "#72779E"
                }
                style={{ width: 20 }}
              />
            </div>
          ),
          label: (
            <span className="custom-text1" style={{ padding: 2 }}>
              AI Calls
            </span>
          ),
          onClick: () => setsettingSidebarValue("AI Calls"),
        },
        {
          key: "7",
          icon: (
            <div>
              <ConversationalAISVG
                color={
                  settingSidebarValue === "Conversational AI"
                    ? "#3900DB"
                    : "#72779E"
                }
                style={{ width: 20 }}
              />
            </div>
          ),
          label: (
            <span className="custom-text1" style={{ padding: 2 }}>
              Conversational AI
            </span>
          ),
          onClick: () => setsettingSidebarValue("Conversational AI"),
        },
      ],
    },
    {
      key: "Preferences ",
      label: "Preferences ",
      type: "group",
      children: [
        {
          key: "8",
          icon: (
            <div>
              <AppointmentsSVG
                color={
                  settingSidebarValue === "Appointments" ? "#3900DB" : "#72779E"
                }
                style={{ width: 20 }}
              />
            </div>
          ),
          label: (
            <span className="custom-text1" style={{ padding: 2 }}>
              Appointments
            </span>
          ),
          onClick: () => setsettingSidebarValue("Appointments"),
        },
        {
          key: "9",
          icon: (
            <div>
              <ConversationalAISVG
                color={
                  settingSidebarValue === "Conversations"
                    ? "#3900DB"
                    : "#72779E"
                }
                style={{ width: 20 }}
              />
            </div>
          ),
          label: (
            <span className="custom-text1" style={{ padding: 2 }}>
              Conversations
            </span>
          ),
          onClick: () => setsettingSidebarValue("Conversations"),
        },
        {
          key: "10",
          icon: (
            <div>
              <LeadsSVG
                color={settingSidebarValue === "Leads" ? "#3900DB" : "#72779E"}
                style={{ width: 20 }}
              />
            </div>
          ),
          label: (
            <span className="custom-text1" style={{ padding: 2 }}>
              Leads
            </span>
          ),
          onClick: () => setsettingSidebarValue("Leads"),
        },
        {
          key: "11",
          icon: (
            <div>
              <CampaignsSVG
                color={
                  settingSidebarValue === "Campaigns" ? "#3900DB" : "#72779E"
                }
                style={{ width: 20 }}
              />
            </div>
          ),
          label: (
            <span className="custom-text1" style={{ padding: 2 }}>
              Campaigns
            </span>
          ),
          onClick: () => setsettingSidebarValue("Campaigns"),
        },
        {
          key: "12",
          icon: (
            <div>
              <AutomationsSVG
                color={
                  settingSidebarValue === "Automations" ? "#3900DB" : "#72779E"
                }
                style={{ width: 20 }}
              />
            </div>
          ),
          label: (
            <span className="custom-text1" style={{ padding: 2 }}>
              Automations
            </span>
          ),
          onClick: () => setsettingSidebarValue("Automations"),
        },
        {
          key: "13",
          icon: (
            <div>
              <ReportsSVG
                color={
                  settingSidebarValue === "Reports" ? "#3900DB" : "#72779E"
                }
                style={{ width: 20 }}
              />
            </div>
          ),
          label: (
            <span className="custom-text1" style={{ padding: 2 }}>
              Reports
            </span>
          ),
          onClick: () => setsettingSidebarValue("Reports"),
        },
      ],
    },
  ];

  const onClickSettingSidebar = (e) => {
    setsettingSidebarKey(e?.key);
  };

  return (
    <>
      <Layout>
        <Sider
          width={200}
          style={{
            background: "#fff",
            borderRight: "1px solid #E8EBEF",
          }}
        >
          <div
            style={{
              padding: "10px",
              height: 65,
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Space>
              <div style={{ display: "flex", width: 20 }}>
                <SettingsSVG color={"#72779E"} />
              </div>
              <Typography style={{ fontWeight: 600 }}>Settings</Typography>
            </Space>
          </div>
          <Divider style={{ margin: 0, background: "#E8EBEF" }} />
          <div
            style={{ display: "flex", flexDirection: "column", height: "90%" }}
          >
            {/* Main Menu items */}
            <Menu
              onClick={onClickSettingSidebar}
              selectedKeys={[settingSidebarKey]}
              mode="inline"
              items={sidebaritems}
              style={{ background: "none", flexGrow: 1 }}
              className="setting-sidebar-menu"
            />
          </div>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{
              padding: 0,
              background: "#fff",
              borderBottom: "1px solid #E8EBEF",
            }}
          >
            <Row
              style={{
                borderLeft: "1px solid #E8EBEF",
                height: 64,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Col
                span={6}
                style={{ display: "flex", alignItems: "center", padding: 10 }}
              >
                <Space style={{ display: "flex", alignItems: "center" }}>
                  {settingSidebarValue === "My Account" ? (
                    <div style={{ display: "flex" }}>
                      <MyAccountSVG color={"#72779E"} />
                    </div>
                  ) : settingSidebarValue === "Clinic Details" ? (
                    <div style={{ display: "flex" }}>
                      <ClinicDetailsSVG
                        color={"#72779E"}
                        style={{ display: "flex" }}
                      />
                    </div>
                  ) : settingSidebarValue === "Team" ? (
                    <div style={{ display: "flex" }}>
                      <TeamSVG color={"#72779E"} style={{ display: "flex" }} />
                    </div>
                  ) : settingSidebarValue === "Billing & Plan" ? (
                    <div style={{ display: "flex" }}>
                      <BillingPlanSVG color={"#72779E"} />
                    </div>
                  ) : settingSidebarValue === "Notifications" ? (
                    <div style={{ display: "flex" }}>
                      <NotificationsSVG color={"#72779E"} />
                    </div>
                  ) : settingSidebarValue === "AI Calls" ? (
                    <div style={{ display: "flex" }}>
                      <AICallsSVG color={"#72779E"} />
                    </div>
                  ) : settingSidebarValue === "Conversational AI" ? (
                    <div style={{ display: "flex" }}>
                      <ConversationalAISVG color={"#72779E"} />
                    </div>
                  ) : settingSidebarValue === "Appointments" ? (
                    <div style={{ display: "flex" }}>
                      <AppointmentsSVG color={"#72779E"} />
                    </div>
                  ) : settingSidebarValue === "Conversations" ? (
                    <div style={{ display: "flex" }}>
                      <ConversationalAISVG color={"#72779E"} />
                    </div>
                  ) : settingSidebarValue === "Leads" ? (
                    <div style={{ display: "flex" }}>
                      <LeadsSVG color={"#72779E"} />
                    </div>
                  ) : settingSidebarValue === "Campaigns" ? (
                    <div style={{ display: "flex" }}>
                      <CampaignsSVG color={"#72779E"} />
                    </div>
                  ) : settingSidebarValue === "Automations" ? (
                    <div style={{ display: "flex" }}>
                      <AutomationsSVG color={"#72779E"} />
                    </div>
                  ) : settingSidebarValue === "Reports" ? (
                    <div style={{ display: "flex" }}>
                      <ReportsSVG color={"#72779E"} />
                    </div>
                  ) : (
                    ""
                  )}
                  <Typography style={{ fontWeight: 600 }}>
                    {settingSidebarValue}
                  </Typography>
                </Space>
              </Col>
            </Row>
          </Header>
          <Content style={{ padding: 10, background: "#FCFDFF" }}>
            {settingSidebarValue === "My Account" ? (
              <MyAccount
                openNotificationWithIcon={openNotificationWithIcon}
                loginUserDetails={loginUserDetails}
              />
            ) : settingSidebarValue === "Clinic Details" ? (
              <div style={{ display: "flex" }}>
                <ClinicDetails
                  openNotificationWithIcon={openNotificationWithIcon}
                  loginUserDetails={loginUserDetails}
                />
              </div>
            ) : settingSidebarValue === "Team" ? (
              <TeamSetting
                openNotificationWithIcon={openNotificationWithIcon}
                loginUserDetails={loginUserDetails}
              />
            ) : settingSidebarValue === "Billing & Plan" ? (
              <div style={{ display: "flex" }}>
                <BillingPlanSVG color={"#72779E"} />
                Billing & Plan
              </div>
            ) : settingSidebarValue === "Notifications" ? (
              <Notifications
                openNotificationWithIcon={openNotificationWithIcon}
                loginUserDetails={loginUserDetails}
              />
            ) : settingSidebarValue === "AI Calls" ? (
              <div style={{ display: "flex" }}>
                <AICallsSVG color={"#72779E"} />
                AI Calls
              </div>
            ) : settingSidebarValue === "Conversational AI" ? (
              <div style={{ display: "flex" }}>
                <ConversationalAISVG color={"#72779E"} />
                Conversational AI
              </div>
            ) : settingSidebarValue === "Appointments" ? (
              <AppointmentsSetting
                openNotificationWithIcon={openNotificationWithIcon}
                loginUserDetails={loginUserDetails}
              />
            ) : settingSidebarValue === "Conversations" ? (
              <ConversationsSetting />
            ) : settingSidebarValue === "Leads" ? (
              <LeadsSetting
                openNotificationWithIcon={openNotificationWithIcon}
                loginUserDetails={loginUserDetails}
              />
            ) : settingSidebarValue === "Campaigns" ? (
              <div style={{ display: "flex" }}>
                <CampaignsSVG color={"#72779E"} />
              </div>
            ) : settingSidebarValue === "Automations" ? (
              <div style={{ display: "flex" }}>
                <AutomationsSVG color={"#72779E"} />
                Campaigns
              </div>
            ) : settingSidebarValue === "Reports" ? (
              <div style={{ display: "flex" }}>
                <ReportsSVG color={"#72779E"} />
                Reports
              </div>
            ) : (
              ""
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default SettingsLayout;
