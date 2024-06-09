/*****The whole Image Model and Image Controller can be omitted if there is no upload component in the full-stack app */

const httpStatus=require('http-status-codes');
const multer=require('multer');
const Image = require('../models/image');
const User = require('../models/user');

const storage = multer.diskStorage({
    destination:function(req,file,callback){
        return callback(null,"./public/images")
    },
    filename:function(req,file,callback){
        return callback(null,`${Date.now()}_${file.originalname}`);
    }
})
const upload = multer({storage});
module.exports={
    upload:upload.single('file'),

    logUpload:(req,res,next)=>{
        console.log(req.file);
  
        //save db (req.file.filename,req.file.path)
        Image.create(
            {
                filename:req.file.filename,
                path:req.file.path
            }
        ).then((result)=>{
            let imageId= result._id;
            let userId=res.locals.currentUser._id;
            return User.findByIdAndUpdate(userId,{
                $addToSet:{
                    images:imageId
                }
            })
        })
        .then(()=>{
            res.locals.opMsg="Successfully Create image in db & added to user's images list in db"
            next();
        })
        .catch((err)=>{
            next(new Error("some error happened:"+err));
        })

        
    },
    indexSpecificUser:(req,res,next)=>{
        let user= res.locals.currentUser;
        console.log(user)
         //user.images is list of image object
        User.populate(user,"images")
        .then(populatedUser=>{
            console.log(populatedUser);
            res.locals.data=populatedUser.images;
            res.locals.opMsg="Success";
            next();
        })
        .catch((err)=>{
            next(err);
        })
        
    },


    respondJSON:(req,res)=>{
        res.json({
            status:httpStatus.StatusCodes.OK,
            data:res.locals.data,
            opMsg:res.locals.opMsg
        })
    },
}