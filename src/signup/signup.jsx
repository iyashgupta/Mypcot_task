import React, { useState } from "react";
import "./signup.css"
import * as EmailValidator from 'email-validator';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate=useNavigate()
    const [userDetails,setUserDetails]=useState({name:"",password:"",gender:"",email:""})
    const [emailerr,setemailerr]=useState(false)
    const [passerr,setpasserr]=useState(false)

    const handleChange=(e)=>{
        const {name,value}=e.target
        setUserDetails({...userDetails,[name]:value})     
    }

    const email_verify=()=>{
      let email_verify=EmailValidator.validate(userDetails.email)
      if(email_verify === false){
          setemailerr(true)
          return false
        }else {
          setemailerr(false)
           return true
        }
       }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(email_verify() === false){
        return
       }
    if(userDetails.password.length < 8 || userDetails.password.length > 16){
        setpasserr(true)
          return 
        }
        setpasserr(false)
       axios.post("http://localhost:3031/All_user",userDetails)
       alert("Signup Complete")
           navigate("/")
}
    return (
    <form className="signup form" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>Enter name</label>
        <input type="text" onChange={handleChange} value={userDetails.name} name="name" className="form-control" placeholder="Enter name" required/>

      </div>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="text"
          value={userDetails.email}
          name="email"
          onChange={handleChange}
          className="form-control"
          placeholder="Enter email"
        />
      {emailerr && <span style={{color:"red"}}>Email is invalid</span>}
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={userDetails.password}
          className="form-control"
          placeholder="Enter password"
          
        />
      {passerr && <span style={{color:"red"}}>password must be betweem 8 to 16 length</span>}
      </div>
      <div className="col-md-6 mb-4">
        <h6 className="mb-2 pb-1">Gender: </h6>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="femaleGender"
            value="female"
            onChange={handleChange}
          checked
          />
          <label className="form-check-label" htmlFor="femaleGender">
            Female
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="maleGender"
            value="male"
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="maleGender">
            Male
          </label>
        </div>
      </div>

        <input type="submit" className="btn btn-primary" />
    </form>
  );
};

export default Signup;
