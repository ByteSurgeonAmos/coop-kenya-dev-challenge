import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./Logout-Modal";

const Navbar: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { name } = JSON.parse(userData);
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-between items-center px-6 py-4 bg-yellow-600 text-white bg-[url('/header.png')] bg-cover bg-center bg-no-repeat">
        <h1 className="text-lg font-bold">Inua Mkulima Subsidy Program</h1>
        <div className="flex items-center space-x-4">
          <span>
            Logged In As: <strong>{userName}</strong>
          </span>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="px-4 py-2 bg-white text-yellow-600 font-medium rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
