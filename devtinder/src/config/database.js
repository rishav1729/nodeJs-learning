const mongoose = require("mongoose")
require('dotenv').config();

const connectDB = async () => {
   await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@samplecrud.g726a.mongodb.net/devTinder`);
}

module.exports = connectDB





// not a good practice, we have to export connectDb to app.js and run the listen to the request only when the db connection is done


// connectDB().then(() => {
//     console.log("successfully connected to db"); 
// }).catch((err) => {
//     console.error("db connection failed");   
//     console.log("error :: ", err);
// })