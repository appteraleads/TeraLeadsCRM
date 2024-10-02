import React from 'react';
import { Form, Input, Button, message ,Row,Col,Image, Typography} from 'antd';
import TeraLogo from '../assets/logo/teraleadslogo.jpg'
import { FaArrowLeft } from "react-icons/fa";
import {  useNavigate} from "react-router-dom";
const VerifyOtp = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
  
   
    setTimeout(() => {
     
      message.success('OTP verified successfully');
      navigate('/reset-password')
    }, 1500);
  };

  return (
    <>
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
        <p className="custom-text1">We’ve sent the reset code to hi@teraleads.com. Enter the code to continue. </p>
        
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item>
            <Input.OTP  size="large" length={4} />
           
          </Form.Item>
          <Form.Item>
            
            <Typography >Didn’t get the code? wait 01:23</Typography>
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
        <Col span={7} className="footer-col" style={{marginLeft:15}}>
          <p className="custom-text1">All rights reserved Teraleads 2024</p>
        </Col>
        <Col className="footer-links footer-col" span={12} style={{ display: 'flex'}}>
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
