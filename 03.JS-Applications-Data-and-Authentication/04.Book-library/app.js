const url = `http://localhost:3030/jsonstore/collections/books`;
const loadAllBooksBtn = document.getElementById("loadBooks");
const tbodyRef = document.querySelector('tbody');
const formRef = document.querySelector('form');
let isEditing = false;
let editingId = null;

loadAllBooksBtn.addEventListener("click", loadBooks);
formRef.addEventListener("submit", onSubmit);

async function loadBooks() {
    tbodyRef.innerHTML = ""; // Clear existing table rows
    const response = await fetch(url);
    const data = await response.json();

    Object.entries(data).forEach(([id, book]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td>`;
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => onEdit(id, book));
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => onDelete(id));

        const actionTd = document.createElement('td');
        actionTd.appendChild(editBtn);
        actionTd.appendChild(deleteBtn);
        tr.appendChild(actionTd);

        tbodyRef.appendChild(tr);
    });
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(formRef);
    const title = formData.get("title");
    const author = formData.get("author");
    
    if (!title || !author) {
        alert("Both title and author are required.");
        return;
    }

    const bookData = {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, title })
    };

    const fetchUrl = isEditing ? `${url}/${editingId}` : url;
    await fetch(fetchUrl, bookData);

    formRef.reset();
    if (isEditing) {
        isEditing = false;
        editingId = null;
        formRef.querySelector("button").textContent = "Submit";
    }
    loadBooks();
}

function onEdit(id, book) {
    document.getElementsByName("title")[0].value = book.title;
    document.getElementsByName("author")[0].value = book.author;
    isEditing = true;
    editingId = id;
    formRef.querySelector("button").textContent = "Update Book";
}

async function onDelete(id) {
    await fetch(`${url}/${id}`, {
        method: "DELETE"
    });
    loadBooks();
}
