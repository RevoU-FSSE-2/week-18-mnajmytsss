import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CustomButton from '../Button';
import { Button } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../../assets/logo.png'
import './index.css'

const pages = ['project milestone 3 mnajmytsss'];

function NavBar() {
  const [ setAnchorElNav] = React.useState(null);

  const token = localStorage.getItem('token')
  console.log(token)

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  return (
    <AppBar className='appbar' sx={{ backgroundColor: '#f6f6f6' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img src={logo} className='logo'/>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h2"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={logo} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {token &&
              pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    display: 'block',
                    fontSize: '1.7rem',
                    position: 'relative',
                    overflow: 'hidden',
                    marginLeft: '3rem',
                    '&:hover': {
                      color: 'white',
                      '&::before': {
                        background: `linear-gradient(to right, #0e4163, #8e44ad)`,
                      },
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: -1,
                      transition: 'background 0.3s ease-in-out',
                      clipPath: 'inset(0 0 0 100%)',
                      WebkitClipPath: 'inset(0 0 0 100%)',
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
          </Box>
          {console.log("Token:", token)}
          {token ? (
            <CustomButton onClick={handleSignOut}>Sign Out</CustomButton>) : 
          (<CustomButton href={'/register'}>Sign Up</CustomButton>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;