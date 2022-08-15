// import React from 'react';
// import Home from './components/Home.jsx';
// import Login from './components/Login.jsx';
// import Signup from './components/Signup.jsx';
// import ReactDOM from "react-dom/client";
// // import Navbar from './components/Navbar.jsx'
// import {
//     BrowserRouter,
//     Routes,
//     Route,
// } from "react-router-dom";

// // import your route components too

// const root = ReactDOM.createRoot(
//     document.getElementById("root")
// );



// root.render(
//     <BrowserRouter>
//         <Routes>
//             <Route exact path='/login' element={<Login />} />
//             <Route exact path='/signup' element={<Signup />}/>            
//             <Route exact path='/home' element={<Home />} />
//         </Routes>
//     </BrowserRouter>
//     // ,
//     // document.getElementById('root')
// );



import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';


render(
    <App />,
    document.getElementById('root')
);