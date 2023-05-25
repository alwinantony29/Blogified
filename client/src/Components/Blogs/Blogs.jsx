import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {SERVER_URL}  from '../../data/constants';
import axios from 'axios';
import { useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom';
export default async function loader(){
  console.log('loader working');
  try{ 
      const blogs=await axios.get(SERVER_URL)  
      if(!blogs)throw new Error("no blogs found")
      
      return {blogs}
} catch(e){
    console.log(e);
   } 
}
export function Blogs() {
  const navigate=useNavigate()
  const [blogData, setblogData] = React.useState([])
  const loaderData=useLoaderData()
  setblogData(loaderData.blogs.data)
  console.log(loaderData.blogs.data);
  return (
    <>
      <div className="container-fluid">
        <div className="row m-5">
        {blogData.map((blog,i)=>{
          return(<div key={i} className="col-md-6">
    <Card  sx={{ maxWidth: 345,bgcolor:red[110] }}>
      <CardHeader
        avatar={
          <Avatar src={blog.authorImageURL} sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={blog.heading}
        subheader={blog.date.toString().substr(0,10)}
      />
      <CardMedia
      onClick={()=>navigate('/blog')}
        component="img"
        height="194"
        image={blog.blogImageURL}
        alt="blog image"
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
        {blog.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card></div>)
        })}
        </div>
      </div>
    </>
  );
}


