import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-yellow-600 text-white">
      <h1 className="text-lg font-bold">Inua Mkulima Subsidy Program</h1>
      <div className="flex items-center space-x-4">
        <span>
          Logged In As: <strong>KIMATHI</strong>
        </span>
        <button className="px-4 py-2 bg-white text-yellow-600 font-medium rounded hover:bg-gray-100">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
