const express = require("express");
const router = express.Router();
const {usersIndex, newUsersForm, creatUser, editeUser, showUsersCoinsHistory} = require("../controller/user.js");
const multer  = require('multer')
const {storage} = require("../cloudinary.js");
const upload = multer({ storage });

router.route("/")
.get(usersIndex)
.post(upload.single("user[image]"), creatUser);

router.route("/new")
.get(newUsersForm)

router.route("/:userId/edit")
.get(editeUser);

router.route("/:userId/show")
.get(showUsersCoinsHistory)

module.exports = {userRouter: router};