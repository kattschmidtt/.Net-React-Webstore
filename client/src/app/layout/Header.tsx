import { ShoppingCart } from '@mui/icons-material';
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';

const midLinks = [
  {title: 'catalog', path: '/catalog'},
  {title: 'about', path: '/about'},
  {title: 'contact', path: '/contact'},
];
const rightLinks = [
  {title: 'login', path: '/login'},
  {title: 'register', path: '/register'},
];

interface Props {
  darkMode: boolean;
  handleThemeToggle: () => void;
}

const navStyles = {
  color: 'inherit',
  textDecoration: 'none', 
  typography: 'h6',
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: 'text.secondary'
  }
};

const Header = ({darkMode, handleThemeToggle}: Props) => {
  return (
    <AppBar position='static' sx={{mb: 3}}>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box display='flex' alignItems='center'>
          <Typography 
            variant='h6' 
            component={NavLink} 
            to='/' 
            sx={navStyles}
          >Basic Webstore</Typography>
          <Switch checked={darkMode} onChange={handleThemeToggle}/>
        </Box>
        

        <List sx={{display: 'flex'}}>
          {midLinks.map(({title, path}) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display='flex' alignItems='center'>
          <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{mr: 2}}>
            <Badge badgeContent='4' color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{display: 'flex'}}>
            {rightLinks.map(({title, path}) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;