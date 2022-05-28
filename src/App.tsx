import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/home' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>                 
    </BrowserRouter>
  );
}

export default App;
