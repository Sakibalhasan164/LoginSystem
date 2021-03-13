const mongoose=require("mongoose")
const {isEmail}=require("validator")
const bcrypt=require("bcrypt")
const Salt_Work_Factor=10;



const Schema=mongoose.Schema


const userSchema=new Schema({
name:{
    type:String,
    required:[true,"please enter a name"]
},
email:{
    type:String,
    required:[true,"please enter an email"],
    unique:true,
    lowercase:true,
    validate:[isEmail,"This no not a valid email"]

},
password:{
    type:String,
    required:[true,"please enter a password"],
    minlength:[6,"password should be 6 charecter long"],  
    // validate:[this pasword is too weak"]  
},
confirm:{
    type:String,
    // required:fal,
    minlength:6
}

},{timestamps:true})


//firing function after doc is saved to the database
userSchema.post("save",function(doc,next){
    console.log("user data is saved");
    next()

})

//pre hook to hash the password
userSchema.pre("save", async function(next){  
try{
    const salt=await bcrypt.genSalt(Salt_Work_Factor);
    this.password=await bcrypt.hash(this.password,salt)
    return next()
}catch(err){
    return next(err)
}


})

userSchema.statics.login=async function(email,password){ 
 const user=await this.findOne({email})
 if(user){
 const auth= await bcrypt.compare(password,user.password)
  if(auth){
      return user;
  }
  throw Error("inncorrect password")

 }throw Error('this email is not regiseter')
}


const User=mongoose.model("user",userSchema)

module.exports=User;