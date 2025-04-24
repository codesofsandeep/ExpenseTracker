// financeService.js

const Expense = require('../models/Expense');
const Income = require('../models/Income');



const addNewExpense = async (amount, category, userId) => {
    const expense = new Expense({
        amount,
        category,
        userId, // Make sure this is included
        date: new Date()
    });
    await expense.save();
    return expense;
};

const addNewIncome = async (source, amount, userId) => {
    const income = new Income({
        source,
        amount,
        userId, // Make sure this is included
        date: new Date()
    });
    await income.save();
    return income;
};



module.exports = {
   
    addNewExpense,
    addNewIncome
};
  