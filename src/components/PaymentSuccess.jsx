import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyPayment } from "../services/coursesApi";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import Loading from "./Loading";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const reference = query.get("reference");

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      if (!reference) {
        setMessage("Invalid payment reference.");
        setLoading(false);
        return;
      }

      try {
        const response = await verifyPayment(reference);
        if (response.message === "Payment successful, enrollment complete") {
          setMessage("Payment successful, you are now enrolled in the course.");
          setSuccess(true);
        } else {
          setMessage("Payment verification failed. Please contact support.");
          setSuccess(false);
        }
      } catch (error) {
        setMessage("Error verifying payment. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyPaymentStatus();
  }, [reference]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div
        className={`bg-white p-6 rounded-lg shadow-md text-center ${
          success ? "border-green-500" : "border-red-500"
        } border-4`}
      >
        <div className="flex flex-col items-center">
          {success ? (
            <FaCheckCircle className="text-green-500 text-6xl" />
          ) : (
            <FaExclamationTriangle className="text-red-500 text-6xl" />
          )}
          <p className="text-2xl font-semibold mt-4">{message}</p>
        </div>
        <button
          onClick={() => navigate("/courses")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Go to Courses
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
