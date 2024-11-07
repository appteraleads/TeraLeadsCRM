import React, { useState } from "react";
import {
  Avatar,
  Typography,
  Button,
  Space,
  Divider,
  Row,
  Col,
  Empty,
  Form,
  TimePicker,
  DatePicker,
  Modal,
  Input,
} from "antd";
import {
  PhoneOutlined,
  CheckCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import draftToHtml from "draftjs-to-html";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { getInitials } from "../Common/ReturnColumnValue";
import dayjs from "dayjs";
import axios from "axios";
import { FaCalendar } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import moment from "moment";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, Modifier, convertToRaw } from "draft-js";

const { Text } = Typography;
const StyledEditor = styled.div`
  border: 1px solid #3900db;
  border-radius: 8px;
  min-height: 200px;
  padding: 10px;
  font-size: 16px;
  color: #72779e;
  width: "100%";
  background: #fff;
`;
const LeadDetails = ({ selectedLead, openNotificationWithIcon ,notes,setnotes}) => {
  const [AppointmentDetailsform] = Form.useForm();
  const [isNoteModalVisible, setisNoteModalVisible] = useState(false);
  const [isAppointmentModalVisible, setisAppointmentModalVisible] =
    useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [mentionSuggestions, setMentionSuggestions] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mentioning, setMentioning] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const users = ["Fatima", "Noor Aleyan", "Michael", "Adam", "John", "Jane"];

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };
  const uploadCallback = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/uploadFile/app@teraleads.com`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return { data: { link: data.url } };
  };
  const updateinsertMention = (mention) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const mentionText = `${mention} `;

    const mentionEntityKey = contentState.createEntity("MENTION", "IMMUTABLE", {
      mention,
    });
    const entityKey = mentionEntityKey.getLastCreatedEntityKey();

    const newContentState = Modifier.replaceText(
      contentState,
      selectionState,
      mentionText,
      null,
      entityKey
    );

    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "insert-mention"
    );
    setEditorState(newEditorState);
    setMentionSuggestions([]);
    setMentioning(false);
  };
  const onEditorStateChange = (state) => {
    setEditorState(state);
    const currentContent = state.getCurrentContent();
    const text = currentContent.getPlainText();
    const lastWord = text.split(" ").pop();

    if (lastWord.startsWith("@")) {
      const query = lastWord.slice(1);
      const suggestions = users.filter((user) =>
        user.toLowerCase().includes(query.toLowerCase())
      );
      setMentionSuggestions(suggestions);
      setMentioning(true);
    } else {
      setMentioning(false);
      setMentionSuggestions([]);
    }
  };

  const handleCancelNoteModal = () => {
    setisNoteModalVisible(false);
  };

  const handleCancelApointmentDateAndTime = () => {
    setisAppointmentModalVisible(false);
    AppointmentDetailsform.resetFields();
  };

  const handleSubmitApointmentDateAndTime = async (values) => {
    setbuttonLoader(true);
    const data = {
      id: selectedLead?.id,
      AppointmentDate: dayjs(values?.AppointmentDate).format("MMM DD YYYY"),
      AppointmentTime: dayjs(values?.AppointmentTime).format("hh:mm A"), // Example: "02:30 pm"
      AppointmentNotes: values?.AppointmentNotes,
      LeadStatus: "Appointment",
    };
    const token = localStorage.getItem("authToken");
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
        setbuttonLoader(false);
        openNotificationWithIcon(
          "success",
          "Kanban Lead",
          "Lead Updated Successfully !"
        );
        AppointmentDetailsform.resetFields();
        setisAppointmentModalVisible(false);
      })
      .catch((err) => {
        setbuttonLoader(false);
        console.log(err);
        AppointmentDetailsform.resetFields();
      });
    setisAppointmentModalVisible(false);
  };
  const getNotes = async () => {
    const token = localStorage.getItem("authToken");
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-note/${selectedLead?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setnotes(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const saveNote = async () => {
    setLoadingButton(true);
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const data = {
      content,
      lead_id: selectedLead?.id,
    };
    const token = localStorage.getItem("authToken");
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/save-note`;

    try {
      await axios({
        method: "POST",
        url,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          getNotes();
          openNotificationWithIcon(
            "success",
            "Note",
            "Comment Added Successfully!"
          );
          setLoadingButton(false);
          setisNoteModalVisible(false);
          setEditorState(EditorState.createEmpty());
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.error(error);
      setLoadingButton(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%", // Set height to 100% to make it take full height
        border: "1px solid #E8EBEF",
        borderRadius: 0,
        background: "#fff",
      }}
    >
      {/* Header */}
      <Row
        style={{
          height: 49,
          borderBottom: "1px solid #e6e6e6",
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography level={6} style={{ color: "#72779E", margin: 0 }}>
          Lead Details
        </Typography>
        <Button type="text" icon={<HiDotsHorizontal />} />
      </Row>

      <div style={{ padding: 10 }}>
        {Object.keys(selectedLead).length > 0 ? (
          <>
            {/* Lead Info */}
            <Row align="middle" style={{ marginBottom: 20 }}>
              <Avatar
                size={40}
                style={{
                  backgroundColor: selectedLead?.avatarColor,
                  fontSize: 18,
                  marginRight: 10,
                }}
              >
                {getInitials(
                  selectedLead?.first_name + " " + selectedLead?.last_name
                )}
              </Avatar>
              <Col flex="auto">
                <Text style={{ fontSize: 12, color: "#888888" }}>
                  #{selectedLead?.id}
                </Text>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text strong style={{ fontSize: 16 }}>
                    {selectedLead.first_name && selectedLead?.last_name
                      ? selectedLead.first_name + " " + selectedLead?.last_name
                      : selectedLead?.phone_number}
                  </Text>
                  <CheckCircleOutlined
                    style={{ color: "green", marginLeft: 5 }}
                  />
                </div>
              </Col>
              <Space style={{ marginTop: 10 }}>
                <Button
                  type="text"
                  icon={<PhoneOutlined />}
                  style={{ border: "1px solid #E8EBEF" }}
                >
                  Call
                </Button>

                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    height: 30,
                    width: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar size={"small"}> A</Avatar>
                  <MdOutlineKeyboardArrowDown />
                </div>
                <Button
                  type="text"
                  icon={<EyeOutlined />}
                  style={{ border: "1px solid #E8EBEF" }}
                ></Button>
              </Space>
            </Row>

            <Divider />
               
            {/* Response Time */}
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: 10 }}
            >
              <Typography style={{ color: "#72779E", fontSize: 13 }}>
                Response Time
              </Typography>
              <Space>
                <Text strong style={{ fontSize: 13 }}>
                  00:02:32
                </Text>
                <Text style={{ color: "#52c41a", fontSize: 13 }}>
                  ↑ 5% Faster
                </Text>
              </Space>
            </Row>
            <Divider style={{ margin: 5 }} />

            {/* Status */}
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: 10 }}
            >
              <Text style={{ color: "#72779E", fontSize: 13 }}>Status</Text>
              <Button type="link" style={{ padding: 0, fontSize: 13 }}>
                Change Status
              </Button>
            </Row>
            <Divider style={{ margin: 5 }} />
            {/* Appointment */}
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: 10 }}
            >
              <Text style={{ color: "#72779E", fontSize: 13 }}>
                Appointment
              </Text>
              <Button
                type="link"
                onClick={() => {
                  setisAppointmentModalVisible(true);
                }}
                style={{ padding: 0, fontSize: 13 }}
              >
                Book Appointment
              </Button>
            </Row>
            <Divider style={{ margin: 5 }} />
            {/* Treatment Value */}
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: 10 }}
            >
              <Text style={{ color: "#72779E", fontSize: 13 }}>
                Treatment Value
              </Text>
              <Text strong style={{ fontSize: 13 }}>
                ${selectedLead?.treatment_value}
              </Text>
            </Row>
          </>
        ) : (
          <Empty description="No lead available" />
        )}

        <Divider style={{ margin: 5, width: "100%" }} />

        {/* Notes Section */}
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 10 }}
        >
          <Typography strong className="custom-text1">
            Notes
          </Typography>
          <Button
            type="link"
            onClick={() => {
              setisNoteModalVisible(true);
            }}
            style={{ padding: 0 }}
          >
            + Add Note
          </Button>
        </Row>

        {/* Single Note Item */}
        {notes?.length > 0 ? (
          <div style={{height:'40vh',
            overflow:'auto'}}>
            {notes?.map((note) => {
              return (
                <>
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      
                    }}
                  >
                    <Col
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: 10,
                      }}
                    >
                      <Avatar
                        size="small"
                        style={{ backgroundColor: "#52c41a" }}
                      >
                        {getInitials(note?.User?.dentist_full_name)}
                      </Avatar>
                    </Col>
                    <Col style={{ flex: 1 }}>
                      <Text strong style={{ fontSize: 14 }}>
                        {note?.User?.dentist_full_name}
                      </Text>

                      <div
                        dangerouslySetInnerHTML={{ __html: note?.content }}
                        style={{ margin: 0 }}
                      />

                      <Text style={{ fontSize: 12, color: "#72779E" }}>
                        {dayjs(note?.created_on)?.format(
                          "MMM DD, YYYY - hh:mm A"
                        )}
                      </Text>
                    </Col>
                  </Row>
                </>
              );
            })}
          </div>
        ) : (
          <Row
            justify="center"
            align="middle"
            style={{ marginBottom: 10, height: "50%", minHeight: 100 }}
          >
            <Empty description="No notes available" />
          </Row>
        )}
      </div>
      {/* add Appointment date and time  */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={handleCancelApointmentDateAndTime}
              icon={<IoChevronBackSharp />}
            ></Button>
            <Typography style={{ marginLeft: 10 }}>
              Appointment Details
            </Typography>
          </div>
        }
        visible={isAppointmentModalVisible}
        footer={null}
        closable={false}
        width={600}
        className="custom-modal"
      >
        <Form
          form={AppointmentDetailsform}
          onFinish={handleSubmitApointmentDateAndTime}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Row style={{ margin: "10px 0" }}>
            <Col span={12}>
              <Space>
                <FaCalendar
                  style={{
                    fontSize: 16,
                    color: "#72779E",
                    display: "flex",
                  }}
                />
                <Typography>Select Date And Time</Typography>
              </Space>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    <span>Date</span>
                    <span style={{ color: "red" }}>*</span>
                  </>
                }
                name="AppointmentDate"
                rules={[{ required: true, message: "Please select a date!" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={disabledDate}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    <span>Time</span>
                    <span style={{ color: "red" }}>*</span>
                  </>
                }
                name="AppointmentTime"
                rules={[{ required: true, message: "Please select a time!" }]}
              >
                <TimePicker
                  use12Hours
                  format="h:mm a"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Notes" name="AppointmentNotes">
                <Input.TextArea
                  placeholder="Please enter notes"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Button
              onClick={handleCancelApointmentDateAndTime}
              style={{ marginRight: 10 }}
            >
              Cancel
            </Button>
            <Form.Item>
              <Button
                className="custom-primary-button"
                htmlType="submit"
                block
                loading={buttonLoader}
              >
                Create Appointment
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>

      {/* add Note  */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={handleCancelNoteModal}
              icon={<IoChevronBackSharp />}
            ></Button>
            <Typography style={{ marginLeft: 10 }}>Note</Typography>
          </div>
        }
        visible={isNoteModalVisible}
        footer={[
          <Row justify="end" style={{ padding: 10 }}>
            <Button onClick={handleCancelNoteModal} style={{ marginRight: 10 }}>
              Cancel
            </Button>
            <Button
              className="custom-primary-button"
              loading={loadingButton}
              onClick={() => {
                saveNote();
              }}
            >
              Create Note
            </Button>
          </Row>,
        ]}
        closable={false}
        width={600}
        className="custom-modal"
      >
        <Row style={{ margin: "10px 0" }}>
          <StyledEditor>
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              placeholder="Edit your note..."
              toolbar={{
                mention: {
                  separator: " ",
                  trigger: "@",
                  suggestions: mentionSuggestions,
                },
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "fontFamily",
                  "list",
                  "textAlign",
                  "colorPicker",
                  "link",
                  "embedded",
                  "emoji",
                  "image",
                  "remove",
                  "history",
                ],
                inline: {
                  options: [
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "monospace",
                    "superscript",
                    "subscript",
                  ],
                },
                blockType: {
                  inDropdown: true,
                  options: [
                    "Normal",
                    "H1",
                    "H2",
                    "H3",
                    "H4",
                    "H5",
                    "H6",
                    "Blockquote",
                    "Code",
                  ],
                },
                fontSize: {
                  options: [
                    8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
                  ],
                },
                fontFamily: {
                  options: [
                    "Arial",
                    "Georgia",
                    "Impact",
                    "Tahoma",
                    "Times New Roman",
                    "Verdana",
                  ],
                },
                list: {
                  inDropdown: true,
                  options: ["unordered", "ordered", "indent", "outdent"],
                },
                textAlign: {
                  inDropdown: true,
                  options: ["left", "center", "right", "justify"],
                },
                colorPicker: {
                  colors: [
                    "rgb(97,189,109)",
                    "rgb(26,188,156)",
                    "rgb(84,172,210)",
                    "rgb(44,130,201)",
                    "rgb(147,101,184)",
                    "rgb(71,85,119)",
                    "rgb(204,204,204)",
                    "rgb(65,168,95)",
                    "rgb(0,168,133)",
                    "rgb(61,142,185)",
                    "rgb(41,105,176)",
                    "rgb(85,57,130)",
                    "rgb(40,50,78)",
                    "rgb(0,0,0)",
                    "rgb(247,218,100)",
                    "rgb(251,160,38)",
                    "rgb(235,107,86)",
                    "rgb(226,80,65)",
                    "rgb(163,143,132)",
                    "rgb(239,239,239)",
                    "rgb(255,255,255)",
                    "rgb(250,197,28)",
                    "rgb(243,121,52)",
                    "rgb(209,72,65)",
                    "rgb(184,49,47)",
                    "rgb(124,112,107)",
                    "rgb(209,213,216)",
                  ],
                },
                link: {
                  inDropdown: true,
                },
                embedded: {
                  defaultSize: {
                    height: "auto",
                    width: "100%",
                  },
                },
                emoji: true,
                image: {
                  uploadCallback: uploadCallback,
                  alt: { present: true, mandatory: false },
                  previewImage: true,
                },
                remove: {},
                history: { inDropdown: true },
              }}
            />
            {mentioning && mentionSuggestions.length > 0 && (
              <>
                {mentionSuggestions.map((mention, index) => (
                  <div
                    key={index}
                    onClick={() => updateinsertMention(mention)}
                    style={{
                      padding: "5px",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#EFEEFF")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "white")
                    }
                  >
                    {mention}
                  </div>
                ))}
              </>
            )}
          </StyledEditor>
        </Row>
      </Modal>
    </div>
  );
};

export default LeadDetails;
