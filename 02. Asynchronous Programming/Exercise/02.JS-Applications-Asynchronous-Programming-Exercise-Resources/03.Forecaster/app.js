function attachEvents() {
    let location = document.getElementById("location");
    let getWhetherButton = document.getElementById("submit");
    let forecastDiv = document.getElementById("forecast");

    getWhetherButton.addEventListener("click", getCity);
    let url = 'http://localhost:3030/jsonstore/forecaster/locations';
    let urlCurrent = `http://localhost:3030/jsonstore/forecaster/today/`
    let urlUpcoming = `http://localhost:3030/jsonstore/forecaster/upcoming/`;

    let currentCityWhether = {
        code: "",
        name: "",
    }

    let symbols = {
        "Sunny": "&#x2600",
        " Partly Sunny": "&#x26C5",
        "Overcast": "&#x2601",
        "Rain": "&#x2614",
        "Degrees": "&#176"

    }


    async function getCity() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const cityObject = data.find(city => city.name == location.value);
            currentCityWhether.code = cityObject.code;
            currentCityWhether.name = cityObject.name;
            currentConditions(currentCityWhether.code);
            forecast(currentCityWhether.code);
            forecastDiv.style = "display:block";
            createForecastToday(data);
            

            // let divClassEl=document.createElement("div class")
        }

        catch (error) {
            forecastDiv.style = "display:block";
            forecastDiv.innerHTML = "Error"
        }


    }

    function createForecastToday(data){
        const container=document.createElement("div");
        container.classList.add("forecast");
        const conditionaSpan=document.createElement("span");
        conditionaSpan.classList.add("condition");
        conditionaSpan.classList.add("symbol");
        

    
    }

    async function currentConditions() {
        const response = await fetch(urlCurrent + currentCityWhether.code);
        const data = await response.json();

    }

    async function forecast() {
        const response = await fetch(urlUpcoming + currentCityWhether.code);
        const data = await response.json();
    }

}

attachEvents();