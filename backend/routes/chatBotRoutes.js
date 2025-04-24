const express = require('express');
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { getTotalBalance, getTotalIncome, getTotalExpenses, getRecentExpense, addNewExpense, addNewIncome } = require('../services/financeService'); // Custom service


// In your chatbot route
router.post('/', protect, async (req, res) => {
    const { query } = req.body;
    let reply = "I didn't understand that.";
    const userId = req.user.id; // Get user ID from authenticated request

    try {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes("balance")) {
            const totalBalance = await getTotalBalance(userId);
            reply = `Your current balance is ₹${totalBalance}.`;
        } else if (lowerQuery.includes("total income")) {
            const totalIncome = await getTotalIncome(userId);
            reply = `Your total income is ₹${totalIncome}.`;
        } else if (lowerQuery.includes("total expenses")) {
            const totalExpenses = await getTotalExpenses(userId);
            reply = `Your total expenses are ₹${totalExpenses}.`;
        } else if (lowerQuery.includes("recent expense")) {
            const recentExpense = await getRecentExpense(userId);
            reply = `Your last expense was ₹${recentExpense.amount} on ${recentExpense.category}.`;
        
        } else if (/add expense of (\d+)(?: for (\w+))?/i.test(lowerQuery)) {
            const match = lowerQuery.match(/add expense of (\d+)(?: for (\w+))?/i);
            const amount = parseFloat(match[1]);
            const category = match[2] || "Miscellaneous";
            const newExpense = await addNewExpense(amount, category, userId); // Pass userId
            reply = `Expense of ₹${newExpense.amount} for "${newExpense.category}" added.`;
        } else if (/add income of (\d+)(?: from (\w+))?/i.test(lowerQuery)) {
            const match = lowerQuery.match(/add income of (\d+)(?: from (\w+))?/i);
            const amount = parseFloat(match[1]);
            const source = match[2] || "General";
            const newIncome = await addNewIncome(source, amount, userId); // Pass userId
            reply = `Income of ₹${newIncome.amount} from "${newIncome.source}" added.`;
        } else {
            reply = `I'm sorry, I couldn't understand your request. Try asking about balance, total income, total expenses, recent expense, or add income/expense.`;
        }
        res.json({ reply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ reply: "Sorry, something went wrong." });
    }
});
module.exports = router;