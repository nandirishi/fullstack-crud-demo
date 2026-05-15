# 🎓 Student Management System (Full-Stack)

A complete, end-to-end CRUD (Create, Read, Update, Delete) application built to demonstrate enterprise-level backend architecture and seamless frontend integration. 

## ✨ Features
* **RESTful API:** Clean, standard HTTP endpoints for all student operations.
* **Enterprise Architecture:** Controller, Service, and Repository layers.
* **Data Validation:** Backend checks for blank fields, valid emails, and age requirements using `spring-boot-starter-validation`.
* **Global Exception Handling:** Custom `@ControllerAdvice` to return clean JSON error messages instead of stack traces.
* **Unit Testing:** Service layer tested using JUnit 5 and Mockito.
* **Responsive UI:** A clean frontend built with HTML5, vanilla JavaScript (Fetch API), and Tailwind CSS.

## 🛠️ Tech Stack
* **Backend:** Java 17+, Spring Boot 3, Spring Data JPA, Hibernate
* **Database:** MySQL
* **Frontend:** HTML5, JavaScript, Tailwind CSS
* **Testing:** JUnit 5, Mockito

## 🚀 Getting Started

### Prerequisites
* Java Development Kit (JDK) 17 or higher
* Maven
* MySQL Server running on your local machine

### Database Setup
1. Open your MySQL client and run:
   ```sql
   CREATE DATABASE studentdb;
