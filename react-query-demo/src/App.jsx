import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import PostsComponent from "./components/PostsComponent";

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h1>Vite + React + React Query</h1>

        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>

        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>

        <hr style={{ margin: "1rem 0" }} />

        <div style={{ padding: "1rem" }}>
          <h2>React Query Demo</h2>
          <p>
            Toggle the component to unmount/remount and observe instant cached
            data (no network) if within <code>staleTime</code>.
          </p>

          <button onClick={() => setShowPosts((s) => !s)}>
            {showPosts ? "Hide" : "Show"} Posts
          </button>

          <hr style={{ margin: "1rem 0" }} />

          {showPosts ? <PostsComponent /> : <p>Posts component unmounted.</p>}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
