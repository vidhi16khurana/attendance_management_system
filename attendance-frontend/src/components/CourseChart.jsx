import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function CourseChart({
  courses,
  enrollments
}) {

  const data = courses.map((course) => {

    const totalEnrollments =
      enrollments.filter(
        (enrollment) =>
          enrollment.course?.id === course.id
      ).length;

    return {
      name: course.courseName,
      value: totalEnrollments
    };
  });

  return (
    <div className="chart-card">

      <div className="chart-header">
        <div>
          <h3>Course Enrollment</h3>
          <p>Students enrolled in each course</p>
        </div>
      </div>

      <div style={{ width: "100%", height: 300 }}>

        {data.length === 0 ? (

          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            No course data available
          </div>

        ) : (

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >

                {data.map((entry, index) => (

                  <Cell
                    key={`cell-${index}`}
                  />

                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        )}

      </div>

    </div>
  );
}

export default CourseChart;