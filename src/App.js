import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Home} from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 3000)
  }
  return (
    <>
    <NoteState>
      <Router>
        <Navbar/>
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" showAlert={showAlert} element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" showAlert={showAlert} element={<Login />} />
            <Route exact path="/signup" showAlert={showAlert} element={<Signup />} />
          </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
