document.querySelectorAll("section").forEach(section => section.style.display="none");
//това ще върне array за това използваме директо ForEach 
//initialy скриваме всички секции

const userNav=document.querySelectorAll("li.user");
const guestNav=document.querySelectorAll("li.guest");
//тук взимаме двата бутона в менюто съответно за логнати усери и за неглогнати

const useData=JSON.parse(sessionStorage.getItem("userData"))
function updateNav(){
    if(useData){
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

    updateNav();
}
