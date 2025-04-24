import React, { useState , useEffect } from "react";
import { useContext } from "react";
import AuthLayouts from "../../components/layouts/AuthLayouts";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";
import { validateEmail } from "../../utils/Helper";
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from "../../context/UserContext";
import uploadImage from '../../utils/uploadImage';



function SignUp() {

    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showpassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null);

    


    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    // signup function
    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageURL = "";

        if (!fullName) {
            setError("Please enter your name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address")
            return;
        }

        if (password.length < 8) {
            setError("Password should have at least 8 characters.");
            return;
        }

        console.log("Full Name, Email, and Password are valid:", fullName, email, password);
        setError("");

        // sign Up API call

        try {

            // upload image if present

            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageURL = imgUploadRes.imageUrl || "";
            };

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageURL,
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate('/dashboard')
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. please try again")
            }
        }
    };

    // password visibility
    const togglePasswordVisibility = (e) => {
        setShowPassword(prevState => !prevState);
    }


    return (
        <AuthLayouts>
           
                <div className="flex justify-center items-center w-full">
                    <div className="bg-white p-8 rounded-xl shadow-lg w-96 flex flex-col items-center">
                        <h2 className="text-gray-800 text-2xl font-semibold mb-6">Create Account</h2>

                        {/* Input Fields */}
                        <form className="w-full" onSubmit={handleSignUp}>

                            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                            <div className="w-full mb-4 relative">
                                <input
                                    type="text"
                                    placeholder="john"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-5 p-3 rounded-lg text-[14px] bg-gray-100 text-gray-800 outline-none border border-gray-300 focus:border-purple-500"
                                    required
                                />

                                <span className="absolute right-8 top-3 cursor-pointer text-gray-500">
                                    <FaUser className="absolute top-1 text-gray-400" />
                                </span>
                            </div>

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
                                    <FaEnvelope className="absolute top-1 text-gray-400" />
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
                                Create Account
                            </button>
                        </form>

                        <p className="text-gray-600 text-sm mt-4 cursor-pointer hover:text-red-600 hover:underline">
                            Forgot Password?
                        </p>

                        <p className="text-gray-600 text-sm mt-2">
                            Already have an account? <span className="text-purple-500 cursor-pointer hover:underline hover:text-purple-900"><Link to="/login">Login</Link></span>
                        </p>
                    </div>
                </div>
           
        </AuthLayouts>
    )
}

export default SignUp 