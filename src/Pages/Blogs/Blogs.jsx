import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";

import './Blogs.css'

import ecomApi from '../../Api/ecomApi';

import Nav from '../../Components/Nav/Nav';
import FeatureTitle from '../../Components/FeatureTitle/FeatureTitle';
import Footer from '../../Components/Footer/Footer'

import ButtonApp from '../../Components/ButtonApp/ButtonApp';
import Blockquote from '../../Components/Blockquote/Blockquote';
import Pagination from '../../Components/Pagination/Pagination';
import Widget from '../../Components/Widget/Widget';



function Blogs(props) {


    const [totalBlogs, setTotalBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);

    useEffect(() => {
        const getAllBlog = async () => {
            const blogs = await ecomApi.getBlogs()
            setTotalBlogs(blogs.data);
        }
        getAllBlog();

    }, [])

    // Get current post
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = totalBlogs.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    return (
        <>
            <Nav></Nav>
            <FeatureTitle title="Blog" page="Blog"></FeatureTitle>
            <Box className="blogs-page" sx={{ paddingTop: '100px', paddingBottom: '60px' }}>
                <Container sx={{ maxWidth: { md: 1200 } }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={6}>
                            <Grid item md={8} xs={12}>
                                {currentPosts.map((blog, index) => {
                                    let comments = blog.comments
                                    let totalComments = comments && Object.keys(comments).length;
                                    return (
                                        <Box key={index} className="post-item">
                                            <Box className="box-thumb">
                                                <Link to={`/blog/${blog.id - 1}`}>
                                                    <img src={blog.postThumb} alt="thumb" />
                                                </Link>
                                            </Box>
                                            <Box className="box-text">
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
                                                <h3 className="post-title hover-title red-color">
                                                    <Link to={`/blog/${blog.id - 1}`}>
                                                        {blog.title}
                                                    </Link></h3>
                                                <p>{blog.body}</p>
                                                <ButtonApp value="Read More" classColor="orange-btn" direction={`/blog/${blog.id - 1}`}></ButtonApp>
                                            </Box>
                                        </Box>
                                    )
                                })}
                                <Blockquote></Blockquote>
                                <Pagination itemsPerPage={postsPerPage} total={totalBlogs.length} paginate={paginate}></Pagination>
                            </Grid>
                            <Widget></Widget>
                        </Grid>
                    </Box>
                </Container>
            </Box >
            <Footer></Footer>
        </>
    );
}

export default Blogs;