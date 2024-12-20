/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Menu,
  Input,
  Divider,
  Typography,
  Spin,
  Avatar,
  Space,
  Modal,
  Button,
} from "antd";
import { getInitials } from "./ReturnColumnValue";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
const { Search } = Input;

export const ClinicUserOptionsList = ({
  clinicUsers,
  lead,
  handlevisiblelUserAssignedDropdownChange,
  handleGetAllleadsKanbanView,
  openNotificationWithIcon,
  setisLeadsDetailsModalVisible,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [
    isleadAssignToAnotherUserModalVisible,
    setisleadAssignToAnotherUserModalVisible,
  ] = useState(false);
  const [currentUser, setcurrentUser] = useState([]);
  const [previousUser, setpreviousUser] = useState();
  const [websiteUser, setwebsiteUser] = useState([]);
  const [websiteUserLoader, setwebsiteUserLoader] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const filteredUsers = clinicUsers?.filter((user) =>
    (user?.dentist_f || user?.phone_number || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleAssignedLeadToUser = async (user) => {
    setbuttonLoader(true);
    const token = localStorage.getItem("authToken");
    let data = {
      lead_id: lead?.id,
      user_id: user ? user?.id : currentUser?.id,
    };
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/assignedLeadToUser`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        handleGetAllleadsKanbanView();
        setisleadAssignToAnotherUserModalVisible(false);
        setisLeadsDetailsModalVisible(false);
        openNotificationWithIcon(
          "success",
          "Lead",
          "Lead Assigned Successfully !"
        );
      })
      .catch((err) => {
        console.log(err);
      });
    setbuttonLoader(false);
  };

  const getLeadAssociatedUser = async () => {
    setwebsiteUserLoader(false);
    const token = localStorage.getItem("authToken");
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/getLeadAssociatedUser/${lead?.website_user_name}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setwebsiteUserLoader(false);
          setpreviousUser(
            res?.data?.websiteUser?.filter(
              (item) => item?.user.id === lead?.assigned_id
            )?.[0]?.user || []
          );
         
          setwebsiteUser(res?.data?.websiteUser);
        })
        .catch((err) => {
          setwebsiteUserLoader(false);
          console.log(err);
        });
    } catch (error) {
      setwebsiteUserLoader(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getLeadAssociatedUser();
  }, [clinicUsers, lead]);

  return (
    <>
      <Menu>
        {/* <Search
        placeholder="Search user"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: 10,
          borderRadius: "20px",
          width: "100%",
        }}
      /> */}
        {/* <Divider style={{ margin: "5px 0px 5px 0px" }} /> */}
        <Typography style={{ padding: "0px 10px 0px 10px" }}>
          Assign User
        </Typography>
        <Divider style={{ margin: "5px 0px 5px 0px" }} />
        <div
          style={{
            width: 200,
            maxHeight: "220px",
            overflowY: "auto",
            border: "none",
          }}
        >
          <Menu>
            {websiteUserLoader ? (
              <Menu.Item key="loading" disabled>
                <Spin style={{ marginRight: 10 }} size="small" /> Loading...
              </Menu.Item>
            ) : (
              <>
                {websiteUser?.length > 0 ? (
                  websiteUser.map((item) => {
                    return (
                      <Menu.Item
                        key={item?.user?.id}
                        style={{
                          height: "34px",
                          lineHeight: "34px",
                          background:
                            item?.user?.id === lead?.assigned_id
                              ? "#F4F3FF"
                              : "",
                        }}
                        onClick={() => {
                          if (lead?.User) {
                            if (lead?.assigned_id !== item?.user?.id) {
                              setcurrentUser(item?.user);
                              handlevisiblelUserAssignedDropdownChange(
                                false,
                                lead?.id
                              );
                              setisleadAssignToAnotherUserModalVisible(true);
                            }
                          } else {
                            handleAssignedLeadToUser(item?.user);
                          }
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Space
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {item?.user?.profile_picture ? (
                              <Avatar
                                size={25}
                                src={item?.user?.profile_picture}
                              />
                            ) : (
                              <Avatar
                                size={25}
                                style={{ background: item?.user?.avatar_color }}
                              >
                                {getInitials(item?.user?.dentist_full_name)}
                              </Avatar>
                            )}

                            <Typography>
                              {item?.user?.dentist_full_name
                                ? item?.user?.dentist_full_name
                                : item?.user?.phone}
                            </Typography>
                          </Space>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {item?.user?.id === lead?.assigned_id && (
                              <FaCheck style={{ color: "#3900DB" }} />
                            )}
                          </div>
                        </div>
                      </Menu.Item>
                    );
                  })
                ) : (
                  <Menu.Item key="no-users" disabled>
                    No users found
                  </Menu.Item>
                )}
              </>
            )}
          </Menu>
        </div>
      </Menu>

      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography style={{ marginLeft: 10 }}>
              🔄 Reassign Lead to {currentUser?.dentist_f}?
            </Typography>
          </div>
        }
        visible={isleadAssignToAnotherUserModalVisible}
        footer={
          <>
            <Divider style={{ margin: 8 }} />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "0px 10px 10px 0px",
              }}
            >
              <Space>
                <Button
                  onClick={() =>
                    setisleadAssignToAnotherUserModalVisible(false)
                  }
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    handleAssignedLeadToUser();
                  }}
                  loading={buttonLoader}
                >
                  Confirm
                </Button>
              </Space>
            </div>
          </>
        }
        closable={false}
        width={480}
        className="custom-modal"
      >
        <Avatar.Group>
         
          {previousUser?.profile_picture ? (
            <Avatar size={40} src={previousUser?.profile_picture} />
          ) : (
            <Avatar
              size={40}
              style={{ background: previousUser?.avatar_color }}
            >
              {getInitials(previousUser?.dentist_full_name)}
            </Avatar>
          )}

          {currentUser?.profile_picture ? (
            <Avatar size={40} src={currentUser?.profile_picture} />
          ) : (
            <Avatar size={40} style={{ background: currentUser?.avatar_color }}>
              {getInitials(currentUser?.dentist_full_name)}
            </Avatar>
          )}
        </Avatar.Group>
        <Typography style={{ padding: "10px 0px" }}>
          You are about to reassign this lead to{" "}
          {currentUser?.dentist_full_name}. Once reassigned:
        </Typography>
        <ul style={{ paddingLeft: 15, margin: 0 }}>
          <li>
            {currentUser?.dentist_full_name} will have full access to this lead.{" "}
          </li>
          <li>
            Notifications related to this lead will be sent to{" "}
            {currentUser?.dentist_full_name}.
          </li>
        </ul>
      </Modal>
    </>
  );
};
