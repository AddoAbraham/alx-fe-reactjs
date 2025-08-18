import { useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default function PostsComponent() {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetching, refetch, status } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,

    select: (posts) => posts.slice(0, 10),
  });

  if (isLoading) return <p>Loading posts…</p>;
  if (error) return <p>Oops: {error.message}</p>;

  return (
    <div style={{ maxWidth: 700, margin: "1rem auto" }}>
      <h2>Posts (first 10)</h2>

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          margin: "0.5rem 0",
        }}
      >
        <button onClick={() => refetch()}>Refetch now</button>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ["posts"] })}
        >
          Invalidate cache (next render refetches)
        </button>
        {isFetching && <span>Updating…</span>}
      </div>

      <ul>
        {data.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <p style={{ marginTop: 4 }}>{p.body}</p>
          </li>
        ))}
      </ul>

      <p style={{ fontSize: 12, opacity: 0.7 }}>
        Status: <code>{status}</code> | From cache when remounted if still
        fresh.
      </p>
    </div>
  );
}
