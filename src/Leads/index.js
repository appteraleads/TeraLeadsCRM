// src/App.js

import React from 'react';
import { Layout,theme, Menu, Table, Row, Col, Card, Statistic ,Image,Divider} from "antd";
import {

  PhoneOutlined,
  FormOutlined,
  
} from "@ant-design/icons";

import TeraleadsLogo from '../assets/logo/TeraleadsRemoveBg.png'
const { Header, Sider, Content } = Layout;

const leadsData = [
  {
    key: "1",
    name: "James Smith",
    phone: "(212) 555-1234",
    status: "Appointment",
    assigned: "Adam Taimish",
    type: "Call_Lead",
  },
  // Add more lead data here
];

const items = [
    
    {
        key: 'Home',
        label: 'Home',
        type: 'group',
        children: [
          {
            key: '1',
            label: 'Dashboard',
          },
          {
            key: '2',
            label: 'Appointments',
          },
          {
            key: '3',
            label: 'Reports',
          },
        ],
      },
      {
        key: 'grp',
        label: 'Group',
        type: 'group',
        children: [
          {
            key: '4',
            label: 'Leads',
          },
          {
            key: '5',
            label: 'Calls',
          },
          {
            key: '6',
            label: 'Conversations',
          },
        ],
      },
    
  ];
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Lead Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Assigned",
    dataIndex: "assigned",
    key: "assigned",
  },
  {
    title: "Lead Type",
    dataIndex: "type",
    key: "type",
    render: (type) => (
      <>
        {type === "Call_Lead" ? <PhoneOutlined /> : <FormOutlined />} {type}
      </>
    ),
  },
];

const Leads = () => {
    const {token: { colorBgContainer }} = theme.useToken();
    const onClick = (e) => {
        console.log('click ', e);
    };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={230} style={{
            background: colorBgContainer,            
          }} >
        <div  style={{ padding: "10px", color: "white" }}>
          <Image style={{ margin: 10 }} width={100} src={TeraleadsLogo} />
        </div>
        <Divider style={{margin:0,background:'#E8EBEF'}}/>
        <Menu
      onClick={onClick}
          
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
      style={{padding:10}}
    />
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0, background: "#fff" }}
        />
        <Content style={{ padding: "0 24px 24px" }}>
          <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
            <Col span={6}>
              <Card>
                <Statistic title="Leads" value="36 Leads" suffix="last 30 days" />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Appointments" value="10" suffix="Booked" />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Closed Leads" value="5" suffix="Closed" />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Revenue"
                  value="$140,330.00"
                  suffix={<span style={{ color: "green" }}>↑ 5%</span>}
                />
              </Card>
            </Col>
          </Row>
          <Table
            style={{ marginTop: "20px" }}
            columns={columns}
            dataSource={leadsData}
            pagination={{ pageSize: 15 }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Leads;
