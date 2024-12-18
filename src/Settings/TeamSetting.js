/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Typography,
  Space,
  Divider,
  Avatar,
  Select,
  Menu,
  Input,
  Table,
  Dropdown,
} from "antd";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineUserAdd } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  DeleteRole,
  DeleteUser,
  EditRolesAndPermissionModal,
  InviteTeamMemberModal,
  ManageAccessModal,
  RolesAndPermissionsModal,
  ShowAllRolesModal,
} from "./Modal";
import { FiMail } from "react-icons/fi";
import axios from "axios";
import { getInitials } from "../Common/ReturnColumnValue";
import { IoSettingsOutline } from "react-icons/io5";

import { BiDotsHorizontal } from "react-icons/bi";

const { Text } = Typography;
const { Option } = Select;

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch (_) {
    return false;
  }
};

const getLogoUrl = (url) => {
  const domain = new URL(url)?.hostname;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
};

const TeamSetting = ({ openNotificationWithIcon, loginUserDetails }) => {
  const [showAllRolesModalVisible, setshowAllRolesModalVisible] =
    useState(false);
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
  const [isUserDeleteModalVisible, setisUserDeleteModalVisible] =
    useState(false);
  const [isRoleDeleteModalVisible, setisRoleDeleteModalVisible] = useState();
  const [permissionList, setpermissionList] = useState([]);
  const [clinicsWebsiteList, setclinicsWebsiteList] = useState([]);
  const [clinicRolesList, setclinicRolesList] = useState([]);
  const [clinicDetails, setclinicDetails] = useState([]);
  const [manageAccessModalVisible, setmanageAccessModalVisible] =
    useState(false);
  const [clinicUsers, setclinicUsers] = useState([]);

  const menu = (item) => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          icon={<IoSettingsOutline size={15} />}
          onClick={() => {
            console.log(item);
            setseletedUserDetails(item);
            setmanageAccessModalVisible(true);
          }}
        >
          Manage Access
        </Menu.Item>
        <Menu.Item
          key="2"
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

  const columns = [
    {
      title: "Users",
      dataIndex: "user",
      key: "user",
      width: 300,
      render: (_, record) => {
        if (!record?.invitation_accepted) {
          return {
            children: (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: 270,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: 270,
                    }}
                  >
                    {record.dataValues.profile_picture ? (
                      <Avatar
                        size="large"
                        src={record.profile_picture}
                        style={{ marginRight: 10 }}
                      />
                    ) : (
                      <Avatar
                        style={{
                          background: record.dataValues?.avatar_color,
                          marginRight: 10,
                        }}
                        size="large"
                      >
                        {getInitials(record.dataValues.dentist_full_name)}
                      </Avatar>
                    )}
                    <div>
                      <div style={{ fontWeight: "500" }}>
                        {record.dataValues.dentist_full_name}
                      </div>
                      <div style={{ color: "#888" }}>
                        {record.dataValues.email}
                      </div>
                    </div>
                  </div>

                  <Dropdown overlay={menu(record)}>
                    <BiDotsHorizontal style={{ cursor: "pointer" }} />
                  </Dropdown>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 50,
                  }}
                >
                  <FiMail style={{ color: "#72779E", marginRight: 5 }} />
                  <Typography>An invitation has been sent</Typography>
                  <Typography
                    style={{
                      color: "#DB0000",
                      cursor: "pointer",
                      marginLeft: 10,
                    }}
                  >
                    Withdraw Invite
                  </Typography>
                </div>
              </div>
            ),
            props: { colSpan: columns.length },
          };
        }
        // Default content for active users
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {record.dataValues.profile_picture ? (
                <Avatar
                  size="large"
                  src={record.dataValues.profile_picture}
                  style={{ marginRight: 10 }}
                />
              ) : (
                <Avatar
                  style={{
                    background: record.dataValues?.avatar_color,
                    marginRight: 10,
                  }}
                  size="large"
                >
                  {getInitials(record.dataValues.dentist_full_name)}
                </Avatar>
              )}
              <div>
                <div style={{ fontWeight: "500" }}>
                  {record.dataValues.dentist_full_name}
                </div>
                <div style={{ color: "#888" }}>{record.dataValues.email}</div>
              </div>
            </div>

            <Dropdown overlay={menu(record)}>
              <BiDotsHorizontal style={{ cursor: "pointer" }} />
            </Dropdown>
          </div>
        );
      },
    },

    ...clinicsWebsiteList?.map((web) => ({
      title: (
        <Space>
          <Avatar
            shape="square"
            size={20}
            src={
              web?.website_url && isValidUrl(web?.website_url)
                ? getLogoUrl(web?.website_url)
                : ""
            }
          />
          <Typography style={{ textTransform: "capitalize" }}>
            {web?.website_user_name}
          </Typography>
        </Space>
      ),
      dataIndex: web?.website_user_name,
      key: web?.id,
      width: 250,
      render: (_, record) => {
        if (!record?.invitation_accepted) {
          return { props: { colSpan: 0 } };
        }
        return (
          <Select
            defaultValue={
              record?.websites?.find(
                (item) => item?.website_name === web?.website_user_name
              )?.role_name || "Remove"
            }
            style={{ width: "100%" }}
            onChange={(role_id) => {
              handleRoleChange(
                web?.clinic_id,
                web?.id,
                record?.dataValues?.id,
                role_id
              );
            }}
            placeholder="Select role"
          >
            {clinicRolesList?.map((item) => (
              <Option key={item?.id} value={item?.id}>
                {item?.role_name}
              </Option>
            ))}
            <Option key={"Remove"} value={"Remove"}>
              No Access
            </Option>
          </Select>
        );
      },
    })),
  ];

  const handlegetAllRoles = async (search) => {
    const token = localStorage.getItem("authToken");
    setloaderList(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_API_BASE_URL
          }/api/v1/auth/getAllRoles?clinic_id=${
            loginUserDetails?.userClinicRoles[0]?.clinic?.id
          }&search=${search ? search : ""}`,
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
          setclinicRolesList(res?.data?.roles);
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
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/getAllClinicUserDetails/${loginUserDetails?.userClinicRoles?.[0]?.clinic_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const clinicDetails = res?.data?.clinicDetails;
      if (clinicDetails) {
        setclinicDetails(clinicDetails.clinic || null);
        setclinicUsers(clinicDetails.users || []);
        setclinicsWebsiteList(clinicDetails.websites || []);
      } else {
        setclinicDetails(null);
        setclinicUsers([]);
        setclinicsWebsiteList([]);
      }
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Settings",
        err?.response?.data?.message || err?.message
      );
    } finally {
      setloaderList(false);
    }
  };
console.log(clinicUsers)
  const handleRoleChange = async (clinic_id, website_id, user_id, role_id) => {
    const token = localStorage.getItem("authToken");

    let data = {
      website_id: website_id,
      role_id: role_id,
      clinic_id: clinic_id,
      user_id: user_id,
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

  const getallpermissionList = async () => {
    const token = localStorage.getItem("authToken");
    setloaderList(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/getallpermissionList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setpermissionList(res?.data?.groupedPermissions);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    setloaderList(false);
  };

  useEffect(() => {
    getallpermissionList();
    handlegetAllRoles();
    getAllClinicUserDetails();
  }, []);

  return (
    <>
      <Row align="middle" gutter={[16, 16]}>
        <Col span={12}>
          <Typography style={{ fontWeight: 600 }}>Team Members</Typography>
          <Text className="custom-text1">
            Manage your team’s access and roles within the clinic’s CRM.
          </Text>
        </Col>
        <Col span={12} align="end">
          <Space>
            {searchInputVisible ? (
              <Input
                placeholder="Search by role name"
                onChange={(e) => getAllClinicUserDetails(e?.target?.value)}
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
              icon={<IoSettingsOutline />}
              onClick={() => {
                setshowAllRolesModalVisible(true);
              }}
            >
              Manage Role
            </Button>
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

      <Table
        columns={columns}
        dataSource={clinicUsers.length ? clinicUsers : []}
        pagination={false}
        loading={loaderList}
        scroll={{
          x: "max-content",
          y: "60vh",
        }}
      />

      <ShowAllRolesModal
        showAllRolesModalVisible={showAllRolesModalVisible}
        setshowAllRolesModalVisible={setshowAllRolesModalVisible}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        clinicDetails={clinicDetails}
        setrolesAndPermissionsModal={setrolesAndPermissionsModal}
        clinicRolesList={clinicRolesList}
        setisRoleDeleteModalVisible={setisRoleDeleteModalVisible}
        setupdateRolesAndPermissionsModal={setupdateRolesAndPermissionsModal}
        setselectedRoleDetails={setselectedRoleDetails}
      />

      <RolesAndPermissionsModal
        rolesAndPermissionsModal={rolesAndPermissionsModal}
        setrolesAndPermissionsModal={setrolesAndPermissionsModal}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        openNotificationWithIcon={openNotificationWithIcon}
        handlegetAllRoles={handlegetAllRoles}
        permissionList={permissionList}
        loginUserDetails={loginUserDetails}
        clinicDetails={clinicDetails}
      />

      <EditRolesAndPermissionModal
        updateRolesAndPermissionsModal={updateRolesAndPermissionsModal}
        setupdateRolesAndPermissionsModal={setupdateRolesAndPermissionsModal}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        openNotificationWithIcon={openNotificationWithIcon}
        handlegetAllRoles={handlegetAllRoles}
        selectedRoleDetails={selectedRoleDetails}
        permissionList={permissionList}
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
        clinicDetails={clinicDetails}
      />

      <DeleteUser
        isUserDeleteModalVisible={isUserDeleteModalVisible}
        setisUserDeleteModalVisible={setisUserDeleteModalVisible}
        seletedUserDetails={seletedUserDetails}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        openNotificationWithIcon={openNotificationWithIcon}
        getAllClinicUserDetails={getAllClinicUserDetails}
        clinicDetails={clinicDetails}
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
        clinicDetails={clinicDetails}
      />

      <ManageAccessModal
        manageAccessModalVisible={manageAccessModalVisible}
        setmanageAccessModalVisible={setmanageAccessModalVisible}
        buttonLoader={buttonLoader}
        setbuttonLoader={setbuttonLoader}
        clinicDetails={clinicDetails}
        seletedUserDetails={seletedUserDetails}
        openNotificationWithIcon={openNotificationWithIcon}
        getAllClinicUserDetails={getAllClinicUserDetails}
      />
    </>
  );
};

export default TeamSetting;
