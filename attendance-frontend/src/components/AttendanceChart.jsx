import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function AttendanceChart({ attendance }) {

  const present = attendance.filter(
    (record) => record.status === "PRESENT"
  ).length;

  const absent = attendance.filter(
    (record) => record.status === "ABSENT"
  ).length;

  const data = [
    {
      name: "Present",
      value: present
    },
    {
      name: "Absent",
      value: absent
    }
  ];

  return (
    <div className="chart-card">

      <div className="chart-header">
        <div>
          <h3>Attendance Overview</h3>
          <p>Present vs absent records</p>
        </div>
      </div>

      <div style={{ width: "100%", height: 300 }}>

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AttendanceChart;