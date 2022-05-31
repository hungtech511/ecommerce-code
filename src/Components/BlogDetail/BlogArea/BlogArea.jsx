import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'

import './BlogArea.css';

import filter from './filter.png';
import author from './author.png';
import user from './user.png';


import Blockquote from '../../Blockquote/Blockquote';
import ButtonApp from '../../ButtonApp/ButtonApp';
import SocialMedia from '../../SocialMedia/SocialMedia';
import Widget from '../../Widget/Widget'
import BlogComments from '../../BlogComments/BlogComments';

function BlogArea(props) {
    let arr = [];
    const { currentPost, previousPost, nextPost, isLoading } = props;
    const tags = ['organic', 'foods', 'tasty'];
    let comments = currentPost.comments
    let totalComments = comments && Object.keys(comments).length;

    const currentUser = JSON.parse(localStorage.getItem('login')) || {}
    const isEmptyUser = Object.keys(currentUser).length === 0;


    // Push object into array to map
    for (let i in comments) {
        arr.push(comments[i]);
    }
    return (
        <>
            {isLoading && <BlogDetailItemSkeleton />}
            {!isLoading && <Box className="blog-area">
                <Container sx={{ maxWidth: { md: 1200 } }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={6}>
                            <Grid item md={8} xs={12}>
                                <Box className="box-thumb">
                                    <img src={currentPost.postThumb} alt="post-thumb" />
                                </Box>
                                <Box className="post-box-text">
                                    <Box className="item-meta">
                                        <span>
                                            <i className="far fa-calendar-check"></i>
                                            September 15, 2018
                                        </span>
                                        <span>
                                            <a href="#!">
                                                <i className="far fa-user"></i> MD. SALIM RANA
                                            </a>
                                        </span>
                                        <span>
                                            <a href="#!">
                                                <i className="far fa-comments"></i> {totalComments !== undefined ? totalComments.toString().padStart(2, "0") : 0} Comments
                                            </a>
                                        </span>
                                    </Box>
                                    <h3 className="post-title">{currentPost.title}</h3>
                                    <Box className="post-text">
                                        <p>{currentPost.body}</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
                                        <Blockquote></Blockquote>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
                                        <Box className="post-inner-img">
                                            <img src={currentPost.postThumb} alt="post-thumb" />
                                        </Box>
                                        <Box className="inner-content">
                                            <h4>A cleansing hot shower or bath</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
                                        </Box>
                                        <Box className="blog-share">
                                            <Grid container>
                                                <Grid item sm={8} xs={12}>
                                                    <Box sx={{
                                                        marginBottom: {
                                                            xs: '20px',
                                                            md: 0
                                                        }
                                                    }} className="blog-share-left">
                                                        <span>Related Tags: </span>
                                                        {tags.map((tag, i) => {
                                                            return (
                                                                <a key={i} href="#">{tag}</a>
                                                            )
                                                        })}
                                                    </Box>
                                                </Grid>
                                                <Grid item sm={4} xs={12}>
                                                    <Box sx={{
                                                        textAlign: {
                                                            xs: 'left',
                                                            md: 'right'
                                                        }
                                                    }} className="blog-share-right">
                                                        <span>Share: </span>
                                                        <SocialMedia typeColor="gray-text"></SocialMedia>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <hr className="navigation-border" />
                                        <Box className="left-right-page">
                                            <Grid container>
                                                <Grid item sm={5} xs={12}>
                                                    <Box className="navigation-post">
                                                        {
                                                            previousPost === null ? <></> :
                                                                <>
                                                                    <span className="hover-title red-color">
                                                                        <Link to={`/blog/${previousPost.id - 1}`}>Prev Post</Link>
                                                                    </span>
                                                                    <h4 className="hover-title red-color">
                                                                        <Link to={`/blog/${previousPost.id - 1}`}>{previousPost.title ? previousPost.title.slice(0, 20) : <></>}</Link>
                                                                    </h4>
                                                                </>
                                                        }
                                                    </Box>
                                                </Grid>
                                                <Grid item sm={2} xs={12}>
                                                    <Box sx={{
                                                        textAlign: {
                                                            xs: 'left',
                                                            md: 'center'
                                                        }
                                                    }}>
                                                        <a href="#"> <img src={filter} alt="icon" /></a>
                                                    </Box>
                                                </Grid>
                                                <Grid item sm={5} xs={12}>
                                                    <Box className="navigation-post" sx={{
                                                        textAlign: {
                                                            xs: 'left',
                                                            md: 'right'
                                                        },
                                                        marginTop: {
                                                            xs: '35px',
                                                            md: 0
                                                        }
                                                    }}>
                                                        {
                                                            nextPost === null ? <></> : <>
                                                                <span className="hover-title red-color"><Link to={`/blog/${nextPost.id - 1}`}>Next Post</Link>
                                                                </span>
                                                                <h4 className="hover-title red-color">
                                                                    <Link to={`/blog/${nextPost.id - 1}`}>{nextPost.title ? nextPost.title.slice(0, 20) : <></>}</Link>
                                                                </h4>
                                                            </>
                                                        }
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box className="author">
                                            <Box className="author-image">
                                                <img src={author} alt="author" />
                                            </Box>
                                            <Box className="author-text">
                                                <h3>MD. Salim Rana</h3>
                                                <SocialMedia typeColor="blue-text"></SocialMedia>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa aute irure dolor. </p>
                                            </Box>
                                        </Box>
                                        <Box className="post-comments">
                                            <Box className="blog-comment-title">
                                                <h2>{totalComments !== undefined ? totalComments.toString().padStart(2, "0") : 0} Comments</h2>
                                            </Box>
                                            <Box className="latest-comments">

                                                {currentPost.hasOwnProperty("comments") &&
                                                    <ul>{
                                                        arr.map((item, idx) => {
                                                            return (
                                                                <li key={idx}>
                                                                    <Box className="comments-box">
                                                                        <Box className="comments-avatar">
                                                                            <img src={user} alt="comment-user" />
                                                                        </Box>
                                                                        <Box className="comments-text">
                                                                            <Box className="avatar-name">
                                                                                <h5>{item.fullName}</h5>
                                                                                <span>{item.date}</span>
                                                                            </Box>
                                                                            <p>{item.comment}</p>
                                                                        </Box>
                                                                    </Box>
                                                                </li>
                                                            )
                                                        })
                                                    }</ul>}
                                            </Box>
                                        </Box>
                                        <Box className="post-comment-form">
                                            {isEmptyUser && <h2> Please <Link to="/login">login</Link> to comment this product post</h2>}
                                            {!isEmptyUser && <BlogComments></BlogComments>}
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Widget></Widget>
                        </Grid>
                    </Box>
                </Container>
            </Box >}
        </>
    );
}

const BlogDetailItemSkeleton = () => {
    return (
        < Box className="product-detail-item loading-skeleton-custom" >
            <Container>
                <Skeleton style={{ marginBottom: "25px" }} height={400} />
                <Skeleton style={{ marginBottom: "25px" }} count={10} height={20} />
            </Container >
        </ Box >
    )
}


export default BlogArea;