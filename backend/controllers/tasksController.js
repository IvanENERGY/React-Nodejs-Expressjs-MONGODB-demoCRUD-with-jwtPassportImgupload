const Task=require('../models/task');
const httpStatus=require('http-status-codes');
module.exports={
    //READ
    index:(req,res,next)=>{
        Task.find({}).exec().then((result)=>{
            res.locals.data=result;
            res.locals.opMsg="Retrieve Successful";
            next();
        })
        .catch((err)=>{
            res.locals.opMsg="err fetching all!"
            next(err);
        })
    },
    indexOne:(req,res,next)=>{
        let id=req.params.id;
        Task.findOne({_id:id}).exec().then((result)=>{
            res.locals.data=result;
            res.locals.opMsg="Retrieve Successful";
            next();
        })
        .catch((err)=>{
            res.locals.opMsg="err fetching one!";
            next(err);
        })
    },

    //CREATE
    create:(req,res,next)=>{
        Task.create(
            {   
                name:req.body.name,
                deadline:req.body.deadline,
                reps:req.body.reps
            }
        ).then((result)=>{
            res.locals.data=result;
            res.locals.opMsg="Create Successful";
            next();
        }).catch((err)=>{
            res.locals.opMsg="err adding ! "+err;
            next(err);
        })
    },
    //UPDATE
    update:(req,res,next)=>{
        let id =req.params.id
        Task.findByIdAndUpdate(id,{
            $set:{
                name:req.body.name,
                deadline:req.body.deadline,
                reps:req.body.reps
            }
        })
        .then((result)=>{ 
                    result.save();
                    res.locals.data=result; //return the old version
                    res.locals.opMsg="Update Successful";
                    next();
                })
        .catch((err)=>{
            res.locals.opMsg="CANOT update task by findByIdAndUpdate"+err;
            next(err);
        })


    },

    //DELETE
    delete:(req,res,next)=>{
        Task.findByIdAndDelete(req.params.id)
        .then((result)=>{
            res.locals.data=result;
            res.locals.opMsg="Delete Successful";
            next();
        })
        .catch((err)=>{
            res.locals.opMsg="CANOT findByIdAndDelete"+err;
            next(err);
        });
    },



    respondJSON:(req,res)=>{
        res.json({
            status:httpStatus.StatusCodes.OK,
            data:res.locals.data,
            opMsg:res.locals.opMsg
        })
    },
    errorJSON:(error,req,res,next)=>{
        let errorObj;
        if(error){
            errorObj={
                status:httpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                message:error.message
            }
        }else{
            errorObj={
                status:httpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
                message:"Unknown error"
            }
        }
        res.json(errorObj);
    }
}