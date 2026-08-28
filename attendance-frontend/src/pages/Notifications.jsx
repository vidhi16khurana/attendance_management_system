import { useState } from "react";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        icon: "📅",
        title: "Attendance marked",
        message:
          "Today's attendance has been successfully updated.",
        time: "2 minutes ago",
        read: false,
      },
      {
        id: 2,
        icon: "👨‍🎓",
        title: "New student added",
        message:
          "A new student has been added to the system.",
        time: "1 hour ago",
        read: false,
      },
      {
        id: 3,
        icon: "📊",
        title: "Report generated",
        message:
          "Monthly attendance report is ready.",
        time: "Yesterday",
        read: true,
      },
    ]);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>
          <p>
            Stay updated with recent activity
          </p>
        </div>

        <button onClick={markAllAsRead}>
          Mark all as read
        </button>
      </div>

      <div className="notifications-list">
        {notifications.map(
          (notification) => (
            <div
              className={`notification-card ${
                !notification.read
                  ? "unread"
                  : ""
              }`}
              key={notification.id}
            >
              <div className="notification-icon">
                {notification.icon}
              </div>

              <div className="notification-content">
                <h3>
                  {notification.title}
                </h3>

                <p>
                  {notification.message}
                </p>

                <small>
                  {notification.time}
                </small>
              </div>

              {!notification.read && (
                <div className="unread-dot"></div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Notifications;