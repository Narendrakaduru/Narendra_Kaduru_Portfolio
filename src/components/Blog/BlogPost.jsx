import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "@dr.pogodin/react-helmet";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // <-- Import GFM plugin
import blogs from "./posts.js"; // Make sure each blog has a 'slug'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CodeBlock from "./CodeBlock"; // copyable code block component

const BlogPost = () => {
  const { id } = useParams(); // URL param, e.g., 'first-post'
  const post = blogs.find((p) => p.slug === id); // match by slug
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!post) return;

    // Fetch markdown file from public/blogs/{slug}.md
    fetch(`/blogs/${post.slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.text();
      })
      .then((text) => setContent(text))
      .catch(() =>
        setContent("# 404 Not Found\nThe blog post could not be loaded.")
      );
  }, [post]);

  if (!post) return <h2>Post not found</h2>;

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>{post.title} | Narendra's Blog</title>
          <meta name="description" content={post.excerpt} />
          <meta property="og:title" content={post.title} />
          <meta property="og:image" content={post.image} />
          <meta property="og:description" content={post.excerpt} />
          <meta
            property="og:url"
            content={`https://narendra-kaduru-portfolio.netlify.app/blog/${post.slug}`}
          />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:type" content="website" />
        </Helmet>

        <Navbar />
        <div className="blog-post-container">
          <div className="container">
            <div className="row align-items-center">
              <div className="container">
                <div className="blog-post mt-7">
                  <div className="post-container">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="blog-feature-image"
                      />
                    )}

                    {/* ✅ Loading skeleton before markdown renders */}
                    {content === "" ? (
                      <div className="animate-pulse p-4">
                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                      </div>
                    ) : (
                      <ReactMarkdown
                        children={content}
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match =
                              /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                              <CodeBlock
                                language={match[1]}
                                value={String(children).replace(/\n$/, "")}
                              />
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    </HelmetProvider>
  );
};

export default BlogPost;
