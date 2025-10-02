"use client";
import React, { useState } from "react";
import { Bird, BookOpen, Users, Laptop, GraduationCap } from "lucide-react";

export default function TinyLMSSignup() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    instituteName: "",
    email: "",
    password: "",
    agreedToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-12">
            <Bird className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Commencez avec tinyLMS
          </h1>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="John Doe"
              />
            </div>

            {/* Institute Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Institute phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Institute Name */}
            <div>
              <label
                htmlFor="instituteName"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Institute name
              </label>
              <input
                type="text"
                id="instituteName"
                name="instituteName"
                value={formData.instituteName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Your Institute"
              />
            </div>

            {/* Institute Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Institute email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="admin@institute.edu"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="min 8 chars"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreedToTerms"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="agreedToTerms"
                className="ml-2 text-sm text-gray-600"
              >
                I agree to the{" "}
                <span className="text-blue-500 hover:underline cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-blue-500 hover:underline cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>

            {/* Register Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Register
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span className="text-blue-500 hover:underline font-medium cursor-pointer">
              Sign in
            </span>
          </p>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-500 items-center justify-center p-16 relative overflow-hidden">
        <div className="relative w-full max-w-lg">
          {/* Decorative circles */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-400 rounded-full opacity-30"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-600 rounded-full opacity-20"></div>

          {/* Main illustration elements */}
          <div className="relative z-10 flex flex-col items-center space-y-12">
            {/* Top row - Books and Laptop */}
            <div className="flex items-center justify-center space-x-16">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-2xl transform -rotate-6">
                <BookOpen className="w-16 h-16 text-white" strokeWidth={1.5} />
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-2xl transform rotate-6">
                <Laptop className="w-16 h-16 text-white" strokeWidth={1.5} />
              </div>
            </div>

            {/* Center - Main graduation cap */}
            <div className="bg-white bg-opacity-25 backdrop-blur-md p-12 rounded-3xl shadow-2xl">
              <GraduationCap
                className="w-24 h-24 text-white"
                strokeWidth={1.5}
              />
            </div>

            {/* Bottom - Users icon */}
            <div className="bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-2xl">
              <Users className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Additional decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full opacity-40"></div>
          <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-white rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
}
