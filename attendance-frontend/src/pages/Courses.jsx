import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  BookOpen,
  X,
  FileText
} from "lucide-react";

import "./Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: ""
  });

  useEffect(() => {
    fetchCourses();
  }, []);

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
        "http://localhost:8080/courses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
        await fetchCourses();

        setFormData({
          courseName: "",
          courseCode: ""
        });

        setShowModal(false);
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await fetch(
        `http://localhost:8080/courses/${id}`,
        {
          method: "DELETE"
        }
      );

      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.courseName
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    course.courseCode
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="courses-page">

      {/* Page Header */}
      <div className="courses-top">

        <div className="page-title-row">

          <div className="course-title-icon">
            <BookOpen size={25} />
          </div>

          <div>
            <h1>Courses</h1>
            <p>Manage all available courses</p>
          </div>

        </div>

        <button
          className="add-course-btn"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} />
          Add Course
        </button>

      </div>

      {/* Statistics */}
      <div className="course-stats">

        <div className="course-stat-card">
          <span>Total Courses</span>
          <h2>{courses.length}</h2>
          <p>Available courses</p>
        </div>

        <div className="course-stat-card">
          <span>Active Courses</span>
          <h2>{courses.length}</h2>
          <p>Currently running</p>
        </div>

      </div>

      {/* Courses Table */}
      <div className="courses-card">

        <div className="courses-card-header">

          <div>
            <h2>Course Directory</h2>
            <p>
              {filteredCourses.length} courses found
            </p>
          </div>

          <div className="courses-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search by name or code..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

        </div>

        <div className="courses-table">

          <div className="courses-table-head">
            <span>Course</span>
            <span>Course Code</span>
            <span>Course ID</span>
            <span>Actions</span>
          </div>

          {filteredCourses.length === 0 ? (

            <div className="empty-courses">

              <BookOpen size={45} />

              <h3>No courses found</h3>

              <p>
                Add your first course to get started.
              </p>

            </div>

          ) : (

            filteredCourses.map((course) => (

              <div
                className="courses-table-row"
                key={course.id}
              >

                <div className="course-name-cell">

                  <div className="course-initial">
                    <FileText size={20} />
                  </div>

                  <div>
                    <strong>
                      {course.courseName}
                    </strong>

                    <small>
                      Academic Course
                    </small>
                  </div>

                </div>

                <span className="course-code">
                  {course.courseCode}
                </span>

                <span>
                  #{course.id}
                </span>

                <div className="course-actions">

                  <button
                    className="course-edit-btn"
                    title="Edit Course"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className="course-delete-btn"
                    title="Delete Course"
                    onClick={() =>
                      deleteCourse(course.id)
                    }
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            ))
          )}

        </div>

      </div>

      {/* Add Course Modal */}

      {showModal && (

        <div className="course-modal-overlay">

          <div className="course-modal">

            <div className="course-modal-header">

              <div>
                <h2>Add New Course</h2>
                <p>
                  Enter course details below
                </p>
              </div>

              <button
                className="close-course-modal"
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X size={22} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="course-form-group">

                <label>
                  <BookOpen size={16} />
                  Course Name
                </label>

                <input
                  type="text"
                  name="courseName"
                  placeholder="Enter course name"
                  value={formData.courseName}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="course-form-group">

                <label>
                  <FileText size={16} />
                  Course Code
                </label>

                <input
                  type="text"
                  name="courseCode"
                  placeholder="Example: BCS101"
                  value={formData.courseCode}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="course-modal-buttons">

                <button
                  type="button"
                  className="cancel-course-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-course-btn"
                >
                  Add Course
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Courses;