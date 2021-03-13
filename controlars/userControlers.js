const User=require("../models/user")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const Post=require("../models/posts")
const { find } = require("../models/user")

const maxAge=3*24*60*60
function createToken(id){
  return jwt.sign({id},"this is my super secret string",{
      expiresIn:maxAge
  })
}



//handle errors
function handleErrors(err){
    // console.log(err.code);
    let errors={name:"",email:"",password:"",confirm:""}
 
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
      }

    if(err.message.includes("user validation failed")){
        const resultArray= Object.values(err.errors)
        for(i=0;i<resultArray.length;i++){
           errors[resultArray[i].properties.path]=resultArray[i].properties.message
        }
    }
    return errors;
}



//routes
const root_index=(req,res)=>{
    const token=req.cookies.jwt;
    if(token){
    jwt.verify(token,"this is my super secret string",async(err,decoded)=>{
        if(err){
            console.log(err);
        }else{
         const id=decoded.id
         const user= await User.find({_id:id})
         const post=await Post.find({user:id})
         res.render("home",{post,user})
        }
    }) }
    else{
        res.redirect("/log-in")
    }
    
}
//login form

const login_index=(req,res)=>{
    res.render("login")
}
const register_index=(req,res)=>{
    res.render("register")
}
const register_post=async(req,res)=>{
    const {name,email,password}=req.body
    try{
       const user=await User.create({name,email,password})
       //when i save a new user the server 
       //the server recives a jwt as a cookie
       const token=createToken(user._id)
       res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
       res.status(200).json({user:user._id})
    }catch(err){
        
    //calling handle errors function
   const errors=handleErrors(err)
   res.status(400).send(errors)
  
    }
}

const login_post=async(req,res)=>{
    // const { email, password } = req.body;
    // console.log(req.body);
    try {
        const user=await User.login(req.body.email,req.body.password);
        const token=createToken(user._id)
        // res./")
        res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000})
    
    res.status(200).json({redirect:"/"})
    } catch (err) {
        res.status(400).json({message:err.message})
    }
  
    
}


//all the users posts rout
const allPost_rout=async(req,res)=>{
const posts=await Post.find()
// console.log(posts);   

res.render("allPosts",{posts})

}

//visit others profile page




module.exports={
root_index,login_index,register_index,register_post,login_post,allPost_rout
}