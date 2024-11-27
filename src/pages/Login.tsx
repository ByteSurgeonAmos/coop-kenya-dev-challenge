import React from "react";
import LoginCard from "../components/LoginCard";
import FarmerImageSection from "../components/FarmerSection";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Section */}
      <div className="hidden md:flex md:w-1/2">
        <FarmerImageSection />
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-4 min-h-screen">
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginPage;
