import { useEffect, useState } from "react";
import "./Reports.css";

function Reports() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const totalStudents = students.length;

  const downloadReport = () => {
    let csv =
      "Name,Email,Roll Number\n";

    students.forEach((student) => {
      csv += `"${student.name || ""}","${student.email || ""}","${student.rollNumber || ""}"\n`;
    });

    const blob = new Blob(
      [csv],
      { type: "text/csv" }
    );

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "attendance-report.csv";

    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="reports-page">
      <div className="page-heading">
        <div>
          <h1>Reports</h1>
          <p>
            View and download attendance reports
          </p>
        </div>

        <button
          className="download-btn"
          onClick={downloadReport}
        >
          ⬇ Download Report
        </button>
      </div>

      <div className="report-stats">
        <div className="report-card">
          <span>👨‍🎓</span>
          <div>
            <p>Total Students</p>
            <h2>{totalStudents}</h2>
          </div>
        </div>

        <div className="report-card">
          <span>📚</span>
          <div>
            <p>Generated Reports</p>
            <h2>12</h2>
          </div>
        </div>

        <div className="report-card">
          <span>📊</span>
          <div>
            <p>System Status</p>
            <h2 className="active-status">
              Active
            </h2>
          </div>
        </div>
      </div>

      <div className="report-table-container">
        <h2>Student Report</h2>

        {loading ? (
          <p>Loading students...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Roll Number</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>
                      {student.name}
                    </td>

                    <td>
                      {student.email}
                    </td>

                    <td>
                      {student.rollNumber ||
                        "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">
                    No student data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Reports;