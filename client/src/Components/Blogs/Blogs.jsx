import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import {
  Container,
  Stack,
  Pagination,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import BlogCard from "./BlogCard";
import toast from "react-hot-toast";

export function Blogs() {
  const [blogData, setBlogData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async (pageNumber = 1) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(`/blogs?page=${pageNumber}`);
      const { result, totalDocuments } = data;
      setBlogData(result);
      setTotalPages(Math.ceil(totalDocuments / 10));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handlePage = (event, value) => {
    fetchBlogs(value);
  };

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container maxWidth="md" sx={{ marginTop: "1rem" }}>
        <Stack gap={4} sx={{ alignItems: "center", width: "100%" }}>
          {blogData.map((data) => {
            return <BlogCard data={data} isMyBlog={false} key={data._id} />;
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
