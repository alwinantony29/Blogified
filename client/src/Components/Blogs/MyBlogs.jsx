import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Pagination,
  Stack,
} from "@mui/material";
import BlogCard from "./BlogCard";
import { toast } from "react-hot-toast";
export function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/blogs/myblogs?page=${pageNumber}`
      );
      const { result, totalDocuments } = response.data;
      setBlogs(result);
      setTotalPages(Math.ceil(totalDocuments / 10));
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlog = async (ID) => {
    if (confirm("U sure u wanna delete that")) {
      try {
        const response = await axiosInstance.delete(`/blogs/${ID}`);
        console.log(response.data.message);
        setBlogs(
          blogs.filter(({ _id }) => {
            return _id !== ID;
          })
        );
        toast.success("Deleted");
      } catch (err) {
        toast.error("Couldn't delete");
        console.log(err);
      }
    }
  };

  const handlePage = (event, value) => {
    fetchBlogs(value);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container maxWidth="md" sx={{ my: 5 }}>
        <Stack gap={4} sx={{ alignItems: "center" }}>
          {blogs.map((data) => {
            return (
              <BlogCard
                data={data}
                deleteBlog={deleteBlog}
                isMyBlog={true}
                key={data._id}
              />
            );
          })}

          {totalPages > 1 && (
            <Pagination
              onChange={handlePage}
              count={totalPages}
              defaultPage={1}
              siblingCount={1}
              color="primary"
            />
          )}
        </Stack>
      </Container>
    </>
  );
}
