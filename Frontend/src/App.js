import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './pages/Login';  
import Register from './pages/Register';  
import Home from './pages/Home/Home';  
import SetAvatar from './pages/Avatar/SetAvatar';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
