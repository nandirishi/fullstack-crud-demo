package com.example.studentapp.service;

import com.example.studentapp.exception.ResourceNotFoundException;
import com.example.studentapp.model.Student;
import com.example.studentapp.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock // Create a fake version of the repository
    private StudentRepository studentRepository;

    @InjectMocks // Inject the fake repository into our real service
    private StudentService studentService;

    private Student student;

    @BeforeEach
    void setUp() {
        student = new Student("Alice", "alice@example.com", 22);
        student.setId(1L);
    }

    @Test
    void testGetStudentById_Success() {
        // 1. Arrange: Tell the fake database what to return
        Mockito.when(studentRepository.findById(1L)).thenReturn(Optional.of(student));

        // 2. Act: Call our real service method
        Student foundStudent = studentService.getStudentById(1L);

        // 3. Assert: Check if the result is what we expected
        assertNotNull(foundStudent);
        assertEquals("Alice", foundStudent.getName());
    }

    @Test
    void testGetStudentById_NotFound() {
        // 1. Arrange: Tell the fake database to return empty
        Mockito.when(studentRepository.findById(2L)).thenReturn(Optional.empty());

        // 2 & 3. Act & Assert: Expect our custom exception to be thrown
        assertThrows(ResourceNotFoundException.class, () -> {
            studentService.getStudentById(2L);
        });
    }
}