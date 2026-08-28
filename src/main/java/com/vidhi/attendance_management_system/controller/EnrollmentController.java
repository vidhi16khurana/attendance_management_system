package com.vidhi.attendance_management_system.controller;

import com.vidhi.attendance_management_system.entity.Enrollment;
import com.vidhi.attendance_management_system.service.EnrollmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    public Enrollment enrollStudent(
            @RequestParam Long studentId,
            @RequestParam Long courseId) {

        return enrollmentService.enrollStudent(studentId, courseId);
    }

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }
}