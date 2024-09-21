import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from 'react-hot-toast';
import SignInwithGoogle from "./SignInwithGoogle";
import Spinner from "./Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("Invalid Email or Password");
      // toast.error(error.message, {
      //   position: "bottom-center",
      // });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
          <Spinner />
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg border border-gray-300 relative">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            Login
          </button>
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          New user? <a href="/register" className="text-blue-500 hover:underline">Register Here</a>
        </div>

        <div className="text-center text-sm text-gray-600 mb-6">
          <p className="mb-2">-- Or continue with --</p>
          <SignInwithGoogle />
        </div>
      </form>
    </div>
  );
}

export default Login;
