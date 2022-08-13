import React, { useState } from 'react';

function Login() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me Login
      </button>
    </div>
  );
}

export default Login