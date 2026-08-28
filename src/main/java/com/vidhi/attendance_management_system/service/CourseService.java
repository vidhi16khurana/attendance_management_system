package com.vidhi.attendance_management_system.service;

import com.vidhi.attendance_management_system.entity.Course;
import com.vidhi.attendance_management_system.repository.CourseRepository;
import org.springframework.stereotype.Service;
import com.vidhi.attendance_management_system.exception.ResourceNotFoundException;

import java.util.List;


@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
    return courseRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Course not found with id: " + id
                    )
            );
}

    public Course updateCourse(Long id, Course course) {
        Course existingCourse = courseRepository.findById(id)
        .orElseThrow(() ->
                new ResourceNotFoundException(
                        "Course not found with id: " + id
                )
        );

        existingCourse.setCourseName(course.getCourseName());
        existingCourse.setCourseCode(course.getCourseCode());

        return courseRepository.save(existingCourse);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}