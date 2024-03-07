import { showRegisterView } from "./register.js";
import { showHome } from "./home.js";
import { getUserData } from "./userHelper.js";

document.querySelectorAll("section").forEach(section => section.style.display="none"); //това ще върне array за това използваме директо ForEach 
//initialy скриваме всички секции
const userNav=document.querySelectorAll("li.user");
const guestNav=document.querySelectorAll("li.guest"); //тук взимаме двата бутона в менюто съответно за логнати усери и за неглогнати
document.querySelector("nav").addEventListener("click",onNavigate);

const routes={
    "/register": showRegisterView,
    "/home": showHome
}

function onNavigate(e){
    if(e.target.tagName !== "A" || !e.target.href){
        return
    }
    e.preventDefault()
    const url = new URL(e.target.href);
    const path= url.pathname;
    routes[path]();

}
 


export function updateNav(){
    const userData=getUserData();
    if(userData){
        userNav.forEach(li =>{
            li.style.display ="block";
        })

        guestNav.forEach(li=>{
            li.style.display="none"
        })
    } 
    else {
        userNav.forEach(li =>{
            li.style.display ="none";
        })

        guestNav.forEach(li=>{
            li.style.display="block"
        })
        

    }

}
updateNav();

