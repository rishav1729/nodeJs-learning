// app.js is the stating point of the application
// here we will initialse our app
const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")   
//instance of express js application, this line create a web server
//when we create a webserver, we have to call listen over there and we have to listen on some port, so that anybody can connect to us
const app = express() 
const {validateSignupData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")
require('dotenv').config();
const cookieParser = require("cookie-parser")
const {userAuth} = require("../src/middleware/auth")

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async(req, res) => {
    try {
        //validate the data, handles in helper function
        validateSignupData(req)
        
        //extract all required fields
        const {firstname, lastname, email, password} = req.body
        
        //encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        //store the data
        const user = new User({
            firstName: firstname, 
            lastName: lastname, 
            email: email, // map email to email field
            password: passwordHash
        })

        await user.save()
        res.status(201).send("User added successfully")

    } catch(err) {
        res.status(400).send("Error: " + err.message)
    }
});

app.post("/login", async(req,res) => {

    try{
        //extract emai and password
        const{email, password} = req.body
        //sanatise data
        if(!validator.isEmail(email)){
            throw new Error("invalid credentials")
        }
        //check the credetials from db
        const user = await User.findOne({email: email})
        if(!user){
            throw new Error ("invalid credentials")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password); 

        if(isPasswordValid){

            //logic of cookie and jwt token
            //create a jwt token
            //we are hinding data(_id) in the jwt
            const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
            //add the token to the cookie and send it back to the user
            res.cookie("token", token, {httpOnly: true, secure: true, maxAge: 3600000}) 


            res.send("login successful")
            console.log(user)
        }else{
            throw new Error ("invalid credentials")
        }
    }
    catch(err){
        res.status(400).send("Error : " + err.message)
    }

})

app.get("/profile", async (req, res) => {
    try {    
        //read the cookie from the request
        const cookies = req.cookies
        //validate the token
        //if token is not present, throw an error
        const { token } = cookies
        if (!token) {
            throw new Error("unauthorized")
        }
        const decodedMessage =  await jwt.verify(token, process.env.JWT_SECRET)
        //extract the user id from the decoded message
        const {_id} = decodedMessage
        //find the user in the database
        const user = await User.findById(_id)
        res.send(user);
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

app.post("/sendConnectionRequest",userAuth, async(req,res)=>{
    //sendConnectionRequest logic
    try{

        const user = req.user
        res.send(`${user.firstName} sent the connection request`)

    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }
})

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