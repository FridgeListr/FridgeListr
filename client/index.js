import React from 'react';
import App from './components/App.jsx';
import Login from './components/login.jsx';
import Signup from './components/Signup.jsx';
import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

// import your route components too

const root = ReactDOM.createRoot(
    document.getElementById("root")
);



root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route exact path='/signup' element={<Signup />}/>            
            <Route exact path='/home' element={<App />} />
        </Routes>
    </BrowserRouter>
    // ,
    // document.getElementById('root')
);