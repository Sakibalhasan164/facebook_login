const express=require("express")
const app=express()
const ejs=require("ejs")
const mongoose=require("mongoose");
const User=require("./models/user");
//b crypt
const bcrypt = require('bcrypt');
require("dotenv").config()


//middleweare
app.set("view engine","ejs")
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//connect to the dataBase

const dataBaseUrl=process.env.DB_URI
mongoose.connect(dataBaseUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{
//listning
const port=process.env.PORT ||5000
app.listen(port,()=>console.log(`app is listing on port ${port}`))
console.log("connected to the datbase mongodb");


})
.catch((err)=>{
    console.log(err);
})



//routs
app.get("/login",(req,res)=>{
    res.render("index")
})

//post request
app.post("/login",async(req,res)=>{
try {
    //hashing the password and saving it to the database
    const salt= await bcrypt.genSalt()
    const hassedPassword=await bcrypt.hash(req.body.password,salt)
    console.log(hassedPassword);
    const userdata={
        name:req.body.name,
        password:req.body.password,
        Hpass:hassedPassword
    }
    //save data to mongodb
    console.log(userdata);
    const data=new User(userdata)
    data.save()
    .then(()=>{console.log("data is saved in the db");
     res.redirect("/login")

})
    .catch((err)=>{console.log(err);})    

}

catch (error) {
    console.log(error);
}



})



