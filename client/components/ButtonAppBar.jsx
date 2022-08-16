import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import MyFridges from './MyFridges'

import { useNavigate } from 'react-router-dom'

export default function ButtonAppBar({ selectFridge }) {
  let navigate = useNavigate();

  // function createFridge() {
  //   const postBody = {
  //     user_id,
  //     nickname
  //   }

  //   const postOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(postBody)
  //   }

  //   fetch('/fridge/new', postOptions)
  //     .then((data) => data.json())
  //     .then((data) => {
  //       console.log('this is the data from createFridge', data);
  //     })
  //     .catch((error) => console.log(error));
  // }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={() => alert('hello world')} />
          </IconButton> */}
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Yeti-Crab-52
          </Typography> */}
          {/* <Button onClick={createFridge}>Create Fridge</Button> */}
          <Button onClick={() => navigate('/home')} color="inherit">My Fridge</Button>
          {/* <Button onClick={() => navigate('/login')} color="inherit">Sign Out</Button> */}
          {/* <Button color='white' onClick={() => alert('My Fridges')}>Fridges</Button> */}
          <MyFridges selectFridge={selectFridge} />
          {/* <Button onClick={() => alert('Create Fridge')}>Create Fridge</Button> */}
          <Button onClick={() => navigate('/login')} color="inherit">Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
