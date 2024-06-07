import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { UserContext } from "../App";

export const Login=()=>{
    const navigate  =useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [userContext,setUserContext] = useContext(UserContext);
    const mySubmitHandler=(event:any)=>{
        event.preventDefault();
        let data={
            username,
            password
        };
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`,data)
        .then((response)=>{
            //console.log(response.data) {authSuccess:..,message:...} 
            if(response.data.authSuccess===true){
                const token= response.data.token;
                Cookies.set('token', token, { expires: 7, secure: true }); //7 is expiration date ; secure ensure cookie only send through https
                navigate("/");
                setUserContext({username,token:Cookies.get('token')});
            }else{
                alert(response.data.message);
            }
        })
        .catch((err)=>{
            alert(`Some error happen: ${err}`)  ;  
        })

    }
    return(
        <>
        <h1>This is the login page</h1>
        <form onSubmit={(e)=>{mySubmitHandler(e)}}>
            <input type="text" placeholder="Username here..." onChange={(e)=>{setUsername(e.target.value)}}  value={username}/>
            <input type="password" placeholder="Pw here..."  onChange={(e)=>{setPassword(e.target.value)}} value={password} />
            <input type="submit" value="Login now!"/>
        </form>
        <Link to="/register">Do not have an account? Register here</Link>
        </>
    )
}