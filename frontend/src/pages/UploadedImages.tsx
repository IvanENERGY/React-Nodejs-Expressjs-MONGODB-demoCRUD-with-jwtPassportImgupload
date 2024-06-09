import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import { IUserUploadedImage } from '../interface/IUserUploadedImage';
import { UserUploadedImage } from '../components/UserUploadedImage';
export const UploadedImages=()=>{
    const [liImage,setLiImage]=useState([]);
    const [isLoading,setLoading]=useState(true);
    const [userContext,setUserContext] = useContext(UserContext);
    
    useEffect(()=>{
        
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/images`,{headers:{'token':userContext.token}})
        .then((response:any)=>{
           setLiImage(response.data.data);
           setLoading(false);
        });
    },[]);

    return(
        <>
        
        <h1>Uploaded Images Page</h1>
        {isLoading ?(<h1 style={{backgroundColor:"red"}}>Loading...</h1>):(
        <>
        <table>
            <thead>
                <th>Image_FileName</th>
                <th>Image</th>
            </thead>
            <tbody>
                {liImage?.map((item:IUserUploadedImage)=>{
                    return <UserUploadedImage image={item}/>
                })}
            </tbody>
        </table>
        {/* <button onClick={()=>{}}>Refresh</button> */}
        </>
        )}

        </>
    )
}