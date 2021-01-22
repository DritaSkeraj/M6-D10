const express = require("express");
const listEndpoints = require("express-list-endpoints")
const server = express();

const cors  = require("cors")

const services = require("./services")

server.use(express.json())

const whiteList = 'http://127.0.0.1:3001/'

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      // allowed
      callback(null, true)
    } else {
      // Not allowed
      callback(new Error("NOT ALLOWED - CORS ISSUES"))
    }
  },
}
server.use(cors()) // CROSS ORIGIN RESOURCE SHARING

server.use("/",services)

const port = process.env.PORT || 3001;

console.log(listEndpoints(server)) 

server.listen(port,()=>{
    console.info(' ✅  Server is running on port ' + port )
});

server.on("error",(error)=>{
    console.error(' ❌ Error : server is not running :  ' + error )
});

