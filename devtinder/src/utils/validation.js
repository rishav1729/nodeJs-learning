const validator = require("validator")


const validateSignupData = (req) => {
    const {firstname, lastname, email, password} = req.body;

    if(!firstname || !lastname) {
        throw new Error("First name and last name are required")
    }
    
    if(firstname.length < 3 || lastname.length < 3) {
        throw new Error("First name and last name must be at least 3 characters long")
    }
    
    if(!validator.isEmail(email)) {
        throw new Error("Invalid email address format")
    }
    
    if(!validator.isStrongPassword(password)) {
        throw new Error("Password must be strong (min 8 chars, include uppercase, lowercase, number and symbol)")
    }
} 

module.exports = {
    validateSignupData
}