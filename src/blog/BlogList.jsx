import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";
import axios from "axios";

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://csc-study-api.vercel.app/blog/posts/"
        );
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setPosts([]);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {posts.map((post) => (
        <motion.div
          key={post.slug}
          className="bg-white rounded shadow p-4"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 1}}
        >
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded"
            />
          )}
          <h2 className="text-xl font-bold mt-4">{post.title}</h2>
          <Link
            to={`/blog/${post.slug}`}
            className="text-blue-600 mt-4 flex items-center"
          >
            Read more <AiOutlineArrowRight className="ml-2" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogList;
