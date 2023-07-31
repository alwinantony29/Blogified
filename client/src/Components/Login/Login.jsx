import { auth, provider } from '../../config/firebase';
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { userContext } from '../../Context/userContext';
import { axiosInstance, updateToken } from '../../config/axios';
import { Backdrop, CircularProgress } from '@mui/material';
import { toast } from 'react-hot-toast';

 
export default function Login() {
  const [isloading, setIsloading] = useState(false)
  const { setUser } = useContext(userContext)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    setIsloading(true)
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const gogleToken = credential.accessToken;
        // The signed-in user info.
        console.log("user logIn info : ", result.user);
        const { email, displayName: userName, uid: userID, photoURL: userImageURL } = result.user
        const response = await axiosInstance.post("/auth/signup", {
          credentials: {
            email: email, userName: userName,
            userID: userID, userImageURL: userImageURL
          }
        }
        )
        const { token, user } = response.data
        toast.success("Login succesfull")
        sessionStorage.setItem('token', token);
        setUser(user)
        sessionStorage.setItem('user', JSON.stringify(user))
        updateToken(token)
        // IdP data available using getAdditionalUserInfo(result)
        navigate('/')

      }).catch((error) => {
        toast.error("Login failed")
        setIsloading(false)
        console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: 10 }}
        open={isloading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In with Google
            </Button>
            
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            /> */}
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </>
  );
}