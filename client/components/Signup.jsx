import React, { useState } from 'react';

function Signup() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>SIGNUP</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me Signup
      </button>
    </div>
  );
}

export default Signup