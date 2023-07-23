import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container';
import { Box, Stack } from '@mui/material';
import { axiosInstance } from '../../config/axios';

function SingleBlog() {

  const [blog, setBlog] = useState({})
  const { blogID } = useParams()

  // loading blog data 
  const loader = async () => {
    await axiosInstance.get("/blogs/" + blogID).then((response) => {
      const result = response.data.result
      // lets convert the date, cause it was converted to string while getting here
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      result.createdAt = new Date(result.createdAt).toLocaleDateString('en-US', options)
      setBlog(result)
    })
  }

  useEffect(() => {
    console.log("view blog useeffect");
    loader()
  }, [])
  return (
    <>
      <Container component="main" maxWidth="md">
        <Stack gap={2} sx={{ my: 4, alignItems: 'center' }}>
          <Box component='img' sx={{
            borderRadius: "20px",
            width: { xs: '95%', sm: "30rem", md: '40rem' }, height: "17rem"
          }}
            src={blog.blogImageURL} alt="blog image" />
          <h1>{blog.heading}</h1>
          <p> {blog.authorID?.userName}  {blog.createdAt}</p>
          <p> {blog.content} </p>
        </Stack>
      </Container>

    </>
  )
}

export default SingleBlog