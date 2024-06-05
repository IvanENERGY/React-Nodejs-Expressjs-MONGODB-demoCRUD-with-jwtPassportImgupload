import { Link} from 'react-router-dom';
export const Nav=()=>{
    return(
    <>
        <Link to="/">Home</Link>
        <Link to="/tasks/create">Create</Link>
        <Link to="/tasks">ReadAll</Link>
    </>
    )
    
}