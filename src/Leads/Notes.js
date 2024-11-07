/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  Modifier,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import styled from "styled-components";
import draftToHtml from "draftjs-to-html";
import {
  Button,
  Divider,
  List,
  Spin,
  Tooltip,
  Avatar,
  Typography,
  Empty,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NoteContent = styled.div`
  margin-top: 1px;
  color: #4a4a4a;
  font-size: 14px;
`;

const Notes = ({ selectedLeadDetails, openNotificationWithIcon }) => {
  const [initialeditorState, setinitialeditorState] = useState(
    EditorState.createEmpty()
  );
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [notes, setNotes] = useState([]);
  const [mentioning, setMentioning] = useState(false);
  const [mentionSuggestions, setMentionSuggestions] = useState([]);
  const [noteLoader, setnoteLoader] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const users = ["Fatima", "Noor Aleyan", "Michael", "Adam", "John", "Jane"];

  const oninitialEditorStateChange = (state) => {
    setinitialeditorState(state);
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

  const insertMention = (mention) => {
    const contentState = initialeditorState.getCurrentContent();
    const selectionState = initialeditorState.getSelection();
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
    setinitialeditorState(newEditorState);
    setMentionSuggestions([]);
    setMentioning(false);
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

  const saveNote = async () => {
    setLoadingButton(true);
    const content = draftToHtml(
      convertToRaw(
        editNoteId
          ? editorState.getCurrentContent()
          : initialeditorState.getCurrentContent()
      )
    );
    const data = {
      content,
      lead_id: selectedLeadDetails?.id,
    };
    const token = localStorage.getItem("authToken");
    const url = editNoteId
      ? `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/update-note/${editNoteId}`
      : `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/save-note`;

    try {
      await axios({
        method: editNoteId ? "PUT" : "POST",
        url,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      openNotificationWithIcon(
        "success",
        "Note",
        editNoteId
          ? "Comment Updated Successfully!"
          : "Comment Added Successfully!"
      );
      setLoadingButton(false);
      setEditNoteId(null); // Reset edit ID after saving
      setEditorState(EditorState.createEmpty());
      setinitialeditorState(EditorState.createEmpty());
      getNotes();
    } catch (error) {
      console.error(error);
      setLoadingButton(false);
    }
  };

  const deleteComment = async (id) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/delete-note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      openNotificationWithIcon(
        "success",
        "Comment",
        "Comment Deleted Successfully!"
      );
      setNotes([]);
      getNotes();
    } catch (err) {
      openNotificationWithIcon("error", "Comment", err?.message);
      console.log(err);
    }
  };

  const getNotes = async () => {
    setnoteLoader(true);
    const token = localStorage.getItem("authToken");
    try {
      await axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/get-note/${selectedLeadDetails?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setnoteLoader(false);
          setNotes(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    setnoteLoader(false);
  };

  useEffect(() => {
    getNotes();
  }, [selectedLeadDetails]);

  return (
    <>
      {notes ? (
        <>
          <div style={{ marginBottom: "10px" }}>
            {!noteLoader ? (
              notes?.length > 0 ? (
                <List
                  dataSource={notes}
                  renderItem={(item) => (
                    <List.Item key={item?.id}>
                      <div>
                        <Header>
                          <div>
                            {item?.User?.profile_picture ? (
                              <Avatar
                                src={item?.User?.profile_picture}
                                alt="AI Agent"
                              />
                            ) : (
                              <Avatar
                                src={item?.User?.profile_picture}
                                alt="AI Agent"
                              />
                            )}

                            <Text style={{ marginLeft: 8 }}>
                              {item?.User?.dentist_full_name}
                            </Text>
                          </div>
                        </Header>
                        <NoteContent>
                          {editNoteId === item.id ? (
                            <>
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
                                        8, 9, 10, 11, 12, 14, 16, 18, 24, 30,
                                        36, 48, 60, 72, 96,
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
                                      options: [
                                        "unordered",
                                        "ordered",
                                        "indent",
                                        "outdent",
                                      ],
                                    },
                                    textAlign: {
                                      inDropdown: true,
                                      options: [
                                        "left",
                                        "center",
                                        "right",
                                        "justify",
                                      ],
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
                                {mentioning &&
                                  mentionSuggestions.length > 0 && (
                                    <>
                                      {mentionSuggestions.map(
                                        (mention, index) => (
                                          <div
                                            key={index}
                                            onClick={() =>
                                              updateinsertMention(mention)
                                            }
                                            style={{
                                              padding: "5px",
                                              cursor: "pointer",
                                            }}
                                            onMouseOver={(e) =>
                                              (e.currentTarget.style.backgroundColor =
                                                "#EFEEFF")
                                            }
                                            onMouseOut={(e) =>
                                              (e.currentTarget.style.backgroundColor =
                                                "white")
                                            }
                                          >
                                            {mention}
                                          </div>
                                        )
                                      )}
                                    </>
                                  )}
                              </StyledEditor>
                              <div
                                style={{
                                  marginTop: "10px",
                                  textAlign: "right",
                                }}
                              >
                                <Button
                                  onClick={saveNote}
                                  type="primary"
                                  style={{ borderRadius: "6px" }}
                                  loading={loadingButton}
                                >
                                  {editNoteId ? "Update" : "Add"}
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.content,
                                }}
                              />
                              <Text className="custom-text1">
                                {dayjs(item.created_on).format("MMM DD, YYYY")}
                              </Text>
                              <Divider type="vertical" />
                              <Tooltip title={"Edit"}>
                                <CiEdit
                                  style={{ fontSize: 16, cursor: "pointer" }}
                                  onClick={() => {
                                    setEditNoteId(item?.id);

                                    // Convert HTML content to blocks and set in editor state
                                    const blocksFromHTML = convertFromHTML(
                                      item?.content || ""
                                    );
                                    const contentState =
                                      ContentState.createFromBlockArray(
                                        blocksFromHTML.contentBlocks,
                                        blocksFromHTML.entityMap
                                      );
                                    setEditorState(
                                      EditorState.createWithContent(
                                        contentState
                                      )
                                    );
                                  }}
                                />
                              </Tooltip>
                              <Divider type="vertical" />
                              <Tooltip title={"Delete"}>
                                <MdOutlineDeleteOutline
                                  onClick={() => deleteComment(item?.id)}
                                  style={{ fontSize: 16, cursor: "pointer" }}
                                />
                              </Tooltip>
                            </>
                          )}
                        </NoteContent>
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Empty />
                </div>
              )
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Spin />
              </div>
            )}
          </div>
        </>
      ) : (
        ""
      )}
      <StyledEditor>
        <Editor
          editorState={initialeditorState}
          onEditorStateChange={oninitialEditorStateChange}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          placeholder="Write your note here..."
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
                onClick={() => insertMention(mention)}
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
      {/* Button to save or add note */}
      <div style={{ marginTop: "10px", textAlign: "right" }}>
        <Button
          onClick={saveNote}
          type="primary"
          style={{ borderRadius: "6px" }}
          loading={loadingButton}
        >
          Add
        </Button>
      </div>
    </>
  );
};

export default Notes;
