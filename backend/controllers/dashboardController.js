
// const Income = require('../models/Income');
// const Expense = require('../models/Expense');
// const { isValidObjectId, Types } = require('mongoose');

// // dashboard Data
// exports.getDashboardData = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const userObjectId = new Types.ObjectId(String(userId));

//         // fetch total income and expense
//         const totalIncome = await Income.aggregate([
//             { $match: { userId: new Types.ObjectId(userId) } },
//             { $group: { _id: null, total: { $sum: "$amount" } } },
//         ]);

//         const totalExpense = await Expense.aggregate([
//             { $match: { userId: new Types.ObjectId(userId) } },
//             { $group: { _id: null, total: { $sum: "$amount" } } },
//         ]);

//         // get income transaction in the last 60 days
//         const last60DaysIncomeTransaction = await Income.find({
//             userId,
//             date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
//         }).sort({ date: -1 });

//         const incomeLast60Days = last60DaysIncomeTransaction.reduce(
//             (sum, transaction) => sum + transaction.amount,
//             0
//         );

//         // get expense transaction in the last 30 days
//         const last30DaysExpenseTransaction = await Expense.find({
//             userId,
//             date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
//         }).sort({ date: -1 });

//         const expenseLast30Days = last30DaysExpenseTransaction.reduce(
//             (sum, transaction) => sum + transaction.amount,
//             0
//         );

//         // last 5 income + expense transactions
//         const lastTransaction = [
//             ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map((txn) => ({
//                 ...txn.toObject(),
//                 type: "income",
//             })),
//             ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map((txn) => ({
//                 ...txn.toObject(),
//                 type: "expense",
//             })),
//         ].sort((a, b) => b.date - a.date);

//         // response
//         res.json({
//             totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
//             totalIncome: totalIncome[0]?.total || 0,
//             totalExpense: totalExpense[0]?.total || 0,
//             last30DaysExpenses: {
//                 total: expenseLast30Days,
//                 transactions: last30DaysExpenseTransaction,
//             },
//             last60DaysIncome: {
//                 total: incomeLast60Days,
//                 transactions: last60DaysIncomeTransaction,
//             },
//             recentTransaction: lastTransaction,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };




const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { Types } = require('mongoose');

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(userId);

        // Total Income & Expense
        const [totalIncomeResult, totalExpenseResult] = await Promise.all([
            Income.aggregate([
                { $match: { userId: userObjectId } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),
            Expense.aggregate([
                { $match: { userId: userObjectId } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ])
        ]);

        const totalIncome = totalIncomeResult[0]?.total || 0;
        const totalExpense = totalExpenseResult[0]?.total || 0;
        const totalBalance = totalIncome - totalExpense;

        // Dates
        // Accurate date calculations
        const now = new Date();
        const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);


        // Last 60 Days Income
        const last60DaysIncomeTransaction = await Income.find({
            userId: userObjectId,
            date: { $gte: sixtyDaysAgo }
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransaction.reduce(
            (sum, txn) => sum + Number(txn.amount),
            0
        );

        // Last 30 Days Expense
        const last30DaysExpenseTransaction = await Expense.find({
            userId: userObjectId,
            date: { $gte: thirtyDaysAgo }
        }).sort({ date: -1 });

        const expenseLast30Days = last30DaysExpenseTransaction.reduce(
            (sum, txn) => sum + Number(txn.amount),
            0
        );

        // Recent Transactions
        const lastTransaction = [
            ...(await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(txn => ({
                ...txn.toObject(),
                type: 'income'
            })),
            ...(await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(txn => ({
                ...txn.toObject(),
                type: 'expense'
            }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        // Response
        res.json({
            totalBalance,
            totalIncome,
            totalExpense,
            last30DaysExpenses: {
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransaction
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransaction
            },
            recentTransaction: lastTransaction
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
