import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SERVER_URL } from '../../data/constants';
import axios from 'axios';
import Container from '@mui/material/Container';
import { CssBaseline, Grid } from '@mui/material';
import { axiosInstance } from '../../config/axios';
// react functional component
function SingleBlog() {

  const [blog, setBlog] = useState({})
  const { blogID } = useParams()

  // loading blog data from server
  const loader = async () => {
    await axiosInstance.get("/blogs/" + blogID).then((response) => {
      setBlog(response.data)
      console.log('response from axios', response.data)
    })
  }

  useEffect(() => {
    loader()
  }, [])
  return (
    <>
      {blog &&
        <Container style={{ display: "flex", justifyContent: "center" }} component="main" maxWidth="md">
          <CssBaseline />
          <Grid sx={{ textAlign: "center" }}>
            <img className="m-4" style={{borderRadius:"20px", width: 40 + 'rem', height: 17 + "rem" }}  src={blog.blogImageURL} alt="" />
            <h1>{blog.heading}</h1>
            <p>by {blog?.authorID?.userName}</p>
            <p>{blog?.createdAt}</p>
            <p>
              {blog.content}
            </p>
            <br />
          </Grid>
        </Container>
      }
    </>
  )
}

export default SingleBlog