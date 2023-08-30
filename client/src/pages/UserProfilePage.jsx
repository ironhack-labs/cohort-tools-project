import { useEffect, useState, useContext } from "react";
import axios from "axios";
import placeholderImage from "./../assets/placeholder.png";

import { AuthContext } from "../context/auth.context";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;



function UserProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const getStudent = () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        axios
        .get(
          `${API_URL}/api/users/${user._id}`,
          { headers: { Authorization: `Bearer ${storedToken}` }}
          )
          .then((response) => {
            setUserProfile(response.data);
            setLoading(false);
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          });
        }
        else {
          setErrorMessage("User not logged in");
        }
    };

    getStudent();
  }, [user._id]);

  if (errorMessage) return <div>{errorMessage}</div>;
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="StudentDetailsPage bg-gray-100 py-6 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md mb-6">
        {userProfile && (
          <>
            {/* <img className="w-32 h-32 rounded-full object-cover mb-4" src={student.image} alt="profile-photo" /> */}
            <img
            src={placeholderImage}
            alt="profile-photo"
            className="rounded-full w-32 h-32 object-cover border-2 border-gray-300"
          />            
            <h1 className="text-2xl mt-4 font-bold absolute">{userProfile.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24 mb-4 border-b pb-4">
              <p className="text-left mb-2 border-b pb-2">
                <strong>Email:</strong> {userProfile.email}
              </p>
            </div>
          </>
        )}
      </div>
      
    </div>
  );
}

export default UserProfilePage;