import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axios';

const defaultTheme = createTheme();

export default function EditBlog() {
  const navigate = useNavigate();
  const { blogID } = useParams();
  const [blog, setBlog] = useState({});
  const [uploading, setUploading] = useState(false)

  const loader = async () => {
    try {
      const response = await axiosInstance.get("/blogs/" + blogID);
      const blogData = response.data.result
      setBlog(blogData);
      console.log('response from axios', blogData);
    } catch (error) {
      console.log('error occurred while loading blog:', error);
    }
  };

  const handleImage = async (e) => {
    try {
      setUploading(true)
      setBlog({ ...blog, blogImageURL: URL.createObjectURL(e.target.files[0]) })
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('upload_preset', 'upload_preset_name');
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/ddh0reqyx/image/upload',
        formData
      )
      const { url } = response.data
      setBlog({ ...blog, blogImageURL: response.data.url })
      setUploading(false)

    } catch (err) {
      throw new Error(err);
    }
  }
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.put(`/blogs/${blog._id}`, { blog });
      alert(response);
      navigate('/myblogs');
    } catch (error) {
      alert('An error occurred while updating the blog:'+ error);
    }
  };

  useEffect(() => {
    loader();
  }, []);

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
          <Typography component="h1" variant="h4">
            Edit Blog
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>

            <input type="file" onChange={handleImage} />

            <img src={blog.blogImageURL} className='mt-3' style={{ opacity: uploading ? "50%" : "100%", width: "30 rem", height: "20rem", borderRadius: "10px" }} alt="" />

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
