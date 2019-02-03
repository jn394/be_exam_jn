const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const csvDataSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        first: { type: String, required: true },
        middle: { type: String, required: false },
        last: { type: String, required: true }
    },
    phone: {
        type: String,
        required: true
    }
});

const csvData = mongoose.model("csvData", csvDataSchema);

module.exports = csvData;
