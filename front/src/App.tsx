import { Outlet } from "react-router-dom";
import { MySidebar } from "./components/Menubar/sidebar";
import { useState } from "react";
import { Navbar } from "./components/Menubar/navbar";
import { MoonStars, Sun } from "@phosphor-icons/react";

export function App() {
  const [darkMode, setDarkMode] = useState(true);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div id="page" className="flex-row">
      <Navbar darkMode={darkMode} />

      <div className="flex h-screen">
        <MySidebar darkMode={darkMode} />
        <div id="page-content" className="flex-1 p-2 mr-2">
          <Outlet />
        </div>
      </div>

      <div
        id="toggle-theme-icon"
        className="absolute top-0 left-0 ml-4 justify-center"
      >
        <button onClick={toggleDarkMode} className="border-violet-600 p-2">
          {darkMode ? (
            <Sun className="h-6 w-6 text-yellow-500" />
          ) : (
            <MoonStars className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
}
