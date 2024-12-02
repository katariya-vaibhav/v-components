"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter

const AuthForm = () => {
  const router = useRouter(); // Initialize the router
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const endpoint = isLogin ? "/api/user/login" : "/api/user/sign-up";
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData; // Includes `name`, `email`, and `password`

    try {
      const response = await axios.post(endpoint, payload);

      console.log(response);

      alert(
        isLogin ? "Logged in successfully!" : "Account created successfully!"
      );

      if (isLogin) {
        router.push("/"); // Redirect to home page after login
      } else {
        router.push("/auth"); // Redirect to login page after signup
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] overflow-hidden bg-zinc-950 px-4 py-6">
      <div className="bg-zinc-900 shadow-md border border-zinc-700 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-4">
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-zinc-600 bg-zinc-800 p-2 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 text-sm text-white"
                placeholder="Enter your name..."
                required={!isLogin}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-zinc-600 bg-zinc-800 p-2 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 text-sm text-white"
              placeholder="Enter your email..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-zinc-600 bg-zinc-800 p-2 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 text-sm text-white"
              placeholder="Enter your password..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            {isLoading ? "Submitting..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsLogin((prev) => !prev)}
            className="text-blue-400 hover:underline text-sm"
          >
            {isLogin
              ? "Don't have an account? Sign up here."
              : "Already have an account? Login here."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
