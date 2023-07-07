import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container';
import { CssBaseline, Grid, Stack } from '@mui/material';
import { axiosInstance } from '../../config/axios';

function SingleBlog() {

  const [blog, setBlog] = useState({})
  const { blogID } = useParams()

  // loading blog data 
  const loader = async () => {
    await axiosInstance.get("/blogs/" + blogID).then((response) => {
      setBlog(response.data.result)
    })
  }

  useEffect(() => {
    loader()
  }, [])
  return (
    <>
        <Container component="main" maxWidth="md">
          <Stack gap={2} sx={{my:4,alignItems:'center'}}>
            <img style={{ borderRadius: "20px", width: '40rem', height: "17rem" }} 
            src={blog.blogImageURL} alt="blog image" />
            <h1>{blog.heading}</h1>
            <p>by {blog.authorID?.userName}</p>
            <p> {blog.createdAt} </p>
            <p> {blog.content} </p>
          </Stack>
        </Container>
      
    </>
  )
}

export default SingleBlog