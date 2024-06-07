/*****The whole User Model and User Controller can be omitted if there is no login/auth component in the full-stack app */
const User=require('../models/user');
const httpStatus=require('http-status-codes');
const jsonWebToken=require("jsonwebtoken");
const passport=require('passport');
module.exports={
    create:(req,res,next)=>{
        User.register(new User({ //we can use register function provided by passportjs after adding plugin on models/UserSchema
            username:req.body.username
        })
        ,req.body.password
        ,(err,user)=>{
            if(user){
                res.locals.data=user;
                res.locals.opMsg=`Successfully create user with username ${user.username}`; 
                next();
            }else{
                next(new Error("FAILED create user!"+err.message));
            }
        });
    },
    authenticate:(req,res,next)=>{
        passport.authenticate("local",(err,user)=>{
            if(user){
                let signedToken=jsonWebToken.sign( //create a web token
                    {
                        data:user._id,
                        exp:new Date().setDate(new Date().getDate()+1)
                    },
                    "secret_encoding_passphrase"
                );
                res.json({
                    authSuccess:true,
                    token:signedToken
                });
            }else{
                res.json({
                    authSuccess:false,
                    message:"fail to authenticate User"
                });
            }
        }) (req, res, next); 

    },
    verifyJWT:(req,res,next)=>{
        let token = req.headers.token;
        if (token) {
        jsonWebToken.verify(token, "secret_encoding_passphrase", (errors, payload) => {
            if (payload) {
                User.findById(payload.data).then(user => {
                    if (user) {
                        next();
                    } 
                    else {
                        res.status(httpStatus.StatusCodes.FORBIDDEN).json({
                            error: true,
                            message: "No User account found."
                        });
                }
            });
            } else {
            res.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
                error: true,
                message: "Cannot verify API token."
            });
            next();
            }
        });
        } else {
        res.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
                error: true,
                message: "Provide API Token"
            });
        }
    
    },
    logout:(req,res,next)=>{
        req.logout();
        res.locals.opMsg="Logout Successfully!"
        next();
    },
    respondJSON:(req,res)=>{
        res.json({
            status:httpStatus.StatusCodes.OK,
            data:res.locals.data,
            opMsg:res.locals.opMsg
        })
    },

}