const mongoose=require("mongoose")
const Schema=mongoose.Schema


const postSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true,
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    },
    name:{
        type:mongoose.Schema.Types.String,
        ref:"User"
    }

},{
    timestamps:true
})


const Post=mongoose.model("post",postSchema)
module.exports=Post;