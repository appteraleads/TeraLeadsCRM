/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Table,
  Tag,
  Avatar,
  Pagination,
  Dropdown,
  Typography,
  Space,
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Divider,
  Select,
} from "antd";
import { leadStatusColorAndTextList } from "../Common/CommonCodeList";
import { getInitials } from "../Common/ReturnColumnValue";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import dayjs from "dayjs";
const { TabPane } = Tabs;

const ReturnCommonTable = ({
  columns,
  tabledataList,
  rowSelection,
  tableLoader,
  totalRecords,
  handlePageChange,
  itemRender,
}) => {
  return (
    <>
      <>
        <Table
          columns={columns}
          dataSource={tabledataList}
          rowSelection={rowSelection}
          loading={tableLoader}
          size="small"
          pagination={false}
          rowKey="key"
          scroll={{
            x: "max-content",
            y: "60vh",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 10px",
            alignItems: "center",
          }}
        >
          <span className="custom-text1">
            Showing 1-10 Leads {totalRecords}
          </span>
          <div style={{ display: "flex", gap: "10px" }}>
            <Pagination
              size="small"
              total={totalRecords}
              onChange={handlePageChange}
              showSizeChanger
              itemRender={itemRender}
            />
          </div>
        </div>
      </>
    </>
  );
};

const AppointmentsList = ({
  openNotificationWithIcon,
  dateCheck,
  setselectedItemDetails,
  setisModalVisibleViewLeadDetailsShort,
  userSeletedWebsiteList
}) => {
  const [activeTab, setactiveTab] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableLoader, settableLoader] = useState(false);
  const [tabledataList, settabledataList] = useState([]);
  const [totalRecords, settotalRecords] = useState();
  const [visibleFilter, setvisibleFilter] = useState(false);
  const [appointment_status, setappointment_status] = useState();
  const [appointment_date_time, setappointment_date_time] = useState();

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Date",
      width: 140,
      key: "date",
      render: (text) => (
        <>
          {text?.appointment_date_time ? (
            <>
              {text?.appointment_date_time ? (
                <>
                  {dateCheck(
                    dayjs(text?.appointment_date_time).format("MMM DD YYYY")
                  )}{" "}
                  {dayjs(text?.appointment_date_time).format("hh:mm A")}
                </>
              ) : (
                "-"
              )}
            </>
          ) : (
            <Tag />
          )}
        </>
      ),
    },
    {
      title: "Name",
      width: 130,
      ellipsis: true,
      render: (text) => (
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            setselectedItemDetails(text);
            setisModalVisibleViewLeadDetailsShort(true);
          }}
        >
          {text?.first_name && text?.last_name ? (
            <>
              <Avatar
                style={{
                  backgroundColor: text?.avatar_color,
                }}
              >
                {text?.first_name && text?.last_name
                  ? getInitials(text?.first_name + " " + text?.last_name)
                  : ""}
              </Avatar>
              <span
                style={{ marginLeft: 10, cursor: "pointer" }}
                onClick={() => {}}
              >
                {text?.first_name && text?.last_name
                  ? text?.first_name + " " + text?.last_name
                  : ""}
              </span>
            </>
          ) : (
            <Tag />
          )}
        </div>
      ),
    },
    {
      title: "Lead Status",
      ellipsis: true,
      width: 150,
      elipsis: true,
      render: (text) => (
        <>
          {text.lead_status ? (
            <span
              style={{
                color: leadStatusColorAndTextList.find(
                  (item) => item.status === text?.lead_status
                )?.color,
                border: "none",
              }}
            >
              {text?.lead_status !== ""
                ? leadStatusColorAndTextList.find(
                    (item) => item.status === text?.lead_status
                  )?.text
                : leadStatusColorAndTextList.find(
                    (item) => item.status === text?.lead_status
                  )?.text}
            </span>
          ) : (
            <Tag />
          )}
        </>
      ),
    },
    {
      title: "Appointment Status",
      ellipsis: true,
      width: 150,
      elipsis: true,
      render: (text) => (
        <>
          {text.appointment_status ? (
            <span
              style={{
                color: text?.appointment_status
                  ? leadStatusColorAndTextList.find(
                      (item) => item.status === text?.appointment_status
                    )?.color
                  : "",
                border: "none",
              }}
            >
              {text?.appointment_status
                ? leadStatusColorAndTextList.find(
                    (item) => item.status === text?.appointment_status
                  )?.text
                : ""}
            </span>
          ) : (
            <Tag />
          )}
        </>
      ),
    },
    {
      title: "Assigned",
      key: "Assigned",
      width: 150,
      render: (text) => {
        return text?.assign_to ? <span>{text?.assign_to}</span> : <Tag />;
      },
    },
    {
      title: "Appointment Note",
      key: "appointmentNote",
      width: 150,
      render: (text) => {
        return text?.appointment_notes ? (
          <span>{text?.appointment_notes}</span>
        ) : (
          <Tag />
        );
      },
    },
  ];

  const dropdownContent = (
    <div
      style={{
        padding: "12px",
        width: "250px",
        overflow: "auto",
        Height: "250px",
        background: "#fff",
        borderRadius: 5,
        boxShadow:
          " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Row
        style={{ display: "flex", justifyContent: "space-between", padding: 5 }}
      >
        <Col>
          <Typography
            className="custom-text1"
            style={{ marginRight: 10, display: "flex", alignItems: "center" }}
          >
            <FaFilter /> Filter
          </Typography>
        </Col>
      </Row>
      <Divider style={{ margin: 2 }} />
      <Row
        style={{ display: "flex", justifyContent: "space-between", padding: 5 }}
      >
        <Col span={24}>
          <Typography
            className="custom-text1"
            style={{ marginRight: 10, display: "flex", alignItems: "center" }}
          >
            Appointment Status
          </Typography>
          <Select
            style={{ width: "100%" }}
            placeholder="Select Appointment Status"
            onChange={(e) => {
              setappointment_status(e);
            }}
            options={[
              {
                lable: "Confirmed",
                value: "Confirmed",
              },
              {
                lable: "Not Confirmed",
                value: "Not Confirmed",
              },
            ]}
          />
        </Col>
      </Row>
      <Row
        style={{ display: "flex", justifyContent: "space-between", padding: 5 }}
      >
        <Col span={24}>
          <Typography
            className="custom-text1"
            style={{ marginRight: 10, display: "flex", alignItems: "center" }}
          >
            Appointment Date
          </Typography>
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Select Appointment Date"
            onChange={(e) => {
              setappointment_date_time(dayjs(e).format("MMM DD YYYY HH:mm A"));
            }}
          />
        </Col>
      </Row>
      <Row
        style={{ display: "flex", justifyContent: "space-between", padding: 5 }}
      >
        <Col span={24}>
          <Typography
            className="custom-text1"
            style={{ marginRight: 10, display: "flex", alignItems: "center" }}
          >
            Assigned
          </Typography>
          <Input placeholder="Select Assigne to" />
        </Col>
      </Row>
      <Divider style={{ margin: 2 }} />
      <Row
        style={{ display: "flex", justifyContent: "space-between", padding: 5 }}
      >
        <Col>
          <Button
            onClick={() => {
              setvisibleFilter(false);
            }}
          >
            Cancel
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              handleGetAllleadsForAppointment();
            }}
          >
            Save
          </Button>
        </Col>
      </Row>
    </div>
  );

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <div className="pagination-link">
          <a
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <IoIosArrowBack /> Previous
          </a>
        </div>
      );
    }
    if (type === "next") {
      return (
        <div className="pagination-link">
          <a
            className="pagination-link"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeftƒ: "10px",
            }}
          >
            Next <IoIosArrowForward />
          </a>
        </div>
      );
    }
    return originalElement;
  };

  const handlePageChange = (page, limit) => {
    handleGetAllleadsForAppointment(page, limit);
  };

  const handleGetAllleadsForAppointment = async (
    page,
    limit,
    search,
    searchType
  ) => {
    settableLoader(true);
    const token = localStorage.getItem("authToken");
    const filterSearch = {
      appointment_status: appointment_status,
      appointment_date_time: appointment_date_time,
    };
    let data = {
      page: page || 1,
      limit: limit || 10,
      search: search || "",
      searchType: searchType?.trim() || "status",
      filterSearch: !search ? filterSearch : undefined,
      websiteNames: userSeletedWebsiteList || [],
    };

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-AllleadsForAppointment`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          settotalRecords(res?.data?.totalRecords || []);
          settabledataList(res?.data?.leads);
          setvisibleFilter(false);
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
      settableLoader(false);
    }
  };

  useEffect(() => {
    handleGetAllleadsForAppointment();
  }, [userSeletedWebsiteList]);

  return (
    <div className="App">
      <Tabs
        defaultActiveKey={activeTab?.toString()}
        onChange={(key) => {
          setactiveTab(key);
          if (key === "1") {
            handleGetAllleadsForAppointment("", "", "", "status");
          } else if (key === "2") {
            handleGetAllleadsForAppointment("", "", "Confirmed", "status");
          } else if (key === "3") {
            handleGetAllleadsForAppointment("", "", "Not Confirmed", "status");
          } else if (key === "4") {
            handleGetAllleadsForAppointment(
              "",
              "",
              "RescheduleRequested",
              "lead"
            );
          } else if (key === "5") {
            handleGetAllleadsForAppointment("", "", "NoShow", "lead");
          }
        }}
        className="appointment-tabs"
        tabBarExtraContent={
          <Space
            style={{ display: "flex", alignItems: "center", marginRight: 10 }}
          >
            {activeTab === "1" ? (
              <>
                {" "}
                <Dropdown
                  overlay={dropdownContent}
                  trigger={["click"]}
                  visible={visibleFilter}
                  onVisibleChange={(flag) => {
                    setvisibleFilter(true);
                  }}
                >
                  <Typography
                    className="custom-text1"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaFilter style={{ fontSize: 12, marginRight: 5 }} /> Filter
                  </Typography>
                </Dropdown>
              </>
            ) : (
              ""
            )}
          </Space>
        }
      >
        <TabPane
          tab="All Appointments"
          key="1"
          children={
            <ReturnCommonTable
              columns={columns}
              tabledataList={tabledataList}
              rowSelection={rowSelection}
              tableLoader={tableLoader}
              totalRecords={totalRecords}
              handlePageChange={handlePageChange}
              itemRender={itemRender}
            />
          }
        />
        <TabPane
          tab="Confirmed"
          key="2"
          children={
            <>
              <ReturnCommonTable
                columns={columns}
                tabledataList={tabledataList}
                rowSelection={rowSelection}
                tableLoader={tableLoader}
                totalRecords={totalRecords}
                handlePageChange={handlePageChange}
                itemRender={itemRender}
              />
            </>
          }
        />
        <TabPane
          tab="Not Confirmed"
          key="3"
          children={
            <>
              <ReturnCommonTable
                columns={columns}
                tabledataList={tabledataList}
                rowSelection={rowSelection}
                tableLoader={tableLoader}
                totalRecords={totalRecords}
                handlePageChange={handlePageChange}
                itemRender={itemRender}
              />
            </>
          }
        />
        <TabPane
          tab="Reschedule Request"
          key="4"
          children={
            <ReturnCommonTable
              columns={columns}
              tabledataList={tabledataList}
              rowSelection={rowSelection}
              tableLoader={tableLoader}
              totalRecords={totalRecords}
              handlePageChange={handlePageChange}
              itemRender={itemRender}
            />
          }
        />
        <TabPane
          tab="No Show"
          key="5"
          children={
            <ReturnCommonTable
              columns={columns}
              tabledataList={tabledataList}
              rowSelection={rowSelection}
              tableLoader={tableLoader}
              totalRecords={totalRecords}
              handlePageChange={handlePageChange}
              itemRender={itemRender}
            />
          }
        />
      </Tabs>
    </div>
  );
};

export default AppointmentsList;
