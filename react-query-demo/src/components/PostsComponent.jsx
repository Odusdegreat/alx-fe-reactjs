import { useQuery } from "@tanstack/react-query";
const PostsComponent = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.json();
    },
  });

  if (isPending) {
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
