import React, { useState } from 'react'
import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense }) => {

    const [income, setIncome] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });


    const [loading, setLoading] = useState(false);
    const [ocrProgress, setOcrProgress] = useState(0); // Define OCR progress state
    const [ocrText, setOcrText] = useState(""); // Define OCR text state
    // Handle OCR receipt upload
    const handleReceiptUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setOcrProgress(0);
        setOcrText("");

        const formData = new FormData();
        formData.append("receipt", file);

        try {
            const res = await fetch("http://localhost:8000/api/v1/ocr/scan-receipt", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (res.ok) {
                const fullText = data.fullText || "";

                // Extract final TOTAL amount
                const totalMatches = fullText.match(/Total\s*\$?(\d+(?:\.\d{1,2})?)/gi);
                const extractedAmount = totalMatches
                    ? totalMatches[totalMatches.length - 1].match(/(\d+(?:\.\d{1,2})?)/)[1]
                    : "";

                // Extract date
                const dateMatch = fullText.match(/Date:\s*([A-Za-z]+\s\d{1,2},\s\d{4})/i);
                const rawDate = dateMatch ? new Date(dateMatch[1]) : null;
                const formattedDate = rawDate ? rawDate.toISOString().split("T")[0] : "";

                // Smart category detection
                let category = "Scanned Receipt";
                if (/grocery|milk|vegetables/i.test(fullText)) category = "Groceries";
                else if (/office|stationery|paper|chair|desk/i.test(fullText)) category = "Office Supplies";
                else if (/pizza|burger|restaurant|meal|food/i.test(fullText)) category = "Food";
                else if (/uber|taxi|fuel|petrol|bus|train/i.test(fullText)) category = "Transport";
                else if (/rent|lease|apartment/i.test(fullText)) category = "Rent";
                else if (/movie|netflix|cinema|theatre|entertainment/i.test(fullText)) category = "Entertainment";
                else if (/pharmacy|medicine|tablet|capsule/i.test(fullText)) category = "Medical";

                // Icon mapping
                const iconMap = {
                    "Groceries": "🛒",
                    "Office Supplies": "📎",
                    "Food": "🍔",
                    "Transport": "🚗",
                    "Rent": "🏠",
                    "Entertainment": "🎬",
                    "Medical": "💊",
                    "Scanned Receipt": "🧾"
                };

                const selectedIcon = iconMap[category] || "";


                setIncome((prev) => ({
                    ...prev,
                    amount: extractedAmount || prev.amount,
                    date: formattedDate || prev.date,
                    category: category || prev.category,
                }));

                setOcrText(fullText);
            } else {
                alert(data.message || "Failed to scan receipt");
            }
        } catch (err) {
            console.error(err);
            alert("Error while scanning receipt");
        } finally {
            setLoading(false);
        }


        
    };



    // Track OCR progress updates
    const handleOcrProgress = (progress) => {
        setOcrProgress(progress);
    };

    // Display OCR result once complete
    // const handleOcrResult = (text) => {
    //     setOcrText(text);
    // };
    //      

    const handleChange = (key, value) => setIncome({ ...income, [key]: value });

    return (
        <div className="space-y-5 p-4 rounded-xl bg-white shadow-lg">

            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <div>
                <label className="block text-sm font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text mb-1">
                    Upload Receipt (OCR)
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleReceiptUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                {loading && <p className="text-purple-500 text-sm mt-1">Scanning receipt... Progress: {Math.round(ocrProgress * 100)}%</p>}
                {/* {ocrText && <p className="text-green-500 mt-2">OCR Text: {ocrText}</p>} */}
            </div>

            <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
                <p className="mx-4 text-red-500 font-semibold text-sm sm:text-base">OR</p>
                <div className="flex-grow h-px bg-gradient-to-r from-red-500 via-pink-500 to-purple-400"></div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expense Source
                </label>
                <input
                    value={income.category}
                    onChange={({ target }) => handleChange("category", target.value)}
                    placeholder="Rent, Groceries, Food, etc."
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                </label>
                <input
                    value={income.amount}
                    onChange={({ target }) => handleChange("amount", target.value)}
                    placeholder="Enter amount"
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                </label>
                <input
                    value={income.date}
                    onChange={({ target }) => handleChange("date", target.value)}
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="button"
                    onClick={() => onAddExpense(income)}
                    className=" cursor-pointer  relative group inline-flex items-center justify-center px-6 py-2 font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md transition-all duration-300 ease-in-out 
                    hover:scale-105 hover:shadow-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none overflow-hidden"
                >
                    <span className="absolute inset-0 transition-opacity bg-white opacity-0 group-hover:opacity-5"></span>
                    <span className="z-10">Add Expense</span>
                </button>
            </div>
        </div>
    );
};


export default AddExpenseForm




