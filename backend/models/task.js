const mongoose=require('mongoose');
const taskSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            require:true            
        },
        deadline:{
            type:Date,
            require:true
        },
        reps:{
            type:Number,
            require:true
        }
    }
    ,{
        timestamps:true
    }

)
module.exports=mongoose.model("Task",taskSchema);