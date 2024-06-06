import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export const DeleteTask=()=>{
    const {id}=useParams();
    const navigate=useNavigate();
    const [name,setName]=useState("");

    useEffect(()=>{
        // axios.get(`http://localhost:3000/api/tasks/${id}`)
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${id}`)
        .then((response:any)=>{
            setName(response.data.data.name);
        })
    },[])
    const deleteHandler=()=>{
        // axios.delete(`http://localhost:3000/api/tasks/${id}/delete`)
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${id}/delete`)
        .then((result)=>{
            navigate("/tasks");
        })
        .catch((err)=>{
            alert(`Some error happen: ${err}`)  ;  
        })
    }
    const denyDeleteHandler=()=>{
        navigate("/tasks");
    }
    return(
        <>
        <h1>DeleteTask Page</h1>
        <h1 style={{backgroundColor:"red"}}>Are you sure you want to delete following Task?</h1>
        <h1>{name}</h1>
        <button onClick={deleteHandler}>Yes Delete it </button>
        <button onClick={denyDeleteHandler}>No </button>
        </>
    )
}