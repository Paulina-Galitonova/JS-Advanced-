async function getInfo() {
    let idReference = document.getElementById("stopId");
    let idStop = idReference.value;
    let url = `http://localhost:3030/jsonstore/bus/businfo/${idStop}`;
    let stopNameRef=document.getElementById("stopName");
    let busesRef=document.getElementById("buses");



    try {

        busesRef.innerHTML="";
        stopNameRef.innerHTML="";
        let response = await fetch(url);
        data=await response.json();
        stopNameRef.innerHTML=data.name;
        let busInfo=Object.entries(data.buses);
     
    busInfo.forEach(bus => {
        let el=document.createElement("li");
        el.textContent=`Bus ${bus[0]} arrives in ${bus[1]} minutes`;
        busesRef.appendChild(el);
        
    })



    } catch {
        stopNameRef.innerHTML="Error"

    }
}