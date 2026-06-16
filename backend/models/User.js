const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname : {
        type : "String",
        required : true
    },

    username : {
        type : "String",
        required:true
    },

    phone : {
        type : "String",
        required : true,
        unique : true,
        match : [/^[6-9]\d{9}$/, "Invalid phone number"]
    },

    password : {
        type : "String",
        required : true
    },

    profilePic : {
        type : "String",
        default : ""
    },

    bio : {
        type : "String",
        default : ""
    }


}, {
    timestamps : true
});


module.exports = mongoose.model("User", userSchema)