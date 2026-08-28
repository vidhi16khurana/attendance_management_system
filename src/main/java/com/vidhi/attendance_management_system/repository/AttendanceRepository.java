package com.vidhi.attendance_management_system.repository;

import com.vidhi.attendance_management_system.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    long countByEnrollmentId(Long enrollmentId);

    long countByEnrollmentIdAndStatus(Long enrollmentId, String status);

    long countByDateAndStatus(LocalDate date, String status);
}