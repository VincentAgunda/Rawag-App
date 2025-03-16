import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Settings = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <p className="text-gray-600 dark:text-gray-400">Configure your app settings here.</p>

      {/* Dark Mode Toggle */}
      <div className="flex items-center mt-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={toggleTheme} />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
            {darkMode ? "Dark Mode Enabled" : "Light Mode Enabled"}
          </span>
        </label>
      </div>
    </div>
  );
};

export default Settings;
