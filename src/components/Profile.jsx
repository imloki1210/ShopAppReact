import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "./Spinner";


function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log(user, docRef, docSnap, "`docSnapdocSnapdocSnap`")
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        }
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {userDetails ? (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
          <div className="relative mx-auto mb-4">
            <img
              src={'https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg'}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto border-4 border-gray-300"
            />
            <span className="block mt-2 text-gray-600 font-semibold text-xl">
              {userDetails.firstName} {userDetails.lastName}
            </span>
          </div>
          <p className="text-gray-500 mb-4">{userDetails.email}</p>
          <div className="flex justify-center">
            <button
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Profile;
