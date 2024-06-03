import React from "react";
import Hero from "../components/Home/Hero";
import TopCategories from "../components/Home/TopCategories";
import OurPopularCourses from "../components/Home/OurPopularCourses";
import LearnWithUs from "../components/Home/LearnWithUs";
import SimpleLearningSteps from "../components/Home/SimpleLearningSteps";
import Testimonials from "../components/Home/Testimonials";
import OurBestInstructors from "../components/Home/OurBestInstructors";
import ExpertInstructors from "../components/Home/ExpertInstructors";
import Newsletter from "../components/Home/Newsletter";

const Home = () => {
  return (
    <div className="mx-auto overflow-hidden">
      <Hero />
      <TopCategories />
      <OurPopularCourses />
      <LearnWithUs />
      <SimpleLearningSteps />
      <Testimonials />
      <OurBestInstructors />
      <ExpertInstructors />
      <Newsletter />
    </div>
  );
};

export default Home;
