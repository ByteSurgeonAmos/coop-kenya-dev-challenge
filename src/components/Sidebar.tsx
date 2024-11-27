import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [activeLink, setActiveLink] = useState("Dashboard");

  return (
    <div className="flex flex-col h-full bg-white shadow-md w-1/4 px-4 py-6">
      <ul className="space-y-4">
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
  );
};

export default Sidebar;
