import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import ForgotPassword from "../Authentication/ForgotPassword";
import VerifyOtp from "../Authentication/VerifyOtp";
import ResetPassword from "../Authentication/ResetPassword";
import SetPassword from "../Authentication/SetPassword";
import Leads from "../Leads";
import "./Auth.css";
import { Button, Result } from "antd";
const CRMRoute = () => {
  const navigate = useNavigate();
  const [userEmailId, setuserEmailId] = useState();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login userEmailId={userEmailId} setuserEmailId={setuserEmailId} />
        }
      />
      <Route
        path="/login"
        element={
          <Login userEmailId={userEmailId} setuserEmailId={setuserEmailId} />
        }
      />
      <Route
        path="/set-password/:token"
        element={
          <SetPassword
            userEmailId={userEmailId}
            setuserEmailId={setuserEmailId}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <Signup userEmailId={userEmailId} setuserEmailId={setuserEmailId} />
        }
      />
      <Route
        path="/forgot-password"
        element={
          <ForgotPassword
            userEmailId={userEmailId}
            setuserEmailId={setuserEmailId}
          />
        }
      />
      <Route
        path="/verify-otp"
        element={
          <VerifyOtp
            userEmailId={userEmailId}
            setuserEmailId={setuserEmailId}
          />
        }
      />
      <Route
        path="/reset-password"
        element={
          <ResetPassword
            userEmailId={userEmailId}
            setuserEmailId={setuserEmailId}
          />
        }
      />

      {/* Below url comes in auth token without auth token redirect to login page */}
      {localStorage?.getItem("authToken") ? (
        <>
          <Route
            path="/dashboard"
            element={
              <Leads
                userEmailId={userEmailId}
                setuserEmailId={setuserEmailId}
              />
            }
          />
        </>
      ) : (
        <>
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
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back Home
                </Button>
              }
            />
            }
          />
        
        </>
      )}
    </Routes>
  );
};

export default CRMRoute;
