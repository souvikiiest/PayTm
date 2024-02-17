
const mongoose = require("mongoose");


mongoose.connect('url');
const PaytmUser = mongoose.model('User', new mongoose.Schema({
    firstName: String,
    lastName:String,
    password:String,
    username:String
}));
const Accounts = mongoose.model('Account', new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
}))

module.exports={PaytmUser,Accounts}
