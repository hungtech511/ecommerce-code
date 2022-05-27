import React, { useState, useEffect } from 'react';

import Nav from '../Nav/Nav';
import { useParams } from "react-router-dom";
import ecomApi from '../../Api/ecomApi'
import Footer from '../Footer/Footer';
import FeatureTitle from '../FeatureTitle/FeatureTitle';

import { Typography } from '@mui/material';
import BlogArea from './BlogArea/BlogArea';

function BlogDetail(props) {
    const [totalBlogs, setTotalBlogs] = useState([]);
    const [previousPost, setPreviousPost] = useState([]);
    const [currentPost, setCurrentPost] = useState([]);
    const [nextPost, setNextPost] = useState([]);

    const { blogID } = useParams();

    let ID = parseInt(blogID);

    useEffect(() => {
        const getAllBlog = async () => {
            const blogs = await ecomApi.getBlogs()
            setTotalBlogs(blogs.data);
        }
        const currentBlog = async () => {
            const current = await ecomApi.getOneBlog(ID)
            setCurrentPost(current.data);
        }
        const previousBlog = async () => {
            let previousID = ID - 1;
            const previous = await ecomApi.getOneBlog(previousID)
            setPreviousPost(previous.data)
        }
        const nextBlog = async () => {
            let nextID = ID + 1;
            const next = await ecomApi.getOneBlog(nextID)
            setNextPost(next.data)
        }
        getAllBlog();
        currentBlog();
        previousBlog();
        nextBlog();

    }, [blogID])

    return (
        <>
            <Nav></Nav>
            <FeatureTitle title="Blog" page="Blog"></FeatureTitle>
            <>
                {ID >= totalBlogs.length ?
                    <Typography variant='h1' sx={{ fontSize: '40px', textAlign: 'center', paddingTop: '100px', paddingBottom: '40px' }}>Post Not Found</Typography> :
                    <BlogArea currentPost={currentPost} previousPost={previousPost} nextPost={nextPost}></BlogArea>
                }
            </>

            <Footer></Footer>
        </>
    );
}

export default BlogDetail;