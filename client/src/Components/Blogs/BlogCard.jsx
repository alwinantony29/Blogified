import React from 'react'
import { Box, Button, Stack, Typography, styled, Avatar, } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { handleBlogShare, handleContent, handleDate } from '../../helpers';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const BlogCard = ({ data, isMyBlogs, deleteBlog }) => {

    const { _id, heading, content, blogImageURL, likeCount, createdAt, authorID: user } = data
    const trimmedContent = handleContent(content)
    const modifiedDate = handleDate(createdAt)
    const FlexBox = styled(Box)({ display: 'flex' })
    const FlexBetween = styled(Box)({ display: 'flex', justifyContent: 'space-between' })


    return (
        <div>
            <FlexBetween gap={.5} width="100%" key={_id} >
                <Stack sx={{ justifyContent: 'space-evenly', }} width={'50%'}>
                    <FlexBox gap={2} sx={{ alignItems: 'center' }}>
                        {
                            !isMyBlogs &&
                            <>
                                <Avatar src={user?.userImageURL} />
                                <Typography> {user?.userName} </Typography>
                            </>
                        }
                        <Typography>{modifiedDate}</Typography>
                    </FlexBox>
                    <Link to={`/blogs/${_id}`} style={{ textDecoration: "none" }}>
                        <Typography color={'black'} variant={"h6"} sx={{ fontWeight: '700' }}>
                            {heading}
                        </Typography>
                        <Typography color={'black'} sx={{ display: { xs: "none", sm: "flex" } }}>
                            {trimmedContent}
                        </Typography>
                    </Link>
                    {/* add category */}
                    <FlexBox sx={{ justifyContent: 'end', alignItems: "center", flexWrap: 'wrap' }}>
                        <Button>
                            {
                                false ?
                                    <FavoriteIcon color='warning' />
                                    :
                                    <FavoriteBorderIcon color='warning' />
                            }
                            <Typography sx={{ ml: 0.5 }} >{likeCount}</Typography>
                        </Button>
                        <Button onClick={() => handleBlogShare(_id)} variant="text" sx={{ alignSelf: 'flex-start' }}>
                            <ShareIcon />
                        </Button>
                        {
                            isMyBlogs &&
                            <>
                                <Link to={`/edit/${_id}`} style={{ textDecoration: "none" }}>
                                    {/* <Button  > */}
                                    <EditIcon color='primary' />
                                    {/* </Button> */}
                                </Link>
                                <Button onClick={() => deleteBlog(_id)} ><DeleteIcon /></Button>
                            </>
                        }
                    </FlexBox >
                </Stack>
                <FlexBox sx={{ alignItems: 'center' }}>
                    <Box component="img" src={blogImageURL}
                        sx={{
                            height: { xs: "15vh", sm: "25vh", md: "30vh" },
                            borderRadius: 3,
                            objectFit: 'cover', width: { xs: "40vw", lg: "30vw" }
                        }}
                        loading='lazy'
                        alt="Blog image" />
                </FlexBox>
            </FlexBetween>
        </div>
    )
}

export default BlogCard