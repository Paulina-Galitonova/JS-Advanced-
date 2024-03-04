function attachEvents() {
    const loadBtn = document.getElementById("btnLoad");
    const phoneBookList = document.getElementById("phonebook");
    const createBtn = document.getElementById("btnCreate");

    const url = `http://localhost:3030/jsonstore/phonebook`


    loadBtn.addEventListener("click", onLoad);
    createBtn.addEventListener("click", onClick);

    async function onClick(e) {
        let personField = document.getElementById("person");
        let phoneField = document.getElementById("phone");
        let person = personField.value;
        let phone = phoneField.value;

        let data = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "person": person, "phone": phone})
        }

        try {
            const response = await fetch(url, data);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            await response.json(); // 
            personField.value = "";
            phoneField.value = "";
            onLoad(); 
        } catch (error) {
            console.error("Could not add the contact: ", error);
        }
    }


    async function onLoad(e) {
        phoneBookList.innerHTML = '';
        const response = await fetch(url);
        const data = await response.json();
        createPhonebook(data);
    }

    function createPhonebook(data) {
        const phones = Object.values(data);
        phones.forEach(contact => {
            const liEl = document.createElement("li");
            liEl.textContent = `${contact.person}: ${contact.phone}`;
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.dataset.id=contact._id;
            deleteBtn.addEventListener("click", onDelete);

            liEl.appendChild(deleteBtn)
            phoneBookList.appendChild(liEl);
        })
    }

   async function onDelete(e){
        let id=e.target.dataset.id;
        let deleteUrl=`http://localhost:3030/jsonstore/phonebook/${id} `
        await fetch(deleteUrl,{method:"DELETE"});
        onLoad()
    }
}

attachEvents();