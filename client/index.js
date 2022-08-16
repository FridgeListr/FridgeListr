import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';


// render(
//     <App />,
//     document.getElementById('root')
// );


import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);