import React from 'react'
import "../styles/registerstyle.css"
import {Form, Input, message} from 'antd'
//import { useDispatch } from 'react-redux'
//import { showLoading, hideLoading} from '../redux/features/alertSlice'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"
const register = () => {
 
  //const dispatch=useDispatch()
  const navigate=useNavigate()
//form handler
const onFinishHandler=async (values)=>{
  try{
    //dispatch(showLoading())
    const res=await axios.post('/api/v1/user/register', values)
    //dispatch(hideLoading())
    if(res.data.success){
      message.success('Register Successfully!')
      navigate("/login")

    }else{
      message.error(res.data.message)
    }

  }
  catch(error){
    //dispatch(hideLoading())
    console.log(error)
    message.error('Something went wrong')
  }
}

  return (
    <>
      <div className="form-container">
          <Form layout="vertical" onFinish={onFinishHandler}>
            <h1>Register Form</h1>
            <Form.Item label="Name" name="name">
              <Input type="text" required></Input>
            </Form.Item>

            <Form.Item label="E-Mail" name="email">
              <Input type="email" required></Input>
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input type="password" required></Input>
            </Form.Item>
             <Link to="/login" className='margin-2'> Already Rgistered?</Link>
            <button className="btn btn-primary" type="submit">Register</button>

          </Form>
      </div>
    </>
  )
}

export default register
