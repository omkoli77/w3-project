const {User} = require("../models/user.js");
const {generatePoints} = require("../funcations.js");
const {pointsHistory} = require("../models/points.js");


// index route
exports.usersIndex = async (req, res)=>{
    let allUsers = await User.find({});
    allUsers.sort((a, b)=>{
        return b.points - a.points;
    });
    res.render("users/index.ejs", {allUsers});
};

// new user form render
exports.newUsersForm = (req, res)=>{
     req.session.name = "om koli check";
   res.render("users/new.ejs");
}

//new user create ans save
exports.creatUser =   async (req, res)=>{
    let points = generatePoints();
    let user = new User(req.body.user);
    user.image = req.file.path;
    user.points = points;
    let savedUser = await user.save();
    let pointsHistory1 = new pointsHistory({points,  user: savedUser._id});
    await pointsHistory1.save();
    req.flash("success", "User Register Successfully...!");
    res.redirect("/users")
};

exports.editeUser = async (req, res)=>{
    let points = generatePoints();
    let user = await User.findById(req.params.userId);
    user.points = user.points+points;
    let pointsHistory1 = new pointsHistory({points,  user: user._id});
    await user.save();
    await pointsHistory1.save();
    req.flash("success", `Congratulations ${user.name} You Recive ${points} Points Successfully...!`);
    res.redirect("/users")
};

exports.showUsersCoinsHistory = async(req, res)=>{
    let totalPoints = await pointsHistory.find({user: req.params.userId}).populate("user");
    res.render("users/show.ejs", {totalPoints});
}