const { any } = require("async")
const mongoose=require("mongoose")
const Schema=mongoose.Schema


const userSchema=new Schema({
name:{
    type:String,
    required:true
},
password:{
    type:String ||Number,
   required:true
},
Hpass:{
    type:String,
    required:true,
}

},{timestamps:true})


const User=mongoose.model("user",userSchema)

module.exports=User