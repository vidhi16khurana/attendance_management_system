package com.vidhi.attendance_management_system.service;

import com.vidhi.attendance_management_system.entity.Course;
import com.vidhi.attendance_management_system.entity.Enrollment;
import com.vidhi.attendance_management_system.entity.Student;
import com.vidhi.attendance_management_system.repository.CourseRepository;
import com.vidhi.attendance_management_system.repository.EnrollmentRepository;
import com.vidhi.attendance_management_system.repository.StudentRepository;
import org.springframework.stereotype.Service;
import com.vidhi.attendance_management_system.exception.ResourceNotFoundException;

import java.util.List;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public EnrollmentService(
            EnrollmentRepository enrollmentRepository,
            StudentRepository studentRepository,
            CourseRepository courseRepository) {

        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    public Enrollment enrollStudent(Long studentId, Long courseId) {

        Student student = studentRepository.findById(studentId)
        .orElseThrow(() ->
                new ResourceNotFoundException(
                        "Student not found with id: " + studentId
                )
        );

        Course course = courseRepository.findById(courseId)
        .orElseThrow(() ->
                new ResourceNotFoundException(
                        "Course not found with id: " + courseId
                )
        );

        Enrollment enrollment = new Enrollment();

        enrollment.setStudent(student);
        enrollment.setCourse(course);

        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }
}