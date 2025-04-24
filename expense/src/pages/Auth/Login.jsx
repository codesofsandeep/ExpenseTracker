import React, { useState, useContext } from "react";
import AuthLayouts from "../../components/layouts/AuthLayouts";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { validateEmail } from "../../utils/Helper";
import axiosInstance from '../../utils/axiosInstance';
import {API_PATHS} from '../../utils/apiPaths';
import UserContext from "../../context/UserContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showpassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            console.error("Invalid email format:", email);
            return;
        }

        if (!password) {
            setError("Please enter the password.");
            return;
        }

        if (password.length < 8) {
            setError("Password should have at least 8 characters.");
            return;
        }

        console.log("Email and Password are valid:", email, password);

        // Login API call

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went worng. Please try again");
            }
        }
    };

    const togglePasswordVisibility = (e) => {
        setShowPassword(prevState => !prevState);
    }

    return (
        <AuthLayouts>
            <div className="flex justify-center items-center w-full">
                <div className="bg-white p-8 rounded-xl shadow-lg w-96 flex flex-col items-center">
                    <h2 className="text-gray-800 text-2xl font-semibold mb-6">Welcome Back</h2>
                    <p className="text-gray-600 text-[17px] mb-6 font-semibold ">Log In</p>

                    {/* Input Fields */}
                    <form onSubmit={handleLogin} className="w-full">
                        <div className="w-full mb-4 relative">
                            <input
                                type="text"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-5 p-3 rounded-lg text-[14px] bg-gray-100 text-gray-800 outline-none border border-gray-300 focus:border-purple-500"
                                required
                            />

                            <span className="absolute right-8 top-3 cursor-pointer text-gray-500">
                                <FaUser className="absolute top-1 text-gray-400" />
                            </span>
                        </div>


                        <div className="w-full mb-4 relative">
                            <input
                                type={showpassword ? "text" : "password"}
                                placeholder="Min 8 Characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-5 p-3  rounded-lg text-[14px] bg-gray-100 text-gray-800 outline-none border border-gray-300 focus:border-purple-500"
                                required
                            />
                            <span className="absolute right-4 top-4 cursor-pointer text-gray-500" onClick={togglePasswordVisibility}>
                                {showpassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                        {/* Displaying Error Message Here */}
                        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

                        {/* Login Button */}
                        <button type="submit" className="w-full p-3 rounded-lg text-white bg-purple-500 cursor-pointer hover:bg-white hover:text-purple-500 border border-purple-500 font-semibold transition-all duration-300 ease-in-out delay-150">
                            Login
                        </button>
                    </form>

                    <p className="text-gray-600 text-sm mt-4 cursor-pointer hover:text-red-600 hover:underline">
                        Forgot Password?
                    </p>

                    <p className="text-gray-600 text-sm mt-2">
                        Don't have an account? <span className="text-purple-500 cursor-pointer hover:underline hover:text-purple-900"><Link to="/signup">Sign up</Link></span>
                    </p>
                </div>
            </div>
        </AuthLayouts>
    );
}

export default Login;