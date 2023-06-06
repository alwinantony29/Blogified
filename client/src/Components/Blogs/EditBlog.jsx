import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { SERVER_URL } from '../../data/constants';
import { userContext } from '../../Context/userContext';
import { useNavigate, useParams } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function EditBlog() {

    const navigate = useNavigate()
    const { blogID } = useParams()
    const [blog, setBlog] = React.useState({})
    const { user } = React.useContext(userContext)
    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await axios.put(SERVER_URL + 'edit-blog/', {
                heading, content,  date: new Date(),userID:user.uid
            }).then((response) => {
                console.log(response);
                navigate('/myblogs')
            })
        } catch (e) {
            console.log("error adich while updating blog" + e);
        }
    }
    // loading blog data from server
    const loader = async () => {
        await axios.get(SERVER_URL + blogID).then((response) => {
            setBlog(response.data)
            console.log('response from axios', response.data)
        })
    }

    React.useEffect(() => {
        loader()
    }, [])

    const [heading, setHeading] = React.useState(blog.heading)
    const [content, setContent] = React.useState(blog.content)
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
                    <Typography component="h1" variant="h5">
                        Edit Blog
                    </Typography>
                    <Box  noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            id="heading"
                            label=""
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
                            label=""
                            id="content"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleUpdate}
                        >
                            Update Blog
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}