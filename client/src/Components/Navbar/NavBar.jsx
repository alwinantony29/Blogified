import React, { useContext, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { redirect, useNavigate } from "react-router-dom";
import { userContext } from '../../Context/userContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

function NavBar() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(userContext)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BLOGIFIED
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key={'Home'} onClick={handleCloseNavMenu}>
                <Typography onClick={() => navigate(`/`)} textAlign="center">HOMEs</Typography>
              </MenuItem>
              <MenuItem key={'New Blog'} onClick={handleCloseNavMenu}>
                <Typography onClick={() => navigate(`/newblog`)} textAlign="center">NEW BLOG</Typography>
              </MenuItem>
              <MenuItem key={'Contact Us'} onClick={handleCloseNavMenu}>
                <Typography onClick={() => navigate(`/contactus`)} textAlign="center">CONTACT US</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            BLOGIFIE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key='Home'
              // onClick={handleCloseNavMenu}
              onClick={() => navigate(`/`)}
              sx={{ my: 2, color: 'white', display: 'block' }}
            > HOME
            </Button>
            <Button
              key='New Blog'
              onClick={() => navigate('/newblog')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            > NEW BLOG
            </Button>
            <Button
              key='ContactUs'
              // onClick={handleCloseNavMenu}
              onClick={() => navigate(`/contactus`)}
              sx={{ my: 2, color: 'white', display: 'block' }}
            > CONTACT US
            </Button>
          </Box>

          {/* right side user image code */}

          <Box sx={{ flexGrow: 0 }}>
            <Button sx={{ my: 2, color: 'white', display: 'inline' }}>{user ? `Hey ${user.userName}` : 'sign in cheyy mwonu'}
            </Button>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Image" src={user ? user.userImageURL : ''} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* if user loggedIn then show logout else show login buttons */}
              {user ? [
                <MenuItem key={'logout'} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => signOut(auth).then(() => {
                    // Sign-out successful.
                    console.log('logout succesfull')
                    setUser(null)
                    // Clear the entire sessionStorage
                    sessionStorage.clear();
                  }).catch((error) => {
                    console.log(error);
                  })}>{'Logout'}</Typography>
                </MenuItem>] :

                [<MenuItem key={'login'} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => navigate('/login')} >Login</Typography>
                </MenuItem>]}
              <MenuItem key={'myblogs'} onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={() => navigate('/myblogs')} >My Blogs</Typography>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;