import {Routes,Route } from "react-router-dom"
import Login from "../login/login"
import Signup from "../signup/signup"
import CreateUpdate from "../base/createUpdate"
import Parent from "../base/parent"

function Allroutes(){
    return (
    <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/signup" element={<Signup  />} />
       <Route path="/base" element={<Parent />} />
       <Route path="/createupdate" element={<CreateUpdate />} />
       <Route path="/createupdate/:userId" element={<CreateUpdate />} />
    </Routes>
  )
}
export default Allroutes