package com.vidhi.attendance_management_system.service;
import com.vidhi.attendance_management_system.exception.ResourceNotFoundException;

import com.vidhi.attendance_management_system.entity.Student;
import com.vidhi.attendance_management_system.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
    return studentRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Student not found with id: " + id
                    )
            );
}

    public Student updateStudent(Long id, Student student) {
        Student existingStudent = studentRepository.findById(id)
        .orElseThrow(() ->
                new ResourceNotFoundException(
                        "Student not found with id: " + id
                )
        );

        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPassword(student.getPassword());

        return studentRepository.save(existingStudent);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}