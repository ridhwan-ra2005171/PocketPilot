import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';
import moment from 'moment';

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);

      if (response.data) {
        
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch income details. Please try again", error);
    } finally {
      setLoading(false);
    }
  }



  //Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    //validation
    if (!source.trim()) {
      toast.error("Source field is required")
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be a valid number greater than 0")
      return;
    }

    if (!date) {
      toast.error("Date is required")
      return;
    }

    try {
      await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`, { source, amount, date, icon });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log("Failed to add income. Please try again", error.response?.data?.message || error.message
      );
    }

  }

  //Delete Income
  const handleDeleteIncome = async (incomeId) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(incomeId));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log("Failed to delete income. Please try again", error.response?.data?.message || error.message
      );
      toast.error("Failed to delete income. Please try again");
    }
  }

  //handle download income details (excel sheet)
  const handleDownloadIncomeDetails = async () => {
    const todayDate = moment().format('DD-MM-YYYY');
    try{
      const response = await axiosInstance.get(`${API_PATHS.INCOME.DOWNLOAD_INCOME}`, { responseType: 'blob' });

      //Create Url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `income_details_${todayDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Failed to download expense details. Please try again", error.response?.data?.message || error.message
      );
      toast.error("Failed to download expense details. Please try again");
    }
  }

  useEffect(() => {
    fetchIncomeDetails();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => { setOpenAddIncomeModal(true) }}
            />
          </div>

          {/* income List, the setOpenDeleteAlert gets boolean and incomeId*/}
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={OpenAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <div>
            {/* add income modal content */}
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </div>
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          {/* delete income modal content */}
          <DeleteAlert
            content = "Are you sure you want to delete this income? This action cannot be undone."
            onDelete = {() => handleDeleteIncome(openDeleteAlert.data)}
          />
          
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income