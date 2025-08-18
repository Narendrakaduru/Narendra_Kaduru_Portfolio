import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { HelmetProvider, Helmet } from '@dr.pogodin/react-helmet';
import blogs from "./posts.js";
import blog_user from "../../../public/blog_user.png";
import "./Blog.css";


const BlogList = () => {
  return (
    <>
       <HelmetProvider>
            <Helmet>
                <title>Narendra | Blog</title>
            </Helmet>
       </HelmetProvider>
        <Navbar />
        <section className="blog-list">
            <div className="container">
                <div className="st-section-heading st-style1">
                    <h4 className="st-section-heading-title">Blogs</h4>
                </div>
                <div className="row align-items-center mt-7 mb-5">
                    <div className="blog-grid">
                        {blogs.map((blog) => (
                        <div className="blog-card" key={blog.id}>
                            <img src={blog.image} alt={blog.slug} className="blog-image"/>
                            <div className="blog-body">
                                <h3 className="blog-title">{blog.title}</h3>
                                <p className="blog-date">{blog.date}</p>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>
                                        <img src={blog_user} alt="Blog User" className="blog-user" />
                                        &nbsp; Narendra
                                    </span>
                                    <span><i className="bi bi-book"></i> {blog.read_time} min read</span>
                                </div>
                                <p className="blog-excerpt">{blog.excerpt}</p>
                                <Link to={`/blog/${blog.slug}`} className="read-more">
                                Read More &nbsp;<i className="bi bi-arrow-right-short"></i>
                                </Link>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
    </>
  );
};

export default BlogList;
