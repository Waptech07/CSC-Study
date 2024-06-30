import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import BlogNavbar from "./components/BlogNavbar";

const BlogLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <BlogNavbar
          setSelectedCategory={setSelectedCategory}
          setSearchQuery={setSearchQuery}
        />
        <main className="mx-auto p-8">
          <Outlet context={{ selectedCategory, searchQuery }} />
        </main>
      </div>
    </>
  );
};

export default BlogLayout;
