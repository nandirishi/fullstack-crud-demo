const API_URL = "http://localhost:8080/api/students";

document.addEventListener("DOMContentLoaded", () => {
    fetchStudents();

    document.getElementById("student-form").addEventListener("submit", handleFormSubmit);
    document.getElementById("cancel-btn").addEventListener("click", resetForm);
});

// 1. READ: Fetch all students and display them in the table
async function fetchStudents() {
    try {
        const response = await fetch(API_URL);
        const students = await response.json();

        const tableBody = document.getElementById("student-table-body");
        tableBody.innerHTML = ""; // Clear table

        students.forEach(student => {
            tableBody.innerHTML += `
                <tr class="border-b hover:bg-gray-50">
                    <td class="p-3 font-medium text-gray-900">${student.id}</td>
                    <td class="p-3">${student.name}</td>
                    <td class="p-3">${student.email}</td>
                    <td class="p-3">${student.age}</td>
                    <td class="p-3 text-center flex justify-center gap-2">
                        <button onclick="editStudent(${student.id}, '${student.name}', '${student.email}', ${student.age})" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs font-semibold transition">Edit</button>
                        <button onclick="deleteStudent(${student.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold transition">Delete</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error fetching students:", error);
    }
}

// 2. CREATE & UPDATE: Handle Form Submission
async function handleFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById("student-id").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = parseInt(document.getElementById("age").value);

    const studentData = { name, email, age };

    try {
        let response;
        if (id) {
            // If ID exists, perform an UPDATE (PUT)
            response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentData)
            });
        } else {
            // If no ID, perform a CREATE (POST)
            response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentData)
            });
        }

        if (response.ok) {
            resetForm();
            fetchStudents(); // Refresh the list
        } else {
            // Parse validation errors from Step 9 GlobalExceptionHandler
            const errorData = await response.json();
            alert("Error: " + JSON.stringify(errorData));
        }
    } catch (error) {
        console.error("Error saving student:", error);
    }
}

// 3. Populate form fields for Editing
function editStudent(id, name, email, age) {
    document.getElementById("student-id").value = id;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("age").value = age;

    document.getElementById("form-title").innerText = "Edit Student Details";
    document.getElementById("cancel-btn").classList.remove("hidden");
}

// 4. DELETE: Remove a student
async function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (response.ok) {
                fetchStudents(); // Refresh list
            }
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    }
}

// Reset the form layout back to normal
function resetForm() {
    document.getElementById("student-form").reset();
    document.getElementById("student-id").value = "";
    document.getElementById("form-title").innerText = "Add New Student";
    document.getElementById("cancel-btn").classList.add("hidden");
}