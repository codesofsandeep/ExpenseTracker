import React, { useEffect, useState } from 'react';
import {prepareExpenseBarChartData} from '../../utils/Helper';
import CustomBarChart from '../../components/charts/CustomBarChart';


const Last30DaysTransaction = ( {data} ) => {

    const [chartData , setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        console.log("📊 Final Chart Data:", result);
        setChartData(result);
    }, [data])
    

    return (
        <div className=' card col-span-1 '>
            <div className=' flex items-center justify-between'>
                <h5 className=' text-lg'>Last 30 Days Expenses</h5>
            </div>

            <CustomBarChart chartData={chartData} />

        </div>
    )
}

export default Last30DaysTransaction
