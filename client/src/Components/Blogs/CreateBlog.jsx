import { useState } from 'react';
import {
    Avatar, Button, CssBaseline, TextField,
    FormControlLabel, Checkbox, Link, Grid, Box, Typography,
    Container, createTheme, ThemeProvider, Stack, CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from '../../config/axios';

const defaultTheme = createTheme();

export default function CreateBlog() {
    const navigate = useNavigate()
    const [blog, setBlog] = useState({});
    const [uploading, setUploading] = useState(false)

    const handleImage = async (event) => {
        setBlog({ ...blog, blogImageURL: URL.createObjectURL(event.target.files[0]) })
        try {
            setUploading(true)
            const formData = new FormData();
            formData.append('file', event.target.files[0]);
            formData.append('upload_preset', 'upload_preset_name');
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/ddh0reqyx/image/upload',
                formData
            )
            setBlog({ ...blog, blogImageURL: response.data.url })
            console.log('Image uploaded');
            setUploading(false)

        } catch (err) {
            alert("" + err)
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/blogs', { blog })
            console.log(response.data);
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container component="main" maxWidth="sm" >
            <Typography component="h1" variant="h5"
                sx={{ my: 3, textAlign: 'center' }}>
                New Blog
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate >
                <Stack sx={{ gap: 3, alignItems: 'center', }}>

                    <TextField
                        variant='standard'
                        required
                        fullWidth
                        value={blog.heading}
                        onChange={(e) => setBlog({ ...blog, heading: e.target.value })}
                        id="heading"
                        label="Heading"
                        name="heading"
                        autoFocus
                    />
                    <input type="file" required onChange={handleImage} />
                    {blog.blogImageURL &&
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '15rem',
                                borderRadius: '10px',
                            }}
                        >
                            <Box
                                component='img'
                                src={blog.blogImageURL}
                                sx={{
                                    opacity: uploading ? '50%' : '100%',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '10px',
                                }}
                                alt="blog image"
                            />
                            {uploading && (
                                <CircularProgress size={60} sx={{ color: "white", overflow: 'hidden', position: 'absolute' }} />
                            )}
                        </Box>

                    }
                    <TextField
                        variant='standard'
                        multiline
                        required
                        fullWidth
                        onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                        value={blog.content}
                        name="content"
                        label="Content"
                        id="content"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit Blog
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}