import { useQuery } from "@tanstack/react-query";

// Extracting the fetch function
const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const PostsComponent = () => {
  // Using `fetchPosts` function
  const { isLoading, isError, data, error, isStale } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    refetchInterval: 10000,
    staleTime: 10000,
    gcTime: 5000,
    cacheTime: 2000,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  });

  if (isStale) {
    console.log("Data is stale, refreshing");
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={fetchPosts}>Refresh</button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
