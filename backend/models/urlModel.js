const mongoose = require("mongoose")

const urlSchema = mongoose.Schema(
    {
        userId : {
            type : mongoose.Types.ObjectId,
            required : true,
        },
        longURL : {
            type : String,
            required : [true, "Please add a valid URL"],
        },
        shortURL : {
            type : String,
            required : true,
            unique : true,
        },
        clickCount : {
            type : Number,
            default: 0,
        }      
    },
    {
        timestamps : true
    }
)

const URL = mongoose.model('URL', urlSchema)

module.exports = URL