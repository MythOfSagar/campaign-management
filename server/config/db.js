require('dotenv').config()

const mongoose = require("mongoose");

mongoose.set('strictQuery', true)

const connection = mongoose.connect(process.env.dbUrl)

module.exports = { connection };