import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const Category = ({ setSelectedCategory, setSearchQuery }) => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://csc-study-api.vercel.app/blog/categories/"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = () => {
    setSearchQuery(searchText);
    setSelectedCategory(null);
    setActiveCategory("");
  };

  const handleCategoryClick = (categorySlug) => {
    setSelectedCategory(categorySlug);
    setSearchQuery("");
    setActiveCategory(categorySlug);
  };

  return (
    <div className="flex items-center justify-between md:px-10 px-2 py-3 gap-2 bg-blue-600">
      <div className="flex items-center">
        <p
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="text-white text-2xl font-semibold hover:font-bold hover:text-white px-3 py-2 transition-all duration-500 flex items-center cursor-pointer"
        >
          {isSearchOpen ? <AiOutlineClose /> : <AiOutlineSearch />}
        </p>
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="flex"
              initial={{ x: -350 }}
              animate={{ x: 0 }}
              exit={{ x: -350 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="border border-gray-300 px-3 py-1 bg-transparent text-white outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-white text-blue-600 px-3 py-1"
              >
                <AiOutlineSearch className="font-semibold text-2xl" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex overflow-x-auto space-x-4">
        <p
          onClick={() => {
            setSelectedCategory("");
            setSearchQuery("");
            setActiveCategory("");
          }}
          className={`whitespace-nowrap text-white hover:text-black cursor-pointer font-semibold ${
            activeCategory === "" ? "text-black" : ""
          }`}
        >
          All
        </p>
        {categories.map((category) => (
          <p
            key={category.slug}
            onClick={() => handleCategoryClick(category.slug)}
            className={`whitespace-nowrap text-white hover:text-black cursor-pointer font-semibold ${
              activeCategory === category.slug ? "text-black" : ""
            }`}
          >
            {category.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Category;
