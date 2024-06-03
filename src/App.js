import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
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

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />}>
            <Route path="details" element={<MyProfile />} />
            <Route path="all-courses" element={<AllCourses />} />
            <Route path="active-courses" element={<ActiveCourses />} />
            <Route path="completed-courses" element={<CompletedCourses />} />
            <Route path="purchase-history" element={<PurchaseHistory />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
