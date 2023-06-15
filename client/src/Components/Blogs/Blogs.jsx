import * as React from 'react';
import { SERVER_URL } from '../../data/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style.css"
export function Blogs() {
  const navigate = useNavigate()
  const [blogData, setblogData] = React.useState([])

  // function to load blogs from server 
  const loader = async () => {
    await axios.get(SERVER_URL + "blogs").then((response) => {
      setblogData(response.data)
    })
  }
  React.useEffect(() => {
    loader()
  }, [])
  return (
    <>
      <div className="container-fluid">
        {blogData.map((blog) => {
          return (
            < >
              <div key={blog._id} className='content'>
                <h1>{blog.heading}</h1>
                <span>By  {blog.authorName}</span>
                <p> {blog.content.substr(0, 260)} ...</p>
                <button className='btn btn-primary' onClick={() => navigate(`/blogs/${blog._id}`)}> Read more...</button>
              </div>
              <div className='img-div'>
                <img src="https://cdn.aglty.io/blog-starter-2021-template/posts/gaddafi-rusli-2ueUnL4CkV8-unsplash%201.jpg?q=60&w=768&format=auto" alt="" />
              </div>
            </>
          )
        })}
      </div>
    </>
  );
}


