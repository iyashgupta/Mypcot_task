import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";

const CreateUpdate = () => {
  const [userdetail, setuserdetail] = useState({
    name: "",
    designation: "",
    Active: "true",
  });
  const [heading,setheading]=useState(true)
  const [empty,setempty]=useState(false)
  const { userId }=useParams()
  const navigate=useNavigate()

  const handle_change = async (e) => {
    const { name, value } = e.target;
    setuserdetail({ ...userdetail, [name]: value });
  };
  const handlesubmit = (e) => {
    e.preventDefault()

    if(userdetail.name === "" || userdetail.designation === "" || userdetail.Active === "" ){
        setempty(true)
        return
       }
       setempty(false)

    if(typeof userId === 'undefined'){
        const obj = Object.assign(userdetail, { id: Date.now() });
        axios.post(`http://localhost:3031/posts`,obj)
    }else{
   const obj = Object.assign(userdetail, { id: userId });
   axios.put(`http://localhost:3031/posts/${userId}`,obj)
    }
    navigate('/base')
  };
  useEffect(()=>{
        if(typeof userId === "string"){
            setheading(false)
            axios
            .get(`http://localhost:3031/posts/${userId}`)
            .then((res)=> setuserdetail(res.data))
            .catch((err)=>console.log(err))
        }
  },[])
  return (
    <form className="signup" onSubmit={handlesubmit}>
      <h3>{heading ? "Create User":"Update User"}</h3>
      <div className="mb-3">
        <label>Enter name</label>
        <input
          type="text"
          value={userdetail.name}
          onChange={handle_change}
          name="name"
          className="form-control"
          placeholder="Enter name"
        />
      </div>
      <div className="mb-3">
        <label>Enter Designation</label>
        <input
          type="text"
          value={userdetail.designation}
          onChange={handle_change}
          placeholder="Enter designation"
          name="designation"
          className="form-control"
        />
      </div>
      <select name="Active" onChange={handle_change} className="form-select select_tag" >
  <option value="true">True</option>
  <option value="false">False</option>
</select>
      <input type="submit" className="btn btn-primary" /><br/>
      { empty && <span style={{color:'red'}}>All field must be filled</span>}
    </form>
  );
};

export default CreateUpdate;
