const router = require('express').Router();
const tasksController = require('../controllers/tasksController');
const usersController = require('../controllers/usersController');
const imagesController = require('../controllers/imagesController');

//REGISTER(Create by passportjs)
router.post("/users/create",usersController.create,usersController.respondJSON);
//LOGIN (Authenticate by passportjs & create JWT )
router.post("/users/login",usersController.authenticate); 

/***-----------**/router.use(usersController.verifyJWT);//(↑not protected by JWT;↓isprotected by JWT)(userObj is obtained here)

//CREATE
router.post("/tasks",tasksController.create,tasksController.respondJSON);
//READ
router.get("/tasks",tasksController.index,tasksController.respondJSON);
router.get("/tasks/:id",tasksController.indexOne,tasksController.respondJSON);

//UPDATE
router.put("/tasks/:id/update",tasksController.update,tasksController.respondJSON);


//DELETE
router.delete("/tasks/:id/delete",tasksController.delete,tasksController.respondJSON);


/******Upload images part begins*/
//app.use(express.json()) is required for parsing body
//UPLOAD
router.post("/images/upload",imagesController.upload,imagesController.logUpload,imagesController.respondJSON);

//GET UPLOAD IMAGES related to one user,demonstrate use of Populate in indexSpecificUser
router.get("/images",imagesController.indexSpecificUser,imagesController.respondJSON);

/******Upload images part end*/

//LOGOUT
router.get("/users/logout",usersController.logout,usersController.respondJSON);

//ERROR handling
router.use(tasksController.errorJSON);

module.exports=router;