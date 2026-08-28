import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  X,
  Mail,
  Lock,
  User
} from "lucide-react";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    fetchStudents();
  }, []);

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
        "http://localhost:8080/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
        await fetchStudents();

        setFormData({
          name: "",
          email: "",
          password: ""
        });

        setShowModal(false);
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await fetch(
        `http://localhost:8080/students/${id}`,
        {
          method: "DELETE"
        }
      );

      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    student.email
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="students-page">

      <div className="students-top">

        <div>
          <div className="page-title-row">
            <div className="title-icon">
              <Users size={25} />
            </div>

            <div>
              <h1>Students</h1>
              <p>Manage all student records</p>
            </div>
          </div>
        </div>

        <button
          className="add-student-btn"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} />
          Add Student
        </button>

      </div>

      <div className="student-stats">

        <div className="student-stat-card">
          <span>Total Students</span>

          <h2>{students.length}</h2>

          <p>Registered students</p>
        </div>

        <div className="student-stat-card">
          <span>Active Students</span>

          <h2>{students.length}</h2>

          <p>Currently active</p>
        </div>

      </div>

      <div className="students-card">

        <div className="students-card-header">

          <div>
            <h2>Student Directory</h2>
            <p>
              {filteredStudents.length} students found
            </p>
          </div>

          <div className="students-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

        </div>

        <div className="students-table">

          <div className="students-table-head">
            <span>Student</span>
            <span>Email</span>
            <span>ID</span>
            <span>Actions</span>
          </div>

          {filteredStudents.length === 0 ? (

            <div className="empty-students">
              <Users size={45} />

              <h3>No students found</h3>

              <p>
                Add your first student to get started.
              </p>
            </div>

          ) : (

            filteredStudents.map((student) => (

              <div
                className="students-table-row"
                key={student.id}
              >

                <div className="student-name-cell">

                  <div className="student-initial">
                    {student.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>{student.name}</strong>

                    <small>
                      Student Account
                    </small>
                  </div>

                </div>

                <div className="email-cell">
                  <Mail size={16} />
                  {student.email}
                </div>

                <span>#{student.id}</span>

                <div className="student-actions">

                  <button
                    className="edit-btn"
                    title="Edit Student"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className="delete-btn"
                    title="Delete Student"
                    onClick={() =>
                      deleteStudent(student.id)
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

      {showModal && (

        <div className="modal-overlay">

          <div className="student-modal">

            <div className="modal-header">

              <div>
                <h2>Add New Student</h2>
                <p>
                  Enter the student details below
                </p>
              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X size={22} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>
                  <User size={16} />
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter student name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  <Mail size={16} />
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  <Lock size={16} />
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="modal-buttons">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-student-btn"
                >
                  Add Student
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Students;