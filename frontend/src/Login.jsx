import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        // console.log("Login Data:", { email, password });

        // 🔥 Later connect to backend API
        try {
            const response = await axios.post("http://localhost:8080/api/users/login", {
                email,
                password,
            });

            const data = response.data;

            console.log("Login Successful : ", data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            alert("Login Successful");

            if (data.role === "MECHANIC") {
                navigate("/mechanic")
            } else {
                navigate("/user");
            }
        } catch (error) {
            console.error(error);

            if (error.response) {
                alert("❌ " + error.response.data.message);
            } else {
                alert("❌ Server error");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                {/* 🔥 Heading */}
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Login
                </h2>

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
                        <label className="block text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Role Selection */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">
                            Login As
                        </label>

                        <select
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>User</option>
                            <option>Mechanic</option>
                        </select>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                    >
                        Login
                    </button>

                </form>

                {/* Extra */}
                <p className="text-center text-gray-500 mt-4 text-sm">
                    Don’t have an account? <span onClick={() => navigate("/signup")} className="text-blue-700 cursor-pointer">Signup</span>
                </p>

                <p onClick={() => navigate("/")} className="text-center text-blue-500 cursor-pointer mt-4">Back to Home</p>

            </div>
        </div>
    );
};

export default Login;