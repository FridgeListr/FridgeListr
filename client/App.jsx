import React, { useState, useEffect } from 'react';
import './index.scss';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

import ButtonAppBar from './components/ButtonAppBar';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function App() {



    return (
        <Router>
            <nav className='navbar'>
                <ButtonAppBar />
            </nav>
            <Routes>
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/signup' element={<Signup />} />
                <Route exact path='/home' element={<Home />} />
            </Routes>
        </Router>
    )
}


export default App;