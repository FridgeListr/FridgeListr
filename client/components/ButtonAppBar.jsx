import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { useNavigate } from 'react-router-dom'

export default function ButtonAppBar() {
  let navigate = useNavigate();
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={() => alert('hello world')} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Yeti-Crab Fridge 52
          </Typography>
          <Button onClick={() => navigate('/login')} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
