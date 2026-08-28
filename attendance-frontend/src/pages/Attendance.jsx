import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  CalendarCheck,
  Trash2,
  Pencil,
  X,
  UserCheck,
  BarChart3
} from "lucide-react";

import "./Attendance.css";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [selectedEnrollment, setSelectedEnrollment] =
    useState("");

  const [percentage, setPercentage] = useState(null);

  const [formData, setFormData] = useState({
    enrollmentId: "",
    status: "PRESENT"
  });

  useEffect(() => {
    fetchAttendance();
    fetchEnrollments();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/attendance"
      );

      const data = await response.json();

      setAttendance(data);
    } catch (error) {
      console.error(
        "Error fetching attendance:",
        error
      );
    }
  };

  const fetchEnrollments = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/enrollments"
      );

      const data = await response.json();

      setEnrollments(data);
    } catch (error) {
      console.error(
        "Error fetching enrollments:",
        error
      );
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/attendance?enrollmentId=${formData.enrollmentId}&status=${formData.status}`,
        {
          method: "POST"
        }
      );

      if (response.ok) {
        await fetchAttendance();

        setFormData({
          enrollmentId: "",
          status: "PRESENT"
        });

        setShowModal(false);
      }
    } catch (error) {
      console.error(
        "Error marking attendance:",
        error
      );
    }
  };

  const updateAttendance = async (
    id,
    currentStatus
  ) => {
    const newStatus =
      currentStatus === "PRESENT"
        ? "ABSENT"
        : "PRESENT";

    try {
      const response = await fetch(
        `http://localhost:8080/attendance/${id}?status=${newStatus}`,
        {
          method: "PUT"
        }
      );

      if (response.ok) {
        fetchAttendance();
      }
    } catch (error) {
      console.error(
        "Error updating attendance:",
        error
      );
    }
  };

  const deleteAttendance = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await fetch(
        `http://localhost:8080/attendance/${id}`,
        {
          method: "DELETE"
        }
      );

      fetchAttendance();
    } catch (error) {
      console.error(
        "Error deleting attendance:",
        error
      );
    }
  };

  const calculatePercentage = async () => {
    if (!selectedEnrollment) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/attendance/percentage/${selectedEnrollment}`
      );

      const data = await response.json();

      setPercentage(data);
    } catch (error) {
      console.error(
        "Error calculating percentage:",
        error
      );
    }
  };

  const filteredAttendance = attendance.filter(
    (record) => {
      const studentName =
        record.enrollment?.student?.name
          ?.toLowerCase() || "";

      const courseName =
        record.enrollment?.course?.courseName
          ?.toLowerCase() || "";

      return (
        studentName.includes(
          search.toLowerCase()
        ) ||
        courseName.includes(
          search.toLowerCase()
        )
      );
    }
  );

  const presentCount = attendance.filter(
    (record) => record.status === "PRESENT"
  ).length;

  const absentCount = attendance.filter(
    (record) => record.status === "ABSENT"
  ).length;

  return (
    <div className="attendance-page">

      <div className="attendance-top">

        <div className="attendance-title-row">

          <div className="attendance-title-icon">
            <CalendarCheck size={25} />
          </div>

          <div>
            <h1>Attendance</h1>

            <p>
              Manage and track student attendance
            </p>
          </div>

        </div>

        <button
          className="mark-attendance-btn"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} />
          Mark Attendance
        </button>

      </div>

      <div className="attendance-stats">

        <div className="attendance-stat-card">
          <span>Total Records</span>
          <h2>{attendance.length}</h2>
          <p>All attendance records</p>
        </div>

        <div className="attendance-stat-card">
          <span>Present</span>
          <h2>{presentCount}</h2>
          <p>Present records</p>
        </div>

        <div className="attendance-stat-card">
          <span>Absent</span>
          <h2>{absentCount}</h2>
          <p>Absent records</p>
        </div>

      </div>

      {/* Percentage Section */}

      <div className="percentage-card">

        <div className="percentage-info">

          <div className="percentage-icon">
            <BarChart3 size={24} />
          </div>

          <div>
            <h2>Attendance Percentage</h2>

            <p>
              Select an enrollment to check attendance
            </p>
          </div>

        </div>

        <div className="percentage-actions">

          <select
            value={selectedEnrollment}
            onChange={(event) =>
              setSelectedEnrollment(
                event.target.value
              )
            }
          >
            <option value="">
              Select Enrollment
            </option>

            {enrollments.map((enrollment) => (
              <option
                key={enrollment.id}
                value={enrollment.id}
              >
                {enrollment.student?.name}
                {" - "}
                {enrollment.course?.courseName}
              </option>
            ))}

          </select>

          <button
            onClick={calculatePercentage}
          >
            Calculate
          </button>

          {percentage !== null && (
            <div className="percentage-result">
              {percentage.toFixed(1)}%
            </div>
          )}

        </div>

      </div>

      {/* Main Table */}

      <div className="attendance-card">

        <div className="attendance-card-header">

          <div>
            <h2>Attendance Records</h2>

            <p>
              {filteredAttendance.length}
              {" records found"}
            </p>
          </div>

          <div className="attendance-search">

            <Search size={19} />

            <input
              type="text"
              placeholder="Search student or course..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

        </div>

        <div className="attendance-table">

          <div className="attendance-table-head">
            <span>Student</span>
            <span>Course</span>
            <span>Date</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {filteredAttendance.length === 0 ? (

            <div className="empty-attendance">

              <CalendarCheck size={45} />

              <h3>No attendance records found</h3>

              <p>
                Mark attendance to get started.
              </p>

            </div>

          ) : (

            filteredAttendance.map((record) => (

              <div
                className="attendance-table-row"
                key={record.id}
              >

                <div className="attendance-student-cell">

                  <div className="attendance-avatar">
                    {record.enrollment?.student?.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>

                  <div>
                    <strong>
                      {
                        record.enrollment?.student
                          ?.name
                      }
                    </strong>

                    <small>
                      {
                        record.enrollment?.student
                          ?.email
                      }
                    </small>
                  </div>

                </div>

                <div className="attendance-course-cell">
                  {
                    record.enrollment?.course
                      ?.courseName
                  }
                </div>

                <span>
                  {record.date}
                </span>

                <span
                  className={
                    record.status === "PRESENT"
                      ? "attendance-status present-status"
                      : "attendance-status absent-status"
                  }
                >
                  {record.status}
                </span>

                <div className="attendance-actions">

                  <button
                    className="attendance-edit-btn"
                    title="Change Status"
                    onClick={() =>
                      updateAttendance(
                        record.id,
                        record.status
                      )
                    }
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    className="attendance-delete-btn"
                    title="Delete"
                    onClick={() =>
                      deleteAttendance(record.id)
                    }
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>

            ))
          )}

        </div>

      </div>

      {/* Mark Attendance Modal */}

      {showModal && (

        <div className="attendance-modal-overlay">

          <div className="attendance-modal">

            <div className="attendance-modal-header">

              <div>
                <h2>Mark Attendance</h2>

                <p>
                  Select student enrollment and status
                </p>
              </div>

              <button
                className="close-attendance-modal"
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X size={22} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="attendance-form-group">

                <label>
                  <UserCheck size={16} />
                  Student Enrollment
                </label>

                <select
                  name="enrollmentId"
                  value={formData.enrollmentId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Enrollment
                  </option>

                  {enrollments.map(
                    (enrollment) => (

                      <option
                        key={enrollment.id}
                        value={enrollment.id}
                      >
                        {enrollment.student?.name}
                        {" - "}
                        {
                          enrollment.course
                            ?.courseName
                        }
                      </option>

                    )
                  )}

                </select>

              </div>

              <div className="attendance-form-group">

                <label>
                  <CalendarCheck size={16} />
                  Attendance Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="PRESENT">
                    Present
                  </option>

                  <option value="ABSENT">
                    Absent
                  </option>

                </select>

              </div>

              <div className="attendance-modal-buttons">

                <button
                  type="button"
                  className="cancel-attendance-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-attendance-btn"
                >
                  Mark Attendance
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Attendance;