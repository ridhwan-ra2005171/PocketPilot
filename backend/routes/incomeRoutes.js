const express = require("express");

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.delete("/delete/:id", protect, deleteIncome);
router.get("/downloadExcel", protect, downloadIncomeExcel);

module.exports = router;