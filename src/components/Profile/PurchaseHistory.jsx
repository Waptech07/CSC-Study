import React, { useState, useEffect, useContext } from "react";
import {
  getPurchaseHistory,
  getCourseDetails,
} from "../../services/coursesApi";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/AuthContext";

const PurchaseHistory = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const historyData = await getPurchaseHistory();
        const detailedPurchaseHistory = await Promise.all(
          historyData.map(async (item) => {
            const courseDetails = await getCourseDetails(item.course.slug);
            return { ...courseDetails, ...item };
          })
        );
        setPurchaseHistory(detailedPurchaseHistory);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (purchaseHistory.length === 0) {
    return <div>No purchase history found.</div>;
  }

  return (
    <div className="bg-white p-10 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">
        Purchase History
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {purchaseHistory.map((item, index) => (
          <div key={index} className="border p-5 rounded-md shadow-sm">
            <h3 className="text-lg font-bold mb-2 text-gray-700">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-2">
              Purchased on:{" "}
              <span className="text-gray-800 font-semibold">
                {new Date(item.purchase_date).toLocaleDateString()}
              </span>
            </p>
            <p className="text-gray-600">
              Amount:{" "}
              <span className="text-green-600 font-semibold">
                ₦{item.amount_paid.toLocaleString()}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
