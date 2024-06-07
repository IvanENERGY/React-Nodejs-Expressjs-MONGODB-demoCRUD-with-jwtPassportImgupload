import { useContext } from 'react';
import { Link} from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';
import Cookies from 'js-cookie';

export const Nav=()=>{
    const [userContext,setUserContext] = useContext(UserContext);
    const logoutHandler=()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/logout`,{headers:{'token':userContext.token}})
        .then((response:any)=>{            
            Cookies.set('token',"");
            setUserContext({username:"",token:""});

            alert(response.data.opMsg);

        });
    }
    return(
    <>
        <Link to="/">Home</Link>
        {userContext.username ?(
            <>
            <Link to="/" onClick={logoutHandler}>Logout</Link>
            <Link to="/tasks/create">Create</Link>
            <Link to="/tasks">ReadAll</Link>
            </>
        )
        :<Link to="/login">Login</Link>}

    </>
    )
    
}