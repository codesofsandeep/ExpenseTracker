import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/overview/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/layouts/Modal';
import AddIncomeForm from '../../components/overview/AddIncomeForm';
import { toast } from 'react-hot-toast';
import IncomeList from '../../components/overview/IncomeList';
import DeleteAlert from '../../components/alert/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

function Income() {

    useUserAuth();

    //
    

    //

    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

    // Get All Income Details
    const fecthIncomeDetails = async () => {

        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);

            if (response.data) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.log("Something Went Wrong", error);
        } finally {
            setLoading(false);
        }
    };

    // handle Add Income
    const handleAddIncome = async (income) => {
        const { source, amount, date, icon } = income

        // validation 
        if (!source.trim()) {
            toast.error("Source is required", {
                duration: 3000,
            });
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) < 0) {
            toast.error("Amount Should be a valid number greater than 0.", {
                duration: 3000,
            });
            return;
        }

        if (!date) {
            toast.error("Date is required", {
                duration: 3000,
            });
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                source,
                amount,
                date,
                icon,
            });

            fecthIncomeDetails();

            setOpenAddIncomeModal(false);
            toast.success("Income added successfully!", {
                duration: 4000,
            });

        } catch (error) {
            console.error("Error adding income", error.response?.date?.message || error.message);
        }
    };

    // delete Income 
    const deleteIncome = async (id) => {

        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
            setOpenDeleteAlert({ show: false, data: null })
            toast.success("Income details deleted successfully", {
                duration: 5000,
            });

            fecthIncomeDetails();
        } catch (error) {
            console.error(
                "Error Deleting income", error.response?.data?.message || error.message
            );
        }
    };

    // download income
    const handleDownloadIncome = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "income_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Downloading");
        } catch (error) {
            console.error("Error downloading income details", error);
            toast.error("Failed to download");
        }
    };

    useEffect(() => {
        fecthIncomeDetails();

        return () => { }
    }, [])



    return (
        <DashboardLayout activeMenu="Income">
            <div className='my-5 mx-auto'>
                <div className=' grid grid-cols-1 gap-6'>
                    <div className=' '>


                        
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>

                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({ show: true, data: id })
                        }}
                        onDownload={handleDownloadIncome}
                    />

                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <div>
                        <AddIncomeForm onAddIncome={handleAddIncome} />
                    </div>
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
                        onDelete={() => deleteIncome(openDeleteAlert.data)}
                    />
                </Modal>

            </div>
        </DashboardLayout>
    )
}

export default Income
