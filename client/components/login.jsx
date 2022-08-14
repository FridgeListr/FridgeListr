import React, { useState } from 'react';

function Login() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  function loginPost(){
    const postBody = {

    }
    const postOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody)
    }
    fetch('/account/login', postOptions)
    .then((data) => data.json())
    .then((data) => {


    })
    .catch((error) => console.log(error));
  }


  return (
    <div id='signup-box'>
      <form id='login-form'>
        <input required id="login-username" placeholder="Username" type="text" />
        <input required id="login-password" placeholder="Password" type="password" />
        <input type="Login!" value="Login" />
      </form>
        <a href='/signup'>Signup Here!</a>;
    </div>
  );
}

export default Login