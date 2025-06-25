import { Button, Image, List, Spinner } from "@chakra-ui/react";
import './Description.css'
import { ColorModeButton } from "./ui/color-mode";
import { RiArrowRightLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Description = () => {
  const location = useLocation();
  const {id} = location.state || "";
  const [list, setList] = useState();

  useEffect(() => {

    const fectData = async ()=>{
      const response = await fetch(`https://client-dashboard-six-rho.vercel.app/descriptions`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page_id: id })
    })
    if (!response.ok) {
      window.location.href = '/login'
    }
    const res = await response.json();
    
    if (res.writtenLines.length === 0) {
      setList(["No Descriptions!"]);
    }
    else {
      setList(res.writtenLines);
    }

    }
    fectData();
  }, [])

  const logout = async () => {
    const response = await fetch(`https://client-dashboard-six-rho.vercel.app/logout`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },

    })
    const res = await response.json();
    if (res.message === 'Logout') {
      navigate('/login');
    }
  }
  return (<>
    <div className="navbar-wlc">
      <ul>
        <li> <Image rounded="md" src="sgc.png" alt="SGC" style={{ height: "50px" }} /></li>
        <li> <ColorModeButton /></li>
        <li><Button variant="plain" onClick={logout}>Logout <RiArrowRightLine /></Button></li>
      </ul>

    </div>
    {list ? <div className="description-list">
      <List.Root>
        {list.map((item, index) => (

          <List.Item key={index} className="description-item">
            {item}
          </List.Item>))}
      </List.Root>
    </div> : <div  className="loading"><Spinner size="xl"/></div>}
    

  </>)

}

export default Description;