import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { HelmetProvider, Helmet } from '@dr.pogodin/react-helmet';
import blogs from "./posts.js";
import blog_user from "/blog_user.png";
import "./Blog.css";

const BlogList = () => {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");

  // Dynamically extract unique tags from posts
  const allTags = ["All", ...new Set(blogs.map(blog => blog.tag))];

  // Filter and sort blogs based on search, tag, and sort choices
  const filteredAndSortedBlogs = blogs
    .filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
      const matchesTag = activeTag === "All" || blog.tag === activeTag;
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === "date-asc") {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === "read-asc") {
        return parseInt(a.read_time, 10) - parseInt(b.read_time, 10);
      }
      if (sortBy === "read-desc") {
        return parseInt(b.read_time, 10) - parseInt(a.read_time, 10);
      }
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

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

          {/* Controls: Search & Sort */}
          <div className="blog-search-sort-container">
            <div className="search-bar-wrapper">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search Blogs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="sort-dropdown-container">
              <i className="bi bi-sort-down sort-icon"></i>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
                aria-label="Sort blogs"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="read-asc">Shortest Read</option>
                <option value="read-desc">Longest Read</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </select>
            </div>
            <div className="sort-dropdown-container">
              <i className="bi bi-funnel filter-icon"></i>
              <select
                value={activeTag}
                onChange={(e) => setActiveTag(e.target.value)}
                className="sort-select"
                aria-label="Filter by tag"
              >
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>



          <div className="row align-items-center mt-4 mb-5">
            <div className="blog-grid">
              {filteredAndSortedBlogs.length > 0 ? (
                filteredAndSortedBlogs.map((blog) => (
                  <div className="blog-card" key={blog.id}>
                    <div className="blog-image-wrapper">
                      <img src={blog.image} alt={blog.slug} className="blog-image" />
                      <span className="blog-tag">{blog.tag}</span>
                    </div>
                    <div className="blog-body">
                      <h3 className="blog-title">{blog.title}</h3>
                      <p className="blog-date">{blog.date}</p>
                      <div className="d-flex justify-content-between mb-3">
                        <span>
                          <img src={blog_user} alt="Blog User" className="blog-user" />
                          &nbsp; Narendra
                        </span>
                        <span>
                          <i className="bi bi-book"></i> {blog.read_time} min read
                        </span>
                      </div>
                      <p className="blog-excerpt">{blog.excerpt}</p>
                      <Link to={`/blog/${blog.slug}`} className="read-more">
                        Read More &nbsp;<i className="bi bi-arrow-right-short"></i>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center w-100 mt-5">
                  <p className="fs-5 text-muted">No blogs found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogList;
