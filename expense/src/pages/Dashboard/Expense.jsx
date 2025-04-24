import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import ExpenseOverview from '../../components/overview/ExpenseOverview';
import AddExpenseForm from '../../components/overview/AddExpenseForm';
import Modal from '../../components/layouts/Modal';
import ExpneseList from '../../components/overview/ExpneseList';
import DeleteAlert from '../../components/alert/DeleteAlert';


function Expense() {

    useUserAuth();


    const [expenseData, setExpenseData] = useState([])
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);


    // Get All expense Details
    const fecthExpenseDetails = async () => {

        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);

            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.log("Something Went Wrong", error);
        } finally {
            setLoading(false);
        }
    };

    // handle Add Expense
    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;

        // validation 
        if (!category.trim()) {
            toast.error("Category is required", { duration: 3000 });
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) < 0) {
            toast.error("Amount should be a valid number greater than 0.", { duration: 3000 });
            return;
        }

        if (!date) {
            toast.error("Date is required", { duration: 3000 });
            return;
        }

        try {
            const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon,
            });

            // Assuming the API returns the newly added expense in response.data
            if (response.data) {
                // Optimistically update the UI with the new expense data
                setExpenseData(prevState => [
                    ...prevState,
                    response.data, // This should be the newly added expense from the API
                ]);

                fecthExpenseDetails(); // Refresh the expense details

                setOpenAddExpenseModal(false);
                toast.success("Expense added successfully!", { duration: 4000 });
            }
        } catch (error) {
            console.error("Error adding expense", error.response?.data?.message || error.message);
        }
    };

    // delete expense 
    const deleteExpense = async (id) => {

        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
            setOpenDeleteAlert({ show: false, data: null })
            toast.success("Expense details deleted successfully", {
                duration: 5000,
            });

            fecthExpenseDetails();
        } catch (error) {
            console.error(
                "Error Deleting expense", error.response?.data?.message || error.message
            );
        }
    };

    // download expense
    const handleDownloadExpense = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "expense_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Downloading");
        } catch (error) {
            console.error("Error downloading expense details", error);
            toast.error("Failed to download");
        }
    };



    useEffect(() => {
        fecthExpenseDetails();

        return () => { };
    }, []);

    return (

        <DashboardLayout activeMenu="Expense">
            <div className='my-5 mx-auto'>
                <div className=' grid grid-cols-1 gap-6'>
                    <div className=' '>



                        <ExpenseOverview
                            transactions={expenseData}
                            onExpenseIncome={() => setOpenAddExpenseModal(true)}
                        />
                    </div>

                    <ExpneseList
                        transactions={expenseData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({ show: true, data: id });
                        }}
                        onDownload={handleDownloadExpense}
                    />

                </div>

                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense} />
                </Modal>

                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete Income"
                >
                    <DeleteAlert
                        content={
                            <div className="text-sm sm:text-base font-medium text-gray-700">
                                Are you sure you want to permanently delete this income record?
                                <span className="text-red-600 font-semibold"> This action cannot be undone.</span>
                            </div>
                        }
                        onDelete={() => deleteExpense(openDeleteAlert.data)}
                    />
                </Modal>


            </div>
        </DashboardLayout>
    )
}

export default Expense





