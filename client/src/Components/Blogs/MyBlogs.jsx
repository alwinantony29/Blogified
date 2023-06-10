import  React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../../data/constants';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/userContext';
import "./style.css"
export function MyBlogs() {
  const navigate = useNavigate()
  const [blogData, setblogData] = useState([])
  const { user } = React.useContext(userContext)
  // function to load blogs from server 
  const loader = async () => {
    await axios.get(SERVER_URL + `myblogs/${user.uid}`).then((response) => {
      setblogData(response.data)
      console.log(response.data);
    })
  }
  const deleteBlog = (ID) => {
    if (confirm("U sure u wanna delete that")) {
      axios.delete(SERVER_URL + `myblogs/${ID}`).then(() => {
        console.log('blog deleted');
        redirect('/myblogs')
      })
    } else { alert("cancelled") }
  }
  useEffect(() => {
    loader()
  }, [])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {blogData.map((blog) => {
            return (
              < >
                <div key={blog._id} className='content'>
                  <h1>{blog.heading}</h1>
                  <span>By  {blog.authorName}</span>
                  <p> {blog.content.substr(0, 260)} ...</p>
                  <button className='btn btn-primary' onClick={() => navigate(`/blog/${blog._id}`)}> Read more...</button>
                  <button className='btn btn-primary' onClick={() => navigate(`/edit/${blog._id}`)}>Edit blog</button>
                  <button className='btn btn-danger' onClick={() => { deleteBlog(blog._id) }}>Delete blog</button>
                </div>
                <div className='img-div'>
                  <img src="https://cdn.aglty.io/blog-starter-2021-template/posts/gaddafi-rusli-2ueUnL4CkV8-unsplash%201.jpg?q=60&w=768&format=auto" alt="" />
                </div>
              </>
            )
          })}


        </div>
      </div>
    </>
  );
}


