const xlsx = require("xlsx");
const Expense = require("../models/Expense");


//add expense category
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const{icon, category, amount, date} = req.body;

        //validation
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense ({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ message: "Error adding expense", error: err.message });
    }
};

//get all expense
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    } catch (err) {
        res.status(500).json({ message: "Error getting expense", error: err.message });
    }
};

//delete expense
exports.deleteExpense = async (req, res) => {
    const userId = req.user.id;
    
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "expense deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting expense", error: err.message });
    }
};

//download excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({date: -1});

        //prepare data for excel
        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "expense");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download("expense_details.xlsx");
        
    } catch (err) {
        res.status(500).json({ message: "Error downloading excel", error: err.message });
    }
};