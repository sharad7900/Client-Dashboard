import { useEffect } from "react";
import Demo from "./Sider";
import "./Welcome.css"

const Welcome = ()=>{
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
    }
    data();   
    },[])
 return(<>
 <div className="welcmoutr">
 <div className="sider">
<div className="menubtn"><Demo/></div>
 
 </div>
</div>

 </>)
}
export default Welcome;
