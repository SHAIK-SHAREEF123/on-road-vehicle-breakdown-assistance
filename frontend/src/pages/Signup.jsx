import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    UserPlus,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import LoginBanner from "../components/LoginBanner";

const Signup = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "User",
    });

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        // console.log("Signup Data:", form);

        setLoading(true);

        try {
            const response = await axios.post("/api/auth/signup", {
                name: form.name,
                email: form.email,
                password: form.password,
                phoneNumber: form.phoneNumber,
                role: form.role.toUpperCase(),
            });

            // console.log(response.data);
            // alert("Signup Successful!");
            navigate("/login");
            toast.success("Account created successfully!");
            setLoading(false);

        } catch (error) {
            console.error(error.message);

            toast.error(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            <div className="grid lg:grid-cols-2 min-h-screen">

                <LoginBanner />

                <div className="flex items-center justify-center p-6">

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .6 }}
                        className="w-full max-w-md"
                    >

                        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-10">

                            {/* 🔥 Heading */}
                            <div className="text-center mb-8">

                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4">

                                    <UserPlus
                                        size={28}
                                        className="text-green-600"
                                    />

                                </div>

                                <h2 className="text-3xl font-bold text-gray-900">

                                    Create Account

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    Join RoadRescue and get roadside assistance faster.

                                </p>

                            </div>

                            {/* 🔥 Form */}
                            <form onSubmit={handleSignup}>

                                {/* Name */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="
w-full
mt-1
px-4
py-3
border
border-gray-300
rounded-xl
focus:outline-none
focus:ring-4
focus:ring-green-100
focus:border-green-500
transition-all
duration-300
"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="
w-full
mt-1
px-4
py-3
border
border-gray-300
rounded-xl
focus:outline-none
focus:ring-4
focus:ring-green-100
focus:border-green-500
transition-all
duration-300
"
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
                                            name="password"
                                            placeholder="Enter password"
                                            value={form.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all"
                                            required
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-green-600"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>

                                    </div>

                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Enter your Phone number"
                                        value={form.phoneNumber}
                                        onChange={handleChange}
                                        className="
w-full
mt-1
px-4
py-3
border
border-gray-300
rounded-xl
focus:outline-none
focus:ring-4
focus:ring-green-100
focus:border-green-500
transition-all
duration-300
"
                                        required
                                    />
                                </div>

                                {/* Role */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium">
                                        Register As
                                    </label>

                                    <select
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        className="
w-full
mt-1
px-4
py-3
border
border-gray-300
rounded-xl
focus:outline-none
focus:ring-4
focus:ring-green-100
focus:border-green-500
transition-all
duration-300
"
                                    >
                                        <option>User</option>
                                        <option>Mechanic</option>
                                    </select>
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
        w-full
        mt-2
        py-3
        rounded-xl
        font-semibold
        text-white
        bg-green-600
        hover:bg-green-700
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        hover:-translate-y-0.5
        active:scale-[0.98]
        disabled:bg-green-400
        disabled:cursor-not-allowed
    "
                                >

                                    {loading ? (

                                        <div className="flex justify-center items-center gap-2">

                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                                            Creating Account...

                                        </div>

                                    ) : (

                                        <div className="flex justify-center items-center gap-2">

                                            <UserPlus size={18} />

                                            Create Account

                                        </div>

                                    )}

                                </button>

                            </form>

                            {/* Extra */}
                            <p onClick={() => navigate("/login")} className="text-center text-gray-500 mt-4 text-sm">
                                Already have an account? <span className="text-blue-700 cursor-pointer">Login</span>
                            </p>

                            <p onClick={() => navigate("/")} className="text-center text-blue-500 cursor-pointer mt-4">Back to Home</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
export default Signup;