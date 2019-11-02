module.exports = (id, type, request, callback) => {

  request.post("http://gmapi.azurewebsites.net/getEnergyService", {
    headers: {
      "Content-Type" : "application/json"
    },
    body: {
      "id" : id,
      "responseType" : "JSON"
    },
    json: true
  }, function(error, response, body) {

    if(error) {

      console.log("Error in energyRange: " + error)
      callback(null)
      return
    }

    if(200 > parseInt(body.status) || parseInt(body.status) >= 300) {

      console.log("Error in energyRange: GM api responded with bad code: " + body.status)
      callback(null)
      return
    }

    percentage = type == "fuel" ? parseInt(body.data.tankLevel.value) : parseInt(body.data.batteryLevel.value)

    if(!percentage) {

      console.log("Error in energyRange: GM api does not have information regarding " + type + " for car with id " + id)
      callback("noinfo")
      return
    }

    responseBody = {
      "percent" : percentage
    }

    callback(responseBody)
    return
  })
}
