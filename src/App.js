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

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer/>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
