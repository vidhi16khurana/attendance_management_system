package com.vidhi.attendance_management_system.controller;

import com.vidhi.attendance_management_system.repository.AttendanceRepository;
import com.vidhi.attendance_management_system.repository.StudentRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final StudentRepository studentRepository;
    private final AttendanceRepository attendanceRepository;

    public DashboardController(
            StudentRepository studentRepository,
            AttendanceRepository attendanceRepository
    ) {
        this.studentRepository = studentRepository;
        this.attendanceRepository = attendanceRepository;
    }

    @GetMapping
    public Map<String, Object> getDashboardData() {

        long totalStudents = studentRepository.count();

        long presentToday =
                attendanceRepository.countByDateAndStatus(
                        LocalDate.now(),
                        "PRESENT"
                );

        long absentToday =
                attendanceRepository.countByDateAndStatus(
                        LocalDate.now(),
                        "ABSENT"
                );

        double attendancePercentage = 0;

        if (totalStudents > 0) {
            attendancePercentage =
                    (presentToday * 100.0) / totalStudents;
        }

        Map<String, Object> data = new HashMap<>();

        data.put("totalStudents", totalStudents);
        data.put("presentToday", presentToday);
        data.put("absentToday", absentToday);
        data.put(
                "attendancePercentage",
                Math.round(attendancePercentage * 10.0) / 10.0
        );

        return data;
    }
}