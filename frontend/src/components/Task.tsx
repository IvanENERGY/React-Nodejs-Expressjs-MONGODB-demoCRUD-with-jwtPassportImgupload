import { useNavigate } from "react-router-dom";
import { ITaskData } from "../interface/ITaskData";
import axios from "axios";
interface props{
    task:ITaskData
}

export const Task = (props:props)=>{
    const {task}=props;
    const navigate=useNavigate();
    const updateHandler=()=>{
        navigate(`/tasks/${task._id}/update`)
    }
    const deleteHandler=()=>{
        navigate(`/tasks/${task._id}/delete`)
        
    }

    var adjustedDT=new Date(task.deadline).toLocaleString("en-GB");
    return (
            <tr>
               <td>{task.name}</td> 
               <td>{adjustedDT}</td> 
               <td>{task.reps}</td>
               
               <button onClick={updateHandler}>UPDATE</button>
               <button onClick={deleteHandler}>DELETE</button>
            </tr>
    )
}