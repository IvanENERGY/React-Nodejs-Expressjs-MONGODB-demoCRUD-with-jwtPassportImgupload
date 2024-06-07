import { Link, useNavigate } from "react-router-dom"
import {useForm} from "react-hook-form"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from "axios"
import { IUserAuthData } from "../interface/IUserAuthData"



export const Register=()=>{
    const navigate  =useNavigate();
    const schema = yup.object().shape({
        username: yup.string().min(4).max(10).required("User name must be entered"),
        password:yup.string().min(4).max(10).required(),
        confirmedPassword:yup.string().oneOf([yup.ref("password")],"pw not matched!").required()
    })

    const {register,handleSubmit ,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    });
    const mySubmitHandler=(data:IUserAuthData)=>{
        //console.log(data); {username:..,password:...,confirmedPassword:...}
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/create`,data)
        .then((response)=>{
            if(response.data.status==200){
                alert(response.data.opMsg);
                navigate("/login");
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
        <h1>This is the Register page</h1>
        <form onSubmit={handleSubmit(mySubmitHandler)}>
            <input type="text" placeholder="Username here..." required {...register("username")}/>
            <p style={{color:"red"}}>{errors.username?.message}</p>

            <input type="password" placeholder="Pw here..." required {...register("password")}/>
            <p style={{color:"red"}}>{errors.password?.message}</p>

            <input type="password" placeholder="Confirmed Pw here..." required {...register("confirmedPassword")}/>
            <p style={{color:"red"}}>{errors.confirmedPassword?.message}</p>

            <input type="submit" value="Register now!" />

        </form>
        <Link to="/login">Already have an account? Login here</Link>
        </>
    )
}