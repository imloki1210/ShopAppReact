import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let photoURL = "";

      if (image) {
        const imageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(imageRef, image);
        photoURL = await getDownloadURL(imageRef);
      }

      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        photo: photoURL
      });

      toast.success("User Registered Successfully!!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      toast.error("Email already exists");;
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="relative max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
          <Spinner />
        </div>
      )}
      <h3 className="text-2xl font-bold text-center mb-6">Sign Up</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">First name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Last name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email address</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
        <div className="relative">
          <input
            type="file"
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      </div>

      <div className="mb-6">
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          Sign Up
        </button>
      </div>

      <p className="text-sm text-center text-gray-500">
        Already registered? <a href="/login" className="text-blue-500">Login</a>
      </p>
    </form>
  );
}

export default Register;
