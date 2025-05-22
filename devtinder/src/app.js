// app.js is the stating point of the application
// here we will initialse our app

const express = require("express")

const app = express() //instance of express js application, this line create a web server
                      //when we create a webserver, we have to call listen over there and we have to listen on some port, so that anybody can connect to us

app.use((req,res) => {
    res.send("Response from the server")
})

app.listen(3000, () => {
console.log("server is up and runnring...");

}) //server is created and is listening at port 3000 , callback will only execute when server is successfully listening to given port