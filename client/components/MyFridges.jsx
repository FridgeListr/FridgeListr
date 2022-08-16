import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function BasicMenu({setSelectedFridge}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        // id="basic-button"
        // aria-controls={open ? 'basic-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        color='inherit'
        onClick={handleClick}
      >
        My Fridges
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => setSelectedFridge('olaf')}>olaf</MenuItem>
        <MenuItem onClick={() => setSelectedFridge('carrot')}>carrot</MenuItem>
        <MenuItem onClick={() => setSelectedFridge('friend')}>friend</MenuItem>
      </Menu>
    </div>
  );
}
