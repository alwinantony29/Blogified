import { auth, provider } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { userContext } from "../../Context/userContext";
import { axiosInstance, updateToken } from "../../config/axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { toast } from "react-hot-toast";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const googleToken = credential.accessToken;
        // The signed-in user info.
        console.log("user logIn info : ", result.user);
        const {
          email,
          displayName: userName,
          uid: userID,
          photoURL: userImageURL,
        } = result.user;
        const response = await axiosInstance.post("/auth/signup", {
          credentials: {
            email: email,
            userName: userName,
            userID: userID,
            userImageURL: userImageURL,
          },
        });
        const { token, user } = response.data;
        toast.success("Login successful");
        sessionStorage.setItem("token", token);
        setUser(user);
        sessionStorage.setItem("user", JSON.stringify(user));
        updateToken(token);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Login failed");
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In with Google
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
