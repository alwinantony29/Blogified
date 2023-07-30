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
      toast.error("Something went wrong")
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
      <Backdrop
        sx={{ color: '#fff', zIndex: 10 }}
        open={isloading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container maxWidth='md' >
        <Stack gap={4} sx={{ alignItems: 'center' }}>

          {

            blogData.map((data) => {

              return (
                <BlogCard data={data} isMyBlogs={false} key={data._id} />
              )
            })

          }

          {

            totalPages > 1 &&
            <Pagination
              onChange={handlePage} count={totalPages} defaultPage={1}
              siblingCount={1} color="primary"
            />

          }
        </Stack >
      </Container >
    </>
  )
}


