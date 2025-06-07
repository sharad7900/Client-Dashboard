import React, { useState } from "react";
import './Login.css'
import { PasswordInput } from "./ui/password-input";
import { Button, Input,Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Login = () => {
    const [PAN, setPan] = useState("");
    const [pass, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(!loading);
      if(!PAN){
        toast.error("PAN Number Required");
        setLoading(false);
        return;
      }
      if(!pass){
        toast.error("Password Required");
        setLoading(false);
        return;
      }
      const response = await fetch(`https://client-dashboard-six-rho.vercel.app/login`,{
        method:"POST",
        credentials: 'include',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({PAN,pass})
    })
  
    const res = await response.json();
    if(res.message!="Successfully Login"){
      setLoading(false);
      toast.error(res.message);
    }
    else{
      toast.success(res.message);
      navigate('/welcome');
    }
    };
  
    return (
    <div className="outer">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>PAN:</label>
            <Input className="paninput" value={PAN.trim().toUpperCase()}
              onChange={(e) => setPan(e.target.value)}/>

          </div>
          <div className="form-group">
            <label>Password:</label>
            <PasswordInput className="paninput" value={pass.trim()} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <Button loading={loading} type="submit" className="loginbtn">Login</Button>
          <br />
          <Link href="/forgotpassword" className="fplnk">Forgot Password?</Link>
          
        </form>
      </div>
      
      </div>
      
    );
};

export default Login;

