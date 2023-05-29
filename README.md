# weatherapi

Weather API with endpoint - 

POST /cities -> Payload with cities having a list of cities, result's in forecast's of those cities, also add's another field invalidCities which is populated if the entered city is not able to resolve into a geo location.

To start the server -> 
node server.js 

Config's -
Default cluster enabled to run multiple worker's
By default the server runs on port 3000, if another service is being run on 3000, port number can be changed in the config/app.js -> port
