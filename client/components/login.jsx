import React, { useState } from 'react';

function Login() {
  // Declare a new state variable, which we'll call "count"
  // const [count, setCount] = useState(0);

  function loginPost() {
    // console.log('loginpost')
    const postBody = {
      username: document.getElementById("login-username").value,
      password: document.getElementById("login-password").value
    }
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody)
    }
    // console.log(postOptions)
    fetch('/account/login', postOptions)
      .then((data) => data.json())
      .then((data) => {
        console.log(test)
        // expect a cookie back and a redirect
      })
      .catch((error) => console.log(error));
  }


  return (
    <div id='signup-box'>
      <h1>test heading</h1>
      <form id='login-form' onSubmit={(event) => {
        loginPost();
        event.preventDefault();
      }}>
        <input required id="login-username" placeholder="Username" type="text" />
        <input required id="login-password" placeholder="Password" type="password" />
        <input type="submit" value="Login" />
      </form>
      <a href='/signup'>Signup Here!</a>
    </div>
  );
}

export default Login