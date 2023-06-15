import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SERVER_URL } from '../../data/constants';
import axios from 'axios';
import Container from '@mui/material/Container';
import { CssBaseline, Grid } from '@mui/material';
// react functional component
function SingleBlog() {

  const [blog, setBlog] = useState({})
  const { blogID } = useParams()

  // loading blog data from server
  const loader = async () => {
    await axios.get(SERVER_URL +"blogs/"+ blogID).then((response) => {
      setBlog(response.data)
      console.log('response from axios', response.data)
    })
  }

  useEffect(() => {
    loader()
  }, [])
  return (
    <>
      <Container  style={{display:"flex",justifyContent:"center"}} component="main" maxWidth="md">
        <CssBaseline/>
        <Grid sx={{textAlign:"center"}}>
        <img className="m-4" style={{width:40+'rem',height:17+"rem"}} fullwidth  src="https://cdn.aglty.io/blog-starter-2021-template/posts/gaddafi-rusli-2ueUnL4CkV8-unsplash%201.jpg?q=60&w=768&format=auto" alt="" />
        <h1>{blog.heading}</h1>
        <p>by {blog?.authorName}</p>
        <p>{blog?.date}</p>
        <p>
          {blog.content}
        </p>
        <br />
        </Grid>
        </Container>
    </>
  )
}

export default SingleBlog