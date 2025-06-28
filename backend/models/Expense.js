const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, //user id
    icon: { type: String },
    category: { type: String, required: true },
    amount: { type: Number, required: true }, //amount of income
    date: { type: Date, default: Date.now }, //date of income
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
