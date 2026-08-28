import { useState } from "react";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";
import Calendar from "./pages/Calendar";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") !== "light"
  );

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleTheme = () => {
    const newTheme = !darkMode;

    setDarkMode(newTheme);

    localStorage.setItem(
      "theme",
      newTheme ? "dark" : "light"
    );
  };

  const renderPage = () => {
    switch (activePage) {
      case "Students":
        return <Students />;

      case "Courses":
        return <Courses />;

      case "Enrollments":
        return <Enrollments />;

      case "Attendance":
        return <Attendance />;

      case "Calendar":
        return <Calendar />;

      case "Reports":
        return <Reports />;

      case "Notifications":
        return <Notifications />;

      case "Settings":
        return (
          <Settings
            darkMode={darkMode}
            toggleTheme={toggleTheme}
          />
        );

      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className={`app ${
        darkMode ? "dark-theme" : "light-theme"
      }`}
    >
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <main
        className={`main-content ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="page-content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;