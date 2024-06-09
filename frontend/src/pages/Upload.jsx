import axios from "axios";
import { FormEvent, useState,useContext } from "react"
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom";
export const Upload=()=>{
    const [file,setFile]=useState()
    const [userContext,setUserContext] = useContext(UserContext);
    const navigate  =useNavigate();

    const mySubmitHandler=(event)=>{
       event.preventDefault();
       console.log("token is "+userContext.token);
       const formData=new FormData();
       formData.append('file',file);
       axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/images/upload`,formData,{headers:{'token':userContext.token}})
        .then((response)=>{console.log(response)
            if(response.data.status===200){
                alert(response.data.opMsg);
                navigate('/images')
            }else{
                alert("Some error happened: "+response.data.message);
            }

        })
        .catch((err)=>{return console.log(err)});
    
    }

    return(
        <>
        <h1>Upload Page</h1>
        <fieldset>
            <legend>
                Upload Any Images
            </legend>
        <form onSubmit={mySubmitHandler}>
            <input type="file" onChange={(event)=>{return setFile(event.target.files[0])}}/>
            <input type="submit" value="Upload NOW!"/>
        </form>
        </fieldset>
     
        </>
    )
}