

//searchButton.addEventListener('click',getApi());

function CityWeather(event){
    forSection.innerHTML = "";
    var element = event.target;
    console.log(element.textContent)
    var  userChoices1  = element.textContent;
   
    console.log(userChoices1)
    var cityName =  userChoices1
    
    
    //web url variables
    
    //data element variables
    
        var enteredName = cityName
    
        //var enteredName="Cinnaminson"
        var cityWeather=weatherapiurl + enteredName + key
        //var cityforecast=forecastapiurl + cityName + key
        
        console.log(cityWeather)
    
        fetch(cityWeather)
            .then(function(response){
                return response.json();
    
            })
            .then(function(data){
    
                    console.log(data)
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
    
    
    
            //uv details
                fetch(cityUVIndexurl)
                .then(function(response1){
                    return response1.json();
    
                })
                .then(function(data1){
                    //console.log(data1)
                    var currUV = data1.value
                    //console.log(currUV)
                    tagUVIndex.textContent="UV Index :" 
                    var span = document.createElement("span")
                    span.textContent=currUV
                    if (currUV<=2){
                        span.setAttribute("class","bg-success")  
                    }
                    else if (currUV<=6){
                        span.setAttribute("class","bg-warning") 
                    }
                    else if (currUV>6){
                        span.setAttribute("class","bg-danger") 
                    }
                    //span.setAttribute("class","bg-success")
                    tagUVIndex.appendChild(span)
                        //currUVIndex.textContent=currUV
    
                });
                
                currCity.textContent=enteredName +"("+todaysDate+")"
                var img= document.createElement('img')
                img.setAttribute("src", weatherImageUrl + data.weather[0].icon + "@2x.png");
                img.setAttribute("alt", data.weather[0].description)
                currCity.appendChild(img) 
                tempCurrent.textContent="Temperature : " +currTemp + " °F"
                currHumidity.textContent="Humidity : " + curHumid +"%"
                currWindSpeed.textContent="Wind Speed : " + currWind + " MPH"
                
    
    //forcast details
                var dayMeth = "&exclude=current,minutely,hourly,alerts"
                var cityforecast=forecastapiurl + latUv + lonUv + dayMeth+ key
                //var cityforecast=forecastapiurl + cityName + key
                
                console.log(cityforecast)
                fetch(cityforecast)
                    .then(function(response2){
                   return response2.json();
            
                    })
                    .then(function(data2){
            
                       console.log(data2)
    
    
                       for (var i=1; i<6; i++){
                        let unix_timestamp = data2.daily[i].dt
                        var date = new Date(unix_timestamp * 1000);
                        var forDate = dayjs(date).format('MM/DD/YYYY')
                         var forTemp = data2.daily[i].temp.day
                         var forHumid = data2.daily[i].humidity
                         var div = document.createElement("div")
                         div.setAttribute("class","col")
                         forSection.appendChild(div)
                         var div2 = document.createElement("div")
                         div2.setAttribute("class","card bg-primary text-light")
                         div.appendChild(div2)
                         var div3 = document.createElement("div")
                         div3.setAttribute("class","card-body")
                         div2.appendChild(div3)
                         var h6= document.createElement("h6")
                         h6.setAttribute("class","card-title text-light")
                         div3.appendChild(h6)
                         h6.textContent = forDate 
                         var img1= document.createElement('img')
                         img1.setAttribute("src", weatherImageUrl + data2.daily[i].weather[0].icon + "@2x.png");
                         img1.setAttribute("alt", data2.daily[i].weather[0].description)
                         div3.appendChild(img1) 
                         var p = document.createElement("p")
                         p.setAttribute("class","text-light")
                         div3.appendChild(p)
                         p.textContent = "Temp: " + forTemp + " °F"
                         var p1 = document.createElement("p")
                         p1.setAttribute("class","text-light")
                         div3.appendChild(p1)
                         p1.textContent = "Humidity: " + forHumid + "%"
    
                        
            
                       }
            
            
                    });    
                       
    
    });
    
    
    };