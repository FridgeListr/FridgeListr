import React, { useState } from 'react';

function Signup() {
  return (
    <div>
      <form id='signup-form'>
        <input required id="signup-username" placeholder="Username" type="text" />
        <input required id="signup-password" placeholder="Password" type="password" />
        <input type="submit" value="Signup" />
      </form>
      <a href='/signup' >Sign Up</a>
      <br></br>
      <a href='/home'>Go Home</a>
      <br></br>
      <a href='/login'>Go Login</a>
    </div>
  );
}

export default Signup