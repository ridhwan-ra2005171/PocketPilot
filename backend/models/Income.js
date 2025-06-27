const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},//user id
    icon: {type: String},
    source:{type: String, required: true},//source of income
    amount:{type: Number, required: true},//amount of income
    date:{type: Date, default: Date.now},//date of income
}, {timestamps: true});

module.exports = mongoose.model("Income", IncomeSchema);