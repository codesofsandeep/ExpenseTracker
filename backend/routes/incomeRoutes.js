const express = require('express');

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require('../controllers/incomeController');

const {protect} = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/add" , protect , addIncome);  // add income
router.get("/get" , protect , getAllIncome); //get all income
router.delete("/:id", protect, deleteIncome); // delete income
router.get("/downloadexcel" , protect , downloadIncomeExcel); // download income



module.exports = router;   