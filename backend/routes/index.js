
const router=require("express").Router();
const apiRouter=require("./apiRoutes");
router.use("/api",apiRouter);


module.exports=router;