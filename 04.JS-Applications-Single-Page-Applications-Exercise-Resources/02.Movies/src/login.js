import { updateNav } from "./app.js";
import { showHome } from "./home.js";
import { setUserData } from "./userHelper.js";
import { login } from "./userService.js";

document.getElementById("form-login").addEventListener("submit", onLogin)
    
    export function showLogin(){
        document.querySelectorAll("section").forEach(section => section.style.display="none"); //това ще върне array за това използваме директо ForEach 
        document.getElementById("form-login").style.display="block";
        
    }


    async function onLogin(e){
        e.preventDefault();
        const formDate = new FormData(e.target);
        const email= formDate.get("email");
        const password= formDate.get("password");

        if(!email || !password){
            return alert("Error Login");
        }

        const userData= await login({email,password});
        setUserData(userData);
        updateNav();
        showHome()
    }