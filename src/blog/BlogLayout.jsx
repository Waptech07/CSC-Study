import React from "react";
import { Outlet } from "react-router-dom";

const BlogLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <main className="mx-auto p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default BlogLayout;
