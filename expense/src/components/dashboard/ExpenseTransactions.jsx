import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from './TransactionInfoCard';
import moment from "moment";

const ExpenseTransactions = ({ transactions = [], recentTransactions = [], onSeeMore }) => {
    const expenseList = [
        ...(transactions || []),
        ...(recentTransactions || [])
    ].filter(txn => txn?.type === "expense");

    const sortedExpenses = expenseList.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Expenses</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>

            <div className='mt-6'>
                {sortedExpenses.slice(0, 5).map((expense) => (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category || expense.source || "Unknown"}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        hideDeleteBtn
                    />
                ))}
                {sortedExpenses.length === 0 && (
                    <p className="text-sm text-gray-500">No expense transactions found.</p>
                )}
            </div>
        </div>
    );
};

export default ExpenseTransactions;
