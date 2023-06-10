import  React, { useContext, useState } from 'react';
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
  } from '@mui/material';import axios from 'axios';
import { SERVER_URL } from '../../data/constants';
import { userContext } from '../../Context/userContext';
import { useNavigate } from 'react-router-dom';
import {  cloud} from "./../../cloudinary/config";

const defaultTheme = createTheme();

export default function CreateBlog() {
    const navigate=useNavigate()
    const { user } = useContext(userContext)
    const [heading, setHeading] =useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(new Blob)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(SERVER_URL + 'newblog', {
                authorID:user.uid,
                heading, content, authorName: user.displayName, 
                authorImageURL: '', 
            }).then((response)=>{
                console.log(response);
                navigate('/')
            })
        } catch (e) {
            console.log("error  while sending new blog" + e);
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
                        <input type="file" required onChange={(e)=>{setImage(e.target.files[0])}} />
                        <img src={URL.createObjectURL(image)} className='mt-3' style={{width:30+"rem",height:20+"rem", borderRadius:10+"px"}}alt="" />
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