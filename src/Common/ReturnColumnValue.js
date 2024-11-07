import { Avatar, Tag } from "antd";
import { leadStatusColorAndTextList } from "./ColorHexCodeList";
import { UserOutlined } from "@ant-design/icons";

export const getInitials = (name) => {
  const nameParts = name?.split(" ");
  const initials = nameParts?.map((part) => part[0]?.toUpperCase())?.join("");
  return initials;
};

export function leadsColumns(
  key,
  setisLeadsDetailsModalVisible,
  setselectedItemDetails
) {
  if (key === "Name")
    return {
      title: "Name",
      width: 150,
      ellipsis: true,
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {text?.first_name && text?.last_name ? (
            <>
              <Avatar
                style={{
                  backgroundColor: text?.avatarColor,
                }}
              >
                {text?.first_name && text?.last_name
                  ? getInitials(text?.first_name + " " + text?.last_name)
                  : ""}
              </Avatar>
              <span
                style={{ marginLeft: 10, cursor: "pointer" }}
                onClick={() => {
                  setisLeadsDetailsModalVisible(true);
                  setselectedItemDetails(text);
                }}
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
      sorter: {
        compare: (a, b) => a?.key - b?.key,
        multiple: 3,
      },
    };
  if (key === "LeadStatus")
    return {
      title: "Lead Status",
      ellipsis: true,
      width: 150,
      elipsis: true,
      render: (text) => (
        <>
          {text.lead_status ? (
            <Tag
              style={{
                backgroundColor: leadStatusColorAndTextList.find(
                  (item) => item.status === text?.lead_status
                )?.backgroud,
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
            </Tag>
          ) : (
            <Tag />
          )}
        </>
      ),
      sorter: {
        compare: (a, b) => a?.key - b?.key,
        multiple: 3,
      },
    };

  if (key === "LeadType")
    return {
      title: "Lead Type",
      width: 150,
      ellipsis: true,
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginLeft: 10 }}>
            {text?.lead_type ? "#" + text?.lead_type : <Tag />}
          </span>
        </div>
      ),
      sorter: {
        compare: (a, b) => a?.key - b?.key,
        multiple: 3,
      },
    };

  if (key === "Assigned")
    return {
      title: "Assigned",
      width: 180,
      ellipsis: true,
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {text?.assign_to ? (
            <>
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              ></Avatar>
              <span style={{ marginLeft: 10 }}>{text?.assign_to}</span>
            </>
          ) : (
            <Tag />
          )}
        </div>
      ),
      sorter: {
        compare: (a, b) => a?.key - b?.key,
        multiple: 3,
      },
    };

  if (key === "PhoneNumber")
    return {
      title: "Phone Number",
      width: 180,
      ellipsis: true,
      render: (text) => (
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            setisLeadsDetailsModalVisible(true);
            setselectedItemDetails(text);
          }}
        >
          <>
            {text?.phone_number ? (
              <span style={{ marginLeft: 10 }}>{text?.phone_number}</span>
            ) : (
              <Tag />
            )}
          </>
        </div>
      ),
      sorter: {
        compare: (a, b) => a?.key - b?.key,
        multiple: 3,
      },
    };
  if (key === "Email")
    return {
      title: "Email",
      width: 180,
      ellipsis: true,
      render: (text) => (
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            setisLeadsDetailsModalVisible(true);
            setselectedItemDetails(text);
          }}
        >
          <>
            {text?.email ? (
              <span style={{ marginLeft: 10 }}>{text?.email}</span>
            ) : (
              <Tag />
            )}
          </>
        </div>
      ),
      sorter: {
        compare: (a, b) => a?.key - b?.key,
        multiple: 3,
      },
    };
  if (key === "LeadStatus")
    return {
      title: "LeadStatus",
      width: 180,
      ellipsis: true,
      render: (text) => (
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            setisLeadsDetailsModalVisible(true);
            setselectedItemDetails(text);
          }}
        >
          <>
            {text?.email ? (
              <span style={{ marginLeft: 10 }}>{text?.lead_type}</span>
            ) : (
              <Tag />
            )}
          </>
        </div>
      ),
      sorter: {
        compare: (a, b) => a?.key - b?.key,
        multiple: 3,
      },
    };
  if (key === "Treatment")
    return {
      title: "Treatment",
      width: 130,
      ellipsis: true,
      render: (text) => (
        <div>
          <>
            {text?.treatment ? (
              <span style={{ marginLeft: 10 }}>{text?.treatment}</span>
            ) : (
              <Tag />
            )}
          </>
        </div>
      ),
      sorter: {
        compare: (a, b) => a?.key - b?.key,
        multiple: 3,
      },
    };
    if (key === "LeadType")
      return {
        title: "Lead Type",
        width: 100,
        ellipsis: true,
        render: (text) => (
          <div>
            <>
              {text?.treatment ? (
                <span style={{ marginLeft: 10 }}>{text?.lead_type}</span>
              ) : (
                <Tag />
              )}
            </>
          </div>
        ),
        sorter: {
          compare: (a, b) => a?.key - b?.key,
          multiple: 3,
        },
      };
      if (key === "FinanceScore")
        return {
          title: "Finance Score",
          width: 140,
          ellipsis: true,
          render: (text) => (
            <div>
              <>
                {text?.treatment ? (
                  <span style={{ marginLeft: 10 }}>{text?.finance_score}</span>
                ) : (
                  <Tag />
                )}
              </>
            </div>
          ),
          sorter: {
            compare: (a, b) => a?.key - b?.key,
            multiple: 3,
          },
        };

  return {
    title: key.replace(/([A-Z])/g, " $1").trim(),
    ellipsis: true,
    width:
      key === "finance_score"
        ? 140
        : key === "appointment_notes"
        ? 180
        : key === "appointment_date" || key === "appointment_time"
        ? 160
        : 150,
    render: (text) => (
      <span style={{ marginLeft: 10 }}>
        {text?.[key] === "Y"
          ? "Yes"
          : text?.[key] === "N"
          ? "No"
          : text?.[key] || <Tag />}
      </span>
    ),
    sorter: {
      compare: (a, b) => a?.key - b?.key,
      multiple: 3,
    },
  };
}
