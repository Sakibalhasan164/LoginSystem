const express=require("express")
const app=express()
const mongoose=require("mongoose")
const router=require("./routers/routes")
require("dotenv").config()
const ejs=require("ejs")
const cookieParser=require("cookie-parser")
const {requireAuth, getUser}=require('./auth')
const jwt=require("jsonwebtoken")
const User=require("./models/user")
const Post=require("./models/posts")

//connect to the database(mongoDB)
mongoose.connect(process.env.DB_URL,
    { useUnifiedTopology: true , useNewUrlParser: true,useCreateIndex: true,
    useNewUrlParser: true})

.then(()=>{
    // listen after the database is connected
    const port=process.env.PORT||3000
        app.listen(port,()=>{console.log(`server is running on port ${port}`)})
    console.log("connected to the database");
 
})
.catch((err)=>console.log(err))


//moddlewares
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
// app.use(protected)

//routes
app.get("*",getUser)


app.get("/protected",requireAuth, (req,res)=>{
    res.render("protectedRouts")
})


//saving a story
app.post("/protected",(req,res)=>{
    const token=req.cookies.jwt;
    if(token){
     jwt.verify(token,"this is my super secret string",async(err,decoded)=>{
      if(err){
          
          res.redirect("log-in")
      }else{
          
         const user=await User.findById(decoded.id)
        
        const name=user.name
         const id=user._id;
        const requestPost={
         title:req.body.title,
         post:req.body.post,
         user:id,
         name:name,      
        }
     post=new Post(requestPost)
     post.save().then(()=>{
         console.log("saved");
         res.json({redirect:"/"})
        
        }
     )
     .catch((err)=>console.log(err))

          
      }
    })
    }
    else{
        res.redirect("/log-in")
    }
   
})



app.use(router)

//log out Rout
app.get("/logOut",(req,res)=>{
    res.cookie("jwt","",{maxAge:1})
    res.redirect("/")
})

//visit others profile
app.get("/visit/:id",async(req,res)=>{
 const requestId=req.params.id
//  try {
//      const user= await User.find({_id:requestId})
//     //  console.log(user,);
// } catch (error) {
//     console.log(error);
//  }
 const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,"this is my super secret string",async(err,decoded)=>{
        if(err){
            console.log(err);
        }else{
            const id=decoded.id
         //checking if the user is the same user
         if(id ===requestId ){
          //this user is the logged in user
            res.redirect('/')
        }else{
            try {
                const posts=await Post.find({user:requestId})
               res.render("profile",{posts}) 
            } catch (error) {
                console.log(error);
            }
            

        }
        }
    }) }
    else{
        res.redirect("/log-in")
    }

})





