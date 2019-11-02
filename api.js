const express = require("express")
const app = express()

const request = require("request")
const bodyParser = require("body-parser")

const carInfo = require("./carInfo.js")
const security = require("./security.js")
const energyRange = require("./energyRange")
const engine = require("./engine")

if(!process.argv[2]) {

  console.log('usage: node api.js <port>')
  process.exit(0)
}
app.use(bodyParser.json())

app.listen(process.argv[2], () => {
  console.log("smartcar api listening on 8080")
})

app.get("/vehicles/:id", function(req, res) {

    console.log("GET request to /vehicles/:id from host: " + req.hostname)
    id = req.params.id

    if(!id) {

      res.status(400).send("Error in Vehicle Info request uri: id null")
      return
    }

    carInfo(id, request, (response) => {

      if(!response) {

        res.status(500).send("Internal server error with GM api")
        return
      }

      console.log("success!")
      res.status(200).send(response)

    })
})


app.get("/vehicles/:id/doors", function(req, res) {

    console.log("GET request to /vehicles/:id/doors from " + req.hostname)
    id = req.params.id

    if(!id) {

      res.status(400).send("Error in Security request uri: id null")
      return
    }

    security(id, request, (response) => {

      if(!response) {

        res.status(500).send("Internal server error with GM api")
        return
      }

      console.log("success!")
      res.status(200).send(response)

    })
})

app.get("/vehicles/:id/fuel", function(req, res) {

    console.log("GET request to /vehicles/:id/fuel from host: " + req.hostname)
    id = req.params.id

    if(!id) {

      res.status(400).send("Error in Fuel Range request uri: id null")
    }

    energyRange(id, "fuel", request, (response) => {

      if(!response) {

        res.status(500).send("Internal server error with GM api")
        return
      } else if(response == "noinfo") {

        res.status(404).send("GM api does not have info on this car\"s fuel status")
        return
      } else {

        console.log("success!")
        res.status(200).send(response)
      }

    })

})


app.get("/vehicles/:id/battery", function(req, res) {

    console.log("GET request to /vehicles/:id/battery from host: " + req.hostname)
    id = req.params.id

    if(!id) {

      res.status(400).send("Error in Battery Range request uri: id null")
      return
    }

    energyRange(id, "battery", request, (response) => {

      if(!response) {

        res.status(500).send("Internal server error with GM api")
        return
      } else if(response == "noinfo"){

        res.status(404).send("GM api does not have info on this car\"s battery status")
        return
      } else {

        console.log("success!")
        res.status(200).send(response)
      }

    })

})

app.post("/vehicles/:id/engine", function(req, res) {

    console.log("POST request to /vehicles/:id/engine from host: " + req.hostname)
    id = req.params.id

    if(!id) {

      console.log("bad request")
      res.status(400).send("Error in Engine request uri: id null")
      return
    }

    if(req.get("Content-Type") != "application/json") {

      console.log("bad request")
      res.status(400).send("Error in Engine request: no \"Content-Type: application/json\" header")
      return
    }

    action = req.body.action

    if(!action) {

      res.status(400).send("Error in Engine request body: action does not exist or is null")
      return
    }

    engine(id, action, request, (response) => {

      if(!response) {

        res.status(500).send("Internal server error with GM api")
        return
      }

      console.log("success!")
      res.status(200).send(response)

    })

})
