const mongoose = require("mongoose") ;
            
const subscriberSchema = new mongoose.Schema(
    {
        name: { 
            type : String ,
            require : true 
        },
        address:{
            type : String ,
            require : true
        },
        phoneNumber : {
            type : String , 
            require : true
        },
        inscriptionRules : {
            type : Number ,
            require : true
        },
        paymentPriceSubscribe : {
            type : Number , 
            require : true
        },
        validity : {
            type : Date , 
            require : true
        },
        numbersMonth : {
            type : Number ,
            require : true
        } ,
        coordoneesX : {
            type : Number , 
            require : true
        },
        coordoneesY : {
            type : Number , 
            require : true
        },
        status : {
            type : String 
            // enum : ["payer" , "impayer"] 
        },
        //admin who create the subscriber (foreign key)
        subscriberAdmin : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Referenced by the User model
        },
        subscriberAdminName :{
            type :String
        }
    },
    {
        timestamps:true
    }
)
module.exports= mongoose.model('Subscriber',subscriberSchema);