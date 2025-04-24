import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import expenseimg from '../../../src/assets/images/expensetracker.png';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import SignUp from '../../pages/Auth/SignUp';



export default function LandingPage() {
    const navigate = useNavigate();

    const [showSignup, setShowSignup] = useState(false);

    const handleGetStarted = () => {
        setShowSignup(true); 
        navigate('/signup')
    };


    return (
        
        <div className="min-h-screen bg-white text-gray-800">
            <nav className="flex items-center justify-between px-6 py-4 shadow-md sticky top-0 z-50 backdrop-blur-md bg-white/70 transition duration-500">
                <div className="text-2xl font-bold text-purple-700">ExpenseTracker</div>
                <div className="space-x-6">
                    <a href="#features" className="hover:text-purple-700 transition duration-300">Features</a>
                    <a href="#snapshot" className="hover:text-purple-700 transition duration-300">Snapshots</a>
                    <a href="/login" className="hover:text-purple-700 transition duration-300">Login</a>
                    <button
                        onClick={() => navigate('/signup')}
                        className="bg-purple-700 hover:bg-white hover:text-purple-700 border border-purple-700 text-white px-4 py-2 rounded-xl transition duration-300 cursor-pointer"
                    >
                        Sign Up
                    </button>
                </div>
            </nav>

            <main className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-10 bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Track, Chat, Upload & Manage Finances</h1>
                    <p className="text-lg mb-6 text-gray-600">
                        Experience the smartest way to handle your income and expenses. Upload receipts using OCR, interact with a chatbot, and visualize your finances using beautiful charts.
                    </p>
                    <button
                        onClick={handleGetStarted}
                        // onClick={() => navigate('/signup')}
                        className="bg-purple-700 hover:bg-white hover:text-purple-700 border border-purple-700 text-white px-6 py-3 text-lg rounded-xl transition-all duration-500 transform cursor-pointer"
                    >
                        Get Started
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="flex justify-center"
                >
                    <img src={expenseimg} alt="Dashboard preview" className="rounded-2xl shadow-lg w-full max-w-md" />
                </motion.div>
            </main>
            {/* Conditionally render Signup Page with smooth effect */}
            {showSignup && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 bg-white z-50 flex justify-center items-center"
                >
                    <SignUp /> {/* Render the SignUp form */}
                </motion.div>
            )}

            <section id="features" className="scroll-mt-24 px-10 py-16 bg-white">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Awesome Features
                </h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >

                    {[
                        { title: "OCR Receipt Upload", text: "Upload your receipts and auto-fill expense data using OCR technology." },
                        { title: "AI Chatbot Assistant", text: "Talk to our smart chatbot to add, delete, and inquire about your finances." },
                        { title: "Add & Delete Transactions", text: "Easily manage your income and expenses with intuitive controls." },
                        { title: "Download Reports", text: "Export your income and expenses in Excel format for offline use." },
                        { title: "Analytics with Charts", text: "Visualize your spending habits using real-time pie and bar charts." },
                        { title: "Auth & Security", text: "Securely log in, register, and manage sessions with authentication." },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="p-6 border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-102"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7, delay: index * 0.2 }}
                        >

                            <h3 className="text-2xl font-medium mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-teal-500">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-base">{feature.text}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <section id="snapshot" className="scroll-mt-24 py-16 px-6 sm:px-12 bg-gradient-to-br from-white to-purple-50">

                <motion.h2
                    className="text-3xl font-bold text-center text-purple-800 mb-18"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >

                    Financial Snapshot
                </motion.h2>

                {/* Summary Progress Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    {[
                        {
                            label: 'Budget Utilization',
                            value: 70,
                            color: 'bg-gradient-to-r from-green-400 to-green-600',
                            description: 'You’ve used 70% of your monthly budget.',
                        },
                        {
                            label: 'Savings Goal',
                            value: 45,
                            color: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
                            description: '45% of your goal reached. Keep saving!',
                        },
                        {
                            label: 'Debt Clearance',
                            value: 85,
                            color: 'bg-gradient-to-r from-red-400 to-red-600',
                            description: 'Almost there! 85% of debts cleared.',
                        },
                    ].map(({ label, value, color, description }, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{label}</h3>
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                                <div
                                    className={`h-3 rounded-full ${color}`}
                                    style={{ width: `${value}%`, transition: 'width 0.6s ease-in-out' }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600">{description}</p>
                            <p className="text-sm text-purple-800 mt-1 font-bold">{value}%</p>
                        </motion.div>
                    ))}
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
                    {[
                        { title: 'Today\'s Spend', value: '$1,250', icon: '🧾' },
                        { title: 'Top Expense Category', value: 'Groceries', icon: '🛒' },
                        { title: 'Transactions This Month', value: '46', icon: '🔄' },
                    ].map(({ title, value, icon }, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white p-5 rounded-xl flex items-center gap-4 shadow-md hover:shadow-lg transition"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-3xl">{icon}</div>
                            <div>
                                <h4 className="text-md font-medium text-gray-700">{title}</h4>
                                <p className="text-xl font-bold text-purple-900">{value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Highlights */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-14 w-full">
                    <h3 className="text-xl font-semibold text-purple-800 mb-6">📌 Recent Highlights</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            {
                                title: 'Paid Rent',
                                amount: '- ₹1,800',
                                date: 'April 10, 2025',
                                icon: '🏠',
                                type: 'expense',
                            },
                            {
                                title: 'Salary Credited',
                                amount: '+ ₹12,000',
                                date: 'April 1, 2025',
                                icon: '💼',
                                type: 'income',
                            },
                            {
                                title: 'Electricity Bill',
                                amount: '- ₹650',
                                date: 'April 5, 2025',
                                icon: '💡',
                                type: 'expense',
                            },
                            {
                                title: 'Transferred to Savings',
                                amount: '- ₹5,000',
                                date: 'April 8, 2025',
                                icon: '🏦',
                                type: 'transfer',
                            },
                        ].map(({ title, amount, date, icon, type }, idx) => (
                            <motion.div
                                key={idx}
                                className="flex items-center justify-between bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-2xl">{icon}</div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
                                        <p className="text-xs text-gray-500">{date}</p>
                                    </div>
                                </div>
                                <div
                                    className={`text-sm font-bold ${type === 'income'
                                        ? 'text-green-600'
                                        : type === 'expense'
                                            ? 'text-red-600'
                                            : 'text-blue-600'
                                        }`}
                                >
                                    {amount}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mini Chart Gallery */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto mb-14">
                    {[
                        { src: '../../../src/assets/images/spending.png', label: 'Spending Trends' },
                        { src: '../../../src/assets/images/growth.png', label: 'Income Growth' },
                        { src: '../../../src/assets/images/budget.png', label: 'Expense Breakdown' },
                        { src: '../../../src/assets/images/utilization.png', label: 'Budget Utilization' },
                    ].map(({ src, label }, i) => (
                        <motion.div
                            key={i}
                            className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition text-center"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src={src}
                                alt={label}
                                className="w-full h-24 object-contain mb-2"
                            />
                            <p className="text-sm text-gray-600">{label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Financial Tips/Insights */}
                <div className="relative max-w-4xl mx-auto bg-gradient-to-br from-purple-100 to-purple-200 p-6 sm:p-8 rounded-2xl shadow-lg mb-10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-300 via-transparent to-pink-200 opacity-20 pointer-events-none animate-pulse"></div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <div className="text-4xl sm:text-5xl text-yellow-500 animate-bounce">💡</div>
                        <div>
                            <h4 className="text-xl sm:text-2xl font-bold text-purple-900 mb-1">Money Tip of the Day</h4>
                            <p className="text-gray-700 leading-relaxed">
                                Small expenses matter more than you think. That daily coffee? It adds up. Budget for everything—even the little things!
                            </p>
                        </div>
                    </div>
                </div>
            </section>




            <footer className="bg-gray-900 text-gray-200 py-10 px-4 sm:px-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">ExpenseTracker</h4>
                        <p className="text-gray-400">Track, manage, and plan your finances effortlessly. Your smart companion for budgeting.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#features" className="hover:underline hover:text-white">Features</a></li>
                            <li><a href="#pricing" className="hover:underline hover:text-white">Pricing</a></li>
                            <li><a href="#snapshot" className="hover:underline hover:text-white">Snapshots</a></li>
                            <li><a href="#contact" className="hover:underline hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <p className="text-gray-400">Email: support@expensetracker.com</p>
                        <p className="text-gray-400">Phone: +1 234 567 890</p>
                        <p className="text-gray-400">Location: Remote Worldwide</p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-4 text-lg">
                            <a
                                href="https://twitter.com/your_username"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition"
                                aria-label="Twitter"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="https://facebook.com/your_username"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition"
                                aria-label="Facebook"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="https://instagram.com/your_username"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink-500 transition"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://linkedin.com/in/your_username"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-500 transition"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn />
                            </a>

                            <a
                                href="https://wa.me/yourphonenumber"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-green-500 transition"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp />
                            </a>

                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
                    © 2025 ExpenseTracker. All rights reserved.
                </div>
            </footer>

        </div>
        
    );
}
