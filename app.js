const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {User} = require("./models/user.js")
const path = require("path");
const {userRouter} = require("./router/user.js");
const engine = require("ejs-mate")
const session = require('express-session')
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const mongoStore = require("connect-mongo");
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
};

async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
    console.log("mongodb server connected");
    })
    .catch((error)=>{
    console.log(error);
    });
}
main();


const strore = mongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    crypto: {
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24*3600
});

strore.on("error", ()=>{
    console.log("mongo session error", error)
})

let sessionOption ={
    strore,
  secret: process.env.SESSION_SECRET,
  resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge:1000*60*60,
    },
    httpOnly: true,
};

app.use(session(sessionOption));
app.use(cookieParser());
app.use(flash());
app.use(express.urlencoded({extended: true}));
app.set("views", "ejs engine");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", engine);

app.use((req, res, next)=>{
    let success = req.flash("success");
    res.locals.success = success[0];
    next();
})

app.use("/users", userRouter);

app.listen(8080, ()=>{
    console.log("server is on port 8080");
});