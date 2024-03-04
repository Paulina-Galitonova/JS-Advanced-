window.addEventListener('load', loadStudents);
const formElement = document.getElementById("form");
const url = `http://localhost:3030/jsonstore/collections/students`;
const errorNotification = document.querySelector('.notification');
const tableBody = document.querySelector('#results tbody');

formElement.addEventListener('submit', addStudent);

async function addStudent(e) {
    e.preventDefault();
    const formData = new FormData(formElement);
    const student = {
        firstName: formData.get("firstName").trim(),
        lastName: formData.get("lastName").trim(),
        facultyNumber: formData.get("facultyNumber").trim(),
        grade: Number(formData.get("grade").trim())
    };

    if (!student.firstName || !student.lastName || !student.facultyNumber || isNaN(student.grade)) {
        errorNotification.textContent = "All fields are required and grade must be a number.";
        return;
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        await loadStudents(); // Ensure the table is updated after adding the student
        formElement.reset(); // Clear the form fields after successful submission
        errorNotification.textContent = ''; // Clear any error messages
    } catch (error) {
        errorNotification.textContent = error.message;
    }
}

async function loadStudents() {
    tableBody.innerHTML = ''; // Clear current entries
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        createTable(Object.values(data));
    } catch (error) {
        console.error("Failed to load students: ", error);
        errorNotification.textContent = "Failed to load students.";
    }
}

function createTable(students) {
    students.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.facultyNumber}</td>
            <td>${student.grade.toFixed(2)}</td>
        `;
        tableBody.appendChild(tr);
    });
}
