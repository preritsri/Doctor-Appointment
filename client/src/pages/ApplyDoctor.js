import Layout from './../components/Layout'
import React from 'react'
import {Col, Form,Input, Row, TimePicker, message } from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import moment from "moment";

const ApplyDoctor = () => {

    const {user}=useSelector(state=>state.user)

     const navigate=useNavigate()
     //handle form
     const handleFinish=async (values)=>{
       try{
            console.log(values)
            const res=await axios.post('/api/v1/user/apply-doctor',{...values,userId: user._id,timings: [
                moment(values.timings[0]).format("HH:mm"),
                moment(values.timings[1]).format("HH:mm"),
              ]},{
             headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
        }})
        //console.log('happyyyyyyyy')
        if(res.data.success){
            message.success(res.data.success)
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




  return (
   <Layout>
      <h1 className='text-center'>Apply Doctor</h1>
      <Form layout='vertical' onFinish={handleFinish} className='m-30'>
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
            <Form.Item
                label="Timings"
                name="timings"
                required
                rules={[{required: true}]}
            >
            <TimePicker.RangePicker format={"HH:mm"}></TimePicker.RangePicker>
            </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={8}></Col>
        <Col xs={24} md={24} lg={8}>
            <button className='btn btn-primary' type='submit'>
                Submit
            </button>
        </Col>
       </Row> 
    </Form>
     </Layout>
  )
  }

export default ApplyDoctor
