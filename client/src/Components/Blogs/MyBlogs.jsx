import React, { useEffect, useState } from 'react';
import { Link,  } from 'react-router-dom';
import { axiosInstance } from '../../config/axios';
import { Box, Button, Container, Stack, Typography, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function MyBlogs() {
  const [blogData, setblogData] = useState([])

  // function to load blogs from server 
  const loader = async () => {
    await axiosInstance.get(`/blogs/myblogs`).then((response) => {
      setblogData(response.data.result)
    })
  }
  const deleteBlog = async(ID) => {
    if (confirm("U sure u wanna delete that")) {
      const response=await axiosInstance.delete(`/blogs/${ID}`)
        console.log(response.data.message);
        setblogData(blogData.filter(({_id})=>{return _id!==ID}))
    }
  }
  useEffect(() => {
    loader()
  }, [])

  const FlexBox = styled(Box)({ display: 'flex' })
  const FlexBetween = styled(Box)({ display: 'flex', justifyContent: 'space-between' })

  return (
    <>

      <Container maxWidth='md' sx={{ my: 3 }}>
        <Stack gap={4}>
          {blogData.map(({ _id, heading, content, blogImageURL, createdAt }) => { //destructuring values
            createdAt = new Date(createdAt).toLocaleDateString()
            return (
              <FlexBetween key={_id}>
                <Stack sx={{ justifyContent: 'space-evenly' }} width={'50%'}>
                  <FlexBox gap={1}>
                    <Typography>{createdAt}</Typography>
                  </FlexBox>
                  <Typography variant='h5' sx={{ fontWeight: '700' }}>{heading}</Typography>
                  <Typography>{content}.</Typography>
                  {/* add category */}
                  <FlexBox gap={1}>
                    <Link to={`/blogs/${_id}`}>
                      <Button >Read more</Button>
                    </Link>
                    <Link to={`/edit/${_id}`}>
                      <Button  > <EditIcon/> </Button>
                    </Link>
                    <Button onClick={() => deleteBlog(_id)} ><DeleteIcon/></Button>
                  </FlexBox>
                </Stack>
                <FlexBox sx={{ width: "40%", maxHeight: "auto", borderRadius: 3 }}>
                  <img src={blogImageURL} alt="blog image" />
                </FlexBox>
              </FlexBetween>)
          })}
        </Stack>
      </Container>
    </>
  );
}


