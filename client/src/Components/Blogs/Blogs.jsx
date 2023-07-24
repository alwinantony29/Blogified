import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axios';
import { Box, Button, Container, Stack, Typography, styled, Pagination, Avatar, Backdrop, CircularProgress, } from '@mui/material';

export function Blogs() {
  const [blogData, setblogData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [isloading, setIsloading] = useState(true)

  const FlexBox = styled(Box)({ display: 'flex' })
  const FlexBetween = styled(Box)({ display: 'flex', justifyContent: 'space-between' })

  const loader = async (pageNumber = 1) => {
    try {
      setIsloading(true)
      const response = await axiosInstance.get(`/blogs?page=${pageNumber}`)
      const { result, totalDocuments } = response.data
      setblogData(result)
      setTotalPages(Math.ceil(totalDocuments / 10))
      setIsloading(false)
    } catch (err) {
      setIsloading(false)
      console.log(err);
    }
  }

  useEffect(() => {
    loader()
    console.log("blogs useffect")
  }, [])

  const handlePage = (event, value) => {
    loader(value)
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: 10 }}
        open={isloading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container maxWidth='md' sx={{ py: 5, }}>
        <Stack gap={4} sx={{ alignItems: 'center' }}>
          {blogData.map(({ _id, heading, content, blogImageURL, createdAt, authorID: user }) => { //destructuring values
            createdAt = new Date(createdAt)
            const options = { month: 'long', day: 'numeric' };
            createdAt = createdAt.toLocaleDateString('en-US', options);
            content = content.slice(0, 200) + "...";
            return (
              <FlexBetween gap={2} width="100%" key={_id} >
                <Stack sx={{ justifyContent: 'space-evenly' }} width={'50%'}>
                  <FlexBox gap={2} sx={{ alignItems: 'center' }}>
                    <Avatar alt={user?.userName} src={user?.userImageURL} />
                    <Typography> {user?.userName} </Typography>
                    <Typography>{createdAt}</Typography>
                  </FlexBox>
                  <Typography variant='h5' sx={{ fontWeight: '700' }}>
                    {heading}
                  </Typography>
                  <Typography sx={{ display: { xs: "none", sm: "flex" } }}>
                    {content}
                  </Typography>
                  {/* add category */}
                  <Link to={`/blogs/${_id}`}>
                    <Button sx={{ alignSelf: 'flex-start' }}  >
                      Read more
                    </Button>
                  </Link>
                </Stack>
                <FlexBox sx={{ alignItems: 'center' }}>
                  <Box component="img" src={blogImageURL}
                    sx={{
                      height: { xs: "15vh", sm: "25vh", md: "30vh" }, borderRadius: 3,
                      objectFit: 'cover', width: { xs: "40vw", lg: "30vw" }
                    }}
                    loading='lazy'
                    alt="Blog image" />
                </FlexBox>
              </FlexBetween>
            )
          }
          )}

          {totalPages > 1 &&
            <Pagination
              onChange={handlePage} count={totalPages} defaultPage={1}
              siblingCount={1} color="primary"
            />}
        </Stack >
      </Container >
    </>
  )
}


