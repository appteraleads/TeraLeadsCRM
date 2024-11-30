import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import ForgotPassword from "../Authentication/ForgotPassword";
import VerifyOtp from "../Authentication/VerifyOtp";
import ResetPassword from "../Authentication/ResetPassword";
import SetPassword from "../Authentication/SetPassword";
import "./Auth.css";
import { Row, Col, Image, Button, Result } from "antd";
import TeraLogo from "../assets/logo/teraleadslogo.jpg";
import CustomLayout from "../Layout";
const AuthRoute = () => {
  const [userEmailId, setuserEmailId] = useState();

  const RouteComponent = ({ ChildComponent }) => {
    return (
      <Row>
        <Col
          span={24}
          md={12}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Image style={{ margin: 35 }} width={100} src={TeraLogo} />
          </div>
          {ChildComponent}
          <div>
            <Row>
              <Col span={11} className="footer-col" style={{ marginLeft: 15 }}>
                <p className="custom-text1">
                  All rights reserved Teraleads 2024
                </p>
              </Col>
              <Col
                className="footer-links footer-col"
                span={12}
                style={{ display: "flex", justifyContent: "end" }}
              >
                <a
                  className="custom-text1"
                  href="/terms"
                  style={{ marginRight: 10 }}
                >
                  <p>Terms & Conditions</p>
                </a>
                <a className="custom-text1" href="/privacy">
                  <p>Privacy Policy</p>
                </a>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24} md={12} className="container-right"></Col>
      </Row>
    );
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RouteComponent
              ChildComponent={
                <Login
                  userEmailId={userEmailId}
                  setuserEmailId={setuserEmailId}
                />
              }
            />
          }
        />

        <Route
          path="/login"
          element={
            <RouteComponent
              ChildComponent={
                <Login
                  userEmailId={userEmailId}
                  setuserEmailId={setuserEmailId}
                />
              }
            />
          }
        />

        <Route
          path="/set-password/:token"
          element={
            <RouteComponent
              ChildComponent={
                <SetPassword
                  userEmailId={userEmailId}
                  setuserEmailId={setuserEmailId}
                />
              }
            />
          }
        />

        <Route
          path="/signup"
          element={
            <RouteComponent
              ChildComponent={
                <Signup
                  userEmailId={userEmailId}
                  setuserEmailId={setuserEmailId}
                />
              }
            />
          }
        />

        <Route
          path="/forgot-password"
          element={
            <RouteComponent
              ChildComponent={
                <ForgotPassword
                  userEmailId={userEmailId}
                  setuserEmailId={setuserEmailId}
                />
              }
            />
          }
        />

        <Route
          path="/verify-otp"
          element={
            <RouteComponent
              ChildComponent={
                <VerifyOtp
                  userEmailId={userEmailId}
                  setuserEmailId={setuserEmailId}
                />
              }
            />
          }
        />

        <Route
          path="/reset-password"
          element={
            <RouteComponent
              ChildComponent={
                <ResetPassword
                  userEmailId={userEmailId}
                  setuserEmailId={setuserEmailId}
                />
              }
            />
          }
        />

        <Route
          path="/leads"
          element={
            <CustomLayout
              userEmailId={userEmailId}
              setuserEmailId={setuserEmailId}
            />
          }
        />
        <Route
          path="/conversations"
          element={
            <CustomLayout
              userEmailId={userEmailId}
              setuserEmailId={setuserEmailId}
            />
          }
        />
        <Route
          path="/appointments"
          element={
            <CustomLayout
              userEmailId={userEmailId}
              setuserEmailId={setuserEmailId}
            />
          }
        />
         <Route
          path="/settings"
          element={
            <CustomLayout
              userEmailId={userEmailId}
              setuserEmailId={setuserEmailId}
            />
          }
        />
        <Route
          path="*"
          element={
            <Result
              status="403"
              title="403"
              subTitle="Sorry, you are not authorized to access this page."
              extra={
                <Button
                  type="primary"
                  onClick={() => window.location.replace("/")}
                >
                  Back Home
                </Button>
              }
            />
          }
        />
      </Routes>
    </>
  );
};

export default AuthRoute;
