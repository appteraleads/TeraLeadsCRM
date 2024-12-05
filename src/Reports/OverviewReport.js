import React from "react";
import { Row, Col, Card, Typography, Avatar, Progress, List } from "antd";
import Chart from "react-apexcharts";
import {
  MoneyCircle,
  ReportGoalSVG,
  RevenueMonthSVG,
  UserReportSVG,
} from "../Common/SettingSidebarIconsSvg";
import { FaArrowRightLong } from "react-icons/fa6";
const currentYear = new Date().getFullYear();

const data = [
  "Permanent Zirconia Teeth Single Arch",
  "4 implant Denture Lower",
  "Permanent Zirconia Teeth Double Arch",
  "4 Implant Denture Upper",
  "Permanent PMMA Teeth Single Arch",
  "Implant + Crown",
  "4 Implant Denture Upper",
  "Permanent PMMA Teeth Single Arch",
  "Implant + Crown",
];
const OverviewReport = () => {
  return (
    <div style={{ maxHeight: "80vh", overflow: "auto", padding: 20 }}>
      {/* Top Metrics */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card className="custom-report-card ">
            <Row gutter={[6, 6]}>
              <Col>
                <Avatar
                  size={40}
                  style={{ background: "#EFEEFF" }}
                  icon={<RevenueMonthSVG />}
                />
              </Col>
              <Col>
                <Typography>$1,424,399</Typography>
                <Typography className="custom-text1">
                  Revenue This Month
                </Typography>
              </Col>
            </Row>

            <Chart
              options={{
                chart: { type: "area", sparkline: { enabled: true } },
                xaxis: { categories: ["Week 1", "Week 2", "Week 3", "Week 4"] },
                colors: ["#3900DB"],
                stroke: {
                  curve: "straight",
                },
              }}
              series={[{ name: "Revenue", data: [1000, 500, 1400, 1600] }]}
              type="area"
              height={60}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-report-card ">
            <Row gutter={[6, 6]}>
              <Col>
                <Avatar
                  size={40}
                  style={{ background: "#EFEEFF" }}
                  icon={<UserReportSVG />}
                />
              </Col>
              <Col>
                <Typography>$1,424,399</Typography>
                <Typography className="custom-text1">
                  32 Active Leads this month
                </Typography>
              </Col>
            </Row>

            <Chart
              options={{
                chart: { type: "area", sparkline: { enabled: true } },
                xaxis: { categories: ["Week 1", "Week 2", "Week 3", "Week 4"] },
                colors: ["#3900DB"],
                stroke: {
                  curve: "straight",
                },
              }}
              series={[{ name: "Revenue", data: [1000, 500, 1400, 1600] }]}
              type="area"
              height={60}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-report-card ">
            <Row gutter={[6, 6]}>
              <Col>
                <Avatar
                  size={40}
                  style={{ background: "#EFEEFF" }}
                  icon={<MoneyCircle />}
                />
              </Col>
              <Col>
                <Typography>$1,424,399</Typography>
                <Typography className="custom-text1">ROI this month</Typography>
              </Col>
            </Row>

            <Chart
              options={{
                chart: { type: "area", sparkline: { enabled: true } },
                xaxis: { categories: ["Week 1", "Week 2", "Week 3", "Week 4"] },
                colors: ["#3900DB"],
                stroke: {
                  curve: "straight",
                },
              }}
              series={[{ name: "Revenue", data: [1000, 500, 1400, 1600] }]}
              type="area"
              height={60}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-report-card ">
            <Row gutter={[6, 6]}>
              <Col>
                <Avatar
                  size={40}
                  style={{ background: "#EFEEFF" }}
                  icon={<ReportGoalSVG />}
                />
              </Col>
              <Col>
                <Typography>$1,424,399</Typography>
                <Typography className="custom-text1">Monthly Goal</Typography>
              </Col>
            </Row>

            <div style={{ marginTop: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography className="custom-text1">
                  Current: $1,424,399
                </Typography>
                <Typography>28.49%</Typography>
              </div>

              <Progress
                strokeColor="#3900DB"
                percentPosition={{ align: "center", type: "none" }}
                percent={50}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card
            title={
              <>
                <Typography style={{ fontSize: 15 }}>Leads</Typography>
                <Typography className="custom-text1">
                  Total Number of Leads Per Month
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
                dataLabels: {
                  enabled: false,
                },
                colors: ["#3900DB"],
                stroke: {
                  curve: "straight",
                },
              }}
              series={[{ name: "Leads", data: [50, 70, 80, 90, 60, 50] }]}
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
                  928 Appointments This Month
                </Typography>
                <Typography className="custom-text1">This Month</Typography>
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

      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card
            title={
              <>
                <Typography style={{ fontSize: 15 }}>
                  Active Deals by lead status
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
                          label: "$232,393",
                          fontSize: "20px",
                          fontWeight: 600,
                          color: "#3900DB",
                          formatter: () => "32 Active Leads",
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
        <Col span={12}>
          <Card
            title={
              <>
                <Typography style={{ fontSize: 15 }}>
                  ROI (Revenue vs Marketing Budget)
                </Typography>
                <Typography className="custom-text1">
                  43% vs. last month
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
                colors: ["#00DB8F", "#EF6A6A"],
                stroke: {
                  show: true,
                  width: 2,
                  colors: ["transparent"],
                },
                legend: {
                  position: "top", // Place the legend at the top
                  horizontalAlign: "right", // Align it to the left
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
              }}
              series={[
                { name: "Revenue", data: [50, 60, 70, 80, 90, 100] },
                { name: "Marketing Budget", data: [20, 30, 40, 50, 60, 70] },
              ]}
              type="bar"
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
                <Typography style={{ fontSize: 15 }}>Top Treatments</Typography>
                <Typography className="custom-text1">This Month</Typography>
              </>
            }
          >
            <List
              style={{ height: "35vh", overflow: "auto" }}
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%", // Ensure full width
                    }}
                  >
                    <div>
                      <Typography.Text>{index + 1} :</Typography.Text> {item}
                    </div>
                    <div>
                      <Typography className="custom-text1" style={{display:'flex',alignItems:'center',cursor:'pointer'}}>
                        321 Leads <FaArrowRightLong style={{marginLeft:10}}/>
                      </Typography>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={
              <>
                <Typography style={{ fontSize: 15 }}>
                  Abandoned Forms
                </Typography>
                <Typography className="custom-text1">
                  21% of your leads abandoned forms
                </Typography>
              </>
            }
          >
            <Chart
              options={{
                labels: ["Abandoned Forms", "Leads"],
                colors: ["#3900DB", "#D5C9F9"],
                legend: {
                  position: "bottom",
                },
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
                          label: "76",
                          fontSize: "20px",
                          fontWeight: 600,
                          color: "#3900DB",
                          formatter: () => "Leads",
                        },
                      },
                    },
                  },
                },
              }}
              series={[24, 76]}
              type="donut"
              height={280}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OverviewReport;
