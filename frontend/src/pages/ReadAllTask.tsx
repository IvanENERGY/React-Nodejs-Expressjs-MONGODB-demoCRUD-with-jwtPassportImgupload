
import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import { ITaskData } from '../interface/ITaskData';
import {Task} from '../components/Task'
import { UserContext } from "../App";
export const ReadAllTask=()=>{
    const [liTask,setLiTask]=useState([]);
    const [isLoading,setLoading]=useState(true);
    const [userContext,setUserContext] = useContext(UserContext);
    
    useEffect(()=>{
        console.log(`preforming axios.get(${process.env.REACT_APP_BACKEND_URL}/api/tasks)`)
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tasks`,{headers:{'token':userContext.token}})
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