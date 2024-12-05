import React from "react";
import { Row, Col, Card, Typography, Avatar } from "antd";
import Chart from "react-apexcharts";
import {
  ConfirmedAppointmentSVG,
  NoShowRateSVG,
  NotConfirmAppointmentSVG,
  TotalAppointmentSVG,
} from "../Common/SettingSidebarIconsSvg";
const currentYear = new Date().getFullYear();

const AppointmentsReport = () => {
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
                  icon={<TotalAppointmentSVG />}
                />
              </Col>
              <Col>
                <Typography>1938</Typography>
                <Typography className="custom-text1">
                  Total Appointments
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
                  icon={<ConfirmedAppointmentSVG />}
                />
              </Col>
              <Col>
                <Typography>861</Typography>
                <Typography className="custom-text1">
                  Confirmed Appointments
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
                  icon={<NotConfirmAppointmentSVG />}
                />
              </Col>
              <Col>
                <Typography>503</Typography>
                <Typography className="custom-text1">
                  Not confirmed Appointments
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
                  icon={<NoShowRateSVG />}
                />
              </Col>
              <Col>
                <Typography>82</Typography>
                <Typography className="custom-text1">No Show Rate</Typography>
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
                <Typography style={{ fontSize: 15 }}>
                  72% Conversion Rate
                </Typography>
                <Typography className="custom-text1">
                  From Appointments to Closed
                </Typography>
              </>
            }
          >
            <Chart
              options={{
                chart: {
                  type: "bar",
                  toolbar: {
                    show: false, // Hide the toolbar
                  },
                },
                xaxis: {
                  categories: [
                    `1 `,
                    `2 `,
                    `3 `,
                    `4 `,
                    `5 `,
                    `6 `,
                    `7 `,
                    `8 `,
                    `9 `,
                    `10 `,
                    `11 `,
                    `12 `,
                  ],
                },
                colors: ["#3900DB", "#97FFC6"],
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
                {
                  name: "Appointments booked",
                  data: [40, 50, 60, 70, 80, 90, 100],
                },
                { name: "Closed", data: [10, 20, 15, 25, 10, 20, 30] },
              ]}
              type="bar"
              height={300}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={
              <>
                <Typography style={{ fontSize: 15 }}>
                  Appointments Status
                </Typography>
                <Typography className="custom-text1">This Month</Typography>
              </>
            }
          >
            <Chart
              options={{
                labels: [
                  "Confirmed",
                  "Not confirmed",
                  "Rescheduled ",
                  "No Show",
                ],
                colors: ["#3900DB", "#2781FF", "#8FB4E8", "#D5C9F9"],
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
                          label: "868",
                          fontSize: "20px",
                          fontWeight: 600,
                          color: "#3900DB",
                          formatter: () => "Appointments ",
                        },
                      },
                    },
                  },
                },
              }}
              series={[25, 25, 25, 25]}
              type="donut"
              height={315}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={8}>
          <Card
            title={
              <>
                <Typography style={{ fontSize: 15 }}>
                  72 Canceled Appointments
                </Typography>
                <Typography className="custom-text1">
                  2% of your appointments are canceled
                </Typography>
              </>
            }
          >
            <Chart
              options={{
                chart: {
                  type: "area",
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
                colors: ["#3900DB", "#D5C9F9"],
                dataLabels: {
                  enabled: false,
                },
                yaxis: {
                  show: false, // Hide the y-axis
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
        <Col span={8}>
          <Card
            title={
              <>
                <Typography style={{ fontSize: 15 }}>
                  Lead Source Performance
                </Typography>
                <Typography className="custom-text1">
                  Appointment booking channels.
                </Typography>
              </>
            }
          >
            <Chart
              options={{
                labels: ["Google", "Meta", "other"],
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
                          label: "3",
                          fontSize: "20px",
                          fontWeight: 600,
                          color: "#3900DB",
                          formatter: () => "Sources",
                        },
                      },
                    },
                  },
                },
                colors: ["#3900DB", "#2781FF", "#8FB4E8"],
                legend: {
                  position: "bottom",
                },
              }}
              series={[25, 25, 50]}
              type="donut"
              height={315}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={
              <>
                <Typography style={{ fontSize: 15 }}>
                  15 No-Show Appointments
                </Typography>
                <Typography className="custom-text1">
                  12% of your appointments were no-shows.
                </Typography>
              </>
            }
          >
            <Chart
              options={{
                chart: {
                  type: "area",
                  toolbar: {
                    show: false, // Hide the toolbar
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
                  show: false, // Hide the x-axis
                },
                yaxis: {
                  show: false, // Hide the y-axis
                },
                colors: ["#00DB8F", "#EFCE6A"],
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "straight",
                },
                grid: {
                  show: false, // Optional: Hides grid lines for a cleaner look
                },
              }}
              series={[
                { name: "Booked Appointments", data: [50, 70, 80, 90, 60, 50] },
                { name: "No Show", data: [10, 30, 80, 50, 90, 50] },
              ]}
              type="area"
              height={300}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AppointmentsReport;
