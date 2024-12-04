/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  Layout,
  Table,
  Row,
  Col,
  Space,
  Dropdown,
  Divider,
  Typography,
  Button,
  Select,
  Tabs,
  Badge,
  Pagination,
  Checkbox,
  Form,
  Switch,
  Spin,
  notification,
  Empty,
} from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ReactComponent as Usersvg } from "../assets/IconSvg/solar_user-broken.svg";
import { HiDotsVertical } from "react-icons/hi";
import { FiCalendar } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { PiExportBold } from "react-icons/pi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import moment from "moment";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import { leadsColumns } from "../Common/ReturnColumnValue";
import KanbanView from "./KanbanView";
import {
  ViewUpdateLeadDetails,
  CloseLeadPayment,
  AppointmentDateTime,
  CreateLeads,
  DeleteLead,
  CreateDuplicateLead,
} from "./Modals";
import { FaFilter } from "react-icons/fa";
const { Header, Content } = Layout;

const defaultColunmList = [
  "Name",
  "PhoneNumber",
  "Email",
  "LeadStatus",
  "Treatment",
  "FinanceScore",
  "LeadType",
  "Assigned",
];

const Leads = ({
  searchContent,
  isLeadsDetailsModalVisible,
  setisLeadsDetailsModalVisible,
  selectedItemDetails,
  setselectedItemDetails,
  setisVisibleQuickConversation,
  setquickConversationView,
  setselectedConversationDetails,
}) => {
  const [CreateLeadsform] = Form.useForm();
  const [ViewUpdateLeadform] = Form.useForm();
  const [RecordPaymentform] = Form.useForm();
  const [Overview, setOverview] = useState(0);
  const [isViewLeadModalEditable, setisViewLeadModalEditable] = useState(false);
  const [AppointmentsCount, setAppointmentsCount] = useState(0);
  const [ClosedLeadsCount, setClosedLeadsCount] = useState(0);
  const [RevenueCount, setRevenueCount] = useState(0);
  const [noShowCount, setnoShowCount] = useState(0);

  const [api, contextHolder] = notification.useNotification();
  const [columnsList, setcolumnsList] = useState([]);
  const [tempcolumnsList, settempcolumnsList] = useState(columnsList);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [visibleFilter, setvisibleFilter] = useState(false);
  const [leaadActiveTab, setleaadActiveTab] = useState(1);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFinancingEnabled, setIsFinancingEnabled] = useState(false);
  const [pageLoader, setpageLoader] = useState(false);
  const [tableLoader, settableLoader] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [pagedataList, setpagedataList] = useState([]);
  const [kanbanData, setKanbanData] = useState([]);
  const [amountList, setamountList] = useState([]);
  const [dragCardItemId, setdragCardItemId] = useState("");
  const [kanbanAppointment, setkanbanAppointment] = useState(false);
  const [isDeleteConfirmationVisible, setisDeleteConfirmationVisible] =
    useState(false);
  const [isDuplicateConfirmationVisible, setisDuplicateConfirmationVisible] =
    useState(false);
  const [isAppointmentModalVisible, setisAppointmentModalVisible] =
    useState(false);

  const [isCloseLeadsPaymentModalVisible, setisCloseLeadsPaymentModalVisible] =
    useState(false);

  const [totalRecords, settotalRecords] = useState(0);
  const [addCustomListColunm, setaddCustomListColunm] = useState(false);
  const [visible, setVisible] = useState(false);

  const [leadsListcolumns, setleadsListcolumns] = useState([]);
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      duration: 3,
    });
  };

  const downloadExcel = async (format) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios({
        url: `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/export-leads?format=${format?.key}`, // Use your actual API endpoint
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Create a link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Set the download file name based on format
      link.setAttribute(
        "download",
        `leads_data.${format?.key === "csv" ? "csv" : "xlsx"}`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error exporting leads:", error);
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

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf("day");
  };

  const handlePageChange = (page, limit) => {
    handleGetAllleads(page, limit);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const dropdownContentFilter = (
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
            <FaFilter style={{ fontSize: 10 }} /> Filter
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
            Web Site
          </Typography>
          <Select
            style={{ width: "100%" }}
            placeholder="Select select website"
            // onChange={(e) => {
            //   setappointment_status(e);
            // }}
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
          // onClick={() => {
          //   handleGetAllleadsForAppointment();
          // }}
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

  const onChange = (newActiveKey) => {
    setleaadActiveTab(parseInt(newActiveKey));
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
        handleGetAllleads();
        handleGetAllleadsKanbanView();
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
        handleGetAllleads();
        handleGetAllleadsKanbanView();
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
        console.log(err);
        ViewUpdateLeadform.resetFields();

        openNotificationWithIcon(
          "error",
          "Lead",
          err?.response?.data?.message || err?.message
        );
      });
    setbuttonLoader(false);
  };

  const handleSubmitCloseleadsPayment = async (values) => {
    setbuttonLoader(true);
    const token = localStorage.getItem("authToken");
    const data = {
      id: dragCardItemId,
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
          "Successfully  closed! Great work!"
        );
        setisCloseLeadsPaymentModalVisible(false);
        setbuttonLoader(false);
        handleGetAllleadsKanbanView();
        handleGetAllleads();
        RecordPaymentform.resetFields();
      })
      .catch((err) => {
        console.log(err);

        openNotificationWithIcon("error", "Close Lead", err?.message);
        RecordPaymentform.resetFields();
        setbuttonLoader(false);
      });
  };

  const handleGetAllleads = async (page, limit, search, searchType) => {
    settableLoader(true);
    const token = localStorage.getItem("authToken");
    let data = {
      page: page || 1,
      limit: limit || 10,
      search: search || "",
      searchType: searchType?.trim() || "",
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-leads`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (localStorage.getItem("userColumn")) {
        setleadsListcolumns(
          localStorage
            .getItem("userColumn")
            .split(",")
            .map((item) => {
              return leadsColumns(
                item,
                setisLeadsDetailsModalVisible,
                setselectedItemDetails
              );
            })
        );
      } else {
        setleadsListcolumns(
          defaultColunmList.map((item) => {
            return leadsColumns(
              item,
              setisLeadsDetailsModalVisible,
              setselectedItemDetails
            );
          })
        );
      }

      settotalRecords(res?.data?.totalRecords);
      const tempResponse = res?.data?.leads?.map((data, index) => {
        data.Name = `${data?.first_name || ""} ${data?.last_name || ""}`;
        data.PhoneNumber = data?.Phone || data?.PhoneNumber;
        data.key = index + 1;
        return data;
      });

      setOverview(
        Math.round(parseInt(res?.data?.totalRecords || 0) * (30 / 100))
      );

      setAppointmentsCount(res?.data?.appointment_total || 0);
      setClosedLeadsCount(res?.data?.closed_total || 0);
      setRevenueCount(res?.data?.total_revenue || 0);
      setnoShowCount(res?.data?.noShow_total || 0);
      setpagedataList(tempResponse);
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

  const handleGetAllleadsKanbanView = async (search, searchType) => {
    setpageLoader(true);
    const token = localStorage.getItem("authToken");
    let data = {
      search: search || "",
      searchType: searchType || "",
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-kanban-leads`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const kanbanDetails = {
            AllLeads: res?.data?.categorizedLeads?.AllLeads?.map((item) => {
              item.displayColName = "All Leads";
              return item;
            }),
            Contacted: res?.data?.categorizedLeads?.Contacted?.map((item) => {
              item.displayColName = "Contacted";
              return item;
            }),
            Appointment: res?.data?.categorizedLeads?.Appointment?.map(
              (item) => {
                item.displayColName = "Appointment";
                return item;
              }
            ),
            RescheduleRequested:
              res?.data?.categorizedLeads?.RescheduleRequested?.map((item) => {
                item.displayColName = "Reschedule Requested";
                return item;
              }),
            NoShow: res?.data?.categorizedLeads?.NoShow?.map((item) => {
              item.displayColName = "No Show";
              return item;
            }),
            NoMoney: res?.data?.categorizedLeads?.NoMoney?.map((item) => {
              item.displayColName = "No Money";
              return item;
            }),
            Undecided: res?.data?.categorizedLeads?.Undecided?.map((item) => {
              item.displayColName = "Undecided";
              return item;
            }),
            Closed: res?.data?.categorizedLeads?.Closed?.map((item) => {
              item.displayColName = "Closed";
              return item;
            }),
            Lost: res?.data?.categorizedLeads?.Lost?.map((item) => {
              item.displayColName = "Lost";
              return item;
            }),
            LiveAgent: res?.data?.categorizedLeads?.LiveAgent?.map((item) => {
              item.displayColName = "Live Agent";
              return item;
            }),
          };
          setamountList(res?.data?.amountList);
          setKanbanData(kanbanDetails);
          setpageLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setpageLoader(false);
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

  const handleSetCustomizeColumn = async () => {
    settableLoader(true);
    setVisible(false);
    const token = localStorage.getItem("authToken");
    let data = {
      user_column: columnsList.join(),
    };
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/user-update`,
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
          "Customize View",
          "Customize View has been successfully  updated!"
        );

        localStorage?.setItem("userColumn", columnsList);
        settableLoader(false);
        handleGetAllleads();
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
          "error",
          "Customize View",
          err?.response?.data?.message || err?.message
        );
        settableLoader(false);
      });
  };

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const reorderedColumns = Array.from(columnsList);
    const [movedColumn] = reorderedColumns.splice(source.index, 1);
    reorderedColumns.splice(destination.index, 0, movedColumn);
    setcolumnsList(reorderedColumns);
  };

  const initialItems = [
    {
      key: "1",
      label: (
        <span
          onClick={() => {
            handleGetAllleads();
          }}
        >
          All Leads
          <Badge className="custom-badge-primary" count={totalRecords} />
        </span>
      ),
      children: (
        <div>
          <Table
            columns={tableLoader ? [] : leadsListcolumns || []}
            dataSource={pagedataList}
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
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <Typography
          onClick={() => {
            handleGetAllleadsKanbanView();
          }}
        >
          Kanban
        </Typography>
      ),
      children: (
        <>
          {pageLoader ? (
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 250,
              }}
            >
              <Col>
                <Spin size="large" />
              </Col>
            </Row>
          ) : (
            <>
              {kanbanData?.length <= 0 ? (
                <>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 250,
                    }}
                  >
                    <Col>
                      <Empty size="large" />
                    </Col>
                  </Row>
                </>
              ) : (
                <KanbanView
                  handleGetAllleadsKanbanView={handleGetAllleadsKanbanView}
                  handleGetAllleads={handleGetAllleads}
                  openNotificationWithIcon={openNotificationWithIcon}
                  amountList={amountList}
                  kanbanData={kanbanData}
                  setKanbanData={setKanbanData}
                  setIsModalVisible={setIsModalVisible}
                  setkanbanAppointment={setkanbanAppointment}
                  CreateLeadsform={CreateLeadsform}
                  setisLeadsDetailsModalVisible={setisLeadsDetailsModalVisible}
                  setselectedItemDetails={setselectedItemDetails}
                  setdragCardItemId={setdragCardItemId}
                  setisAppointmentModalVisible={setisAppointmentModalVisible}
                  setisCloseLeadsPaymentModalVisible={
                    setisCloseLeadsPaymentModalVisible
                  }
                  setisViewLeadModalEditable={setisViewLeadModalEditable}
                  setisDeleteConfirmationVisible={
                    setisDeleteConfirmationVisible
                  }
                  setisDuplicateConfirmationVisible={
                    setisDuplicateConfirmationVisible
                  }
                  setisVisibleQuickConversation={setisVisibleQuickConversation}
                  setquickConversationView={setquickConversationView}
                  setselectedConversationDetails={
                    setselectedConversationDetails
                  }
                />
              )}
            </>
          )}
        </>
      ),
    },

    {
      key: "3",
      label: "Report",
      children: "Content of Tab Pane 3",
    },
  ];

  const dropdownContent = (
    <div
      style={{
        padding: "12px",
        width: "250px",
        overflow: "auto",
        Height: "300px",
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
            <MdSpaceDashboard /> Customize View
          </Typography>
        </Col>
        {!addCustomListColunm ? (
          <>
            <Col>
              <Typography
                className="custom-text-link"
                style={{
                  marginRight: 10,
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => {
                  setaddCustomListColunm(true);
                }}
              >
                <LuPlus style={{ color: "#3900DB" }} />
                Add
              </Typography>
            </Col>
          </>
        ) : (
          ""
        )}
      </Row>
      <div style={{ overflow: "auto", minHeight: "250px", height: 250 }}>
        {!addCustomListColunm ? (
          <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="droppable-columns">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {columnsList.map((column, index) => (
                      <Draggable
                        key={column}
                        draggableId={column}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: "none",
                              padding: "5px",
                              marginBottom: "8px",
                              backgroundColor: snapshot.isDragging
                                ? "#e0e0e0"
                                : "#fff",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                              boxShadow: snapshot.isDragging
                                ? "0 2px 8px rgba(0,0,0,0.2)"
                                : "none",
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <RxDragHandleDots2
                                  style={{ display: "flex" }}
                                />
                                <Typography className="custom-text1">
                                  {column}
                                </Typography>
                              </div>
                              <div>
                                <RiDeleteBin5Line
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    const newColumnsList = [...columnsList];
                                    newColumnsList.splice(index, 1);
                                    setcolumnsList(newColumnsList);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </>
        ) : (
          <>
            <Row>
              {pagedataList.length > 0 &&
                Object?.keys(pagedataList[0])
                  ?.filter(
                    (i) =>
                      i !== "first_name" &&
                      i !== "last_name" &&
                      i !== "Phone" &&
                      i !== "avatar_color"
                  )
                  ?.map((key) => (
                    <>
                      <Space style={{ margin: 3 }}>
                        <Checkbox
                          checked={
                            tempcolumnsList?.filter((fields) => {
                              return key === fields;
                            }).length > 0
                          }
                          onChange={(e) => {
                            let tempCol = JSON?.parse(
                              JSON?.stringify(tempcolumnsList)
                            );
                            if (e?.target?.checked) {
                              tempCol.push(key);
                            } else {
                              tempCol = tempCol?.filter((i) => i !== key);
                            }
                            settempcolumnsList(tempCol);
                          }}
                        />
                        <Typography>{key}</Typography>
                      </Space>
                      <Divider style={{ padding: 0, margin: 0 }} />
                    </>
                  ))}
            </Row>
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        {addCustomListColunm ? (
          <>
            <Button
              size="small"
              onClick={() => {
                setaddCustomListColunm(false);
              }}
              className="custom-text1"
            >
              Back
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={() => {
                setcolumnsList(tempcolumnsList);
                setaddCustomListColunm(false);
              }}
            >
              Add
            </Button>
          </>
        ) : (
          <>
            <Button
              size="small"
              onClick={() => {
                setVisible(false);
              }}
              className="custom-text1"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                handleSetCustomizeColumn();
              }}
            >
              Save
            </Button>
          </>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    handleGetAllleads();
  }, []);

  useEffect(() => {
    handleGetAllleads("", "", searchContent, "text");
    handleGetAllleadsKanbanView(searchContent, "text");
  }, [searchContent]);

  return (
    <div>
      {contextHolder}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            borderBottom: "1px solid #E8EBEF",
            height: 80,
          }}
        >
          <Row style={{ borderLeft: "1px solid #E8EBEF" }}>
            <Col
              span={16}
              style={{
                display: "flex",
                alignItems: "center",
                padding: 10,
                height: "80px",
              }}
            >
              <Usersvg />
              <Space style={{ margin: 10 }}>
                <Typography style={{ fontWeight: "bold" }}>Leads</Typography>
              </Space>
              <Space style={{ margin: 10 }}>
                <div
                  style={{
                    width: "auto",
                    height: 70,
                    background: "#F3FBE8",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Typography className="primary-text-color">
                    Overview
                  </Typography>
                  <Typography>
                    {totalRecords} Leads last 30 days <span> {Overview} %</span>
                  </Typography>
                </div>
              </Space>
              <Space style={{ margin: 10 }}>
                <div
                  style={{
                    width: "auto",
                    height: 70,
                    background: "#E8F9FB",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Typography className="primary-text-color">
                    Appointments
                  </Typography>
                  <Typography>{AppointmentsCount} Booked</Typography>
                </div>
              </Space>
              <Space style={{ margin: 10 }}>
                <div
                  style={{
                    width: "auto",
                    height: 70,
                    background: "#FBE9E8",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Typography className="primary-text-color">
                    No Show
                  </Typography>
                  <Typography>{noShowCount} Leads </Typography>
                </div>
              </Space>
              <Space style={{ margin: 10 }}>
                <div
                  style={{
                    width: "auto",
                    height: 70,
                    background: "#FEF7EA",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Typography className="primary-text-color">
                    Closed Leads
                  </Typography>
                  <Typography>{ClosedLeadsCount} Closed </Typography>
                </div>
              </Space>
              <Space style={{ margin: 10 }}>
                <div
                  style={{
                    width: "auto",
                    height: 70,
                    background: "#F7F7F8",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Typography className="primary-text-color">
                    Revenue{" "}
                  </Typography>
                  <Typography>${RevenueCount}</Typography>
                </div>
              </Space>
            </Col>
            <Col
              span={8}
              style={{ display: "flex", alignItems: "center", padding: 10 }}
            >
              <Col
                span={24}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  justifyItems: "center",
                }}
              >
                <Space style={{ margin: 5 }}>
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
                    onChange={(e) => {
                      handleGetAllleadsKanbanView(e, "datetime");
                      handleGetAllleads("", "", e, "datetime");
                    }}
                    defaultValue={"All"}
                    options={[
                      {
                        value: "All",
                        label: "All",
                      },
                      // {
                      //   value: "Custom",
                      //   label: "Custom",
                      // },
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
                </Space>

                <Space style={{ margin: 5 }}>
                  <Dropdown
                    menu={{
                      items: commondropitems,
                      onClick: downloadExcel,
                    }}
                    placement="bottom"
                  >
                    <Button icon={<HiDotsVertical />} size={20} />
                  </Dropdown>
                </Space>
                <Space style={{ margin: 5 }}>
                  <Button
                    type="primary"
                    icon={<LuPlus style={{ color: "#fff" }} />}
                    size={20}
                    onClick={showModal}
                  >
                    Create Lead{" "}
                  </Button>
                </Space>
              </Col>
            </Col>
          </Row>
        </Header>
        <Content>
          <Tabs
            defaultActiveKey="1"
            tabBarExtraContent={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Dropdown
                  overlay={dropdownContentFilter}
                  trigger={["click"]}
                  visible={visibleFilter}
                  onVisibleChange={(flag) => {
                    setvisibleFilter(true);
                  }}
                  placement="bottom"
                >
                  <Typography
                    className="custom-text1"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <FaFilter style={{ fontSize: 10, marginRight: 5 }} /> Filter
                  </Typography>
                </Dropdown>

                {leaadActiveTab === 1 ? (
                  <Dropdown
                    overlay={dropdownContent}
                    trigger={["click"]}
                    visible={visible}
                    onVisibleChange={(flag) => {
                      setVisible(flag);
                      if (localStorage?.getItem("userColumn")) {
                        setcolumnsList(
                          localStorage?.getItem("userColumn")?.split(",")
                        );
                        settempcolumnsList(
                          localStorage?.getItem("userColumn")?.split(",")
                        );
                      } else {
                        setcolumnsList(defaultColunmList);
                        settempcolumnsList(defaultColunmList);
                      }
                    }}
                  >
                    <Typography
                      className="custom-text1"
                      style={{
                        cursor: "pointer",
                        marginRight: 10,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <MdSpaceDashboard /> Customize View
                    </Typography>
                  </Dropdown>
                ) : (
                  ""
                )}

                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaMicrophone />
                  <Typography
                    className="custom-text1"
                    style={{ marginRight: 10 }}
                  >
                    AI Agent
                  </Typography>
                  <Switch style={{ marginRight: 10 }} />
                </div>
              </div>
            }
            items={initialItems}
            onChange={onChange}
          />

          {/* Create leads  */}
          <CreateLeads
            handleGetAllleads={handleGetAllleads}
            handleGetAllleadsKanbanView={handleGetAllleadsKanbanView}
            openNotificationWithIcon={openNotificationWithIcon}
            isModalVisible={isModalVisible}
            setIsFinancingEnabled={setIsFinancingEnabled}
            setIsModalVisible={setIsModalVisible}
            setbuttonLoader={setbuttonLoader}
            CreateLeadsform={CreateLeadsform}
            setkanbanAppointment={setkanbanAppointment}
            kanbanAppointment={kanbanAppointment}
            disabledDate={disabledDate}
            isFinancingEnabled={isFinancingEnabled}
            buttonLoader={buttonLoader}
          />

          {/* add Appointment date and time  */}
          <AppointmentDateTime
            handleGetAllleadsKanbanView={handleGetAllleadsKanbanView}
            openNotificationWithIcon={openNotificationWithIcon}
            setisAppointmentModalVisible={setisAppointmentModalVisible}
            setbuttonLoader={setbuttonLoader}
            dragCardItemId={dragCardItemId}
            isAppointmentModalVisible={isAppointmentModalVisible}
            disabledDate={disabledDate}
            buttonLoader={buttonLoader}
            selectedItemDetails={selectedItemDetails}
          />

          {/* add Close lead payment   */}
          <CloseLeadPayment
            handleSubmitCloseleadsPayment={handleSubmitCloseleadsPayment}
            isCloseLeadsPaymentModalVisible={isCloseLeadsPaymentModalVisible}
            setisCloseLeadsPaymentModalVisible={
              setisCloseLeadsPaymentModalVisible
            }
            buttonLoader={buttonLoader}
            RecordPaymentform={RecordPaymentform}
          />

          {/* View & Update Lead Details */}
          <ViewUpdateLeadDetails
            openNotificationWithIcon={openNotificationWithIcon}
            selectedItemDetails={selectedItemDetails}
            setisLeadsDetailsModalVisible={setisLeadsDetailsModalVisible}
            isViewLeadModalEditable={isViewLeadModalEditable}
            setisViewLeadModalEditable={setisViewLeadModalEditable}
            buttonLoader={buttonLoader}
            isLeadsDetailsModalVisible={isLeadsDetailsModalVisible}
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

          {/* Lead Delete Confirmation*/}
          <DeleteLead
            handleGetAllleads={handleGetAllleads}
            handleGetAllleadsKanbanView={handleGetAllleadsKanbanView}
            isDeleteConfirmationVisible={isDeleteConfirmationVisible}
            setisDeleteConfirmationVisible={setisDeleteConfirmationVisible}
            selectedItemDetails={selectedItemDetails}
            openNotificationWithIcon={openNotificationWithIcon}
            buttonLoader={buttonLoader}
            setbuttonLoader={setbuttonLoader}
          />

          <CreateDuplicateLead
            handleGetAllleads={handleGetAllleads}
            handleGetAllleadsKanbanView={handleGetAllleadsKanbanView}
            isDuplicateConfirmationVisible={isDuplicateConfirmationVisible}
            setisDuplicateConfirmationVisible={
              setisDuplicateConfirmationVisible
            }
            selectedItemDetails={selectedItemDetails}
            openNotificationWithIcon={openNotificationWithIcon}
            buttonLoader={buttonLoader}
            setbuttonLoader={setbuttonLoader}
          />
        </Content>
      </Layout>
    </div>
  );
};

export default Leads;
