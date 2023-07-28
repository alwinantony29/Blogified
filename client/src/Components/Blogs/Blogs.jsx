import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axios';
import { Box, Container, Stack, Pagination, Backdrop, CircularProgress, } from '@mui/material';
import BlogCard from './BlogCard';
import toast from 'react-hot-toast';

export function Blogs() {
  const [blogData, setblogData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [isloading, setIsloading] = useState(false)

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
  const notify = () => toast('Here is your toast.');

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


          {
            blogData.map((data) => {

              return (
                <BlogCard data={data} isMyBlogs={false} key={data._id} />
                //   <FlexBetween gap={2} width="100%" key={_id} >
                //     <Stack sx={{ justifyContent: 'space-evenly', }} width={'50%'}>
                //       <FlexBox gap={2} sx={{ alignItems: 'center' }}>
                //         <Avatar src={user?.userImageURL} />
                //         <Typography> {user?.userName} </Typography>
                //         <Typography>{createdAt}</Typography>
                //       </FlexBox>
                //       <Link to={`/blogs/${_id}`} style={{ textDecoration: "none" }}>
                //         <Typography color={'black'} variant='h5' sx={{ fontWeight: '700' }}>
                //           {heading}
                //         </Typography>
                //         <Typography color={'black'} sx={{ display: { xs: "none", sm: "flex" } }}>
                //           {content}
                //         </Typography>
                //         {/* add category */}
                //         <FlexBox sx={{ justifyContent: 'end' }}>
                //           <Button>
                //             <FavoriteIcon color='warning' />
                //           </Button>
                //           <Typography>{likeCount}</Typography>
                //           <Button onClick={() => handleBlogShare(_id)} variant="text" sx={{ alignSelf: 'flex-start' }}>
                //             <ShareIcon />
                //           </Button>
                //         </FlexBox >
                //       </Link>
                //     </Stack>
                //     <FlexBox sx={{ alignItems: 'center' }}>
                //       <Box component="img" src={blogImageURL}
                //         sx={{
                //           height: { xs: "15vh", sm: "25vh", md: "30vh" }, borderRadius: 3,
                //           objectFit: 'cover', width: { xs: "40vw", lg: "30vw" }
                //         }}
                //         loading='lazy'
                //         alt="Blog image" />
                //     </FlexBox>
                //   </FlexBetween>
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


