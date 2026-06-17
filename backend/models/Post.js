const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    image : {
        type : "String",
        required : true
    },

    caption : {
        type : "String",
        default : ""
    },

    likes : {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref : 'User'
            }
        ],
        default : [],
    },
},{
    timestamps : true
});


module.exports = mongoose.model("Post", postSchema)