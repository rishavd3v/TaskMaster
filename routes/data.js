const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: String,
    description: String,
    date: Date,
    priority: String,
    isCompleted: { type: Boolean, default: false }
});


module.exports = mongoose.model("task",taskSchema);