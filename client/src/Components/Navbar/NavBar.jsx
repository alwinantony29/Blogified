import React, { useContext, useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { MenuItem, Tooltip, Avatar, Container, Menu, Typography, AppBar, Box, Toolbar } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { userContext } from '../../Context/userContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
// import { useToast } from "@chakra-ui/toast"
import SwipeableTemporaryDrawer from './SwipableTemporaryDrawer';
import { updateToken } from '../../config/axios';

function NavBar() {
  // const toast = useToast()
  const navigate = useNavigate()
  const { user, setUser } = useContext(userContext)
  const [anchorElUser, setAnchorElUser] = useState(null);
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")))
    // toast({
    //   title: "Account created.",
    //   description: "We've created your account for you.",
    //   status: "success",
    //   duration: 9000,
    //   isClosable: true,
    // })
  }, [])
  const handleLogout=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('logout succesfull')
      setUser(null)
      updateToken(null)
      // Clear the entire sessionStorage
      sessionStorage.clear();
      navigate('/login')
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
            <SwipeableTemporaryDrawer />

          </Box>
          <AutoStoriesIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography variant="h5" noWrap component="a" href=""
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1, fontFamily: 'monospace',
              fontWeight: 700, letterSpacing: '.3rem',
              color: 'inherit', textDecoration: 'none',
            }}
          >
            BLOGIFIED
          </Typography>
          <Box sx={{ ml: 5, flexGrow: 1, gap: 3, color: 'white', display: { xs: 'none', md: 'flex' } }}>
            {[{ value: "HOME", link: '/' }, { value: "NEW BLOG", link: '/newblog' }, { value: "MY BLOGS", link: '/myblogs' }]
              .map(({ value, link }) => {
                return (
                  <Link to={link} key={value}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  > <Typography color={'Background'}>
                      {value}
                    </Typography>
                  </Link>
                )
              })}
          </Box>

          {/* right side user image code */}

          <Box sx={{ flexGrow: 0 }}>
            <Typography sx={{ m: 2, color: 'white', display: {xs:"none",sm:'inline'} }}>
              {user ? `Welcome back ${user.userName}` : 'sign in cheyy mwonu'}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Image" src={user ? user.userImageURL : 'B'} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar" anchorEl={anchorElUser}
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
                  <Typography textAlign="center" onClick={handleLogout}>{'Logout'}
                  </Typography>
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
    </AppBar >
  );
}
export default NavBar;