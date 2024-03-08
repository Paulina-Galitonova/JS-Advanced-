import { updateNav } from "./app.js";
import { showHome } from "./home.js";
import { setUserData } from "./userHelper.js";
import { register } from "./userService.js";

document.getElementById("register-form").addEventListener("submit", onRegister);

export function showRegisterView(){
    document.getElementById("form-sign-up").style.display="block";
    //тук вадим секцията за регистрация да бъде видима

}

   async  function onRegister(e){
    e.preventDefault();
    const formDate= new FormData(e.target);
    const email = formDate.get("email");
    const password = formDate.get("password");
    const rePass=formDate.get("repeatPassword");

    if(!email || !password || password.length<6 || password !== rePass){
        alert("Error - fill all fields ")
    }

    const data =await register({email,password});
    setUserData(data);
    updateNav();
    showHome();

}