import React, { useState, useEffect, useContext } from 'react';
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

const defaultTheme = createTheme();

export default function EditBlog() {
  const navigate = useNavigate();
  const { blogID } = useParams();
  const [blog, setBlog] = useState({});
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const { user } = useContext(userContext);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(SERVER_URL + `editblog/${blog._id}`, {
        heading,
        content,
      });
      console.log(response);
      navigate('/myblogs');
    } catch (error) {
      console.log('An error occurred while updating the blog:', error);
    }
  };
  

  const loader = async () => {
    try {
      const response = await axios.get(SERVER_URL + blogID);
      const blogData = response.data;
      setBlog(blogData);
      setHeading(blogData.heading);
      setContent(blogData.content);
      console.log('response from axios', blogData);
    } catch (error) {
      console.log('error occurred while loading blog:', error);
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
          <Typography component="h1" variant="h5">
            Edit Blog
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
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
