const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    date :{
        type : Date ,
        // default : Date.now
    },
    validateSubscribe : {
        type : Date ,
        require : true
    },
    numbersMonth : {
        type : Number,
        require : true
    },

    //Subscriber who execute the payment (foreign key)
    subscriberAuthorId : {
        type : mongoose.Schema.Types.ObjectId ,
        
        ref : "Subscriber"
    },
    subscriberAuthorName:{
        type : String ,
    },
    subscriberAuthorPhoneNumber:{
        type : String ,
    },
    subscriberAuthorPaymentPrice:{
        type : String ,
    },
    subscriberAuthorStatus:{
        type : String ,
    },
    
    //admin who do the payment (foreign key)
    comptaAdminId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Referenced by the User model
    },
    comptaAdminPseudo : {
        type: String,
    }


})
module.exports = mongoose.model("Payment",paymentSchema)