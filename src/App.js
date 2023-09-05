import './App.css';
import React,{createContext, useState} from "react"
import Allroutes from './Routes/AllRoute';
import Nav from './nav/nav';

export const UserContext = createContext()

function App() {
  const [islogin,setislogin]=useState(false)

  const setlogin=()=>{
    setislogin(true)
  }

  return (
    <>
    <UserContext.Provider value={{login:islogin,setlogin:setlogin}}>
    <Nav/>
    <Allroutes />
    </UserContext.Provider>
  </>);
}

export default App;
