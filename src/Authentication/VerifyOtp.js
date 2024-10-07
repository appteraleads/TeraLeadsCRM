import React, { useState ,useEffect} from "react";
import { Form, Input, Button, message ,Row,Col,Image, Typography,notification} from 'antd';
import TeraLogo from '../assets/logo/teraleadslogo.jpg'
import { FaArrowLeft } from "react-icons/fa";
import {  useNavigate} from "react-router-dom";
import axios from 'axios';
const VerifyOtp = ({userEmailId,setuserEmailId}) => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(50);
  const [isTimeOver, setIsTimeOver] = useState(false); 
  const [otp,setotp]=useState()
  const [form] = Form.useForm();
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const openNotificationWithIcon = (type,messageType,message) => {
    api[type]({
      message: messageType,
      description:message,
    });
  };


  const reSendOtp= ()=>{
    let data={
      email:userEmailId
    }
    axios
    .post('http://localhost:8080/api/v1/auth/send-otp', data)
    .then((res) => {
      openNotificationWithIcon('success','Success',res?.data?.message)
   
    })
    .catch((err) => {
      console.log(err);
    openNotificationWithIcon('error','Error',err?.message)
    });
  }
  const onFinish = () => {
    let data={
      email:userEmailId,
      otp:otp
    }
    axios
    .post('http://localhost:8080/api/v1/auth/verify-otp',data )
    .then((res) => {
      openNotificationWithIcon('success','Success','OTP verified successfully')
      navigate('/reset-password')
    })
    .catch((err) => {
      console.log(err);
      openNotificationWithIcon('error','Error',err?.response?.data?.message || err?.message)
    });


  };

  
  useEffect(() => {
    // If both minutes and seconds are zero, stop the timer
    if (minutes === 0 && seconds === 0) {
      setIsTimeOver(true);return};

    // Set an interval to update the timer every second
    const timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(timerInterval);
  }, [minutes, seconds]); 

  return (
    <>{contextHolder}
    <Row>
    <Col span={24} md={12}>
    <Row justify="start">
      <Image style={{ margin: 35 }} width={100} src={TeraLogo} />
    </Row>
    <div className="login-container-left">
      <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Button   icon={<FaArrowLeft/>} style={{marginBottom:'10px'}} onClick={()=>{navigate('/forgot-password')}}>
            Back
        </Button>
        <h2>Check Your Inbox!</h2>
        <p className="custom-text1">We’ve sent the reset code to {userEmailId}. Enter the code to continue. </p>
        
        <Form
          name="verify otp"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item>
            <Input.OTP onChange={(e)=>{setotp(e)}} name="otp" size="large" length={4} />
          </Form.Item>
          <Form.Item>
          
            <Typography >Didn’t get the code?  {isTimeOver?<span  onClick={()=>{reSendOtp()}} className="custom-text-link" >Resend </span>:<>Wait {formatTime(minutes)}:{formatTime(seconds)}</>} </Typography>
          </Form.Item>
          <Form.Item>
            <Button className="custom-primary-button" htmlType="submit" block>
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    <div className="auth-custom-footer">
      <Row className="auth-footer-content">
        <Col span={11} className="footer-col" style={{marginLeft:15}}>
          <p className="custom-text1">All rights reserved Teraleads 2024</p>
        </Col>
        <Col className="footer-links footer-col" span={12} style={{ display: 'flex',justifyContent:'end'}}>
          <a className="custom-text1" href="/terms" style={{marginRight:10}}><p>Terms & Conditions</p></a>
          <a className="custom-text1" href="/privacy"><p>Privacy Policy</p></a>
        </Col>
      </Row>
    </div>
  </Col>
        <Col span={12}  className='container-right'> 
            
        </Col>
    </Row>
    </>

  );
};

export default VerifyOtp;
