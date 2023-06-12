const mongoose = require("mongoose")
// ODM object document mapper
module.exports  = (DB_NAME)=> {
    mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`)
    .then(()=>console.log(`CONNECTED TO ${DB_NAME} 🎈🎈🎈🎈`))
    .catch(error=>console.log(`CANNOT CONNECT TO ${DB_NAME} ❌❌❌`, error))
}