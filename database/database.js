const mongoose = require("mongoose");

const connectDataBase = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/pathmedDB",{useNewUrlParser: true, useUnifiedTopology: true}).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
}

module.exports = connectDataBase