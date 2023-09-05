import React from 'react'
import "./rightbar.css"
import { useNavigate } from 'react-router-dom'

const RightSidebar = ({data,delete_row}) => {
    const navigate=useNavigate()
  return (
       <div className='rightbar'>
      <div className='post_btn'>
        <button className='btn btn-primary' onClick={()=>navigate('/createupdate')}>Post New Data </button>
      </div>
    <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Designation</th>
      <th scope="col">Active</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
         {data.map((ele)=>
           <tr key={ele.id} className='table_row'>
             <td>{ele.name}</td>
             <td>{ele.designation}</td>
             <td>{ele.Active}</td>
             <td className='update' onClick={()=>navigate(`/createupdate/${ele.id}`)}>Update</td>
             <td type="button" className='btn btn-danger delete_btn' onClick={()=>delete_row(ele.id)}>Delete</td>
           </tr>
        )}
        </tbody>
        </table>
       </div>
  )
}

export default RightSidebar