import React from "react";
import { useAuth } from "../contexts/authContext"; // Adjust the import path as needed
import { useHistory } from "react-router-dom";

const Header = () => {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useHistory();

  const handleLogout = () => {
    logout();
    navigate.push("/login");
  };

  return (
    <header className="w-full border border-b-4 border-b-purple-700">
      <nav className="flex items-center justify-between p-4 bg-white text-purple-600 ">
        <img
          src="/images/ETLHiveLogo.png"
          alt="ETLHiveLogo"
          className="h-12 w-auto cursor-pointer"
          onClick={() => navigate.push("/home")}
        />
        <div className="flex items-center space-x-8 mr-3">
          <button
            onClick={() => navigate.push("/settings")}
            className="text-purple-600 hover:text-purple-400"
          >
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="text-purple-600 hover:text-purple-400"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
