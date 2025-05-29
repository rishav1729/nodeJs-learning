// app.js is the stating point of the application
// here we will initialse our app
const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")   
const app = express() //instance of express js application, this line create a web server
                      //when we create a webserver, we have to call listen over there and we have to listen on some port, so that anybody can connect to us

app.use(express.json());

app.get("/users", (req, res) => {
    res.send("users");
})

app.get("/users/:id", (req, res) => {
    res.send(`user ${req.params.id}`);
})

app.delete("/users/:id", (req, res) => {
    res.send(`user ${req.params.id} deleted`);
})

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const updateData = req.body;
    try {
        const allowedUpdates = [ "profilePicture", "bio"];
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send(user);
    } catch(err) {
        res.status(500).send("Error updating user: " + err.message);
    }
})

app.post("/signup", (req, res) => {

    console.log(req.body);
    res.send("user created");
});


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