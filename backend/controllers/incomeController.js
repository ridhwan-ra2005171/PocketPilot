const xlsx = require("xlsx");
const Income = require("../models/Income");


//add income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const{icon, source, amount, date} = req.body;

        //validation
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income ({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (err) {
        res.status(500).json({ message: "Error adding income", error: err.message });
    }
};

//get all income sources
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({userId}).sort({date: -1});
        res.json(income);
    } catch (err) {
        res.status(500).json({ message: "Error getting income", error: err.message });
    }
};

//delete income source
exports.deleteIncome = async (req, res) => {
    const userId = req.user.id;
    
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting income", error: err.message });
    }
};

//download excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({userId}).sort({date: -1});

        //prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download("income_details.xlsx");
        
    } catch (err) {
        res.status(500).json({ message: "Error downloading excel", error: err.message });
    }
};