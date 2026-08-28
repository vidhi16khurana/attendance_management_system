package com.vidhi.attendance_management_system.controller;

import com.vidhi.attendance_management_system.entity.Attendance;
import com.vidhi.attendance_management_system.service.AttendanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping
    public Attendance markAttendance(
            @RequestParam Long enrollmentId,
            @RequestParam String status) {

        return attendanceService.markAttendance(
                enrollmentId,
                status
        );
    }

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceService.getAllAttendance();
    }

    @PutMapping("/{id}")
public Attendance updateAttendance(
        @PathVariable Long id,
        @RequestParam String status) {

    return attendanceService.updateAttendance(id, status);
}

@DeleteMapping("/{id}")
public void deleteAttendance(@PathVariable Long id) {

    attendanceService.deleteAttendance(id);
}
@GetMapping("/percentage/{enrollmentId}")
public double getAttendancePercentage(
        @PathVariable Long enrollmentId) {

    return attendanceService
            .calculateAttendancePercentage(enrollmentId);
}
}