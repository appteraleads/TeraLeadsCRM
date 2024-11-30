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
  List,
  Avatar,
  Select,
  Dropdown,
  Menu,
  Input,
  Skeleton,
  Tooltip,
} from "antd";
import { IoIosSearch } from "react-icons/io";
import { HiDotsHorizontal, HiOutlineUserAdd } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import {
  DeleteRole,
  DeleteUser,
  EditRolesAndPermissionModal,
  InviteTeamMemberModal,
  RolesAndPermissionsModal,
} from "./Modal";
import { MdOutlineEmail } from "react-icons/md";
import axios from "axios";
import { getInitials } from "../Common/ReturnColumnValue";
const { Text } = Typography;

const TeamSetting = ({ openNotificationWithIcon, loginUserDetails }) => {
  const [rolesAndPermissionsModal, setrolesAndPermissionsModal] =
    useState(false);
  const [updateRolesAndPermissionsModal, setupdateRolesAndPermissionsModal] =
    useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [searchInputVisible, setsearchInputVisible] = useState(false);
  const [rolesList, setrolesList] = useState([]);
  const [rolesoptions, setrolesoptions] = useState([]);
  const [loaderList, setloaderList] = useState(false);
  const [selectedRoleDetails, setselectedRoleDetails] = useState([]);
  const [seletedUserDetails, setseletedUserDetails] = useState([]);
  const [isInviteTeamMemberModalVisible, setisInviteTeamMemberModalVisible] =
    useState(false);
  const [ClinicUserDetails, setClinicUserDetails] = useState([]);
  const [isUserDeleteModalVisible, setisUserDeleteModalVisible] =
    useState(false);
  const [isRoleDeleteModalVisible, setisRoleDeleteModalVisible] = useState();
  const onChange = (key) => {
    if (key === "1") {
      getAllClinicUserDetails();
    } else if (key === "2") {
      handlegetAllRoles();
    }
  };

  const userOptions = (item) => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          icon={<AiOutlineDelete size={15} />}
          onClick={() => {
            setseletedUserDetails(item);
            setisUserDeleteModalVisible(true);
          }}
        >
          Delete
        </Menu.Item>
      </Menu>
    );
  };

  const handleChange = async (value, item) => {
    const token = localStorage.getItem("authToken");
    let data = {
      role_id: value?.id,
      role_name: value?.role_name,
      user_id: item?.id,
    };

    setloaderList(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/assignRoles`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          getAllClinicUserDetails();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    setloaderList(false);
  };

  const handlegetAllRoles = async (search) => {
    const token = localStorage.getItem("authToken");
    setloaderList(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_API_BASE_URL
          }/api/v1/auth/getAllRoles?search=${search ? search : ""}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          let temproles = res?.data?.roles?.map((i) => {
            let temp = {};
            temp.lable = i?.role_name;
            temp.value = i?.role_name;
            temp.item = i;
            return temp;
          });
          setrolesoptions(temproles);
          setrolesList(res?.data?.roles);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    setloaderList(false);
  };

  const getAllClinicUserDetails = async (search) => {
    setloaderList(true);
    const token = localStorage.getItem("authToken");

    let data = {
      search: search,
    };
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/getAllClinicUserDetails/${loginUserDetails?.clinic_id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setClinicUserDetails(res?.data?.users);
        })
        .catch((err) => {
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    setloaderList(false);
  };

  const items = [
    {
      key: "1",
      label: "Users",
      children: (
        <>
          <Card bordered={false} style={{ width: "100%" }}>
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Team Members
                </Typography>
                <Text className="custom-text1">
                  Manage your team’s access and roles within the clinic’s CRM.
                </Text>
              </Col>
              <Col span={12} align="end">
                <Space>
                  {searchInputVisible ? (
                    <Input
                      placeholder="Search by role name"
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
                    icon={<HiOutlineUserAdd />}
                    onClick={() => {
                      setisInviteTeamMemberModalVisible(true);
                    }}
                  >
                    Invite Team Member
                  </Button>
                </Space>
              </Col>
            </Row>
            <Divider style={{ margin: "10px 0px" }} />

            {loaderList ? (
              <Skeleton />
            ) : (
              <List
                style={{
                  height: "70vh",
                  overflow: "auto",
                  padding: "10px 10px 100px 10px",
                }}
                itemLayout="horizontal"
                dataSource={ClinicUserDetails}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        item?.profile_picture ? (
                          <Avatar src={item?.profile_picture} size={40} />
                        ) : (
                          <Avatar
                            size={40}
                            style={{ background: item?.avatar_color }}
                          >
                            {getInitials(item?.dentist_full_name)}
                          </Avatar>
                        )
                      }
                      description={
                        <>
                          <Row>
                            <Col span={8}>
                              <Typography>{item.dentist_full_name}</Typography>
                              <Typography>{item.email}</Typography>
                            </Col>
                            <Col
                              span={10}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {!item?.activated_yn ? (
                                <>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <MdOutlineEmail size={20} />
                                    <Typography style={{ marginLeft: 5 }}>
                                      An invitation has been sent.
                                    </Typography>
                                  </div>
                                  <span
                                    style={{
                                      color: "#DB0000",
                                      marginLeft: 5,
                                      cursor: "pointer",
                                    }}
                                  >
                                    Withdraw Invite
                                  </span>
                                </>
                              ) : (
                                <></>
                              )}
                            </Col>
                            <Col
                              span={6}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                              }}
                            >
                              <Space>
                                {item.id === loginUserDetails?.id ? (
                                  <Tooltip
                                    title={
                                      <>
                                        You can't change your own role.
                                        <br />
                                        Ask another admin to edit it.
                                      </>
                                    }
                                  >
                                    <Select
                                      disabled={true}
                                      defaultValue={item.role_name}
                                      style={{
                                        width: 180,
                                      }}
                                    />
                                  </Tooltip>
                                ) : (
                                  <Select
                                    value={item.role_name}
                                    style={{
                                      width: 180,
                                    }}
                                    placeholder="Select role"
                                    onChange={(e, data) => {
                                      handleChange(data?.item, item);
                                    }}
                                    options={rolesoptions}
                                  />
                                )}

                                <Dropdown
                                  overlay={userOptions(item)}
                                  trigger={["click"]}
                                >
                                  <Button icon={<HiDotsHorizontal />} />
                                </Dropdown>
                              </Space>
                            </Col>
                          </Row>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </>
      ),
    },
    {
      key: "2",
      label: "Roles And permissions ",
      children: (
        <>
          <Card bordered={false} style={{ width: "100%" }}>
            <Row align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Typography style={{ fontWeight: 600 }}>
                  Roles And Permissions
                </Typography>
                <Text className="custom-text1">
                  Manage your team’s access and roles within TeraCRM
                </Text>
              </Col>
              <Col span={12} align="end">
                <Space>
                  {searchInputVisible ? (
                    <Input
                      placeholder="Search by role name"
                      onChange={(e) => handlegetAllRoles(e?.target?.value)}
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
                    onClick={() => {
                      setrolesAndPermissionsModal(true);
                    }}
                  >
                    + Create New Role
                  </Button>
                </Space>
              </Col>
            </Row>
            <Divider style={{ margin: "10px 0px" }} />
            {loaderList ? (
              <Row>
                <Skeleton />
              </Row>
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={rolesList}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      description={
                        <>
                          <Row>
                            <Col span={12}>
                              <Typography>{item.role_name}</Typography>
                              <Typography className="custom-text1">
                                {item.userCount ? item.userCount : 0} Users
                              </Typography>
                            </Col>
                            <Col
                              span={12}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                              }}
                            >
                              <Space>
                                <Button
                                  icon={<FaRegEdit />}
                                  onClick={() => {
                                    setselectedRoleDetails(item);
                                    setupdateRolesAndPermissionsModal(true);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  type="link"
                                  danger
                                  onClick={() => {
                                    setselectedRoleDetails(item);
                                    setisRoleDeleteModalVisible(true);
                                  }}
                                >
                                  Delete
                                </Button>
                              </Space>
                            </Col>
                          </Row>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </>
      ),
    },
  ];

  useEffect(() => {
    handlegetAllRoles();
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
      <RolesAndPermissionsModal
        rolesAndPermissionsModal={rolesAndPermissionsModal}
        setrolesAndPermissionsModal={setrolesAndPermissionsModal}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        openNotificationWithIcon={openNotificationWithIcon}
        handlegetAllRoles={handlegetAllRoles}
      />

      <EditRolesAndPermissionModal
        updateRolesAndPermissionsModal={updateRolesAndPermissionsModal}
        setupdateRolesAndPermissionsModal={setupdateRolesAndPermissionsModal}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        openNotificationWithIcon={openNotificationWithIcon}
        handlegetAllRoles={handlegetAllRoles}
        selectedRoleDetails={selectedRoleDetails}
      />

      <InviteTeamMemberModal
        loginUserDetails={loginUserDetails}
        isInviteTeamMemberModalVisible={isInviteTeamMemberModalVisible}
        setisInviteTeamMemberModalVisible={setisInviteTeamMemberModalVisible}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        openNotificationWithIcon={openNotificationWithIcon}
        rolesList={rolesList}
        getAllClinicUserDetails={getAllClinicUserDetails}
      />

      <DeleteUser
        isUserDeleteModalVisible={isUserDeleteModalVisible}
        setisUserDeleteModalVisible={setisUserDeleteModalVisible}
        seletedUserDetails={seletedUserDetails}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        openNotificationWithIcon={openNotificationWithIcon}
        getAllClinicUserDetails={getAllClinicUserDetails}
      />
      <DeleteRole
        isRoleDeleteModalVisible={isRoleDeleteModalVisible}
        setisRoleDeleteModalVisible={setisRoleDeleteModalVisible}
        selectedRoleDetails={selectedRoleDetails}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        openNotificationWithIcon={openNotificationWithIcon}
        handlegetAllRoles={handlegetAllRoles}
        getAllClinicUserDetails={getAllClinicUserDetails}
        rolesoptions={rolesoptions}
      />
    </>
  );
};

export default TeamSetting;
