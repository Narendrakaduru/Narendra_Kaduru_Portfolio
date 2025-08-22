import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import BlogList from "./components/Blog/BlogList";
import BlogPost from "./components/Blog/BlogPost";
import { HelmetProvider, Helmet } from "@dr.pogodin/react-helmet";
import usePageTracking from "./hooks/usePageTracking";

function App() {
  return (
    <HelmetProvider>
      {/* ✅ Page tracking for Google Analytics */}
      <PageTracker />

      {/* ✅ Default SEO meta */}
      <Helmet>
        <meta property="og:title" content="Narendra Kaduru - DevOps Engineer" />
        <meta
          property="og:description"
          content="Passionate DevOps Engineer building scalable, secure, and efficient systems."
        />
        <meta
          property="og:image"
          content="https://narendra-kaduru-portfolio.netlify.app/preview.png"
        />
        <meta
          property="og:url"
          content="https://narendra-kaduru-portfolio.netlify.app/"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Narendra Kaduru - DevOps Engineer" />
        <meta
          name="twitter:description"
          content="Passionate DevOps Engineer building scalable, secure, and efficient systems."
        />
        <meta
          name="twitter:image"
          content="https://narendra-kaduru-portfolio.netlify.app/preview.png"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Narendra - Portfolio</title>
      </Helmet>

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </HelmetProvider>
  );
}

function PageTracker() {
  usePageTracking();
  return null;
}

export default App;
