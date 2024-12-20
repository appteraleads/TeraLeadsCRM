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
  Select,
  Input,
  Table,
  Dropdown,
  Skeleton,
} from "antd";
import { IoAlertCircleOutline } from "react-icons/io5";
import {
  LeadAssignmentRulesOptions,
  LeadHandlingOptions,
} from "../Common/CommonCodeList";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { MdDeleteOutline, MdOutlineBlock } from "react-icons/md";
import { BlockIpModal, UpdateBlockIpModal } from "./Modal";
import dayjs from "dayjs";
import { BsThreeDots } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
const { Option } = Select;
const { Text } = Typography;

const LeadsSetting = ({ openNotificationWithIcon, loginUserDetails }) => {
  const [buttonLoader, setbuttonLoader] = useState();
  const [duplicateLeadHandling, setduplicateLeadHandling] = useState();
  const [leadAssignmentRules, setleadAssignmentRules] = useState();
  const [selectedUserDetails, setselectedUserDetails] = useState();
  const [unsavedchanges, setunsavedchanges] = useState();
  const [ClinicUserDetails, setClinicUserDetails] = useState([]);
  const [searchInputVisible, setsearchInputVisible] = useState(false);
  const [isBlockIpModalVisible, setisBlockIpModalVisible] = useState();
  const [isupdateBlockIpModalVisible, setisupdateBlockIpModalVisible] =
    useState();
  const [blokListData, setblokListData] = useState();
  const [tableLoader, settableLoader] = useState(false);
  const [selectedblocklead, setselectedblocklead] = useState([]);
  const [pageloader, setpageloader] = useState(false);
  const onChange = (key) => {
    console.log(key);
  };

  const columns = [
    {
      title: "Blocked Entity",
      render: (text) => (
        <>
          {text?.block_type === "IP"
            ? text?.block_ip_address
            : text?.block_type === "Number"
            ? text?.block_phone_number
            : text?.block_ip_address + "  " + text?.block_phone_number}
        </>
      ),
    },
    {
      title: "Type",
      render: (text) => (
        <>
          {text?.block_type === "IP"
            ? "IP Address"
            : text?.block_type === "IP"
            ? "Phone Number"
            : text?.block_type}
        </>
      ),
      width: 100,
    },
    {
      title: "Reason",
      render: (text) => <>{text?.block_reason}</>,
    },
    {
      title: "Date Added",
      render: (text) => <>{dayjs(text?.created_at)?.format("DD/MM/YYYY")}</>,
    },
    {
      title: "Action",
      width: 100,
      render: (text) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "Edit",
                icon: <FaRegEdit size={15} />,
                label: <Typography>Edit</Typography>,
                onClick: () => {
                  setselectedblocklead(text);
                  setisupdateBlockIpModalVisible(true);
                },
              },
              {
                key: "Delete",
                icon: <MdDeleteOutline size={15} />,
                label: <Typography>Delete</Typography>,
                onClick: () => {
                  handledeleteSeletedlead(text?.id);
                },
              },
            ],
          }}
          placement="bottomLeft"
        >
          <Button icon={<BsThreeDots />} size={20} />
        </Dropdown>
      ),
    },
  ];

  const handledeleteSeletedlead = async (id) => {
    const token = localStorage.getItem("authToken");
    await axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/blocklead/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        getAllBlockDetails();
        openNotificationWithIcon(
          "success",
          "Lead",
          "Lead deleted successfully!"
        );
      })
      .catch((error) => {
        openNotificationWithIcon(
          "error",
          "Lead",
          error.response?.data?.message || "Failed to delete lead"
        );
        setbuttonLoader(false);
      });
  };

  const handleSubmitLeadsSetting = async () => {
    setbuttonLoader(true);

    try {
      const token = localStorage.getItem("authToken");
      let data = {
        duplicate_lead_handling: duplicateLeadHandling,
        lead_assignment_rules: leadAssignmentRules,
        clinic_id: loginUserDetails?.userClinicRoles[0]?.clinic_id,
        user_id: selectedUserDetails?.item?.id,
      };
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/lead-settings`,
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
            "Lead details updated successfully"
          );
        })
        .catch((err) => {
          console.log(err?.response?.data?.message);
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
        });
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Settings",
        err?.response?.data?.message || err?.message
      );
    }
    setbuttonLoader(false);
  };

  const getAllBlockDetails = async (search) => {
    const token = localStorage.getItem("authToken");
    settableLoader(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/blockLead/${loginUserDetails?.userClinicRoles[0]?.clinic_id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setblokListData(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    settableLoader(false);
  };

  const getAllClinicUserDetails = async (search) => {
    const token = localStorage.getItem("authToken");
    let data = {
      search: search,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/getAllClinicUserDetails/${loginUserDetails?.userClinicRoles[0]?.clinic_id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const temp = res?.data?.users?.map((user) => {
            const data = {};
            data.label = user?.dentist_full_name;
            data.value = user?.id;
            data.item = user;
            return data;
          });
          setClinicUserDetails(temp);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getLeadSettingByClinicId = async () => {
    const token = localStorage.getItem("authToken");
    setpageloader(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/lead-setting/${loginUserDetails?.userClinicRoles[0]?.clinic_id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setpageloader(false);
          setduplicateLeadHandling(res?.data?.duplicate_lead_handling);
          setleadAssignmentRules(res?.data?.lead_assignment_rules);
          setselectedUserDetails({
            label: res?.data?.User?.dentist_full_name,
            value: res?.data?.User?.id,
            item: res?.data?.User,
          });
        })
        .catch((err) => {
          setpageloader(false);
          console.log(err);
        });
    } catch (err) {
      setpageloader(false);
      console.log(err);
    }
  };

  const items = [
    {
      key: "1",
      label: "General",
      children: (
        <>
          {pageloader ? (
            <Skeleton
              paragraph={{
                rows: 4,
              }}
            />
          ) : (
            <Card bordered={false} style={{ width: "100%" }}>
              <Typography style={{ fontWeight: 600 }}>
                Leads Settings
              </Typography>
              <Divider />
              <Row align="middle" gutter={[16, 16]}>
                <Col span={12}>
                  <Typography style={{ fontWeight: 600 }}>
                    Duplicate Lead Handling
                  </Typography>
                  <Text className="custom-text1">
                    Decide how to manage leads with identical information to
                    prevent conflicts.
                  </Text>
                </Col>
                <Col span={12}>
                  <Typography>Lead Handling</Typography>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Select a lead handling"
                    optionFilterProp="children"
                    value={duplicateLeadHandling}
                    onChange={(e) => {
                      setduplicateLeadHandling(e);
                      setunsavedchanges(true);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {LeadHandlingOptions.map((tz) => (
                      <Option key={tz.value} value={tz.value}>
                        {tz.label}
                      </Option>
                    ))}
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
                    loading={buttonLoader}
                    onClick={() => {
                      handleSubmitLeadsSetting();
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
      label: "Lead Assignment",
      children: (
        <>
          <Card bordered={false} style={{ width: "100%" }}>
            <Typography style={{ fontWeight: 600 }}>
              Leads Assignment
            </Typography>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Lead Assignment Rules
                </Typography>
                <Text className="custom-text1">
                  Automatically assign new leads or set a default owner for
                  unclaimed leads.
                </Text>
              </Col>
              <Col span={12}>
                <Typography>Rules</Typography>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select a lead assignment rule"
                  optionFilterProp="children"
                  value={leadAssignmentRules}
                  onChange={(e) => {
                    setleadAssignmentRules(e);
                    setselectedUserDetails();
                    setunsavedchanges(true);
                  }}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {LeadAssignmentRulesOptions.map((tz) => (
                    <Option key={tz.value} value={tz.value}>
                      {tz.label}
                    </Option>
                  ))}
                </Select>
                {leadAssignmentRules === "Specific User Role" ? (
                  <Select
                    style={{ width: "100%", marginTop: 10 }}
                    placeholder="Select a user"
                    optionFilterProp="children"
                    value={selectedUserDetails}
                    onChange={(e, data) => {
                      setselectedUserDetails(data);
                      setunsavedchanges(true);
                    }}
                    showClear
                    options={ClinicUserDetails}
                  ></Select>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Divider />
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12} style={{ display: "flex", alignItems: "center" }}>
                <Button
                  type="primary"
                  disabled={!unsavedchanges}
                  loading={buttonLoader}
                  onClick={() => {
                    handleSubmitLeadsSetting();
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
    {
      key: "3",
      label: "Blocked Leads",
      children: (
        <>
          <Card bordered={false} style={{ width: "100%" }}>
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Blocked Leads
                </Typography>
                <Text className="custom-text1">
                  View and manage all blocked IPs and phone numbers in one
                  place.
                </Text>
              </Col>
              <Col span={12} align="end">
                <Space>
                  {searchInputVisible ? (
                    <Input
                      placeholder="Search"
                      onChange={(e) =>
                        getAllClinicUserDetails(e?.target?.value)
                      }
                    />
                  ) : (
                    ""
                  )}

                  <Button
                    icon={<IoIosSearch />}
                    onClick={() => {
                      setsearchInputVisible(searchInputVisible ? false : true);
                    }}
                  />

                  <Button
                    type="primary"
                    icon={<MdOutlineBlock />}
                    onClick={() => {
                      setisBlockIpModalVisible(true);
                    }}
                  >
                    Block new lead
                  </Button>
                </Space>
              </Col>
            </Row>
            <Divider style={{ margin: "10px 0px" }} />
            <Table
              columns={columns}
              dataSource={blokListData}
              loading={tableLoader}
              size="small"
              pagination={false}
              rowKey="key"
              scroll={{
                x: "max-content",
                y: "60vh",
              }}
            />
            <></>
          </Card>
        </>
      ),
    },
  ];

  useEffect(() => {
    getAllBlockDetails();
    getLeadSettingByClinicId();
    getAllClinicUserDetails();
  }, []);

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        style={{ width: "100%", overflow: "auto", height: "75vh" }}
      />

      <BlockIpModal
        isBlockIpModalVisible={isBlockIpModalVisible}
        setisBlockIpModalVisible={setisBlockIpModalVisible}
        openNotificationWithIcon={openNotificationWithIcon}
        loginUserDetails={loginUserDetails}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        getAllBlockDetails={getAllBlockDetails}
      />

      <UpdateBlockIpModal
        isupdateBlockIpModalVisible={isupdateBlockIpModalVisible}
        setisupdateBlockIpModalVisible={setisupdateBlockIpModalVisible}
        openNotificationWithIcon={openNotificationWithIcon}
        loginUserDetails={loginUserDetails}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        getAllBlockDetails={getAllBlockDetails}
        selectedblocklead={selectedblocklead}
      />
    </>
  );
};

export default LeadsSetting;
