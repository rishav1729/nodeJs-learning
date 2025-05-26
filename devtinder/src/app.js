// app.js is the stating point of the application
// here we will initialse our app
const express = require("express")
const connectDB = require("./config/database")

const app = express() //instance of express js application, this line create a web server
                      //when we create a webserver, we have to call listen over there and we have to listen on some port, so that anybody can connect to us

connectDB().then(() => {
    console.log("successfully connected to db"); 
    app.listen(3000, () => {
    console.log("server is up and runnring...");
})
}).catch((err) => {
    console.error("db connection failed");   
    console.log("error :: ", err);
})

 //server is created and is listening at port 3000 , callback will only execute when server is successfully listening to given port                             