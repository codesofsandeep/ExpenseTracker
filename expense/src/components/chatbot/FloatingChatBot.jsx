import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import ChatBot from "./ChatBot";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const FloatingChatBot = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Floating Bot Icon */}
            <div
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-105"
            >
                <div className="relative w-16 h-16">
                    {/* Radar Circle Animation */}
                    <span
                        className="absolute w-full h-full rounded-full"
                        style={{
                            animation: "pulse 2s infinite",
                            backgroundColor: "rgba(34,197,94,0.5)", // green-500 with opacity
                        }}
                    ></span>

                    {/* Modern Bot Icon Button */}
                    <div className="w-16 h-16 bg-gradient-to-tr from-green-400 via-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg border border-white z-10 relative transition-all ease-in-out duration-300 hover:scale-110">
                        <FaRobot className="text-white text-3xl" />
                    </div>
                </div>
            </div>

            {/* Chatbot Window */}
            {open && (
                <div className="fixed bottom-24 right-6 z-50 w-80 max-h-[500px] bg-white rounded-lg shadow-2xl overflow-hidden transition-all ease-in-out duration-300 transform scale-100">
                    <div className="flex flex-col h-full">
                        {/* Chatbot Header */}
                        <div className="flex items-center justify-between p-3 rounded-t-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white">
                            <span className="font-semibold ">Chatbot</span>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-white hover:bg-green-700 p-1 rounded-full"
                            >
                                X
                            </button>
                        </div>
                        {/* ChatBot Component */}
                        <ChatBot onSend={handleUserQuery} />
                    </div>
                </div>
            )}

            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar />
        </>
    );
};

// Fake handler for now — connect your API later
const handleUserQuery = async (query, callback) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            "http://localhost:8000/api/chatbot",
            { query },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const reply = response.data.reply || "I didn't get that.";

        // Display toast on success
        if (reply.includes('added')) {
            toast.success(reply);  // Show success toast
        } else {
            toast.error(reply);  // Show error toast if something goes wrong
        }

        callback(reply);
    } catch (err) {
        console.error("Chatbot error:", err);
        toast.error("Sorry, something went wrong.");
        callback("Sorry, something went wrong.");
    }
};

export default FloatingChatBot;
