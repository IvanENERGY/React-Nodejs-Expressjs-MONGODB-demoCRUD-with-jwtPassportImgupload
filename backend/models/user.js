/*****The whole User Model and User Controller can be omitted if there is no login/auth component in the full-stack app */
const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const userSchema = new mongoose.Schema(

    {
        username:{ //this is default UserNameField for passport js
            type:String,
            trim:true,
            unique:true,
            require:true
        },
        images:[ //this can be omitted if there is no upload function in the full stack app
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Image"
            }
        ]
    },
    {
        timestamps:true
    }

);
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);