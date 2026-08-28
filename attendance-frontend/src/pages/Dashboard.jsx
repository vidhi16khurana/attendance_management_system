import { useEffect, useState } from "react";

import Header from "../components/Header";
import StatCard from "../components/StatCard";
import AttendanceChart from "../components/AttendanceChart";
import CourseChart from "../components/CourseChart";
import RecentRecords from "../components/RecentRecords";

import {
  Users,
  CircleCheck,
  X,
  TrendingUp
} from "lucide-react";

import "./Dashboard.css";

function Dashboard() {

  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0,
    attendancePercentage: 0
  });

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {

      const [
        dashboardResponse,
        studentsResponse,
        coursesResponse,
        enrollmentsResponse,
        attendanceResponse
      ] = await Promise.all([
        fetch("http://localhost:8080/dashboard"),
        fetch("http://localhost:8080/students"),
        fetch("http://localhost:8080/courses"),
        fetch("http://localhost:8080/enrollments"),
        fetch("http://localhost:8080/attendance")
      ]);

      const dashboard = await dashboardResponse.json();
      const studentsData = await studentsResponse.json();
      const coursesData = await coursesResponse.json();
      const enrollmentsData = await enrollmentsResponse.json();
      const attendanceData = await attendanceResponse.json();

      setDashboardData(dashboard);
      setStudents(studentsData);
      setCourses(coursesData);
      setEnrollments(enrollmentsData);
      setAttendance(attendanceData);

    } catch (error) {
      console.error(
        "Error loading dashboard data:",
        error
      );
    }
  };

  return (
    <div className="dashboard">

      <Header />

      <div className="stats-grid">

        <StatCard
          icon={<Users size={30} />}
          title="Total Students"
          value={dashboardData.totalStudents}
          text={`${courses.length} active courses`}
          type="purple"
        />

        <StatCard
          icon={<CircleCheck size={30} />}
          title="Present Today"
          value={dashboardData.presentToday}
          text="Students marked present today"
          type="green"
        />

        <StatCard
          icon={<X size={30} />}
          title="Absent Today"
          value={dashboardData.absentToday}
          text="Students marked absent today"
          type="red"
        />

        <StatCard
          icon={<TrendingUp size={30} />}
          title="Attendance %"
          value={`${dashboardData.attendancePercentage}%`}
          text="Today's attendance percentage"
          type="blue"
        />

      </div>

      <div className="charts-grid">

        <AttendanceChart
          attendance={attendance}
        />

        <CourseChart
          courses={courses}
          enrollments={enrollments}
        />

      </div>

      <RecentRecords
        attendance={attendance}
      />

    </div>
  );
}

export default Dashboard;