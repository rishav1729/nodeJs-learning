const jwt = require("jsonwebtoken")
require.dotenv()
const User = require("../models/user")

const userAuth = async (req,res,next) => {
    try {    
        //read the token from the req cookies
        //validate the tpken
        //find the user
        const { token } = req.cookies;
        if(!token){
            throw new Error("Unauthorized!!")
        }
        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedObj

        const user = User.findById(_id)
        if (!user) {
            throw new Error("User not found!")
        } 
        //we can attach user in req, so that it can be used later
        req.user = user;
        next()
    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }

}

module.expoerts = {
    userAuth,
}