async function solution() {
    let url = `http://localhost:3030/jsonstore/advanced/articles/list`;
    let main = document.getElementById("main")
    const response = await fetch(url);
    const data = await response.json();
    data.forEach(item => {
        const divAcc = document.createElement("div");
        divAcc.className = "accordion";
        const divHead = document.createElement("div");
        divHead.className = "head";
        const spanName = document.createElement("span");
        spanName.textContent = item.title;
        const button = document.createElement("button");
        button.className = "button";
        button.textContent = "More";
        button.id = item._id;

        button.addEventListener("click", moreFunc);


        const divExtra = document.createElement("div");
        divExtra.className = "extra";
        const pElement = document.createElement("p");
        divExtra.appendChild(pElement);

        divHead.appendChild(spanName);
        divHead.appendChild(button);
        divAcc.appendChild(divHead);
        divAcc.appendChild(divExtra);
        main.appendChild(divAcc)

    });

    async function moreFunc(e) {
        const button = e.target;
        const buttonId = e.target.id;
        const accordion = e.target.parentElement.parentElement;
        const extraDiv = accordion.children[1];
        const p = extraDiv.children[0];

        if (button.textContent == "More") {
            extraDiv.style = "display:block";
            button.textContent = "Less";

            const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${buttonId}`)
            const data = await response.json();
            p.textContent = data.content;

        } else if (button.textContent == "Less") {
            extraDiv.style = "display:none";
            button.textContent = "More";
        }

    }




}
solution();