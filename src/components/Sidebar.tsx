import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-yellow-500 text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div
        className={`
        fixed md:static inset-0 z-10
        flex flex-col h-full bg-white shadow-md w-full md:w-1/4 px-4 py-6
        transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        md:transform-none transition-transform duration-200 ease-in-out
      `}
      >
        <ul className="space-y-4 mt-12 md:mt-0">
          {["Dashboard", "Transactions", "Reports"].map((item) => (
            <li
              key={item}
              onClick={() => setActiveLink(item)}
              className={`font-medium text-gray-800 hover:text-yellow-600 cursor-pointer pl-4 ${
                activeLink === item ? "border-l-4 border-yellow-500" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
