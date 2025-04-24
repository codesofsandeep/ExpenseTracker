import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import InfoCard from '../../components/cards/InfoCard';
import { LuCircleDollarSign, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';
import { addThousandsSeparator } from '../../utils/Helper';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import FinanceOverview from '../../components/dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/dashboard/ExpenseTransactions';
import Last30DaysTransaction from '../../components/dashboard/Last30DaysTransaction';
import RecentIncomeWithChart from '../../components/dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/dashboard/RecentIncome';


function Home() {
    useUserAuth();

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
            let data = response.data;

            // 🛠️ Fallback Calculation for totalExpense if it's 0 or undefined
            if (!data.totalExpense || data.totalExpense === 0) {
                const expenseTransactions = data.recentTransaction?.filter(txn => txn.type === "expense");
                const totalExpenseFallback = expenseTransactions?.reduce((sum, txn) => sum + txn.amount, 0);
                data.totalExpense = totalExpenseFallback || 0;
            }

            //  also calculate correct totalBalance
            data.totalBalance = data.totalIncome - data.totalExpense;

            setDashboardData(data);
        } catch (error) {
            console.log("Something went wrong. Please try again");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchDashboardData();
        return () => {
        }
    }, [])

    console.log("dashboardData.last30DaysExpenses.transactions: ", dashboardData?.last30DaysExpenses?.transactions);

    console.log("Dashboard API response:", dashboardData);

    return (
        <DashboardLayout activeMenu="Dashboard" >
            <div className='my-5 mx-auto'>

                <div className=' grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <InfoCard
                        icon={<IoMdCard />}
                        label="Total Balance"
                        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color="bg-primary"
                    />

                    <InfoCard
                        icon={<LuWalletMinimal />}
                        label="Total Income"
                        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color="bg-orange-500"
                    />

                    <InfoCard
                        icon={<LuCircleDollarSign />}
                        label="Total Expense"
                        value={addThousandsSeparator((dashboardData?.totalExpense || 0).toFixed(2))}
                        color="bg-red-500"
                    />
                </div>

                <div className=' grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <RecentTransactions
                        transactions={dashboardData?.recentTransaction}
                        onSeeMore={() => navigate("/expense")}
                    />

                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpense || 0}
                    />

                    <ExpenseTransactions
                        recentTransactions={dashboardData?.recentTransaction || []}
                        onSeeMore={() => navigate("/expense")}
                    />

                    <Last30DaysTransaction
                        data={dashboardData?.last30DaysExpenses?.transactions || []}
                    />

                    <RecentIncomeWithChart
                        data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
                        totalIncome={dashboardData?.totalIncome || 0}
                    />

                    <RecentIncome
                        transactions={dashboardData?.last60DaysIncome?.transactions || []}
                        onSeeMore={() => navigate("/income")}
                    />

                </div>
            </div>
        </DashboardLayout>
    )
}

export default Home