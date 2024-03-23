import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { axiosInstance } from "../../config/axios";
import { toast } from "react-hot-toast";

function SingleBlog() {
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState({});
  const { blogID } = useParams();

  const fetchBlog = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/blogs/" + blogID);
      const result = response.data.result;
      const options = { month: "long", day: "numeric", year: "numeric" };
      result.createdAt = new Date(result.createdAt).toLocaleDateString(
        "en-US",
        options
      );
      setBlog(result);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container component="main" maxWidth="md" disableGutters>
        <Stack gap={1} sx={{ my: 2, alignItems: "center" }}>
          <Box
            component="img"
            sx={{
              borderRadius: "20px",
              width: { xs: "100%", sm: "30rem", md: "40rem" },
              height: "17rem",
            }}
            src={blog.blogImageURL}
            alt="blog image"
          />

          <Box component="h1" sx={{ textAlign: "center", my: 3 }}>
            {blog.heading}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
            <Avatar src={blog.authorID?.userImageURL} />
            <p>
              {blog.authorID?.userName} &nbsp; &nbsp; {blog.createdAt}
            </p>
          </Box>

          <Typography sx={{ p: 4 }}> {blog.content} </Typography>
        </Stack>
      </Container>
    </>
  );
}

export default SingleBlog;
