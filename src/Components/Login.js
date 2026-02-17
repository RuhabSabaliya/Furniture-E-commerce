import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Login() {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const nav = useNavigate();

  const clearMessages = () => {
    if (error) setError("");
    if (info) setInfo("");
  };

  const getAuthErrorMessage = (authError) => {
    const code = authError?.code;
    switch (code) {
      case "auth/invalid-email":
        return "Please enter a valid email.";
      case "auth/user-not-found":
        return "No account found with that email.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/user-disabled":
        return "This account has been disabled.";
      case "auth/too-many-requests":
        return "Too many attempts. Try again later.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and try again.";
      default:
        return "Login failed. Please try again.";
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    const safeEmail = email.trim();
    if (!safeEmail || !pass) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, safeEmail, pass);
      nav("/");
    } catch (error) {
      console.error("Login Error:", error);
      setError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError("");
    setInfo("");
    const safeEmail = email.trim();
    if (!safeEmail) {
      setError("Enter your email above to reset your password.");
      return;
    }
    setResetting(true);
    try {
      await sendPasswordResetEmail(auth, safeEmail);
      setInfo("If an account exists for that email, a reset link has been sent.");
    } catch (error) {
      console.error("Password Reset Error:", error);
      setError(getAuthErrorMessage(error));
    } finally {
      setResetting(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-10 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            {error || info ? (
              <div className="mt-3 text-center text-sm space-y-2">
                {error ? <p className="text-red-600">{error}</p> : null}
                {info ? <p className="text-emerald-600">{info}</p> : null}
              </div>
            ) : null}
          </div>
          <form className="mt-8 space-y-6" onSubmit={login}>
            <div className="rounded-md shadow-sm -space-y-px">
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm rounded-lg"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    clearMessages();
                    setemail(e.target.value);
                  }}
                  disabled={loading || resetting}
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
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm rounded-lg"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => {
                    clearMessages();
                    setpass(e.target.value);
                  }}
                  disabled={loading || resetting}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={resetting || loading}
                  className="font-medium text-emerald-600 hover:text-emerald-500 disabled:opacity-70"
                >
                  {resetting ? "Sending reset..." : "Forgot your password?"}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link className="font-medium text-emerald-600 hover:text-emerald-500" to="/Registration">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
