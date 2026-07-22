import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import LoginBanner from "../components/LoginBanner";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        // console.log("Login Data:", { email, password });

        // 🔥 Later connect to backend API
        setLoading(true);

        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
                role
            });

            const data = response.data;

            // console.log("Login Successful : ", data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("name", data.name);
            localStorage.setItem("email", data.email);

            // alert("Login Successful");
            setEmail("");
            setPassword("");

            setLoading(false);

            if (data.role === "MECHANIC") {
                navigate("/mechanic")
            } else {
                navigate("/user");
            }

            toast.success("Login Successful...")
            toast.success("Welcome back!");
        } catch (error) {
            // console.error(error);
            setEmail("");
            setPassword("");
            toast.error("Invalid email or password.");

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            <div className="grid lg:grid-cols-2 min-h-screen">

                <LoginBanner />

                <div className="flex items-center justify-center p-6">

                    <motion.div

                        initial={{
                            opacity: 0,
                            y: 40
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            duration: .6
                        }}

                        className="w-full max-w-md"

                    >

                        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-10">

                            {/* 🔥 Heading */}
                            <div className="text-center mb-8">

                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-4">

                                    <LogIn
                                        size={28}
                                        className="text-blue-600"
                                    />

                                </div>

                                <h2 className="text-3xl font-bold text-gray-900">

                                    Welcome Back

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    Sign in to continue to RoadRescue.

                                </p>

                            </div>

                            {/* 🔥 Form */}
                            <form onSubmit={handleLogin}>

                                {/* Email */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Password
                                    </label>

                                    <div className="relative">

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full p-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-violet-800 hover:text-blue-600 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={20} />
                                            ) : (
                                                <Eye size={20} />
                                            )}
                                        </button>

                                    </div>
                                </div>

                                {/* Role Selection */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium">
                                        Login As
                                    </label>

                                    <select
                                        className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="USER">User</option>
                                        <option value="MECHANIC">Mechanic</option>
                                    </select>
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`
        w-full mt-2 py-3 rounded-xl font-semibold text-white
        bg-blue-600 hover:bg-blue-700
        shadow-md hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-0.5
        active:scale-[0.98]
        disabled:bg-blue-400
        disabled:cursor-not-allowed
        disabled:shadow-none
    `}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2">

                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                                            <span>Logging in...</span>

                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">

                                            <LogIn size={18} />

                                            <span>Login</span>

                                        </div>
                                    )}
                                </button>

                            </form>

                            {/* Extra */}
                            <p className="text-center text-gray-500 mt-4 text-sm">
                                Don’t have an account? <span onClick={() => navigate("/signup")} className="text-blue-700 cursor-pointer">Signup</span>
                            </p>

                            <p onClick={() => navigate("/")} className="text-center text-blue-500 cursor-pointer mt-4">Back to Home</p>

                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Login;