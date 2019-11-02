module.exports = (id, action, request, callback) => {

  command = action == "START" ? "START_VEHICLE" : "STOP_VEHICLE"

  request.post("http://gmapi.azurewebsites.net/actionEngineService", {
    headers: {
      "Content-Type" : "application/json"
    },
    body: {
      "id" : id,
      "command" : command,
      "responseType" : "JSON"

    },
    json: true
  }, function(error, response, body) {

    if(error) {

      console.log("Error in engine: " + error)
      callback(null)
      return
    }

    if(200 > parseInt(body.status) || parseInt(body.status) >= 300) {

      console.log("Error in engine: GM api responded with bad code: " + body.status)
      callback(null)
      return
    }

    status = body.actionResult.status == "EXECUTED" ? "success" : "failure"
    responseBody = {
      "status" : status
    }

    callback(responseBody)
    return
  })
}
