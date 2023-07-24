import React, { useEffect, useState } from 'react';
import { Link, } from 'react-router-dom';
import { axiosInstance } from '../../config/axios';
import { Backdrop, Box, Button, CircularProgress, Container, Pagination, Stack, Typography, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function MyBlogs() {
  const [blogData, setblogData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [isloading, setIsloading] = useState(false)

  const FlexBox = styled(Box)({ display: 'flex' })
  const FlexBetween = styled(Box)({ display: 'flex', justifyContent: 'space-between' })

  // function to load blogs from server 
  const loader = async (pageNumber = 1) => {
    console.log("page: " + pageNumber);
    try {
      setIsloading(true)
      const response = await axiosInstance.get(`/blogs/myblogs?page=${pageNumber}`)
      const { result, totalDocuments } = response.data
      setblogData(result)
      setTotalPages(Math.ceil(totalDocuments / 10))
    } catch (err) {
      setIsloading(false)
      console.log(err);
    }
  }

  const deleteBlog = async (ID) => {
    if (confirm("U sure u wanna delete that")) {
      try {
        const response = await axiosInstance.delete(`/blogs/${ID}`)
        console.log(response.data.message);
        setblogData(blogData.filter(({ _id }) => { return _id !== ID }))
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handlePage = (event, value) => {
    loader(value)
  }

  useEffect(() => {
    console.log("Myblog useeffect");
    loader()
  }, [])

  return (
    <>
    {/* loading animation  */}
      <Backdrop
        sx={{ color: '#fff', zIndex: 10 }}
        open={isloading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* end of the loding animaition*/}

      <Container maxWidth='md' sx={{ my: 5 }}>
        <Stack gap={4} sx={{ alignItems: 'center' }}>

          {blogData.map(({ _id, heading, content, blogImageURL, createdAt }) => { //destructuring values            
            createdAt = new Date(createdAt)
            const options = { month: 'long', day: 'numeric' };
            createdAt = createdAt.toLocaleDateString('en-US', options);
            content = content.slice(0, 200) + "...";
            return (

              <FlexBetween key={_id} gap={2} width={"100%"}>
                <Stack sx={{ justifyContent: 'space-evenly' }} width={'50%'}>
                  <Typography>{createdAt}</Typography>
                  <Typography variant='h5' sx={{ fontWeight: '700' }}>{heading}</Typography>
                  <Typography sx={{ display: { xs: "none", sm: "flex" } }}>{content}</Typography>
                  {/* add category */}
                  <FlexBox gap={1}>
                    <Link to={`/blogs/${_id}`}>
                      <Button >Read more</Button>
                    </Link>
                    <Link to={`/edit/${_id}`}>
                      <Button  > <EditIcon /> </Button>
                    </Link>
                    <Button onClick={() => deleteBlog(_id)} ><DeleteIcon /></Button>
                  </FlexBox>
                </Stack>
                <FlexBox sx={{ alignItems: 'center' }}>
                  <Box component="img" src={blogImageURL}
                    sx={{
                      height: { xs: "20vh", sm: "25vh", md: "30vh" }, borderRadius: 3,
                      objectFit: 'cover', width: { xs: "40vw", lg: "30vw" }
                    }} alt="blog image" />
                </FlexBox>
              </FlexBetween>)
          })}
          {totalPages > 1 &&
            <Pagination
              onChange={handlePage} count={totalPages} defaultPage={1}
              siblingCount={1} color="primary"
            />}
        </Stack>
      </Container>
    </>
  );
}


