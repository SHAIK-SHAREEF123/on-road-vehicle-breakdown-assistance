import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig"

const Signup = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "User",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        // console.log("Signup Data:", form);

        // 🔥 Later connect to backend API
        try {
            const response = await axios.post("/api/auth/signup", {
                name: form.name,
                email: form.email,
                password: form.password,
                phoneNumber: form.phoneNumber,
                role: form.role.toUpperCase(),
            });

            console.log(response.data);
            alert("Signup Successful!");
            navigate("/login");

        } catch (error) {
            console.error(error.message);

            if (error.response) {
                alert("❌ " + error.response.data.message);
            } else {
                alert("❌ Server error");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-96 m-7">

                {/* 🔥 Heading */}
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Create Account
                </h2>

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
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
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
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>User</option>
                            <option>Mechanic</option>
                        </select>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                    >
                        Signup
                    </button>

                </form>

                {/* Extra */}
                <p onClick={() => navigate("/login")} className="text-center text-gray-500 mt-4 text-sm">
                    Already have an account? <span className="text-blue-700 cursor-pointer">Login</span>
                </p>

                <p onClick={() => navigate("/")} className="text-center text-blue-500 cursor-pointer mt-4">Back to Home</p>
            </div>
        </div>
    );
};
export default Signup;