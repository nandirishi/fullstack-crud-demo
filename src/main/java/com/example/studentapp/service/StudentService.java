package com.example.studentapp.service;

import com.example.studentapp.exception.ResourceNotFoundException;
import com.example.studentapp.model.Student;
import com.example.studentapp.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // 1. CREATE
    public Student saveStudent(Student student) {
        // You could add extra business logic here before saving,
        // such as checking if the email is already taken in the database.
        return studentRepository.save(student);
    }

    // 2. READ ALL
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // 3. READ ONE
    public Student getStudentById(Long id) {
        // We use .orElseThrow() to immediately throw our custom exception if the student isn't found.
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    // 4. UPDATE
    public Student updateStudent(Long id, Student studentDetails) {
        // First, check if the student exists (throws exception if not)
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        // Update the fields
        existingStudent.setName(studentDetails.getName());
        existingStudent.setEmail(studentDetails.getEmail());
        existingStudent.setAge(studentDetails.getAge());

        // Save and return the updated student
        return studentRepository.save(existingStudent);
    }

    // 5. DELETE
    public void deleteStudent(Long id) {
        // Check if the student exists before deleting so we can return a clean 404 if they don't
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        studentRepository.delete(existingStudent);
    }
}