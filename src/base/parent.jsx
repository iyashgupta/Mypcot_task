import React,{useEffect, useState} from 'react'
import LeftSidebar from './leftSidebar'
import RightSidebar from './rightSidebar'
import "./parent.css"
import axios from 'axios'


const Parent = () => {
const [data,setData]=useState([])
const [selectdata,setsetData]=useState("All")


const fetch_get=async ()=>{
  let res=await axios.get("http://localhost:3031/posts")
  setData(res.data)
}

const searchquery=(text)=>{
    if(text === ""){
        fetch_get()
        return
    }
    const updated_data=data.filter((ele)=> ele.name === text )
        updated_data.length > 0 ? setData(updated_data):alert("couldn't find anything with this name")
}

const select_filter=async (e)=>{
    const {value}=e.target
    if(value === "All"){
        fetch_get()
    }
    if(value === "UnActive"){
        let res=await axios.get("http://localhost:3031/posts")
        const Active_data=res.data.filter((ele)=> ele.Active === "false" )
        setData(Active_data)
    }
    if(value === "Active"){
        let res=await axios.get("http://localhost:3031/posts")
        const Active_data=res.data.filter((ele)=> ele.Active === "true" )
       setData(Active_data)
    }
}
const delete_row=(id)=>{
    axios.delete(`http://localhost:3031/posts/${id}`)
    fetch_get()
}

useEffect(()=>{
        fetch_get()
    },[])
  return (
    <div className='base form'>
   <LeftSidebar searchquery={searchquery} select_filter={select_filter} />
   <RightSidebar delete_row={delete_row} data={data}/>
   </div>
  )
}

export default Parent