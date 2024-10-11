// src/Layout.js

import React from "react";
import { Layout, Menu, Row, Col } from "antd";
// Import Ant Design styles

const { Header, Content, Footer } = Layout;

const LayoutComponent = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#4CAF50", color: "white" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">About</Menu.Item>
          <Menu.Item key="3">Contact</Menu.Item>
        </Menu>
      </Header>
      <Layout style={{ flex: 1 }}>
        <Content style={{ padding: "20px", paddingBottom: "60px" }}>
          {" "}
          {/* Added paddingBottom for footer space */}
          <Row gutter={16}>
            <Col span={8} style={{ background: "#f4f4f4", padding: "20px" }}>
              <h2>Sidebar Content</h2>
              <p>This is the left side content area.</p>
              <Footer
                style={{
                  position: "fixed", // Fix the footer at the bottom
                  left: 0,
                  bottom: 0,
                  right: 0,
                  textAlign: "center",
                  background: "#4CAF50",
                  color: "white",
                  zIndex:1
                }}
              >
                Footer Content © 2024
              </Footer>
            </Col>
            <Col span={16} style={{ padding: "20px" }}>
              <h2>Right Side Content</h2>
              <p>This area can have a background image or color.</p>
              <div
                style={{
                  background:
                    "url(https://via.placeholder.com/800) no-repeat center center",
                  backgroundSize: "cover",
                  height: "300px",
                  marginTop: "20px",
                }}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
