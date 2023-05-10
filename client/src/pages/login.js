import React from 'react'
import "../styles/loginstyle.css"
import {Form, Input, message} from 'antd'
//import { useDispatch } from 'react-redux'
//import { showLoading,hideLoading } from '../redux/features/alertSlice'
/* eslint-disable */
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"

const login = () => {
//const dispatch=useDispatch()
//form handler
const navigate=useNavigate()
const onFinishHandler=async (values)=>{
  try{
    //dispatch(showLoading())
    const res=await axios.post('/api/v1/user/login', values)
    window.location.reload()
    //dispatch(hideLoading())
    if(res.data.success){
        localStorage.setItem("token",res.data.token)
        message.success('Login Successfully!');
        navigate('/')
     }
     else{
      message.error(res.data.message)
     }
  }
  catch(error){
       // dispatch(hideLoading())
        console.log(error)
        message.error('Something went wrong!')
  }
}

  return (
    <div className="form-container">
          <Form layout="vertical" onFinish={onFinishHandler}>
            <h1>Login</h1>
            <Form.Item label="E-Mail" name="email">
              <Input type="email" required></Input>
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input type="password" required></Input>
            </Form.Item>
            <Link to="/register" className='margin-2'> New User?</Link>
            <button className="btn btn-primary" type="submit">Login</button>

          </Form>
      </div>
  )
}

export default login
