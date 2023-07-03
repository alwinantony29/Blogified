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
            console.log(user);
            createdAt = new Date(createdAt).toLocaleDateString()
            return (
              <FlexBetween key={_id}>
                <Stack sx={{ justifyContent: 'space-evenly' }} width={'50%'}>
                  <FlexBox gap={1}>
                    <Typography> {user.userName} </Typography>
                    <Typography>{createdAt}</Typography>
                  </FlexBox>
                  <Typography variant='h5' sx={{ fontWeight: '700' }}>{heading}</Typography>
                  <Typography>{content}.</Typography>
                  {/* add category */}
                  <Link to={`/blogs/${_id}`}>
                    <Button sx={{ alignSelf: 'flex-start' }}  >Read more</Button>
                  </Link>
                </Stack>
                <FlexBox sx={{ width: "40%", maxHeight: "auto", borderRadius: 3 }}>
                  <img src={blogImageURL} alt="blog image" />
                </FlexBox>
              </FlexBetween>)
          })}
        </Stack>
      </Container>

    </>
  )
}


