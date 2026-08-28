import {
  Menu,
  Search,
  Bell,
  ChevronDown
} from "lucide-react";

import "./Header.css";

function Header() {
  return (
    <header className="header">

      <div className="header-left">
        <Menu size={26} />

        <h1>
          Welcome back,
          <span> Admin!</span>
          👋
        </h1>
      </div>

      <div className="header-right">

        <div className="search-box">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search anything..."
          />

          <span className="shortcut">
            Ctrl /
          </span>
        </div>

        <div className="notification">
          <Bell size={23} />
          <span>3</span>
        </div>

        <div className="header-avatar">
          VT
        </div>

        <ChevronDown size={18} />

      </div>

    </header>
  );
}

export default Header;