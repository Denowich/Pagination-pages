import React, { useEffect, useState } from "react";
import axios from "axios";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPosts] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPosts;
  const indexOfFirstPost = indexOfLastPost - postsPerPosts;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const nPages = Math.ceil(posts.length / postsPerPosts);

  return (
    <div className="p-3 mb-2 bg-warning text-dark">
      <h1 className="text-primary">My pagination page</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
