SMARTCAR API CHALLENGE - Aaron Kranzler

This Express application serves as a wrapper over GM's api such that it can format GM's API data nicely and present it via a SmartCar
API.

To run the service, copy the following commands into your terminal. Be sure to be in the same directory as this project.
package.json details the necessary packages. npm/node must be installed as well.

npm install
node app.js <port>

where <port> is the port you wish to run this service on.

The system is structured in a modular fashion. app.js provides all logic for the setup and execution of the Express app and its endpoints.
Each endpoint has a corresponding module that gets called.
Each module encapsulates the HTTP request logic to GM API for a specific service:

carInfo.js -> getVehicleInfoService
energyRange.js -> getEnergyService (either fuel or battery levels depending on endpoint)
security.js -> getSecurityStatusService
engine.js -> actionEngineService

See test.txt for test cases and expected functionality

The API has the following services

Vehicle Info: GET /vehicles/:id
Example response: {
  "vin": "1213231",
  "color": "Metallic Silver",
  "doorCount": 4,
  "driveTrain": "v8"
}

Security: GET /vehicles/:id/doors
Example response: [
  {
    "location": "frontLeft",
    "locked": true
  },
  {
    "location": "frontRight",
    "locked": true
  },
  {
    "location": "backLeft",
    "locked": true
  },
  {
    "location": "backRight",
    "locked": false
  }
]

Fuel Range: GET /vehicles/:id/fuel
Example response: {
  "percent": 30.2
}

Battery Range: GET /vehicles/:id/battery
Example response: {
  "percent": 30.2
}

Start/Stop Engine: POST /vehicles/:id/engine
Required header: 'Content-Type : application/json'
Example request body: {
  "action": "START|STOP"
}
Example response body: {
  "status": "success|error"
}
