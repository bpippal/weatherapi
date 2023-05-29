const baseservice = require("./Baseservice");
const openWeatherConfig = require("../config/openweather");
const requestservice = require("./requestservice");

function CityService(){
    this.serviceName = "cityservice";
    baseservice.call(this);
}

function prepareRequestString (resourceType , resource){

    let url = "";

    if(resourceType === "geopositionpath"){
        url = openWeatherConfig.baseurl + openWeatherConfig.geoPositionPath + "?q=" + `${resource}` + "&appid=" + `${openWeatherConfig.apikey}`; 
    }else if (resourceType === "forecase"){
        url = openWeatherConfig.baseurl + openWeatherConfig.forecastPath + "?lat=" + `${resource.lat}` + "&lon=" + `${resource.lon}` + "&appid=" + `${openWeatherConfig.apikey}`;
    }

    return url;

}

CityService.prototype.getGeoPoints = function(city){


    const requestserviceInst = requestservice.getInst();

    let reqUrl = prepareRequestString("geopositionpath" , city);
    let reqObj = {uri : reqUrl};


        return requestserviceInst._request(reqObj)
        .then(function(res){
            let body = JSON.parse(res.body);
    
            let cityObj = {}
            cityObj.name = city;
    
            if(body && body.length){
                
                cityObj.lat = body[0].lat;
                cityObj.lon = body[0].lon;
        
            }
    
            return cityObj;

        })
        .catch(function(err){
            //Handle the error;
        })

    

}

CityService.prototype.getCityForecast = function(cityObj){

    let reqUrl = prepareRequestString("forecase" , cityObj);
    let requestserviceInst = requestservice.getInst();
    let reqObj = {
        uri : reqUrl
    }

    return requestserviceInst._request(reqObj)
    .then(function(res){

        let cityForeCast = {};
        cityForeCast[cityObj.name] = JSON.parse(res.body);
        
        return cityForeCast;

    })
    .catch(function(err){
        //Handle error
    })

}

module.exports = {
    getInst : function(){
        return new CityService();
    }
}