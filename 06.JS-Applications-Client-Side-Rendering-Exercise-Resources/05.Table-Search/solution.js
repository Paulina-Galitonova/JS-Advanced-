import { html, render } from "./node_modules/lit-html/lit-html.js";
import { dataService } from "./src/service/dataService.js";

const inputRef=document.getElementById("searchField");
const root=document.querySelector("tbody");
onLoad()
solve()

async function onLoad(){
   const data = await dataService.getAllOption();
   const tableRow = Object.values(data).map(person => optionTemplate(person));
   update(tableRow)
}

function optionTemplate(data) {
   return html`<tr><td>${data.firstName} ${data.lastName}</td><td>${data.email}</td><td>${data.course}</td></tr>`

}

function update(data) {
   render(data, root)
}


function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
    Array.from(document.querySelectorAll('tr')).forEach(tr => tr.classList.remove('select'));

    const searchText = document.getElementById('searchField').value.toLowerCase();
    const rows = Array.from(document.querySelector('tbody').rows);

    rows.forEach(row => {
        if (row.textContent.toLowerCase().includes(searchText)) {
            row.classList.add('select');
        }
    });

    document.getElementById('searchField').value = '';
}

   }


