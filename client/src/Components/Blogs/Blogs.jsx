import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axios';
import "./style.css"

export async function loader() {
  try {
    const response = await axiosInstance.get("/blogs")
    console.log("loader call");
    return (response.data.result)
  } catch (err) {
    return ([])
  }
}

export function Blogs() {

  const navigate = useNavigate()
  const [blogData, setblogData] = useState([])
  const data= useLoaderData()

  useEffect(()=>{
    setblogData(data);
  },[data])
  
  return (
    <>
      <div className="container-fluid">
        {blogData.map((blog) => {
          return (
            <div key={blog._id}>
              <div className='content'>
                <h1>{blog.heading}</h1>
                <span>By  {blog.authorID.userName}</span><br />
                <span>On {blog.createdAt}</span>
                <p> {blog.content.substr(0, 260)} ...</p>
                <button className='btn btn-primary' onClick={() => navigate(`/blogs/${blog._id}`)}>
                  Read more...
                </button>
              </div>
              <div className='img-div'>
                <img src={blog.blogImageURL} alt="" />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}


