import moment from "moment";
import { data } from "react-router-dom";

export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const  getInitials  = (name) => {
    if (!name) return "";

    const words = name.trim().split(" ");

    let initials = "";

    for (let i = 0 ; i < Math.min(words.length , 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
};


export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart , fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

    return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    :formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category : item?.category ,
        amount : item?.amount ,
    }));

    return chartData;
};


export const prepareIncomeBarChart = (data = []) => {
    const sortedData = [...data].sort((a , b) => new Date(a.date) - new Date(b.date))
    const chartData = sortedData.map((item) => ({
        month : moment(item?.date).format('Do MM YYYY') ,
        amount : item?.amount,
        source : item?.source
    }))

    return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a , b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month : moment(item?.date).format("Do MMM"),
        amount : item?.amount,
        category : item?.category,
    }));
    return chartData;
}