import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInstructorDetails } from "../../../services/coursesApi";
import Loading from "../../Loading";

const ViewInstructorDetails = () => {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const fetchedInstructor = await getInstructorDetails(id);
        setInstructor(fetchedInstructor);
      } catch (error) {
        console.error("Error fetching instructor details:", error);
      }
    };

    fetchInstructor();
  }, [id]);

  if (!instructor) {
    <Loading/>
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto my-10">
      <div className="flex flex-col gap-4">
        <div>
          <label className="block font-bold text-gray-700">Email:</label>
          <p className="text-gray-600">{instructor.user.email}</p>
        </div>
        <div>
          <label className="block font-bold text-gray-700">Phone:</label>
          <p className="text-gray-600">{instructor.user.phone}</p>
        </div>
        <div>
          <label className="block font-bold text-gray-700">Address:</label>
          <p className="text-gray-600">{instructor.user.address}</p>
        </div>
        <div>
          <label className="block font-bold text-gray-700">Nationality:</label>
          <p className="text-gray-600">{instructor.user.nationality}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewInstructorDetails;
