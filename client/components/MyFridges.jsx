import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function BasicMenu({selectFridge}) {
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
        <MenuItem onClick={() => selectFridge('olaf')}>olaf</MenuItem>
        <MenuItem onClick={() => selectFridge('carrot')}>carrot</MenuItem>
        <MenuItem onClick={() => selectFridge('friend')}>friend</MenuItem>
        <MenuItem onClick={() => alert('hello')}>hello</MenuItem>
      </Menu>
    </div>
  );
}
