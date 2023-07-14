import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axios';
import "./style.css"
import { Box, Button, Container, Stack, Typography, styled, Pagination } from '@mui/material';

export function Blogs() {
  const navigate = useNavigate()
  const [blogData, setblogData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const FlexBox = styled(Box)({ display: 'flex' })
  const FlexBetween = styled(Box)({ display: 'flex', justifyContent: 'space-between' })

  const loader = async (pageNumber = 1) => {
    try {
      const response = await axiosInstance.get(`/blogs?page=${pageNumber}`)
      const { result, totalDocuments } = response.data
      setblogData(result)
      setTotalPages(Math.ceil(totalDocuments / 10))
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loader()
  }, [])

  const handlePage = (event, value) => {
    loader(value)
  }

  return (
    <>
      <Container maxWidth='md' sx={{ py: 5, }}>
        <Stack gap={4} sx={{ alignItems: 'center' }}>
          {blogData.map(({ _id, heading, content, blogImageURL, createdAt, authorID: user }) => { //destructuring values
            createdAt = new Date(createdAt)
            const options = { month: 'long', day: 'numeric' };
            createdAt = createdAt.toLocaleDateString('en-US', options);
            content = content.slice(0, 200) + "...";
            return (
              <FlexBetween gap={2} width={"100%"} key={_id}>
                <Stack  sx={{ justifyContent: 'space-evenly' }} width={'50%'}>
                  <FlexBox gap={2}>
                    <Typography> {user.userName} </Typography>
                    <Typography>{createdAt}</Typography>
                  </FlexBox>
                  <Typography variant='h5' sx={{ fontWeight: '700' }}>{heading}</Typography>
                  <Typography sx={{ display: { xs: "none", sm: "flex" } }}>{content}</Typography>
                  {/* add category */}
                  <Link to={`/blogs/${_id}`}>
                    <Button sx={{ alignSelf: 'flex-start' }}  >Read more</Button>
                  </Link>
                </Stack>
                <FlexBox sx={{ alignItems: 'center' }}>
                  {/* aspectRatio: { xs: "6/5", md: "2/1" } */}
                  <Box component="img" src={blogImageURL}
                    sx={{
                      height: { xs: "20vh", sm: "25vh", md: "30vh" }, borderRadius: 3,
                      objectFit: 'cover', width: { xs: "40vw",lg:"30vw" }
                    }}
                    alt="blog image" />
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
  )
}


