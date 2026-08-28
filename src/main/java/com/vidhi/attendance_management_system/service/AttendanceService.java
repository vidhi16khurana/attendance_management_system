package com.vidhi.attendance_management_system.service;

import com.vidhi.attendance_management_system.entity.Attendance;
import com.vidhi.attendance_management_system.entity.Enrollment;
import com.vidhi.attendance_management_system.exception.ResourceNotFoundException;
import com.vidhi.attendance_management_system.repository.AttendanceRepository;
import com.vidhi.attendance_management_system.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EnrollmentRepository enrollmentRepository;

    public AttendanceService(
            AttendanceRepository attendanceRepository,
            EnrollmentRepository enrollmentRepository) {

        this.attendanceRepository = attendanceRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    public Attendance markAttendance(
            Long enrollmentId,
            String status) {

        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Enrollment not found with id: " + enrollmentId
                        )
                );

        Attendance attendance = new Attendance();

        attendance.setEnrollment(enrollment);
        attendance.setStatus(status);
        attendance.setDate(LocalDate.now());

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAllAttendance() {

        return attendanceRepository.findAll();
    }

    public double calculateAttendancePercentage(Long enrollmentId) {

        long totalClasses =
                attendanceRepository.countByEnrollmentId(enrollmentId);

        long presentClasses =
                attendanceRepository.countByEnrollmentIdAndStatus(
                        enrollmentId,
                        "PRESENT"
                );

        if (totalClasses == 0) {
            return 0.0;
        }

        return ((double) presentClasses / totalClasses) * 100;
    }

    public Attendance updateAttendance(Long id, String status) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Attendance not found with id: " + id
                        )
                );

        attendance.setStatus(status);

        return attendanceRepository.save(attendance);
    }

    public void deleteAttendance(Long id) {

        attendanceRepository.deleteById(id);
    }
}