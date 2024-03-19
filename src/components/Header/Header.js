import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Hidden } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoSvg from '../../photos/logo.svg'; // Import your SVG logo file

const Header = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    setOpen(isOpen);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={RouterLink} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/contact-us">
          <ListItemText primary="Contact Us" />
        </ListItem>
        <ListItem button component={RouterLink} to="/about-us">
          <ListItemText primary="About Us" />
        </ListItem>
        <ListItem button component={RouterLink} to="/privacy-policy">
          <ListItemText primary="Privacy Policy" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <AppBar position="fixed" color='transparent' sx={{ width: '100%', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Hidden mdUp>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <img src={LogoSvg} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6">
            Speed Reading 
          </Typography>
        </RouterLink>
        <div>
          <Hidden smDown>
            <Button color="inherit" component={RouterLink} to="/">Home</Button>
            <Button color="inherit" component={RouterLink} to="/contact-us">Contact Us</Button>
            <Button color="inherit" component={RouterLink} to="/about-us">About Us</Button>
            <Button color="inherit" component={RouterLink} to="/privacy-policy">Privacy Policy</Button>
          </Hidden>
        </div>
      </Toolbar>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </AppBar>
  );
};

export default Header;
