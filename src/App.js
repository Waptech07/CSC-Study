import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/grid';
import 'swiper/css/effect-fade';
import 'swiper/css/free-mode';
import NavBar from './components/Navbar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './components/NotFound';
import Home from './pages/Home';
import ProfilePage from './pages/profile/Profile';
import MyProfile from './components/Profile/MyProfile';
import AllCourses from './components/Profile/AllCourses';
import ActiveCourses from './components/Profile/ActiveCourses';
import CompletedCourses from './components/Profile/CompletedCourses';
import Settings from './components/Profile/Settings';
import PurchaseHistory from './components/Profile/PurchaseHistory';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import InstructorProfile from './pages/profile/InstructorProfile';
import InstructorCourses from './components/Profile/Instructor/InstructorCourses';
import CourseDetailsPage from './pages/courses/CourseDetailsPage';
import CoursesPage from './pages/courses/CoursesPage';
import AboutUsPage from './pages/AboutUs';
import ContactUsPage from './pages/ContactUs';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoutes';
import ViewInstructor from './pages/profile/ViewInstructor';
import CategoryCoursesPage from './pages/courses/CategoryCoursesPage';
import ViewInstructorCourses from './components/Profile/View/ViewInstructorCourses';
import ViewInstructorDetails from './components/Profile/View/ViewInstructorDetails';
import CourseOverview from './components/Courses/CourseOverview';
import CourseLessons from './components/Courses/CourseLessons';
import LessonDetails from './pages/courses/LessonDetails';
import InstructorSettings from './components/Profile/Instructor/InstructorSettings';
import PaymentSuccess from './components/PaymentSuccess';
import Chatbot from './components/ChatBot';
import BlogLayout from './blog/BlogLayout';
import BlogList from './blog/BlogList';
import BlogDetail from './blog/BlogDetails';
import VerifyEmail from './pages/auth/VerifyEmail';
import CourseReviews from './components/Courses/CourseReviews';
import FAQs from './components/FAQs';

const AppContent = () => {
  const location = useLocation();
  const isLessonDetailsPage = location.pathname.startsWith("/courses/") && location.pathname.includes("/lessons/");
  const isBlogPage = location.pathname.startsWith("/blog");

  return (
    <>
      {!isLessonDetailsPage && !isBlogPage && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email/:uid/:token" element={<VerifyEmail />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}>
          <Route path="" element={<MyProfile />} />
          <Route path="all-courses" element={<AllCourses />} />
          <Route path="active-courses" element={<ActiveCourses />} />
          <Route path="completed-courses" element={<CompletedCourses />} />
          <Route path="purchase-history" element={<PurchaseHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/my-profile" element={<ProtectedRoute><InstructorProfile /></ProtectedRoute>}>
          <Route path="" element={<InstructorCourses />} />
          <Route path="settings" element={<InstructorSettings />} />
        </Route>

        <Route path="courses/:courseSlug" element={<CourseDetailsPage />}>
          <Route path="" element={<CourseOverview />} />
          <Route path="lessons" element={<CourseLessons />} />
          <Route path="reviews" element={<CourseReviews />} />
        </Route>
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/category/:categorySlug" element={<CategoryCoursesPage />} />
        <Route path="/courses/:courseSlug/lessons/:lessonSlug" element={<ProtectedRoute><LessonDetails /></ProtectedRoute>} />
        <Route path="/course/:courseId/payment-success" element={<PaymentSuccess />} />

        <Route path="/instructor/:instructorSlug" element={<ViewInstructor />} >
          <Route path="" element={<ViewInstructorCourses />} />
          <Route path="details" element={<ViewInstructorDetails />} />
        </Route>

        <Route path="/blog" element={<BlogLayout />}>
          <Route path="" element={<BlogList />} />
          <Route path=":slug" element={<BlogDetail />} />
        </Route>

        <Route path='/faqs' element={<FAQs />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!isLessonDetailsPage && <Footer />}
      <Chatbot />
    </>
  );
};

const App = () => {
  return (
    <div className='h-[100vh] bg-gray-100'>
      <Router>
        <AuthProvider>
          <ToastContainer />
          <AppContent />
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
