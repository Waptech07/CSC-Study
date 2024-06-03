import React from "react";

const PurchaseHistory = () => {
  const purchases = [
    { id: 1, course: "React for Beginners", date: "2023-05-10", amount: "₦1500" },
    { id: 2, course: "Advanced JavaScript", date: "2023-06-15", amount: "₦2300" },
  ];

  return (
    <div className="bg-white p-10 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-5">Purchase History</h2>
      <div className="space-y-4">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="border p-5 rounded-md shadow-sm">
            <h3 className="text-lg font-bold mb-2">{purchase.course}</h3>
            <p className="text-gray-600 mb-2">Purchased on: {purchase.date}</p>
            <p className="text-gray-600">Amount: {purchase.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
