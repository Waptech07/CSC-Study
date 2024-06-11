import React, { useState, useEffect, useContext } from "react";
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  getCourseDetails,
  initiatePayment,
  checkEnrollment,
} from "../../services/coursesApi";
import { FaFacebook, FaTwitter, FaLinkedin, FaShareAlt } from "react-icons/fa";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/AuthContext";

const CourseDetails = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseDetails = await getCourseDetails(courseId);
        setCourse(courseDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setLoading(false);
      }
    };

    const fetchEnrollmentStatus = async () => {
      try {
        const enrollmentStatus = await checkEnrollment(courseId);
        setIsEnrolled(enrollmentStatus.is_enrolled);
      } catch (error) {
        // console.error("Error checking enrollment status:", error);
      }
    };

    fetchCourseDetails();
    fetchEnrollmentStatus();
  }, [courseId]);

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      // If not authenticated, display a message and provide options to log in or register
      alert("Please log in or register to proceed with the purchase.");
      // You can navigate to the login or registration page using useNavigate()
      navigate("/login"); // Example: Navigate to the login page
      return; // Exit the function to prevent further execution
    }

    // If authenticated, proceed with the purchase process
    try {
      const paymentData = await initiatePayment(courseId);
      window.location.href = paymentData.data.authorization_url;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!course) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center text-lg font-semibold">Course not found.</p>
      </div>
    );
  }

  const shareUrl = window.location.href;

  return (
    <div className="bg-gray-100 mx-auto p-4">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0">
          <div className="mb-8">
            <div className="flex items-center">
              <img
                src={
                  `${course.instructor.user.profile_picture}` ||
                  "https://via.placeholder.com/150"
                }
                alt={course.instructor.user.name}
                className="w-16 h-16 rounded-full mr-4 border border-blue-600"
              />
              <div>
                <p className="text-sm text-gray-600">Created by</p>
                <Link to={`/instructor/${course.instructor.id}`}>
                  <p className="text-lg font-semibold">
                    {course.instructor.user.name}
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <img
            src={
              `${course.image}` ||
              "https://via.placeholder.com/150"
            }
            alt={course.title}
            className="w-full h-auto rounded-md mb-4"
          />
          <div className="mb-4">
            <div className="flex gap-5 pb-2 pl-5">
              {[
                { to: `/courses/${course.id}`, label: "Overview" },
                { to: `/courses/${course.id}/lessons`, label: "Lessons" },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`text-gray-800 text-sm lg:text-base font-semibold py-2 ${
                    isActive(link.to) && "border-b-4 border-blue-500 pb-1"
                  }`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
          <Outlet context={course} />
        </div>
        <div className="w-full lg:w-1/3 px-4">
          <div className="bg-white p-4 rounded-md shadow-md mb-8">
            <img
              src={
                `${course.image}` ||
                "https://via.placeholder.com/150"
              }
              alt={course.title}
              className="w-full h-auto rounded-md mb-4"
            />
            <p className="text-2xl font-semibold">
              &#8358;{course.price.toLocaleString()}
            </p>
            {!isEnrolled && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleBuyNow();
                }}
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md mb-4"
              >
                Buy Now
              </button>
            )}
            {isEnrolled && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleBuyNow();
                }}
                className="w-full py-2 text-white font-semibold rounded-md mb-4 disabled:bg-gray-700"
                disabled
              >
                Enrolled
              </button>
            )}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                This Course Includes:
              </h3>
              <ul className="list-disc list-inside">
                <li>Access to all lessons</li>
                <li>Downloadable resources</li>
                <li>Certificate of completion</li>
                <li>Lifetime access</li>
              </ul>
            </div>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Share this course</h3>
            <div className="flex space-x-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700"
              >
                <FaLinkedin size={24} />
              </a>
              <button className="text-gray-600">
                <FaShareAlt size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
