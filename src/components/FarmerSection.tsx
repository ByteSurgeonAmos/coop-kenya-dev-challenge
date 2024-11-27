import React from "react";

const FarmerImageSection: React.FC = () => {
  return (
    <div
      className="relative w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      <div className="absolute top-4 left-4">
        <img src="/Logo.svg" alt="Bank Logo" className="h-12" />
      </div>
      {/* <div className="absolute bottom-4 left-4 flex items-center">
        <img
          src="/muranga-county-logo.png" // Replace with actual county logo URL
          alt="Muranga County Logo"
          className="h-16"
        />
        <p className="ml-4 text-lg font-bold text-white">Growing together</p>
      </div> */}
    </div>
  );
};

export default FarmerImageSection;
