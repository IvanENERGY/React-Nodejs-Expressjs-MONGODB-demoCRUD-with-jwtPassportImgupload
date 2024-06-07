import React, { useContext } from 'react';
import { UserContext } from '../App';
export const Home=()=>{
    const [userContext,setUserContext] = useContext(UserContext);
    return(
        <>
        <h1>Home Page</h1>
        <h2>Welcome {userContext.username}</h2>
        
        </>
    )
}