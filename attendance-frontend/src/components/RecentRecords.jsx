import "./RecentRecords.css";

function RecentRecords({
  attendance
}) {

  const recentAttendance =
    [...attendance]
      .sort(
        (a, b) =>
          b.id - a.id
      )
      .slice(0, 5);

  return (

    <div className="recent-records">

      <div className="recent-records-header">

        <div>
          <h2>Recent Attendance</h2>

          <p>
            Latest attendance records
          </p>
        </div>

        <span>
          {recentAttendance.length} records
        </span>

      </div>

      <div className="recent-records-table">

        <div className="recent-records-head">
          <span>Student</span>
          <span>Course</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        {recentAttendance.length === 0 ? (

          <div className="recent-empty">
            No attendance records yet
          </div>

        ) : (

          recentAttendance.map((record) => (

            <div
              className="recent-records-row"
              key={record.id}
            >

              <div className="recent-student">

                <div className="recent-avatar">

                  {record.enrollment?.student?.name
                    ?.charAt(0)
                    ?.toUpperCase()}

                </div>

                <div>

                  <strong>
                    {
                      record.enrollment
                        ?.student?.name
                    }
                  </strong>

                  <small>
                    {
                      record.enrollment
                        ?.student?.email
                    }
                  </small>

                </div>

              </div>

              <span>
                {
                  record.enrollment
                    ?.course?.courseName
                }
              </span>

              <span>
                {record.date}
              </span>

              <span
                className={
                  record.status === "PRESENT"
                    ? "recent-status present"
                    : "recent-status absent"
                }
              >
                {record.status}
              </span>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default RecentRecords;