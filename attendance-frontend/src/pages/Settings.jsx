import { useState } from "react";
import "./Settings.css";

function Settings({
  darkMode,
  toggleTheme,
}) {
  const [name, setName] = useState(
    localStorage.getItem("adminName") ||
      "Admin"
  );

  const [email, setEmail] = useState(
    localStorage.getItem("adminEmail") ||
      "admin@attendance.com"
  );

  const [saved, setSaved] =
    useState(false);

  const saveSettings = () => {
    localStorage.setItem(
      "adminName",
      name
    );

    localStorage.setItem(
      "adminEmail",
      email
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="settings-page">
      <div className="settings-heading">
        <h1>Settings</h1>

        <p>
          Manage your application preferences
        </p>
      </div>

      <div className="settings-container">
        {/* PROFILE */}

        <div className="settings-card">
          <h2>Profile Settings</h2>

          <div className="form-group">
            <label>Admin Name</label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>
        </div>

        {/* APPEARANCE */}

        <div className="settings-card">
          <h2>Appearance</h2>

          <div className="setting-row">
            <div>
              <h3>Dark Mode</h3>

              <p>
                Switch between light and dark
                mode
              </p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleTheme}
              />

              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* NOTIFICATION */}

        <div className="settings-card">
          <h2>Notification Preferences</h2>

          <div className="setting-row">
            <div>
              <h3>Email Notifications</h3>

              <p>
                Receive important updates
              </p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                defaultChecked
              />

              <span className="slider"></span>
            </label>
          </div>
        </div>

        <button
          className="save-settings-btn"
          onClick={saveSettings}
        >
          {saved
            ? "✓ Settings Saved"
            : "Save Settings"}
        </button>
      </div>
    </div>
  );
}

export default Settings;