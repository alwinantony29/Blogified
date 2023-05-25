import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { SERVER_URL } from '../../data/constants';
import { userContext } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CreateBlog() {
    const navigate=useNavigate()
    const { user } = React.useContext(userContext)
    const [heading, setHeading] = React.useState('')
    const [content, setContent] = React.useState('')
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(SERVER_URL + 'newblog', {
                heading, content, authorName: user.displayName, authorImageURL: '', date: new Date(),
                blogImageURL: 'https://wallpapers.com/images/thumbnail/akatsuki-yahiko-six-paths-of-pain-iynerr1vanp0fulx.webp', 
                likedCount: 0,
            }).then((response)=>{
                console.log(response);
                navigate('/')
            })
        } catch (e) {
            console.log("error adich while sending new blog" + e);
        }

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
                    <Typography component="h1" variant="h5">
                        New Blog
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            id="heading"
                            label="Heading"
                            name="heading"
                            autoFocus
                        />
                        <TextField
                            multiline
                            rows={10}
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            name="content"
                            label="Content"
                            id="content"
                        />
                        {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit Blog
                        </Button>
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
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    );
}