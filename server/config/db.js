const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const mongoUri = process.env.MONGO_URI
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false
}
const connection = ()=>{

   mongoose.connect(mongoUri,options)
   .then(console.log("connected"))
   .catch((err)=>console.log(err))

}

module.exports = connection