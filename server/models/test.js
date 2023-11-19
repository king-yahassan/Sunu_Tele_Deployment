const mongoose = require("mongoose")

const testSchema = new mongoose.Schema({
    date:{
        type : Date,
        default: Date.now
    },
    value:{
        type : Number,
        default : 1000
    }
}) 

module.exports = mongoose.model("Test", testSchema)