module.exports = (id, request, callback) => {

  request.post("http://gmapi.azurewebsites.net/getVehicleInfoService", {
    headers:
    {
      "Content-Type" : "application/json"
    },
    body: {
      "id" : id,
      "responseType" : "JSON"
    },
    json: true
  }, function(error, response, body) {

    if(error) {

      console.log("Error in carInfo: " + error)
      callback(null)
      return
    }

    if(200 > parseInt(body.status) || parseInt(body.status) >= 300) {

      console.log("Error in car: GM api responded with bad code: " + body.status)
      callback(null)
      return
    }

    vin = body.data.vin.value

    color = body.data.color.value

    doorCount = body.data.fourDoorSedan.value == "True" ? 4 : 2

    driveTrain = body.data.driveTrain.value

    if(!vin || !color || !doorCount || !driveTrain) {

      console.log("Error in carInfo: missing data from GM api")
      callback(null)
      return
    }

    responseBody = {
      "vin" : vin,
      "color" : color,
      "doorCount" : doorCount,
      "driveTrain" : driveTrain
    }

    callback(responseBody)
    return
  })
}
