import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import BlogPost from "./pages/BlogPost";
import ProtectedRoute from "./components/ProtectedRoute";
import PostsComponent from "./components/PostsComponent";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <nav style={{ padding: "1rem", background: "#eee" }}>
          <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
          <Link to="/profile">Profile</Link> |{" "}
          <Link to="/posts/1">Blog Post #1</Link> |{" "}
          <button onClick={() => setShowPosts((s) => !s)}>
            {showPosts ? "Hide" : "Show"} Posts
          </button>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/posts/:postId" element={<BlogPost />} />
        </Routes>

        <hr style={{ margin: "1rem 0" }} />
        <h2>React Query Demo</h2>
        {showPosts ? <PostsComponent /> : <p>Posts component unmounted.</p>}
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
