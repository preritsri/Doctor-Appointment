import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message, initialValues } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";


const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  // update doc ==========
  //handle form
  const handleFinish=async (values)=>{
    try{
         console.log(values)
         const res=await axios.post('/api/v1/doctor/updateProfile',{...values,userId: user._id,
          timings:[
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm")
          ]
        },{
          headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
     }})
     //console.log('happyyyyyyyy')
     if(res.data.success){
         message.success(res.data.message)
         navigate('/')
     } 
     else{
         message.error(res.data.success)
     }
  }
 catch(error){
        console.log(error)
        message.error('Something went wrong!')
}
}

  // update doc ==========


  //getDOc Details
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form layout='vertical' onFinish={handleFinish} className='m-30' initialValues={{
          ...doctor,
          timings: [
            moment(doctor.timings[0], "HH:mm"),
            moment(doctor.timings[1], "HH:mm"),
          ],
        }}>
        <h6 className=''>Personal Details: </h6>
        <Row gutter={20}>
         <Col xs={24} md={24} lg={8}>
             <Form.Item
                 label="First Name"
                 name="firstName"
                 required
                 rules={[{required: true}]}
             >
             <Input type="text"></Input>
             </Form.Item>
             </Col>
         <Col xs={24} md={24} lg={8}>
             <Form.Item
                 label="Last Name"
                 name="lastName"
                 required
                 rules={[{required: true}]}
             >
             <Input type="text"></Input>
             </Form.Item>
             </Col>
         <Col xs={24} md={24} lg={8}>
             <Form.Item
                 label="Phone No"
                 name="phone"
                 required
                 rules={[{required: true}]}
             >
             <Input type="text" ></Input>
             </Form.Item>
         </Col>
         <Col xs={24} md={24} lg={8}>
             <Form.Item
                 label="E-Mail"
                 name="email"
                 required
                 rules={[{required: true}]}
             >
             <Input type="text"></Input>
             </Form.Item>
         </Col>
         <Col xs={24} md={24} lg={8}>
             <Form.Item
                 label="Website"
                 name="website"
                 required
                 rules={[{required: true}]}
             >
             <Input type="text"></Input>
             </Form.Item>
         </Col>
         <Col xs={24} md={24} lg={8}>
             <Form.Item
                 label="Address"
                 name="address"
                 required
                 rules={[{required: true}]}
             >
             <Input type="text"></Input>
             </Form.Item>
         </Col>
        </Row>
        
        <h6 className=''>Professional Details: </h6>
        <Row gutter={20}>
         <Col xs={24} md={24} lg={8}>
             <Form.Item
                 label="Specialization"
                 name="specialization"
                 required
                 rules={[{required: true}]}
             >
             <Input type="text"></Input>
             </Form.Item>
         </Col>
         <Col xs={24} md={24} lg={8}>
             <Form.Item
                 label="Experience"
                 name="experience"
                 required
                 rules={[{required: true}]}
             >
             <Input type="text"></Input>
             </Form.Item>
             </Col>
         <Col xs={24} md={24} lg={8}>
             <Form.Item
                 label="Fees"
                 name="fees"
                 required
                 rules={[{required: true}]}
             >
             <Input type="text" ></Input>
             </Form.Item>
         </Col>
         <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timings" name="timings" required>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
         <Col xs={24} md={24} lg={8}></Col>
         <Col xs={24} md={24} lg={8}>
             <button className='btn btn-primary' type='submit'>
                 Update
             </button>
         </Col>
        </Row> 
     </Form>
      )}
    </Layout>
  );
};

export default Profile;