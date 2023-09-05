import React, { useState,useContext } from 'react'
import * as EmailValidator from 'email-validator';
import "./login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {
    let [userdata,setUserdata]=useState({useremail:"",userpassword:""})
    let [emailerr,setemailerr]=useState(false)
    let [passerr,setpasserr]=useState(false)
    const navigate=useNavigate()
    const re=useContext(UserContext)
 
    const handleChange=(e)=>{
        const {name,value}=e.target
        setUserdata({...userdata,[name]:value})
    }
    const email_verify=()=>{
      let email_verify=EmailValidator.validate(userdata.useremail)
      if(email_verify === false){
          setemailerr(true)
          return false
        }else {
          setemailerr(false)
           return true
        }
       }
       const validate_login=(arr)=>{
           const result = arr.filter((ele)=> ele.email === userdata.useremail && ele.password === userdata.userpassword )
           if(result.length > 0){
            alert("sucess")
            re.setlogin()
            navigate('/base')
          }else{
            alert('login failed')
           }
       }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        // debugger
        if(email_verify() === false){
          return
         }
 
         if(userdata.userpassword.length < 8 || userdata.userpassword.length > 16){
          setpasserr(true)
            return 
          }
        setpasserr(false)
       axios.get("http://localhost:3031/All_user")
       .then((res)=> validate_login(res.data))
    }
    return (
    <form className="login form" onSubmit={handleSubmit}>
  <div className="mb-3">
    <label for="email" className="form-label login-label">Email address</label>
    <input type="text" className="form-control" value={userdata.useremail} name="useremail" onChange={handleChange} id="email"/>
    {emailerr && <span style={{color:"red"}}>Email is invalid</span>}
  </div>
  <div className="mb-3">
    <label for="password" className="form-label login-label">Password</label>
    <input type="password" className="form-control" onChange={handleChange} id="password" name="userpassword" value={userdata.userpassword}/>
    {passerr && <span style={{color:"red"}}>Password must be greater than 8 and less than 16</span>}
  </div>
  <input type="submit" className="btn btn-primary" />
</form>
  )
}

export default Login