package com.vidhi.attendance_management_system.repository;

import com.vidhi.attendance_management_system.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

}