const jwt=require("jsonwebtoken");
const User=require("./models/user")



//lets me know if the user is logged in or not
const requireAuth=(req,res,next)=>{
const token=req.cookies.jwt;
if(token){
 jwt.verify(token,"this is my super secret string",(err,decoded)=>{
  if(err){
      console.log(err);
      res.redirect("/log-in")
  }else{
      
      next()
  }

})
}
else{
    res.redirect("/log-in")
}
}

//get information about the user
const getUser=async(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
     jwt.verify(token,"this is my super secret string",async(err,decoded)=>{
      if(err){
          console.log(err);
          res.locals.user=null
          next()
      }else{
        //   console.log(decoded);
         const user=await User.findById(decoded.id)
         res.locals.user=user
       
          next()
      }
    
    })
    }
    else{
        res.locals.user=null
        next()
    }
    }



// const getId=(req,res,next)=>{
//     const token=req.cookies.jwt
//     if(token){
//         jwt.verify(token,"this is my super secret string",async(err,decode)=>{

//         })
//     }
// }



module.exports={requireAuth,getUser};