import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  ClipboardList,
  X,
  Users,
  BookOpen
} from "lucide-react";

import "./Enrollments.css";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    courseId: ""
  });

  useEffect(() => {
    fetchEnrollments();
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/enrollments"
      );

      const data = await response.json();

      setEnrollments(data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/students"
      );

      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/courses"
      );

      const data = await response.json();

      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
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
        `http://localhost:8080/enrollments?studentId=${formData.studentId}&courseId=${formData.courseId}`,
        {
          method: "POST"
        }
      );

      if (response.ok) {
        await fetchEnrollments();

        setFormData({
          studentId: "",
          courseId: ""
        });

        setShowModal(false);
      } else {
        alert("Unable to create enrollment");
      }
    } catch (error) {
      console.error("Error adding enrollment:", error);
    }
  };

  const deleteEnrollment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enrollment?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await fetch(
        `http://localhost:8080/enrollments/${id}`,
        {
          method: "DELETE"
        }
      );

      fetchEnrollments();
    } catch (error) {
      console.error("Error deleting enrollment:", error);
    }
  };

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const studentName =
      enrollment.student?.name?.toLowerCase() || "";

    const courseName =
      enrollment.course?.courseName?.toLowerCase() || "";

    return (
      studentName.includes(search.toLowerCase()) ||
      courseName.includes(search.toLowerCase())
    );
  });

  return (
    <div className="enrollments-page">

      <div className="enrollments-top">

        <div className="enrollment-title-row">

          <div className="enrollment-title-icon">
            <ClipboardList size={25} />
          </div>

          <div>
            <h1>Enrollments</h1>
            <p>Manage student course enrollments</p>
          </div>

        </div>

        <button
          className="add-enrollment-btn"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} />
          Add Enrollment
        </button>

      </div>

      <div className="enrollment-stats">

        <div className="enrollment-stat-card">
          <span>Total Enrollments</span>
          <h2>{enrollments.length}</h2>
          <p>Student-course registrations</p>
        </div>

        <div className="enrollment-stat-card">
          <span>Total Students</span>
          <h2>{students.length}</h2>
          <p>Registered students</p>
        </div>

        <div className="enrollment-stat-card">
          <span>Total Courses</span>
          <h2>{courses.length}</h2>
          <p>Available courses</p>
        </div>

      </div>

      <div className="enrollments-card">

        <div className="enrollments-card-header">

          <div>
            <h2>Enrollment Directory</h2>

            <p>
              {filteredEnrollments.length} enrollments found
            </p>
          </div>

          <div className="enrollments-search">

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

        <div className="enrollments-table">

          <div className="enrollments-table-head">
            <span>Student</span>
            <span>Course</span>
            <span>Enrollment ID</span>
            <span>Actions</span>
          </div>

          {filteredEnrollments.length === 0 ? (

            <div className="empty-enrollments">

              <ClipboardList size={45} />

              <h3>No enrollments found</h3>

              <p>
                Create an enrollment to get started.
              </p>

            </div>

          ) : (

            filteredEnrollments.map((enrollment) => (

              <div
                className="enrollments-table-row"
                key={enrollment.id}
              >

                <div className="enrollment-student-cell">

                  <div className="enrollment-avatar">
                    {enrollment.student?.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>

                  <div>
                    <strong>
                      {enrollment.student?.name}
                    </strong>

                    <small>
                      {enrollment.student?.email}
                    </small>
                  </div>

                </div>

                <div className="enrollment-course-cell">

                  <BookOpen size={17} />

                  <div>
                    <strong>
                      {enrollment.course?.courseName}
                    </strong>

                    <small>
                      {enrollment.course?.courseCode}
                    </small>
                  </div>

                </div>

                <span>
                  #{enrollment.id}
                </span>

                <button
                  className="enrollment-delete-btn"
                  onClick={() =>
                    deleteEnrollment(enrollment.id)
                  }
                >
                  <Trash2 size={18} />
                </button>

              </div>

            ))
          )}

        </div>

      </div>

      {showModal && (

        <div className="enrollment-modal-overlay">

          <div className="enrollment-modal">

            <div className="enrollment-modal-header">

              <div>
                <h2>Create Enrollment</h2>

                <p>
                  Assign a student to a course
                </p>
              </div>

              <button
                className="close-enrollment-modal"
                onClick={() => setShowModal(false)}
              >
                <X size={22} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="enrollment-form-group">

                <label>
                  <Users size={16} />
                  Select Student
                </label>

                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select a student
                  </option>

                  {students.map((student) => (
                    <option
                      key={student.id}
                      value={student.id}
                    >
                      {student.name}
                    </option>
                  ))}

                </select>

              </div>

              <div className="enrollment-form-group">

                <label>
                  <BookOpen size={16} />
                  Select Course
                </label>

                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select a course
                  </option>

                  {courses.map((course) => (
                    <option
                      key={course.id}
                      value={course.id}
                    >
                      {course.courseName}
                      {" - "}
                      {course.courseCode}
                    </option>
                  ))}

                </select>

              </div>

              <div className="enrollment-modal-buttons">

                <button
                  type="button"
                  className="cancel-enrollment-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-enrollment-btn"
                >
                  Create Enrollment
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Enrollments;