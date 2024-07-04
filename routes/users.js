var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect(process.env.DB_STRING);

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});

userSchema.plugin(plm);

module.exports = mongoose.model("user",userSchema);