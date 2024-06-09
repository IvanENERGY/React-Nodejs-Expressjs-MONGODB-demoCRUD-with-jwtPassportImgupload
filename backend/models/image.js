/*****The whole Image Model and Image Controller can be omitted if there is no upload component in the full-stack app */
const mongoose=require('mongoose');
const imageSchema= new mongoose.Schema(
    {
        filename:{
            type:String,
            require:true            
        },
        path:{
            type:String,
            require:true
        }
    }
    ,{
        timestamps:true
    }

)
module.exports=mongoose.model("Image",imageSchema);