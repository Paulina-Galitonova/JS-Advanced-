function solve() {
    let departButton = document.getElementById("depart");
    let arriveButton = document.getElementById("arrive");
    let textField = document.querySelector("#info span");
    // departButton.addEventListener("click", depart);
    // arriveButton.addEventListener("click", arrive);
    let url = "http://localhost:3030/jsonstore/bus/schedule/"

    let stop = {
        currentStop: "",
        nextStop: "depot"
    }


    async function depart() {
        try {
            let response = await fetch(url + stop.nextStop);
            let data = await response.json();
            stop.currentStop = data.name;
            stop.nextStop = data.next;
            textField.textContent = `Next stop ${stop.currentStop}`;
            departButton.disabled = true;
            arriveButton.disabled = false;
        } catch (error) {
            textField.textContent = "Error";
            departButton.disabled = true;
            arriveButton.disabled = true;
        }

    }

    function arrive() {
        textField.textContent = `Arriving at ${stop.currentStop}`;
        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();