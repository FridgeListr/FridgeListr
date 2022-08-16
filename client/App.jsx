import React, { useState, useEffect } from 'react';
import './index.scss';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

import ButtonAppBar from './components/ButtonAppBar';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function App() {
    const [username, setUsername] = useState('');
    const [user_id, setUser_id] = useState('');
    const [user, setUser] = useState(null);


    return (
        <Router>
            <Routes>
                <Route exact path='/login' element={<Login username={username} setUsername={setUsername} setUser_id={setUser_id}/>} />
                <Route exact path='/signup' element={<Signup username={username} setUsername={setUsername} />} />
                <Route exact path='/home' element={<Home user_id={user_id} />} />
            </Routes>
        </Router>
    )
}


export default App;