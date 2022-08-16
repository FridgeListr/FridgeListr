import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import { Input } from '@material-ui/core';
// import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'

function Login({username, setUsername, setUser_id}) {
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  function loginPost() {

    // console.log('loginpost')
    // const postBody = {
    //   username: document.getElementById("login-username").value,
    //   password: document.getElementById("login-password").value
    // }
    const postBody = {
      username,
      password
    }

    // console.log('this is postBody', postBody);

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
        console.log('this is the data', data);
        // console.log(data)
        // expect a cookie back and a redirect

        if (data) {
          setUser_id(data.user_info._id);
          navigate('/home')
        }
        else return alert('Invalid Login');

        // alert("it worked!!!")
        // window.open("http://localhost:8080/home")
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className='login'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
        }}
      >
        <center>
          <h1>
            Login
          </h1>
        </center>
        <Input
          placeholder='Username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        >
        </Input>
        <Input
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
        </Input>

        <Button
          type='submit'
          onClick={loginPost}
        >
          Login
        </Button>

        <Button
          type='submit'
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
      </Box>
    </div >
  );
}

export default Login
