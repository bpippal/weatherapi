# weatherapi

Weather API with endpoint - 

POST /cities -> Payload with cities having a list of cities, result's in forecast's of those cities, also add's another field invalidCities which is populated if the entered city is not able to resolve into a geo location.

To start the server -> 
node server.js 

Config's -
Default cluster enabled to run multiple worker's
By default the server runs on port 3000, if another service is being run on 3000, port number can be changed in the config/app.js -> port

Postman Collection export - 
{
	"info": {
		"_postman_id": "d988e04d-d379-4543-acea-602f236e9fa5",
		"name": "GoSwift",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "17543712"
	},
	"item": [
		{
			"name": "Open weather Forecast API",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=258ab6e8e31ccc455c1de35809bade76",
					"protocol": "https",
					"host": [
						"api",
						"openweathermap",
						"org"
					],
					"path": [
						"data",
						"2.5",
						"weather"
					],
					"query": [
						{
							"key": "lat",
							"value": "44.34"
						},
						{
							"key": "lon",
							"value": "10.99"
						},
						{
							"key": "appid",
							"value": "258ab6e8e31ccc455c1de35809bade76"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Open weather City Geo Co-ordinates",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://api.openweathermap.org/geo/1.0/direct?q=hubli&appid=258ab6e8e31ccc455c1de35809bade76",
					"protocol": "http",
					"host": [
						"api",
						"openweathermap",
						"org"
					],
					"path": [
						"geo",
						"1.0",
						"direct"
					],
					"query": [
						{
							"key": "q",
							"value": "hubli"
						},
						{
							"key": "appid",
							"value": "258ab6e8e31ccc455c1de35809bade76"
						}
					]
				}
			},
			"response": []
		},
		{
			"name": "Test with invalid city",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"cities\" : [\"Hubli\" , \"Mumbai\" , \"holii\"]\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/cities",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"cities"
					]
				}
			},
			"response": []
		},
		{
			"name": "Basic Test",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"cities\" : [\"Hubli\" , \"Mumbai\"]\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/cities",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"cities"
					]
				}
			},
			"response": []
		},
		{
			"name": "Invalid payload format",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"citie\" : [\"Hubli\" , \"Mumbai\" , \"holii\"]\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:3000/cities",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"cities"
					]
				}
			},
			"response": []
		}
	]
}