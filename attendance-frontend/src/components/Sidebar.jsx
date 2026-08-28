import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  CalendarCheck,
  BarChart3,
  CalendarDays,
  Bell,
  Settings,
  Moon,
  Sun,
  ChevronDown
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({
  activePage,
  setActivePage,
  sidebarOpen,
  darkMode,
  toggleTheme
}) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />
    },
    {
      name: "Students",
      icon: <Users size={20} />
    },
    {
      name: "Courses",
      icon: <BookOpen size={20} />
    },
    {
      name: "Enrollments",
      icon: <ClipboardList size={20} />
    },
    {
      name: "Attendance",
      icon: <CalendarCheck size={20} />
    },
    {
      name: "Reports",
      icon: <BarChart3 size={20} />
    },
    {
      name: "Calendar",
      icon: <CalendarDays size={20} />
    },
    {
      name: "Notifications",
      icon: <Bell size={20} />
    },
    {
      name: "Settings",
      icon: <Settings size={20} />
    }
  ];

  return (
    <aside
      className={`sidebar ${
        sidebarOpen ? "sidebar-visible" : "sidebar-hidden"
      }`}
    >
      {/* LOGO */}

      <div className="logo">
        <div className="logo-icon">
          <CalendarCheck size={24} />
        </div>

        <h2>
          Attendance
          <br />
          Management
        </h2>
      </div>

      {/* MENU */}

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={
              activePage === item.name
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setActivePage(item.name)}
          >
            {item.icon}

            <span>{item.name}</span>

            {item.name === "Notifications" && (
              <span className="sidebar-notification-badge">
                3
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* BOTTOM SECTION */}

      <div className="sidebar-bottom">

        {/* DARK / LIGHT MODE */}

        <button
          className="dark-mode"
          onClick={toggleTheme}
        >
          <div className="dark-mode-left">

            {darkMode ? (
              <Moon size={19} />
            ) : (
              <Sun size={19} />
            )}

            <span>
              {darkMode
                ? "Dark Mode"
                : "Light Mode"}
            </span>
          </div>

          <div
            className={`toggle ${
              darkMode ? "toggle-active" : ""
            }`}
          >
            <div className="toggle-circle"></div>
          </div>
        </button>

        {/* ADMIN PROFILE */}

        <div className="admin-profile">

          <div className="avatar">
            VT
          </div>

          <div className="admin-info">
            <strong>Admin User</strong>
            <span>admin@gmail.com</span>
          </div>

          <ChevronDown size={18} />

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;