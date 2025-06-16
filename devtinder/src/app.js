// app.js is the stating point of the application
// here we will initialse our app
const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")   
const app = express() //instance of express js application, this line create a web server
                      //when we create a webserver, we have to call listen over there and we have to listen on some port, so that anybody can connect to us
const {validateSignupData} = require("./utils/validation")
const bcrypt = require("bcrypt")

app.use(express.json());

app.post("/signup", async(req, res) => {
    try{
    //validate the data, handles in helper function
    validateSignupData(req)
    //encrypt the passowrd
    const {password} = req.body
    const passwordHash = await bcrypt.hash(password, 10, function(err, hash) {
        // Store hash in your password DB.
        
    });

    //store the data
    const user = new User({
        firstName, 
        lastName, 
        emailId, 
        password:passwordHash})


        await user.save()
        res.send("user added succesfully")

    }catch(err){
        res.status(400).send("Error : " + err.message)
    }
});

app.post("/login", async(req,res) => {

    try{
        //extract emai and password
        const{emailId, password} = req.body
        //sanatise data
        if(!validator.isEmail(emailId)){
            throw new Error("invalid credentials")
        }
        //check the credetials from db
        const user = await User.findOne({emailId: emailId})
        if(!user){
            throw new Error ("invalid credentials")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password); 

        if(isPasswordValid){
            res.send("login successful")
        }else{
            throw new Error ("invalid credentials")
        }
    }
    catch(err){
        res.status(400).send("Error : " + err.message)
    }

})

app.profile("/profile",(req,res)=>{
    
})

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
    const userId = req.params?.userId;
    const updateData = req.body;

    try {
        const allowedUpdates = ["profilePicture", "bio"];

        const isUpdateAllowed = Object.keys(updateData).every((key)=>
        allowedUpdates.includes(key)
        )
        if(!isUpdateAllowed){
            throw new Error ("update not allowed")
        }
        if(updateData?.skills > 10){
            throw new Error("Skills can not be more than  10")
        }
        const user = await User.findByIdAndUpdate({_id:userId}, updateData, {
            returnDocument:"after",
            runValidator:true
        });
        console.log(user);
        res.send("update successful");
    } catch(err) {
        res.status(500).send("Error updating user: " + err.message);
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