export function showHome(){
    document.querySelectorAll("section").forEach(section => section.style.display="none"); //това ще върне array за това използваме директо ForEach 

    document.getElementById("home-page").style.display="block";
}