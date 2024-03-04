window.addEventListener('load', loadStudents);
const tableBody = document.querySelector('#results tbody');
const formElement = document.getElementById("form");
const url = `http://localhost:3030/jsonstore/collections/students`;
const errorNotification = document.querySelector('.notification');

formElement.addEventListener('submit', addStudent);

async function addStudent(e) {
    e.preventDefault();
    const formData = new FormData(formElement);
    const firstName = formData.get("firstName").trim();
    const lastName = formData.get("lastName").trim();
    const facultyNumber = formData.get("facultyNumber").trim();
    const grade = formData.get("grade").trim();

    if (!firstName || !lastName || !facultyNumber || !grade) {
        errorNotification.textContent = "All fields are required.";
        return;
    }

    const studentData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            firstName,
            lastName,
            facultyNumber,
            grade: Number(grade) // Ensure grade is a number
        })
    };

    try {
        const response = await fetch(url, studentData);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        formElement.reset(); // Clear the form fields after successful submission
        errorNotification.textContent = ''; // Clear any error messages
        await loadStudents(); // Await the reloading of students to ensure synchronous update
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
        const info = Object.values(data);
        createTable(info);
    } catch (error) {
        console.error("Failed to load students: ", error);
    }
}

function createTable(info) {
    tableBody.innerHTML = ''; // Ensure the table is cleared before adding new entries
    info.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.facultyNumber}</td>
            <td>${Number(student.grade).toFixed(2)}</td> // Format grade to two decimal places
        `;
        tableBody.appendChild(tr);
    });
}


// const url = 'http://localhost:3030/jsonstore/collections/students';
// const formRef = document.querySelector('#form');
// const tbodyRef = document.querySelector('tbody');
// window.addEventListener('load', loadStudents);
// formRef.addEventListener('submit', submitHandler);
 
// async function loadStudents() {
//     tbodyRef.innerHTML = '';
//     const requestAll = await fetch(url);
//     const data = await requestAll.json();
//     Object.values(data).forEach(item => {
//         let inner = '<tr>';
//         inner += `<td>${item.firstName}</td>`;
//         inner += `<td>${item.lastName}</td>`;
//         inner += `<td>${item.facultyNumber}</td>`;
//         inner += `<td>${Number(item.grade).toFixed(2)}</td>`;
//         tbodyRef.innerHTML += inner + '</tr>';
//     });
// }
 
// async function submitHandler(e) {
//     e.preventDefault();
//     const first = formRef.elements['firstName'].value;
//     const last =  formRef.elements['lastName'].value;
//     const faculty =  formRef.elements['facultyNumber'].value;
//     const grade = formRef.elements['grade'].value;
 
//     if (!first || !last || !faculty || !grade) {
//         return;
//     }
 
//     await fetch(url, {
//         method: 'post',
//         headers: { 'Content-type': 'application/json' },
//         body: JSON.stringify({
//             'firstName': first,
//             'lastName': last,
//             'facultyNumber': faculty,
//             'grade': grade
//         })
//     });
//     formRef.reset();
//     loadStudents();
// }
