import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Appbar from './Appbar';
import Signin from './Signin';
import Signup from './Signup';
import Home from './Home';
import Courses from './Courses';
import Dashboard from './Dashboard';
import Update from './Update';

function App() {


  return (
    <>
      <div style={{ backgroundColor: '#eeeeee', width: '100vw', height: '100vh' }}>
        <Router>
          <Appbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/update" element={<Update />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
