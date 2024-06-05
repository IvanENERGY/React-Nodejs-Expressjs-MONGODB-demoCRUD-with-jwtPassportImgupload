import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import {Home} from './pages/Home';
import {CreateTask} from './pages/CreateTask';
import {ReadAllTask} from './pages/ReadAllTask';
import {UpdateTask} from './pages/UpdateTask';
import {DeleteTask} from './pages/DeleteTask';
import { Nav } from './components/Nav';

function App() {

  return (
 
    <div className="App">
      
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/tasks/create" element={<CreateTask/>}/> 
          <Route path="/tasks" element={<ReadAllTask/>}/>
          <Route path="/tasks/:id/update" element={<UpdateTask/>}/> 
          <Route path="/tasks/:id/delete" element={<DeleteTask/>}/> 
        </Routes>
      </Router>
      
    </div>

  );
}

export default App;
