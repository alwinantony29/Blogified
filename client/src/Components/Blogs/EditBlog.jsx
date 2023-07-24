import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axios';
import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const defaultTheme = createTheme();

export default function EditBlog() {
  const navigate = useNavigate();
  const { blogID } = useParams();
  const [blog, setBlog] = useState({});
  const [uploading, setUploading] = useState(false)
  const [isSubmiting, setisSubmiting] = useState(false)

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
      setBlog({ ...blog, blogImageURL: response.data.url })
      setUploading(false)

    } catch (err) {
      alert(err);
    }
  }

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      setisSubmiting(true)
      const response = await axiosInstance.put(`/blogs/${blog._id}`, { blog });
      alert(response.data.message);
      navigate('/myblogs');
    } catch (error) {
      setisSubmiting(false)
      alert('An error occurred while updating the blog:' + error);
    }
  };

  useEffect(() => {
    console.log("edit blog useeffect");
    loader();
  }, []);

  return (
    <Container component="main" maxWidth="sm" sx={{ my: 5 }}>
      <Stack gap={3} textAlign={'center'}>
        <Typography component="h1" variant="h4">
          Edit Blog
        </Typography>

        {/* <input type="file" onChange={handleImage} /> */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
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
          <input
            type="file"
            onChange={handleImage}
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              margin: '10px',
              opacity: 70,
              cursor: 'pointer',
            }}
          />
        </div>

        <TextField
          variant='standard'
          required
          fullWidth
          value={blog.heading}
          onChange={(e) => setBlog({ ...blog, heading: e.target.value })}
          id="heading"
          name="heading"
          autoFocus
        />
        <TextField

          variant='standard'
          multiline
          required
          fullWidth
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          value={blog.content || 'heading'}
          name="content"
          id="content"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleUpdate}
        >
          {
            isSubmiting ?
              <CircularProgress color='inherit' size={25} />
              :
              <Typography>Save Blog</Typography>
          }
        </Button>
      </Stack>
    </Container>
  );
}
