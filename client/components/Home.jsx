import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import MainInventory from './MainInventory.jsx';
import Activity from './Activity.jsx';

import ButtonAppBar from './ButtonAppBar.jsx';

function Home() {
  // Declare a new state variable, which we'll call "count"
  // const [count, setCount] = useState(0);
  const [username, setUsername] = useState('');
  const [user_id, setUser_id] = useState('');
  const [fridgeArray, setFridgeArray] = useState([]);
  const [defaultFridge, setDefaultFridge] = useState(0);
  // const [foodArray,]

  useEffect(() => {
    // we want to perform this get request as soon as the page
    getUserData()
    // document.title = `You clicked ${count} times`;
  }, []);

  const getUserData = () => {
    const getOptions = {
      method: 'GET',
      // i believe this line below makes sure that the front end sends over their cookies
      credentials: 'include'
    }

    fetch('/account/login', getOptions)
      .then((data) => data.json())
      .then((data) => {
        setUsername(data.username);
        setUser_id(data.user_id);
        setFridgeArray(data.fridgeArray);
        setDefaultFridge(data.defaultFridge);
      })
      .catch((error) => console.log(error));
  }

  const selectFridge = (input) => {
    setDefaultFridge(input);
  }

  return (
    <>
      <nav className='navbar'>
        <ButtonAppBar />
      </nav>

      <div className="contents">
        <a href='/signup'>Signup Here!</a>
        <br></br>
        <a href='/home'>Go Home</a>
        <br></br>
        <a href='/login'>Go Login</a>
        <div id='navbar'>
          <Navbar selectFridge={selectFridge} fridgeArray={fridgeArray} />
        </div>
        <div id='content'>
          <MainInventory defaultFridge={defaultFridge} key={2} />
          {/* <Activity /> */}
        </div>
      </div>
    </>
  );
}


export default Home;