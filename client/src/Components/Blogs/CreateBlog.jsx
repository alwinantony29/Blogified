import { useState } from 'react';
import {
    Button, TextField, Box, Typography, Container, Stack, CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from '../../config/axios';
import { toast } from 'react-hot-toast';

export default function CreateBlog() {
    const navigate = useNavigate()
    const [blog, setBlog] = useState({});
    const [isUploading, setIsUploading] = useState(false)
    const [isSubmiting, setisSubmiting] = useState(false)


    const handleImage = async (event) => {
        setBlog({ ...blog, blogImageURL: URL.createObjectURL(event.target.files[0]) })
        try {
            setIsUploading(true)
            const formData = new FormData();
            formData.append('file', event.target.files[0]);
            formData.append('upload_preset', 'upload_preset_name');
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/ddh0reqyx/image/upload',
                formData
            )
            setBlog({ ...blog, blogImageURL: response.data.url })
            toast.success('Image uploaded');
            setIsUploading(false)

        } catch (err) {
            toast.error("Couldn't upload image try again")
            console.log(err)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setisSubmiting(true)
            const response = await axiosInstance.post('/blogs', { blog })
            console.log(response.data);
            toast.success("Blog posted")
            navigate('/')
        } catch (err) {
            setisSubmiting(false)
            toast.error("Something went wrong")
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
                                    opacity: isUploading ? '50%' : '100%',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '10px',
                                }}
                                alt="blog image"
                            />
                            {
                                isUploading && (
                                    <CircularProgress size={60} sx={{ color: "white", overflow: 'hidden', position: 'absolute' }} />
                                )
                            }
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
                        {
                            isSubmiting ?
                                <CircularProgress color='inherit' size={25} />
                                :
                                <Typography>Save Blog</Typography>
                        }
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}