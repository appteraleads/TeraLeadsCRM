import React, { useState } from "react";
import {
  Typography,
  Button,
  Space,
  Layout,
  Dropdown,
  Tabs,
  Select,
} from "antd";
import { PiExportBold } from "react-icons/pi";
import { Content } from "antd/es/layout/layout";
import { ReactComponent as Reportsvg } from "../assets/IconSvg/hugeicons_analytics-up.svg";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import OverviewReports from "./OverviewReport";
import LeadsReport from "./LeadsReport";
import AppointmentsReport from "./AppointmentsReport";
import { IoIosArrowDown } from "react-icons/io";
import {
  CsvSVG,
  DocSVG,
  PdfSVG,
  XclSVG,
} from "../Common/SettingSidebarIconsSvg";
import { FiCalendar } from "react-icons/fi";
dayjs.extend(customParseFormat);

const ExportOpitems = [
  {
    key: "pdf",
    icon: <PdfSVG size={15} />,
    label: <Typography style={{ marginLeft: 10 }}>Export PDF</Typography>,
  },
  {
    key: "excel",
    icon: <XclSVG size={15} />,
    label: <Typography style={{ marginLeft: 10 }}>Export XLS</Typography>,
  },
  {
    key: "doc",
    icon: <DocSVG size={15} />,
    label: <Typography style={{ marginLeft: 10 }}>Export DOC</Typography>,
  },
  {
    key: "csv",
    icon: <CsvSVG size={15} />,
    label: <Typography style={{ marginLeft: 10 }}>Export As CSV</Typography>,
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

const Reports = ({
  searchContent,
  openNotificationWithIcon,
  setisVisibleQuickConversation,
  setquickConversationView,
  setselectedConversationDetails,
}) => {
  const [defaultActiveKey, setdefaultActiveKey] = useState(1);

  const onChange = (newActiveKey) => {
    setdefaultActiveKey(parseInt(newActiveKey));
    if (newActiveKey === "1") {
    } else if (newActiveKey === "2") {
    } else if (newActiveKey === "3") {
    }
  };

  return (
    <>
      <Layout>
        <Layout.Header style={headerStyles}>
          <div style={leftColStyles}>
            <Reportsvg />
            <Space style={{ marginLeft: 10 }}>
              <Typography style={{ fontWeight: "bold" }}>Reports</Typography>
            </Space>
          </div>
          <div style={rightColStyles}>
            <Space>
              <Select
                placeholder="Select"
                suffixIcon={
                  <FiCalendar style={{ fontSize: 20, display: "flex" }} />
                }
                prefixIcon={
                  <FiCalendar style={{ fontSize: 20, display: "flex" }} />
                }
                style={{
                  width: "200px",
                }}
                onChange={(e) => {}}
                defaultValue={"All"}
                options={[
                  {
                    value: "All",
                    label: "All",
                  },
                  {
                    value: "today",
                    label: "Today",
                  },
                  {
                    value: "Last7days",
                    label: "Last 7 days",
                  },
                  {
                    value: "Last14days",
                    label: "Last 14 days",
                  },
                  {
                    value: "Last30days",
                    label: "Last 30 days",
                  },
                  {
                    value: "Last3months",
                    label: "Last 3 months",
                  },
                  {
                    value: "Last6months",
                    label: "Last 6 months",
                  },
                  {
                    value: "Thismonth",
                    label: "This month",
                  },
                  {
                    value: "Thisyear",
                    label: "This year",
                  },
                ]}
              />

              <Dropdown menu={{ items: ExportOpitems }} placement="bottomLeft">
                <Button type="primary">
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <PiExportBold />
                    Export
                    <IoIosArrowDown />
                  </span>
                </Button>
              </Dropdown>
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
                children: <OverviewReports />,
              },
              {
                label: "Leads",
                key: "2",
                children: <LeadsReport />,
              },
              {
                label: "Appointments",
                key: "3",
                children: <AppointmentsReport />,
              },
              {
                label: "Call",
                key: "4",
                children: <></>,
              },
            ]}
          />
        </Content>
      </Layout>
    </>
  );
};

export default Reports;
