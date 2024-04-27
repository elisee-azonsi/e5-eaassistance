import React, { useState } from 'react'
import Login from './components/login/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notes from './components/Notes';
import UserForm from './components/helpform/userform';
import Register from './components/register/register';

const App = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/notes" element={<Notes/>} />
            <Route path="/userform" element={<UserForm/>} />
            <Route path="/register" element={<Register/>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
