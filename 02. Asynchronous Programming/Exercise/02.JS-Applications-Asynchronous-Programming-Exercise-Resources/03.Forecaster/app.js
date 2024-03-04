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
        "Sunny": "&#x2600;", 
        "Partly sunny": "&#x26C5;",
        "Overcast": "&#x2601;",
        "Rain": "&#x2614;",
        "Degrees": "&#176;" 
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
            // createForecastToday(data);
            

            // let divClassEl=document.createElement("div class")
        }

        catch (error) {
            forecastDiv.style = "display:block";
            forecastDiv.innerHTML = "Error"
        }


    }

    function createForecastToday(data){
        const currentDiv = document.getElementById('current');
        currentDiv.innerHTML = ''; // Clear existing content
    
        const forecastsDiv = document.createElement('div');
        forecastsDiv.className = 'forecasts';
    
        const symbolSpan = document.createElement('span');
        symbolSpan.className = 'condition symbol';
        symbolSpan.innerHTML = symbols[data.forecast.condition] || '';
        const conditionSpan=document.createElement('span');
        conditionSpan.className="condition";

        const cityNameSpan=document.createElement('span');
        cityNameSpan.className="forecast-data";
        cityNameSpan.textContent=data.name;

        const degreeSpan=document.createElement('span');
        degreeSpan.className="forecast-data";
        degreeSpan.innerHTML=`${data.forecast.low}${symbols.Degrees}/${data.forecast.high}${symbols.Degrees}`;

        const whetherSpan=document.createElement('span');
        whetherSpan.className="forecast-data";
        whetherSpan.textContent=data.forecast.condition ;
        
        conditionSpan.appendChild(cityNameSpan);
        conditionSpan.appendChild(degreeSpan);
        conditionSpan.appendChild(whetherSpan);
    
        forecastsDiv.appendChild(symbolSpan);
        forecastsDiv.appendChild(conditionSpan);
    
        currentDiv.appendChild(forecastsDiv);  
         
    }

    function createThreeDayForecast(data){
        const upcomingDiv = document.getElementById('upcoming');
        upcomingDiv.innerHTML = ''; // Clear existing content

        let forecastInfoDiv=document.createElement("div");
        forecastInfoDiv.className="forecast-info";
        
        for(let i=0; i<data.forecast.length;i++){
            let currect=data.forecast[i];
            let spanClassUpcoming=document.createElement("span");
            spanClassUpcoming.className="upcoming";
    
            let spanClassSymbol=document.createElement("span");
            spanClassSymbol.className="symbol";
            spanClassSymbol.innerHTML=symbols[currect.condition] || '';


            let spanClassdegree=document.createElement("span");
            spanClassdegree.className="forecast-data";
            spanClassdegree.innerHTML=`${currect.low}${symbols.Degrees}/${currect.high}${symbols.Degrees}`;
        
            let spanClasCondition=document.createElement("span");
            spanClasCondition.className="forecast-data";
            spanClasCondition.textContent=currect.condition ;

            spanClassUpcoming.appendChild(spanClassSymbol);
            spanClassUpcoming.appendChild(spanClassdegree);
            spanClassUpcoming.appendChild(spanClasCondition);
            forecastInfoDiv.appendChild(spanClassUpcoming)
            upcomingDiv.appendChild(forecastInfoDiv);

        }
        


     
    }

    async function currentConditions() {
        const response = await fetch(urlCurrent + currentCityWhether.code);
        const data = await response.json();
        createForecastToday(data)

    }

    async function forecast() {
        const response = await fetch(urlUpcoming + currentCityWhether.code);
        const data = await response.json();
        createThreeDayForecast(data);
    }

}

attachEvents();