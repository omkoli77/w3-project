const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
};

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "w3",
        allowedFormates: ['jpeg', "jpg", "png"]
    }
});