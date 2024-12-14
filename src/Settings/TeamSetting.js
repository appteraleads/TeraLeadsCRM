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
} from "antd";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineUserAdd } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  DeleteRole,
  DeleteUser,
  EditRolesAndPermissionModal,
  InviteTeamMemberModal,
  RolesAndPermissionsModal,
  ShowAllRolesModal,
} from "./Modal";
import { FiMail } from "react-icons/fi";
import axios from "axios";
import { getInitials } from "../Common/ReturnColumnValue";
import { IoSettingsOutline } from "react-icons/io5";

const { Text } = Typography;
const { Option } = Select;

const isValidUrl = (value) => {
  try {
    // Attempt to create a new URL object
    new URL(value);
    return true; // If no error is thrown, the URL is valid
  } catch (_) {
    return false; // If an error is thrown, the URL is invalid
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
  let dataSource = [];

  clinicsWebsiteList?.forEach((web) => {
    web?.userWebsiteRoles?.forEach((userdata) => {
      const userObject = {
        ...userdata?.user,
        websites: [
          {
            website_name: web?.website_user_name,
            role_name: userdata?.role?.role_name,
          },
        ],
      };

      const existingUserIndex = dataSource.findIndex(
        (user) => user?.id === userdata?.user?.id
      );

      if (existingUserIndex >= 0) {
        const existingUser = dataSource[existingUserIndex];

        // Add the website and role to the user's websites array
        existingUser.websites = [
          ...existingUser.websites,
          {
            website_name: web?.website_user_name,
            role_name: userdata?.role?.role_name,
          },
        ];
      } else {
        // Push the new user object with the websites array
        dataSource.push(userObject);
      }
    });
  });

  //   {
  //     title: "Users",
  //     dataIndex: "user",
  //     key: "user",
  //     width: 150,
  //     render: (_, record) => (
  //       <div style={{ display: "flex", alignItems: "center" }}>
  //         {record.profile_picture ? (
  //           <Avatar
  //             size="large"
  //             src={record.profile_picture}
  //             style={{ marginRight: 10 }}
  //           />
  //         ) : (
  //           <Avatar
  //             style={{ background: record?.avatar_color, marginRight: 10 }}
  //             size="large"
  //           >
  //             {getInitials(record.dentist_full_name)}
  //           </Avatar>
  //         )}
  //         <div>
  //           <div>{record.dentist_f}</div>
  //           <div style={{ color: "#888" }}>{record.email}</div>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   ...clinicsWebsiteList?.map((web) => ({
  //     title: web?.website_user_name,
  //     width: 150,
  //     render: (_, record) => (
  //       <>
  //         {record?.activated_yn ? (
  //           <Select
  //             defaultValue={
  //               record?.websites?.find(
  //                 (item) => item?.website_name === web?.website_user_name
  //               )?.role_name || null
  //             }
  //             style={{ width: 150 }}
  //             onChange={(role_id) => {
  //               handleRoleChange(web?.clinic_id, web?.id, record?.id, role_id);
  //             }}
  //             placeholder="Select role"
  //           >
  //             {clinicRolesList?.length > 0
  //               ? clinicRolesList.map((item) => (
  //                   <Option key={item?.id} value={item?.id}>
  //                     {item?.role_name}
  //                   </Option>
  //                 ))
  //               : null}
  //           </Select>
  //         ) : (
  //           <Space>
  //             <FiMail style={{color:'#72779E'}} />
  //             <Typography> An invitation has been sent</Typography>
  //             <Typography style={{ color: "#DB0000" }}> Withdraw Invite</Typography>
  //           </Space>
  //         )}
  //       </>
  //     ),
  //   })),
  // ];
  const columns = [
    {
      title: "Users",
      dataIndex: "user",
      key: "user",
      width: 250, // Adjust as needed
      render: (_, record) => {
        if (!record?.activated_yn) {
          // Spanning the row across all columns
          return {
            children: (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {record.profile_picture ? (
                    <Avatar
                      size="large"
                      src={record.profile_picture}
                      style={{ marginRight: 10 }}
                    />
                  ) : (
                    <Avatar
                      style={{
                        background: record?.avatar_color,
                        marginRight: 10,
                      }}
                      size="large"
                    >
                      {getInitials(record.dentist_full_name)}
                    </Avatar>
                  )}
                  <div>
                    <div style={{ fontWeight: "500" }}>
                      {record.dentist_full_name}
                    </div>
                    <div style={{ color: "#888" }}>{record.email}</div>
                  </div>
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
          <div style={{ display: "flex", alignItems: "center" }}>
            {record.profile_picture ? (
              <Avatar
                size="large"
                src={record.profile_picture}
                style={{ marginRight: 10 }}
              />
            ) : (
              <Avatar
                style={{ background: record?.avatar_color, marginRight: 10 }}
                size="large"
              >
                {getInitials(record.dentist_full_name)}
              </Avatar>
            )}
            <div>
              <div style={{ fontWeight: "500" }}>
                {record.dentist_full_name}
              </div>
              <div style={{ color: "#888" }}>{record.email}</div>
            </div>
          </div>
        );
      },
    },
    // Dynamically render other website columns
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
          <Typography>{web?.website_user_name}</Typography>
        </Space>
      ),
      dataIndex: web?.website_user_name,
      key: web?.id,
      width: 250,
      render: (_, record) => {
        if (!record?.activated_yn) {
          return { props: { colSpan: 0 } }; // Hide dynamic columns for inactive users
        }

        // Show dropdown for active users
        return (
          <Select
            defaultValue={
              record?.websites?.find(
                (item) => item?.website_name === web?.website_user_name
              )?.role_name || null
            }
            style={{ width: "100%" }}
            onChange={(role_id) => {
              handleRoleChange(web?.clinic_id, web?.id, record?.id, role_id);
            }}
            placeholder="Select role"
          >
            {clinicRolesList?.map((item) => (
              <Option key={item?.id} value={item?.id}>
                {item?.role_name}
              </Option>
            ))}
          </Select>
        );
      },
    })),
  ];

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
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/getAllClinicUserDetails/${loginUserDetails?.userClinicRoles?.[0]?.clinic_id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setclinicDetails(res?.data?.clinics);
          setclinicsWebsiteList(res?.data?.clinics?.websites);
          setloaderList(false);
        })
        .catch((err) => {
          setloaderList(false);
          openNotificationWithIcon(
            "error",
            "Settings",
            err?.response?.data?.message || err?.message
          );
          console.log(err);
        });
    } catch (err) {
      setloaderList(false);
      console.log(err);
    }
  };

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
    console.log("useEffect triggered");
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
        dataSource={dataSource}
        pagination={false}
        loading={loaderList}
        scroll={{
          x: "max-content",
          y: "60vh",
        }}
      />
      {/* <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={loaderList}
        scroll={{
          x: "max-content",
          y: "60vh",
        }}
      /> */}

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
    </>
  );
};

export default TeamSetting;
