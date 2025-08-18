import { useQuery } from "react-query";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}

export default function PostsComponent() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery(
    "posts",
    fetchPosts,
    {
      staleTime: 5000,
      cacheTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    }
  );

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div>
      <h3>Posts</h3>
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Refreshing..." : "Refetch Posts"}
      </button>
      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
