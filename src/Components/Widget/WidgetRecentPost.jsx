import React, { useState, useEffect } from 'react';
import ecomApi from '../../Api/ecomApi';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

function WidgetRecentPost() {
    const [totalBlogs, setTotalBlogs] = useState([]);

    useEffect(() => {
        const getAllBlog = async () => {
            const getAll = await ecomApi.getBlogs()
            setTotalBlogs(getAll.data);
        }
        getAllBlog();

    }, [])
    return (
        <Box className="widget">
            <Box className="widget-title-box">
                <h3 className="widget-title">Popular Feeds</h3>
            </Box>
            <ul className="recent-posts">
                {
                    totalBlogs.slice(0, 2).map((blog, i) => {
                        return (
                            <li key={i}>
                                <Box className="widget-posts-image">
                                    <Link to={`/blog/${blog.id}`}>
                                        <img src={blog.postThumb} alt="" />
                                    </Link>
                                </Box>
                                <Box className="widget-posts-content">
                                    <h6 className="hover-title red-color">
                                        <Link to={`/blog/${blog.id}`}>
                                            {blog.title ? blog.title.slice(0, 25) : <></>}
                                        </Link>
                                    </h6>
                                    <div className="widget-posts-meta"> September 15, 2018 </div>
                                </Box>
                            </li>
                        )
                    })
                }
            </ul>
        </Box>
    );
}

export default WidgetRecentPost;