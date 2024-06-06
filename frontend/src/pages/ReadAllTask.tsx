
import axios from "axios";
import { useEffect, useState } from 'react';
import { ITaskData } from '../interface/ITaskData';
import {Task} from '../components/Task'
export const ReadAllTask=()=>{
    const [liTask,setLiTask]=useState([]);
    const [isLoading,setLoading]=useState(true);
   
    useEffect(()=>{
        // axios.get("http://localhost:3000/api/tasks")
        axios.get("https://mern-crud-todolist-be.onrender.com/api/tasks")
        .then((response:any)=>{
           setLiTask(response.data.data);
           setLoading(false);
        });
    },[]);

    return(
        <>
        
        <h1>ReadAllTask Page</h1>
        {isLoading ?(<h1 style={{backgroundColor:"red"}}>Loading...</h1>):(
        <>
        <table>
            <thead>
                <th>Task_Name</th>
                <th>Task_DeadLine</th>
                <th>Task_Reps</th>
            </thead>
            <tbody>
                {liTask?.map((item:ITaskData)=>{
                    return <Task task={item}/>
                })}
            </tbody>
        </table>
        {/* <button onClick={()=>{}}>Refresh</button> */}
        </>
        )}

        </>
    )
}