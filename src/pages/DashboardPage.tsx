import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/DashboardComponent";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar />

        {/* Dashboard */}
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
