import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Registration() {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [username, setusername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const clearMessages = () => {
    if (error) setError("");
  };

  const getAuthErrorMessage = (authError) => {
    const code = authError?.code;
    switch (code) {
      case "auth/invalid-email":
        return "Please enter a valid email.";
      case "auth/email-already-in-use":
        return "An account already exists with that email.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and try again.";
      default:
        return "Registration failed. Please try again.";
    }
  };

  const registration = async (e) => {
    e.preventDefault();
    setError("");
    const safeEmail = email.trim();
    const safeUsername = username.trim();
    if (!safeUsername || !safeEmail || !pass) {
      setError("Username, email, and password are required.");
      return;
    }
    if (pass.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, safeEmail, pass);
      if (safeUsername) {
        try {
          await updateProfile(credential.user, { displayName: safeUsername });
        } catch (profileError) {
          console.warn("Profile Update Error:", profileError);
        }
      }
      nav("/");
    } catch (error) {
      console.error("Registration Error:", error);
      setError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            {error ? (
              <p className="mt-3 text-center text-sm text-red-600">{error}</p>
            ) : null}
          </div>
          <form className="mt-8 space-y-6" onSubmit={registration}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm rounded-lg"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    clearMessages();
                    setusername(e.target.value);
                  }}
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm rounded-lg"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    clearMessages();
                    setemail(e.target.value);
                  }}
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm rounded-lg"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => {
                    clearMessages();
                    setpass(e.target.value);
                  }}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link className="font-medium text-emerald-600 hover:text-emerald-500" to="/Login">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
