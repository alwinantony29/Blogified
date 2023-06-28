import React, { useContext, useState } from 'react';
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
import { SERVER_URL } from '../../data/constants';
import { userContext } from '../../Context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const defaultTheme = createTheme();

export default function CreateBlog() {
    const navigate = useNavigate()
    const { user } = useContext(userContext)
    const [heading, setHeading] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    let url = ""
    const handleImage = async (event) => {
        setImage(event.target.files[0])
        try {
            const formData = new FormData();
            formData.append('file', event.target.files[0]);
            formData.append('upload_preset', 'upload_preset_name');
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/ddh0reqyx/image/upload',
                formData
            )
            console.log(response.data.url);
            url += response.data.url
            console.log('Image uploaded:', url);
        } catch (err) {
            console.log(err);
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = sessionStorage.getItem("token")
            console.log(user);
            axios.post(SERVER_URL + 'blogs', {
                blogData: {
                    heading, content, authorName: user.userName,
                    authorImageURL: user.userImageURL,
                    blogImageURL: url,
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            ).then((res) => {
                console.log(res);
                navigate('/')
            })
        } catch (e) {
            console.log("error  while uploading image" + e);
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
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            id="heading"
                            label="Heading"
                            name="heading"
                            autoFocus
                        />
                        <input type="file" required onChange={handleImage} />

                        {/* checking if user chose an image */}
                        {
                            image ? <img src={URL.createObjectURL(image)} className='mt-3' style={{ width: "30 rem", height: "20rem", borderRadius: "10px" }} alt="" /> : <></>
                        }
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