const mongoose = require('mongoose');
const {Schema} = mongoose;

const studentShema = new Schema({
    firstName:String,
    lastName: String,
    age: Number,
    class: String,
    height: Number,
    Section: String,
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    password: String,
    isDelete:{
        type:Boolean,
        default: false
    }
})

module.exports=mongoose.model('studend',studentShema);