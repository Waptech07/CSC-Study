import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCourseDetails,
  getCourseReviews,
  addCourseReview,
  checkEnrollment,
} from "../../services/coursesApi";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Loading from "../../components/Loading";

const CourseReviews = () => {
  const { courseSlug } = useParams();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    const fetchCourseDetailsAndReviews = async () => {
      try {
        const courseData = await getCourseDetails(courseSlug);
        setCourse(courseData);

        if (courseData.id) {
          const reviewsData = await getCourseReviews(courseData.id);
          setReviews(Array.isArray(reviewsData) ? reviewsData : []);

          if (user) {
            try {
              const enrollmentStatus = await checkEnrollment(courseData.id);
              setIsEnrolled(enrollmentStatus.is_enrolled);
            } catch (error) {
              console.error("Error checking enrollment:", error);
              toast.error("Failed to check enrollment status.");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching course details and reviews:", error);
        if (error.response) {
          if (error.response.status === 404) {
            toast.error("Course not found.");
          } else {
            toast.error("An error occurred while fetching course details.");
          }
        } else {
          toast.error("Network error or server is unreachable.");
        }
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchCourseDetailsAndReviews();
  }, [courseSlug, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStarClick = (rating) => {
    setNewReview((prevState) => ({
      ...prevState,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You need to log in to submit a review.");
      return;
    }

    if (!isEnrolled) {
      toast.error("You need to be enrolled in the course to submit a review.");
      return;
    }

    try {
      await addCourseReview(course.id, newReview); // newReview already does not include user field
      setNewReview({ rating: 0, comment: "" });
      const updatedReviews = await getCourseReviews(course.id);
      setReviews(Array.isArray(updatedReviews) ? updatedReviews : []);
      toast.success("Review added successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review.");
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} color="gold" />
        ))}
        {hasHalfStar && <FaStarHalfAlt color="gold" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={fullStars + 1 + i} color="gray" />
        ))}
      </>
    );
  };

  if (loading) {
    return <Loading />;
  }

  const roundedRating = Math.round(course?.average_rating * 10) / 10;

  return (
    <div>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-4 md:mb-0">
            Reviews
          </h2>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-1">{roundedRating}</h2>
            <div className="flex justify-center mb-1">
              {renderStars(roundedRating)}
            </div>
            <span className="text-sm font-normal text-gray-700">
              Course Ratings
            </span>
          </div>
        </div>
        <div className="reviews-list mb-8">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No reviews yet. Be the first to review this course!
            </p>
          ) : (
            reviews.map((review, index) => (
              <div key={review.id} className="py-3 border-b last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <strong className="capitalize">{review.user.name}</strong>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
        {isEnrolled ? (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-6 rounded-lg shadow-inner"
          >
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating:</label>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={30}
                    onClick={() => handleStarClick(i + 1)}
                    color={i < newReview.rating ? "gold" : "gray"}
                    className="cursor-pointer"
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Comment:</label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-center text-red-500">
            You need to be enrolled in the course to submit a review.
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseReviews;
