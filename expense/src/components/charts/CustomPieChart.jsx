// CustomPieChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CustomTooltip from '../charts/CustomTooltip';
import CustomLegend from '../charts/CustomLegend';

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {

    console.log("Pie Chart Data:", data);

    return (
        <div className="relative flex flex-col items-center justify-center h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        innerRadius={100}
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>

                    <Tooltip content={CustomTooltip} />
                    <Legend content={CustomLegend} />
                </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            {showTextAnchor && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-sm text-gray-500">{label}</div>
                    <div className="text-xl font-bold text-gray-900">{totalAmount}</div>
                </div>
            )}
        </div>
    );

};

export default CustomPieChart;
