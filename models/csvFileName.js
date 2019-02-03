const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const csvFileNameSchema = new Schema({
    fileName: {
        type: String,
        required: true
    }
});

const csvFileName = mongoose.model("csvFileName", csvFileNameSchema);

module.exports = csvFileName;
