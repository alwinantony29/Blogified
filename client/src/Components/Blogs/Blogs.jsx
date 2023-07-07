import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { axiosInstance } from '../../config/axios';
import "./style.css"
import { Box, Button, Container, Stack, Typography, styled } from '@mui/material';
export async function loader() {
  try {
    const response = await axiosInstance.get("/blogs")
    return (response.data.result)
  } catch (err) {
    // alert("" + err)
    return ([])
  }
}

export function Blogs() {
  const [blogData, setblogData] = useState([])
  const data = useLoaderData()

  useEffect(() => {
    setblogData(data);
  }, [data])
  const FlexBox = styled(Box)({ display: 'flex' })
  const FlexBetween = styled(Box)({ display: 'flex', justifyContent: 'space-between' })
  return (
    <>

      <Container maxWidth='md' sx={{ my: 3 }}>
        <Stack gap={4}>
          {blogData.map(({ _id, heading, content, blogImageURL, createdAt, authorID: user }) => { //destructuring values
            createdAt = new Date(createdAt)
            const options = { month: 'long', day: 'numeric' };
            createdAt = createdAt.toLocaleDateString('en-US', options);
            content = content.slice(0, 200) + "...";
            return (
              <FlexBetween key={_id}>
                <Stack sx={{ justifyContent: 'space-evenly' }} width={'50%'}>
                  <FlexBox gap={1}>
                    <Typography> {user.userName} </Typography>
                    <Typography>{createdAt}</Typography>
                  </FlexBox>
                  <Typography variant='h5' sx={{ fontWeight: '700' }}>{heading}</Typography>
                  <Typography sx={{ display: { xs: "none", md: "flex" } }}>{content}</Typography>
                  {/* add category */}
                  <Link to={`/blogs/${_id}`}>
                    <Button sx={{ alignSelf: 'flex-start' }}  >Read more</Button>
                  </Link>
                </Stack>
                <FlexBox sx={{ alignItems: 'center' }}>
                  <Box component="img" src={blogImageURL}
                    sx={{ maxHeight: { xs: "20vh", md: "30vh" }, borderRadius: 3, aspectRatio: { xs: "6/5", md: "2/1" } }}
                    alt="blog image" />
                </FlexBox>
              </FlexBetween>)
          })}
        </Stack>
      </Container>

    </>
  )
}


