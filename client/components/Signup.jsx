import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import { Input } from '@material-ui/core';
// import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  let navigate = useNavigate();

  function signupPost() {
    const postBody = {
      username,
      password,
      email
    }

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody)
    }

    fetch('/account/signup', postOptions)
      .then((data) => data.json())
      .then((data) => {
        console.log('this is the data', data);

        setUsername('');
        setPassword('');
        setEmail('');

        navigate('/home')
      })
      .catch((error) => console.log(error));
  }

  return (
    // <div>
    //   <form id='signup-form'>
    //     <input required id="signup-username" placeholder="Username" type="text" />
    //     <input required id="signup-password" placeholder="Password" type="password" />
    //     <input type="submit" value="Signup" />
    //   </form>
    //   <a href='/signup' >Sign Up</a>
    //   <br></br>
    //   <a href='/home'>Go Home</a>
    //   <br></br>
    //   <a href='/login'>Go Login</a>
    // </div>

    <div className='signup'>
      <Box
        // border='5px solid text.secondary'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          // height: '30vh',
          // backgroundColor: 'primary.dark',
          // '&:hover': {
          //   backgroundColor: 'primary.main',
          //   opacity: [0.9, 0.8, 0.7],
          // },
        }}
      >
        {/* <form id='login-form' onSubmit={(event) => {
          signupPost();
          event.preventDefault();
        }}> */}
        <center>
          <h1>
            Sign Up!
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
        <Input
          placeholder='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
        </Input>

        <Button
          type='submit'
          onClick={signupPost}
        >
          Sign Up
        </Button>
        {/* </form> */}
      </Box>
    </div >
  );
}

export default Signup