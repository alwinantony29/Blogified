import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import {
  MenuItem,
  Tooltip,
  Avatar,
  Container,
  Menu,
  Typography,
  AppBar,
  Box,
  Toolbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import SwipeableTemporaryDrawer from "./SwipableTemporaryDrawer";
import { updateToken } from "../../config/axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, setUser } from "@/store/user/userSlice";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Bye see ya");
        dispatch(setUser(null));
        updateToken(null);
        sessionStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error);
      });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOGIFIED
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <SwipeableTemporaryDrawer /> {/* for mobile devices */}
          </Box>
          <AutoStoriesIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BLOGIFIED
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              ml: 5,
              flexGrow: 1,
              gap: 3,
              color: "white",
              textDecoration: "none",
            }}
          >
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Typography color={"Background"}>HOME</Typography>
            </Link>
            <Link
              to={user ? "/newblog" : "/login"}
              style={{ textDecoration: "none" }}
            >
              <Typography color={"Background"}>NEW BLOG</Typography>
            </Link>
            {user && (
              <Link to={"/myblogs"} style={{ textDecoration: "none" }}>
                <Typography color={"Background"}>MY BLOGS</Typography>
              </Link>
            )}
          </Box>

          {/* Right side user avatar code */}

          <Box sx={{ flexGrow: 0 }}>
            {user && (
              <Typography
                sx={{
                  m: 2,
                  color: "white",
                  display: { xs: "none", sm: "inline" },
                }}
              >
                Welcome back {user?.userName}
              </Typography>
            )}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src={user ? user.userImageURL : ""} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* if user loggedIn then show logout else show login buttons */}

              {user
                ? [
                    <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={handleLogout}>
                        {"Logout"}
                      </Typography>
                    </MenuItem>,
                    <MenuItem key={"my-blogs"} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => navigate("/myblogs")}
                      >
                        My Blogs
                      </Typography>
                    </MenuItem>,
                    <MenuItem key={"my-profile"} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => navigate("/myprofile")}
                      >
                        My Profile
                      </Typography>
                    </MenuItem>,
                    <>
                      {user.role === "admin" && (
                        <MenuItem
                          key={"dashboard"}
                          onClick={handleCloseUserMenu}
                        >
                          <Typography
                            textAlign="center"
                            onClick={() => navigate("/admin")}
                          >
                            Dashboard
                          </Typography>
                        </MenuItem>
                      )}
                    </>,
                  ]
                : [
                    <MenuItem key={"login"} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </Typography>
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
