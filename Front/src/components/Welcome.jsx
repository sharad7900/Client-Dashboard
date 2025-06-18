import { useContext, useEffect, useState } from "react";
import Demo from "./Sider";
import "./Welcome.css"
import { AssigneeContext } from "../AssigneesContext";
import Cards from "./Cards";
import { Button, Image } from "@chakra-ui/react";
import { ColorModeButton, useColorMode } from "./ui/color-mode";
import { useNavigate } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

const Welcome = ()=>{
    const {setID} = useContext(AssigneeContext);
    const { toggleColorMode } = useColorMode();
    useEffect(()=>{
        const data = async()=>{
        const response = await fetch(`https://client-dashboard-six-rho.vercel.app/`,{
            method:"GET",
            credentials: 'include',
            headers:{
                "Content-Type":"application/json",
            },
        })

        if(!response.ok){
              window.location.href = '/login'
              return;
            }

        const Ids = await response.json();
        setID(Ids);
    }
    data();   
    },[])

    const navigate = useNavigate();
  const logout = async ()=>{
    const response = await fetch(`https://client-dashboard-six-rho.vercel.app/logout`,{
      method:"POST",
      credentials: 'include',
      headers:{
          "Content-Type":"application/json"
      },
      
  })
  const res = await response.json();
  if(res.message==='Logout'){
    navigate('/login');
  }
  
  }
 return(<>
 <div className="sider">
<div className="navbar-wlc">
   <ul>
    <li> <Image rounded="md" src="https://www.suigenerisconsulting.com/img/sgc.png" alt="SGC" style={{height:"50px"}}/></li>
    <li> <ColorModeButton/></li>
    <li><Button variant="plain" onClick={logout}>Logout <RiArrowRightLine /></Button></li>
   </ul>

</div>
 </div>
 <div className="cards-outer">
    <div className="cards">

        <Cards name={"MF"}/>
        <Cards name={"CP"}/>
        <Cards name={"DP"}/>
        
        
        
    </div>
 </div>
 

 </>)
}
export default Welcome;
