const express=require('express');
const router=require('./routes/index');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const app=express();
app.set("port",process.env.PORT||3000);
mongoose.connect(process.env.DB_URL);
//mongoose.connect("mongodb+srv://ivan:y6566683@cluster0.03hgnwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
// mongoose.connect("mongodb://localhost:27017/todo_db");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

/************authentication setup begins */
/*****The whole auth part can be omitted if there is no login/auth component in the full-stack app */
const expressSession=require('express-session');
const passport=require('passport'); 
const User=require('./models/user');

app.use(expressSession({
    secret:"somesecretpass",
    cookie:{
        maxAge:4000000,
    },
    resave:false,
    saveUninitialized:false 
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.loggedIn=req.isAuthenticated(); 
  res.locals.currentUser=req.user;
  next();
})
/************authentication setup ends */


app.use("/",router);
app.listen(app.get("port"),()=>{console.log(`The app is listening on PORT ${app.get("port")}`)});



