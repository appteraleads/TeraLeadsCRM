import React from "react";
import { Avatar, Steps, Typography, Space, Row, Divider, Empty } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const { Step } = Steps;
const { Text } = Typography;

const EmailChatUI = ({
  selectedLead,
  emailConversationsListData,
  getInitials,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {emailConversationsListData?.length > 0 ? (
        <Steps direction="vertical">
          {emailConversationsListData?.map((step, index) => (
            <Step
              key={index}
              title={
                <div style={{ lineHeight: 1 }}>
                  <Typography style={{fontWeight:600 }}>
                    {selectedLead.first_name + " " + selectedLead.last_name}
                  </Typography>
                  <Row>
                    <Space>
                      <div className="custom-text1" style={{fontSize:14}}>{step?.from}</div>
                      <Divider type="vertical"  style={{margin:0}}/>
                      <div className="custom-text1" style={{fontSize:14}}>
                        {dayjs(step.received_at)?.format("MMM DD, YYYY hh:mm A")}
                      </div>
                    </Space>
                  </Row>
                </div>
              }
              description={
                <>
                  <div>
                    <Typography style={{ marginBottom: 15, marginTop: 15,fontWeight:600 }}>
                      Subject: {step.subject}
                    </Typography>
                    <Text style={{ whiteSpace: 'pre-line' }}>{step.message}</Text>
                    <div>
                      {step.attachment && (
                        <>
                          <DownloadOutlined
                            style={{
                              fontSize: 16,
                              color: "#1a73e8",
                              marginRight: 8,
                            }}
                          />
                          <Text>{step.attachment.name}</Text>
                          <Text type="secondary" style={{ marginLeft: 8 }}>
                            {step.attachment.size}
                          </Text>
                        </>
                      )}
                    </div>
                  </div>
                </>
              }
              icon={
                <Avatar  style={{ backgroundColor:selectedLead?.avatar_color }}>
                  {getInitials(
                    selectedLead.first_name + " " + selectedLead.last_name
                  )}
                </Avatar>
              }
            />
          ))}
        </Steps>
      ) : (
        <>
          {" "}
          <Empty description="No email available" />
        </>
      )}
    </div>
  );
};

export default EmailChatUI;
