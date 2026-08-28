import { useEffect, useState } from "react";
import Header from "../components/Header";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import "./Calendar.css";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await fetch("http://localhost:8080/attendance");
      const data = await response.json();
      setAttendance(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const changeMonth = (direction) => {
    setCurrentDate(
      new Date(
        year,
        month + direction,
        1
      )
    );
  };

  const getAttendanceForDate = (day) => {
    if (!day) return [];

    const formattedDate =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return attendance.filter(
      (record) => record.date === formattedDate
    );
  };

  const isToday = (day) => {
    const today = new Date();

    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const selectedDate = new Date();

  const selectedDateAttendance =
    attendance.filter(
      (record) =>
        record.date ===
        `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1
        ).padStart(2, "0")}-${String(
          selectedDate.getDate()
        ).padStart(2, "0")}`
    );

  const presentToday =
    selectedDateAttendance.filter(
      (record) =>
        record.status === "PRESENT"
    ).length;

  const absentToday =
    selectedDateAttendance.filter(
      (record) =>
        record.status === "ABSENT"
    ).length;

  return (
    <div className="calendar-page">

      <Header />

      <div className="calendar-content">

        <div className="calendar-page-header">

          <div>
            <div className="calendar-title">
              <CalendarDays size={26} />
              <h1>Attendance Calendar</h1>
            </div>

            <p>
              View attendance activity by date
            </p>
          </div>

          <div className="calendar-summary">

            <div>
              <span>Present Today</span>
              <strong>{presentToday}</strong>
            </div>

            <div>
              <span>Absent Today</span>
              <strong>{absentToday}</strong>
            </div>

          </div>

        </div>

        <div className="calendar-card">

          <div className="calendar-navigation">

            <button
              onClick={() => changeMonth(-1)}
            >
              <ChevronLeft size={20} />
            </button>

            <h2>{monthName}</h2>

            <button
              onClick={() => changeMonth(1)}
            >
              <ChevronRight size={20} />
            </button>

          </div>

          <div className="calendar-weekdays">

            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>

          </div>

          <div className="calendar-days">

            {days.map((day, index) => {

              const records =
                getAttendanceForDate(day);

              const presentCount =
                records.filter(
                  (record) =>
                    record.status === "PRESENT"
                ).length;

              const absentCount =
                records.filter(
                  (record) =>
                    record.status === "ABSENT"
                ).length;

              return (
                <div
                  key={index}
                  className={`
                    calendar-day
                    ${!day ? "empty-day" : ""}
                    ${isToday(day) ? "today" : ""}
                  `}
                >

                  {day && (
                    <>
                      <span className="day-number">
                        {day}
                      </span>

                      {records.length > 0 && (
                        <div className="day-attendance">

                          <span className="present-dot">
                            P {presentCount}
                          </span>

                          <span className="absent-dot">
                            A {absentCount}
                          </span>

                        </div>
                      )}
                    </>
                  )}

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Calendar;