//API Key and detail string
var cityName =  document.getElementById("city-name");
var searchButton = document.getElementById("search-button");
var key = '&appid=d43cd83a66629f7fe2a6652c054bfdce'
var forecastapiurl = 'https://api.openweathermap.org/data/2.5/forecast?q='
var weatherapiurl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q='
var UVIndexurl= 'http://api.openweathermap.org/data/2.5/uvi?'
var tempCurrent = document.getElementById('temperature')
var currCity = document.getElementById('current-city')
var currHumidity=document.getElementById('humidity')
var currWindSpeed=document.getElementById('wind-speed')
var currUVIndex=document.getElementById('current-uv')
var tagUVIndex=document.getElementById("uv-index")
var now = dayjs();
var todaysDate = (now.format("MM/DD/YYYY"));
console.log(currUVIndex)

//lat={lat}&lon={lon}&appid={API key}'


//searchButton.addEventListener('click',getApi());

searchButton.addEventListener('click',function (){
    
    var enteredName = cityName.value
    //var enteredName="Cinnaminson"
    var cityWeather=weatherapiurl + enteredName + key
    //var cityforecast=forecastapiurl + cityName + key
    
    console.log(cityWeather)

    fetch(cityWeather)
        .then(function(response){
            return response.json();

        })
        .then(function(data){

                var lat1 = data.coord.lat
                var lon1 = data.coord.lon
                var currTemp=data.main.temp
                var curHumid=data.main.humidity
                var currWind=data.wind.speed
        
        var lat1 = data.coord.lat
        var lon1 = data.coord.lon

        var latUv='lat=' + lat1
        var lonUv='&lon='+ lon1
        var cityUVIndexurl= UVIndexurl+latUv+lonUv+key

            fetch(cityUVIndexurl)
            .then(function(response1){
                return response1.json();

            })
            .then(function(data1){
                console.log(data1)
                var currUV = data1.value
                console.log(currUV)
                tagUVIndex.textContent="UV Index :" 
                var span = document.createElement("span")
                span.textContent=currUV
                if (currUV<2){
                    span.setAttribute("class","bg-success")  
                }
                else if (currUV<6){
                    span.setAttribute("class","bg-warning") 
                }
                else if (currUV>8){
                    span.setAttribute("class","bg-danger") 
                }
                //span.setAttribute("class","bg-success")
                tagUVIndex.appendChild(span)
                    //currUVIndex.textContent=currUV
            });
            
            currCity.textContent=enteredName +"("+todaysDate+")"
            tempCurrent.textContent="Temperature : " +currTemp
            currHumidity.textContent="Humidity : " + curHumid +"%"
            currWindSpeed.textContent="Wind Speed : " + currWind + "MPH"
            



        });
/*     fetch(cityforecast)
        .then(function(response){
            return response.json();

        })
        .then(function(data){

                console.log(data)

        });     */
});

