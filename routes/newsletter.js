const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const letterSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId},
    email: String
});

module.exports = mongoose.model("letter",letterSchema);