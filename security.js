module.exports = (id, request, callback) => {

  request.post("http://gmapi.azurewebsites.net/getSecurityStatusService", {
      headers:
      {
        "Content-Type" : "application/json"
      },
      body: {
        "id" : id,
        "responseType" : "JSON"
      },
      json: true
    }, function(error, response, body){

    if(error) {

      console.log("Error in security: " + error)
      callback(null)
      return
    }

    if(200 > parseInt(body.status) || parseInt(body.status) >= 300) {

      console.log("Error in security: GM api responded with bad code: " + body.status)
      callback(null)
      return
    }

    doors = body.data.doors.values

    responseBody = []

    function matchDoor(doorObj) {

      doorType = doorObj.location.value
      locked = doorObj.locked.value == "True" ? true : false

      console.log(doorObj)

      switch(doorType) {

        case "frontLeft":
          responseBody.push({ "location" : "frontLeft", "locked": locked })
          break;
        case "frontRight":
          responseBody.push({ "location" : "frontRight", "locked": locked })
          break;
        case "backLeft":
          responseBody.push({ "location" : "backLeft", "locked": locked })
          break;
        case "backRight":
          responseBody.push({ "location" : "backRight", "locked": locked })
          break;
        default:
          console.log("Error in security: bad data from GM api")
          callback(null)
          return
      }
    }

    matchDoor(doors[0])
    matchDoor(doors[1])

    // doors[2] and doors[3] won"t exist in the case of two door coupe
    if(doors[2]) matchDoor(doors[2])
    if(doors[3]) matchDoor(doors[3])

    callback(responseBody)
    return
  })




}
