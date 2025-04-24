const express = require('express');

const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require('../controllers/expenseController');

const {protect} = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/add" , protect , addExpense);  // add expense
router.get("/get" , protect , getAllExpense); //get all  expense
router.delete("/:id", protect, deleteExpense); // delete  expense
router.get("/downloadexcel" , protect , downloadExpenseExcel); // download  expense



module.exports = router;



 