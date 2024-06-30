import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { TbNotesOff } from "react-icons/tb";
import { motion } from "framer-motion";
import axios from "axios";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const { selectedCategory, searchQuery } = useOutletContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = "https://csc-study-api.vercel.app/blog/posts/";
        if (selectedCategory) {
          url = `https://csc-study-api.vercel.app/blog/category/${selectedCategory}/posts/`;
        } else if (searchQuery) {
          url = `https://csc-study-api.vercel.app/blog/search/?q=${searchQuery}`;
        }
        const response = await axios.get(url);
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
  }, [selectedCategory, searchQuery]);

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full mt-32">
        <TbNotesOff className="text-9xl" />
        <p className="text-2xl text-gray-600 mt-4">No posts available</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <motion.div
          key={post.slug}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="mt-2 text-gray-600">
              {post.content.slice(0, 100)}...
            </p>
            <Link
              to={`/blog/${post.slug}`}
              className="text-blue-600 mt-4 flex items-center hover:underline"
            >
              Read more <AiOutlineArrowRight className="ml-2" />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogList;
