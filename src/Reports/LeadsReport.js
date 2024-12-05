import React from "react";
import { Row, Col, Card, Typography, Avatar } from "antd";
import Chart from "react-apexcharts";
import {
  ClosedLeadSVG,
  LeadInProgressSVG,
  LostLeadSVG,
  UserReportSVG,
} from "../Common/SettingSidebarIconsSvg";
const currentYear = new Date().getFullYear();

const LeadsReport = () => {
  return (
    <div style={{ maxHeight: "80vh", overflow: "auto", padding: 20 }}>
      {/* Top Metrics */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card className="custom-report-card ">
            <Row gutter={[6, 6]}>
              <Col>
                <Avatar
                  size={45}
                  style={{ background: "#EFEEFF" }}
                  icon={<UserReportSVG />}
                />
              </Col>
              <Col>
                <Typography>1938</Typography>
                <Typography className="custom-text1">Total Leads</Typography>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-report-card ">
            <Row gutter={[6, 6]}>
              <Col>
                <Avatar
                  size={45}
                  style={{ background: "#EFEEFF" }}
                  icon={<LeadInProgressSVG />}
                />
              </Col>
              <Col>
                <Typography>861</Typography>
                <Typography className="custom-text1">
                  Leads in Progress
                </Typography>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-report-card ">
            <Row gutter={[6, 6]}>
              <Col>
                <Avatar
                  size={45}
                  style={{ background: "#EFEEFF" }}
                  icon={<ClosedLeadSVG />}
                />
              </Col>
              <Col>
                <Typography>503</Typography>
                <Typography className="custom-text1">Closed Leads</Typography>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-report-card ">
            <Row gutter={[6, 6]}>
              <Col>
                <Avatar
                  size={45}
                  style={{ background: "#EFEEFF" }}
                  icon={<LostLeadSVG />}
                />
              </Col>
              <Col>
                <Typography>82</Typography>
                <Typography className="custom-text1">Lost Leads</Typography>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Main Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card
            title={
              <>
                <Typography style={{ fontSize: 15 }}>Leads Details</Typography>
                <Typography className="custom-text1">This Month</Typography>
              </>
            }
          >
            <Chart
              options={{
                labels: [
                  "Total Leads",
                  "Leads in Progress",
                  "Closed Leads",
                  "Lost Leads",
                ],
                dataLabels: {
                  enabled: false,
                },
                plotOptions: {
                  pie: {
                    donut: {
                      size: "65%",
                      labels: {
                        show: true,
                        total: {
                          show: true,
                          label: "333",
                          fontSize: "20px",
                          fontWeight: 600,
                          color: "#3900DB",
                          formatter: () => "Leads",
                        },
                      },
                    },
                  },
                },
                colors: ["#3900DB", "#2781FF", "#8FB4E8", "#D5C9F9"],
                legend: {
                  position: "bottom",
                },
              }}
              series={[25, 25, 25, 25]}
              type="donut"
              height={315}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={
              <>
                <Typography style={{ fontSize: 15 }}>
                  Leads By Status
                </Typography>
                <Typography className="custom-text1">This Month</Typography>
              </>
            }
          >
            <Chart
              options={{
                labels: [
                  "Lead",
                  "Appointment",
                  "No Show",
                  "No Money",
                  "Can't Reach",
                  "Undecided",
                ],
                dataLabels: {
                  enabled: false,
                },
                plotOptions: {
                  pie: {
                    donut: {
                      size: "65%",
                      labels: {
                        show: true,
                        total: {
                          show: true,
                          label: "927 Leads",
                          fontSize: "20px",
                          fontWeight: 600,
                          color: "#3900DB",
                          formatter: () => "11 Status",
                        },
                      },
                    },
                  },
                },
              }}
              series={[30, 25, 20, 10, 5, 10]}
              type="donut"
              height={315}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card
            title={
              <>
                <Typography style={{ fontSize: 15 }}>
                  917 Lead Asked for Financing
                </Typography>
                <Typography className="custom-text1">
                  61% of your leads
                </Typography>
              </>
            }
          >
            <Chart
              options={{
                chart: {
                  type: "line",
                  toolbar: {
                    show: false,
                  },
                },

                xaxis: {
                  categories: [
                    `Jan ${currentYear}`,
                    `Feb ${currentYear}`,
                    `Mar ${currentYear}`,
                    `Apr ${currentYear}`,
                    `May ${currentYear}`,
                    `Jun ${currentYear}`,
                    `Jul ${currentYear}`,
                    `Aug ${currentYear}`,
                    `Sep ${currentYear}`,
                    `Oct ${currentYear}`,
                    `Nov ${currentYear}`,
                    `Dec ${currentYear}`,
                  ],
                },
                yaxis: {
                  show: false, // Hide the y-axis
                },
                colors: ["#3900DB", "#D5C9F9"],
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "straight",
                },
              }}
              series={[
                { name: "Asked For Financing", data: [50, 70, 80, 90, 60, 50] },
                { name: "No Financing", data: [10, 30, 80, 50, 90, 50] },
              ]}
              type="area"
              height={300}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={
              <>
                <Typography style={{ fontSize: 15 }}>
                  1692 Verified Leads
                </Typography>
                <Typography className="custom-text1">
                  88% of your leads are Verified
                </Typography>
              </>
            }
          >
            <Chart
              options={{
                chart: {
                  type: "line",
                  toolbar: {
                    show: false,
                  },
                },

                xaxis: {
                  categories: [
                    `Jan ${currentYear}`,
                    `Feb ${currentYear}`,
                    `Mar ${currentYear}`,
                    `Apr ${currentYear}`,
                    `May ${currentYear}`,
                    `Jun ${currentYear}`,
                    `Jul ${currentYear}`,
                    `Aug ${currentYear}`,
                    `Sep ${currentYear}`,
                    `Oct ${currentYear}`,
                    `Nov ${currentYear}`,
                    `Dec ${currentYear}`,
                  ],
                },
                yaxis: {
                  show: false, // Hide the y-axis
                },
                colors: ["#00DB8F", "#EF6A6A"],
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "straight",
                },
              }}
              series={[
                { name: "Verified", data: [50, 70, 80, 90, 60, 50] },
                { name: "Not Verified", data: [10, 30, 80, 50, 90, 50] },
              ]}
              type="area"
              height={300}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card
            title={
              <>
                <Typography style={{ fontSize: 15 }}>Credit Score</Typography>
                <Typography className="custom-text1">
                  Over 650 vs below 650
                </Typography>
              </>
            }
          >
            <Chart
              options={{
                chart: {
                  type: "bar",
                  toolbar: {
                    show: false,
                  },
                },
                xaxis: {
                  categories: [
                    `Jan `,
                    `Feb `,
                    `Mar `,
                    `Apr `,
                    `May `,
                    `Jun `,
                    `Jul `,
                    `Aug `,
                    `Sep `,
                    `Oct `,
                    `Nov `,
                    `Dec `,
                  ],
                },

                colors: ["#3900DB", "#F6D3FF"],
                stroke: {
                  show: true,
                  width: 2,
                  colors: ["transparent"],
                },
                dataLabels: {
                  enabled: false,
                },
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    borderRadius: 5,
                    borderRadiusApplication: "end",
                  },
                },
                legend: {
                  position: "top", // Place the legend at the top
                  horizontalAlign: "right", // Align it to the left
                },
              }}
              series={[
                { name: "Appointments", data: [40, 50, 60, 70, 80, 90, 100] },
                { name: "No Show", data: [10, 20, 15, 25, 10, 20, 30] },
              ]}
              type="bar"
              height={300}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LeadsReport;
