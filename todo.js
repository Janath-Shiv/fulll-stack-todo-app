const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    text:{
        type:String,
        require:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    timestamp:{
        type:String,
        default:Date.now()
    }
});

module.exports = mongoose.model("todoSchema",todoSchema);