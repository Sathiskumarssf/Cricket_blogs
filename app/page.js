"use client";
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts'); // Correct API path
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) { // Catching the error correctly
       
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar/>
      <h1>Posts</h1>
      <h1>{posts.map(post=>(
        <li>{post.title} : {post.description}</li>
      ))}</h1>
    </div>
  );
}

export default Posts;
