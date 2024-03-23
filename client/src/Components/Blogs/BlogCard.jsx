import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  styled,
  Avatar,
  Divider,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { handleBlogShare, handleContent, handleDate } from "@/helpers";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { axiosInstance } from "@/config/axios";
import { useSelector } from "react-redux";

const BlogCard = ({ data, isMyBlog, deleteBlog }) => {
  const {
    _id,
    heading,
    content,
    blogImageURL,
    createdAt,
    authorID: author,
    likedBy,
  } = data;
  const user = useSelector((state) => state.user.value);
  const [isLiked, setIsLiked] = useState(likedBy[user?._id] || false);
  const [totalLikes, setTotalLikes] = useState(data.likeCount);

  const trimmedContent = handleContent(content);
  const modifiedDate = handleDate(createdAt);
  const FlexBox = styled(Box)({ display: "flex" });
  const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
  });
  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setTotalLikes((prev) => prev + 1);
    axiosInstance
      .put(`/blogs/${_id}`, { blog: { isLiked: true } })
      .catch(error);
  };
  const handleDislike = () => {
    setTotalLikes((prev) => prev - 1);
    setIsLiked((prev) => !prev);
    axiosInstance
      .put(`/blogs/${_id}`, { blog: { isLiked: false } })
      .catch(error);
  };

  return (
    <div>
      <FlexBetween gap={0.5} width="100%" key={_id} sx={{ mb: 4 }}>
        <Stack sx={{ justifyContent: "space-evenly" }} width={"50%"}>
          <FlexBox gap={2} sx={{ alignItems: "center" }}>
            {!isMyBlog && (
              <>
                <Avatar src={author?.userImageURL} />
                <Typography> {author?.userName} </Typography>
              </>
            )}
            <Typography>{modifiedDate}</Typography>
          </FlexBox>
          <Link to={`/blogs/${_id}`} style={{ textDecoration: "none" }}>
            <Typography
              color={"black"}
              variant={"h6"}
              sx={{ fontWeight: "700" }}
            >
              {heading}
            </Typography>
            <Typography
              color={"black"}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              {trimmedContent}
            </Typography>
          </Link>
          {/* TODO: add category */}
          <FlexBox
            sx={{
              justifyContent: "end",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {isLiked ? (
              <Button onClick={handleDislike}>
                <FavoriteIcon color="warning" />
              </Button>
            ) : (
              <Button onClick={handleLike}>
                <FavoriteBorderIcon color="warning" />
              </Button>
            )}
            <Typography sx={{ fontSize: "18px" }}>{totalLikes}</Typography>

            <Button
              onClick={() => handleBlogShare(_id)}
              variant="text"
              sx={{ alignSelf: "flex-start" }}
            >
              <ShareIcon />
            </Button>
            {isMyBlog && (
              <>
                <Link to={`/edit/${_id}`} style={{ textDecoration: "none" }}>
                  <EditIcon color="primary" />
                </Link>
                <Button onClick={() => deleteBlog(_id)}>
                  <DeleteIcon />
                </Button>
              </>
            )}
          </FlexBox>
        </Stack>
        <FlexBox sx={{ alignItems: "center" }}>
          <Box
            component="img"
            src={blogImageURL}
            sx={{
              height: { xs: "15vh", sm: "25vh", md: "30vh" },
              borderRadius: 3,
              objectFit: "cover",
              width: { xs: "40vw", lg: "30vw" },
            }}
            loading="lazy"
            alt="Blog image"
          />
        </FlexBox>
      </FlexBetween>
      <Divider />
    </div>
  );
};

export default BlogCard;
