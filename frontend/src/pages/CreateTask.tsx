import {useForm} from "react-hook-form"
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from "axios"
import {useNavigate } from 'react-router-dom';
import { ITaskData } from '../interface/ITaskData'
import { UserContext } from "../App";
import { useContext } from "react";


export const CreateTask=()=>{
    const [userContext,setUserContext] = useContext(UserContext);
    const navigate  =useNavigate();
    const schema = yup.object().shape({
        name: yup.string().required("Task name must be entered"),
        deadline:yup.date().min(new Date()).required(),
        reps:yup.number().positive().integer().min(0).max(20).required()
    })

    const {register,handleSubmit ,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    });
        
    const mySubmitHandler=(data:ITaskData)=>{
         console.log(data);//object {name:...,deadline:...,reps,...}
        // axios.post(`http://localhost:3000/api/tasks`,data)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/tasks`,data,{headers:{'token':userContext.token}})
        .then((response)=>{
            console.log(response);
            navigate("/tasks");
        })
        .catch((err)=>{
            alert(`Some error happen: ${err}`)  ;  
        })
        
    }

    return(
        <>
        <h1>CreateTask Page</h1>
        <fieldset>
            <legend>
                Create a New Task
            </legend>
            <form onSubmit={handleSubmit(mySubmitHandler)}>
                <input type="text" placeholder="Enter Task Name..." required {...register("name")}/>
                <p style={{color:"red"}}>{errors.name?.message}</p>

                <input type="datetime-local" placeholder="Enter Deadline..."  required {...register("deadline")}/>
                <p style={{color:"red"}}>{errors.deadline?.message}</p>

                <input type="number" placeholder="Enter Reps..." required {...register("reps")}/>
                <p style={{color:"red"}}>{errors.reps?.message}</p>

                <input type="submit" value="Press Submit"/>
            </form>
        </fieldset>
        
        </>
    )
}