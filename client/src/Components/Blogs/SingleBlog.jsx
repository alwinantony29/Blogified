import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SERVER_URL } from '../../data/constants';
import axios from 'axios';
// react functional component
function SingleBlog() {

  const [blog, setBlog] = useState({})
  const { blogID } = useParams()

  // loading blog data from server
  const loader = async () => {
    await axios.get(SERVER_URL + blogID).then((response) => {
      setBlog(response.data)
      console.log('response from axios', response.data)
    })
  }

  useEffect(() => {
    loader()
  }, [])
  return (
    <>
      <img className='' src={blog.blogImageURL} alt="" />
      <h1>{blog.heading}</h1>
      <p>
        {blog.content}
      </p>
      <br />
      <p>Author Name:{blog?.authorName}</p>
      <p>Author bio</p>
      <p>Date:{blog?.date}</p>
    </>
  )
}

export default SingleBlog