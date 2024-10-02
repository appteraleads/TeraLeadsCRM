import React from 'react';
import { Form, Input, Button, message ,Row,Col,Image} from 'antd';
import TeraLogo from '../assets/logo/teraleadslogo.jpg'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate} from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();
  

  const onFinish = (values) => {
    
   
    setTimeout(() => {
     
      message.success('Password reset successfully');
      navigate('/login')
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
      <Button   icon={<FaArrowLeft/>} style={{marginBottom:'10px'}} onClick={()=>{navigate('/login')}}>
            Back
        </Button>
        <h2>Create a New Password</h2>
        <p className="custom-text1">Set your new password to regain access to your account.</p>
       
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
            <Form.Item
            name="password"
            label="Password"
            rules={[{ message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item
            name="confirmpassword"
            label="Repeat Password"
            rules={[{ message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button className="custom-primary-button" htmlType="submit" block>
              Reset
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

export default ResetPassword;
