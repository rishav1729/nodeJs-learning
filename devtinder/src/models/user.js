const mongoose = require("mongoose");
const validator = require("validator");
require('dotenv').config();
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address: " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
        validate: {
            validator: validator.isStrongPassword,
            message: "Password must be strong"
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },  
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        validate(value) {
            if (!validator.isIn(value, ["male", "female", "other"])) {
                throw new Error("Invalid gender: " + value);
            }
        }
    },
    profilePicture: {
        type: String,
        default: "default-profile-picture.jpg",
        validate: {
            validator: validator.isURL,
            message: "Invalid profile picture URL"
        }
    },
    bio: {
        type: String,
        maxlength: 200
    },
},
{
    timestamps: true,
})  

userSchema.methods.getJWT = async function (){
    const user = this
    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})

    return token
}

//validate the password
userSchema.methods.vlaidatePassword = async function (passwordInputByUser){
    const user = this
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash); 

    return isPasswordValid
}

const User = mongoose.model("User", userSchema);

module.exports = User;