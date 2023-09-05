import React, { useState } from 'react'
import "./leftSideBar.css"

const LeftSidebar = ({searchquery,select_filter}) => {
  const [query,setquery]=useState("")
  return (
    <div className="card left-bar-parent" >
    <div className="card-body">
      <h5 className="card-title filtertext" >Apply filter</h5>
  
        <div className='barParent'>
        <span className="card-title filterlabel">select Active</span>
        <center>
      <select className='form-select select_width' onChange={select_filter}>
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="UnActive">UnActive</option>
        </select>
        </center>
        </div>

        <div className='barParent' style={{marginTop:"20px"}}>
        <span className="card-title filterlabel">select by name</span>
        <input type="text" value={query} onChange={(e)=>setquery(e.target.value)} className="form-control input" placeholder='search by name'/>
        <button onClick={()=> searchquery(query)} className='btn btn-primary'>search</button>
        </div>
  
    </div>
  </div>
  )
}

export default LeftSidebar