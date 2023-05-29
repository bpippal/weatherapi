const bodyparser = require("body-parser");
const appConfig = require("./config/app");


function loadRoutes(app){
    
    //Attach all parser's on app such as json-parser, etc.
    app.use(bodyparser.json());
    
    
    //Load middleware's
    const initMiddleware = require("./middleware");
    initMiddleware(app);
    
    
    //Route's can be loaded a better way/separated from the actual logic layer ? TODO
    
    app.post("/cities" , (req, res) => {
        
        const _ = require("lodash");
        let payload = req.body;

        if(!payload || !payload.cities || !_.isArray(payload.cities) || _.isEmpty(payload.cities)){
            return res.status(404).json({ERR : "Payload is invalid. Payload is an object of field cities which is a list of cities"});
        }

        const cityService = require("./Service/cityservice");
        const cityServiceInst = cityService.getInst(); 
        const cities = payload.cities;
        let geoCities = [];

        for(let i=0 ; i<cities.length ; i++){
            geoCities.push(cityServiceInst.getGeoPoints(cities[i]));
        }

        return Promise.all(geoCities).then(function(geoResults){

            let forecastCities = [];

            let invalidCities = [];

            for(let i=0 ; i<geoResults.length ; i++){
                if(geoResults[i] && !geoResults[i].lat){
                    invalidCities.push(geoResults[i].name)
                }else{
                    forecastCities.push(cityServiceInst.getCityForecast(geoResults[i]));
                }
            }

            return Promise.all(forecastCities).then(function(forecastResult){
            
                let resultObj = {};
                resultObj.forecast = forecastResult;
                resultObj.invalidCities = invalidCities;

                return res.json(resultObj);
            })

        })
        .catch(function(err){
            return res.status(500).json({err : err});
        })

    })


    //Default route handling for all other endpoints
    app.use("*" , (req, res) => {
        res.status(404).json({err : "Route not Found"});
    })

    app.listen(appConfig.port, () => {
        console.log("**************************Finished Server Boot Up Process********************");
        console.log(`**************************SERVER RUNNING ON PORT ${appConfig.port}********************`);
        console.log("\n");
    })

}

module.exports = loadRoutes;