
import './App.css';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import {Home} from './pages/Home';
import {CreateTask} from './pages/CreateTask';
import {ReadAllTask} from './pages/ReadAllTask';
import {UpdateTask} from './pages/UpdateTask';
import {DeleteTask} from './pages/DeleteTask';
import { Nav } from './components/Nav';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { createContext, useState } from 'react';

export const UserContext=createContext();

function App() {
  const [userContext,setUserContext]=useState({username:"",token:""})
  return (
 
    <div className="App">
      <UserContext.Provider value={[userContext,setUserContext]}>
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/login" element={<Login/>}/> 
          <Route path="/register" element={<Register/>}/> 
          <Route path="/tasks/create" element={<CreateTask/>}/> 
          <Route path="/tasks" element={<ReadAllTask/>}/>
          <Route path="/tasks/:id/update" element={<UpdateTask/>}/> 
          <Route path="/tasks/:id/delete" element={<DeleteTask/>}/> 
        </Routes>
      </Router>
      </UserContext.Provider>
    </div>

  );
}

export default App;
