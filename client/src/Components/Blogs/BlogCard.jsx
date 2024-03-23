import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  styled,
  Avatar,
  Divider,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { handleBlogShare, handleContent } from "@/helpers";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { axiosInstance } from "@/config/axios";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import ThreeDotsIcon from "@mui/icons-material/MoreVert";

const BlogCard = ({ data, isMyBlog, deleteBlog }) => {
  const {
    _id,
    heading,
    content,
    blogImageURL,
    authorID: author,
    likedBy,
  } = data;
  let createdAt = data.createdAt;
  const user = useSelector((state) => state.user.value);
  const [isLiked, setIsLiked] = useState(likedBy[user?._id] || false);
  const [totalLikes, setTotalLikes] = useState(data.likeCount);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const elRef = useRef(null);
  // const [anchorElUser, setAnchorElUser] = useState(null);
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };
  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  // const isMenuOpen = Boolean(anchorEl);
  const trimmedContent = handleContent(content);
  createdAt = DateTime.fromISO(createdAt).toFormat("dd LLL");
  const FlexBox = styled(Box)({ display: "flex" });
  const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
  });

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setTotalLikes((prev) => prev + 1);
    if (user)
      axiosInstance
        .put(`/blogs/${_id}`, { blog: { isLiked: true } })
        .catch(error);
  };

  const handleDislike = () => {
    setTotalLikes((prev) => prev - 1);
    setIsLiked((prev) => !prev);
    if (user)
      axiosInstance
        .put(`/blogs/${_id}`, { blog: { isLiked: false } })
        .catch(error);
  };

  // const handleClick = (event) => {
  //   console.log(event.currentTarget);
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <Box sx={{ width: "100%" }}>
      <FlexBetween
        sx={{
          mb: 4,
          flexDirection: { xs: "column-reverse", md: "row" },
          gap: { xs: 2, sm: 1 },
        }}
      >
        <Stack
          sx={{
            justifyContent: "space-evenly",
            width: { xs: "100%", md: "50%" },
            gap: 1,
          }}
        >
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
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {trimmedContent}
            </Typography>
          </Link>

          {/* TODO: add category */}
          <FlexBox
            sx={{
              justifyContent: "space-between",
            }}
          >
            <FlexBox
              gap={2}
              sx={{ alignItems: "center", justifyContent: "start" }}
            >
              {!isMyBlog && (
                <>
                  <Avatar src={author?.userImageURL} />
                  <Typography> {author?.userName} </Typography>
                </>
              )}
              <Typography sx={{ display: { xs: "none", md: "block" } }}>
                {createdAt}
              </Typography>
            </FlexBox>
            <FlexBox sx={{ width: "140px", alignItems: "center" }}>
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
            </FlexBox>
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
              height: { xs: "22vh", sm: "35vh", md: "30vh" },
              borderRadius: 3,
              objectFit: "cover",
              width: { xs: "100%", lg: "30vw" },
              border: "none",
            }}
            loading="lazy"
            alt="Blog image"
          ></Box>
        </FlexBox>
      </FlexBetween>
      <Divider />
    </Box>
  );
};

export default BlogCard;
