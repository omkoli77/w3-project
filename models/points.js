const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointsSchema = Schema({
    points: {
        type: String,
        required: true,
        min: 1,
        max: 10
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    createdAt: {
        type: String,
        default : Date().toString().slice(4, 21) 
    }
})

exports.pointsHistory = mongoose.model("Point", pointsSchema);