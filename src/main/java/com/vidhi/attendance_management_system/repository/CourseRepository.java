package com.vidhi.attendance_management_system.repository;

import com.vidhi.attendance_management_system.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

}