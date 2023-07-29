import React, { useEffect, useState } from 'react';
import { Link, } from 'react-router-dom';
import { axiosInstance } from '../../config/axios';
import { Backdrop, Box, Button, CircularProgress, Container, Pagination, Stack, Typography, styled } from '@mui/material';
import { handleDate } from '../../helpers';
import BlogCard from './BlogCard';
import { toast } from "react-hot-toast";
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
      setIsloading(false)

    } catch (err) {
      setIsloading(false)
      toast.error("Something went wrong")
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
        toast.error("Couldn't delete")
        console.log(err);
      }
    }
  }

  const handlePage = (event, value) => {
    loader(value)
  }

  useEffect(() => {
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

          {

            blogData.map((data) => {
              return (
                <BlogCard data={data} deleteBlog={deleteBlog} isMyBlogs={true} key={data._id} />
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
        </Stack>
      </Container>
    </>
  );
}


