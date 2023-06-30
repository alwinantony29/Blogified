import { useState } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
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
            navigate('/')
        } catch (err) {
            alert(""+err);
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
                    <Typography component="h1" variant="h5">
                        New Blog
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
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

                        {/* checking if user chose an image */}

                        <img src={blog.blogImageURL} className='mt-3' style={{ opacity: uploading ? "50%" : "100%", width: "30 rem", height: "20rem", borderRadius: "10px" }} alt="" />

                        <TextField
                            multiline
                            rows={10}
                            margin="normal"
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
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}