import  React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import "./style.css"
import { axiosInstance } from '../../config/axios';
export function MyBlogs() {
  const navigate = useNavigate()
  const [blogData, setblogData] = useState([])
  // function to load blogs from server 
  const loader = async () => {
    await axiosInstance.get( `/blogs/myblogs`).then((response) => {
      setblogData(response.data.result)
      console.log(response.data.result);
    })
  }
  const deleteBlog = (ID) => {
    if (confirm("U sure u wanna delete that")) {
      axiosInstance.delete( `/blogs/${ID}`).then(() => {
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
                  <button className='btn btn-primary' onClick={() => navigate(`/blogs/${blog._id}`)}> Read more...</button>
                  <button className='btn btn-primary' onClick={() => navigate(`/edit/${blog._id}`)}>Edit blog</button>
                  <button className='btn btn-danger' onClick={() => { deleteBlog(blog._id) }}>Delete blog</button>
                </div>
                <div className='img-div'>
                  <img src={blog.blogImageURL} alt="" />
                </div>
              </>
            )
          })}


        </div>
      </div>
    </>
  );
}


