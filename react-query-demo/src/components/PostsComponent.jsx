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
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["posts"], // Updated queryKey to "posts"
    queryFn: fetchPosts, // Calling the extracted function
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h1>Posts</h1>
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
