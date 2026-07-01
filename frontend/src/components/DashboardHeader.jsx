import { Bell, LogOut, UserCircle2, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Left Section */}
                <div className="flex items-center gap-3">

                    <div className="bg-blue-600 p-2 rounded-xl">
                        <Car className="text-white" size={28} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            RoadAssist
                        </h1>
                        <p className="text-sm text-gray-500">
                            Vehicle Breakdown Assistance
                        </p>
                    </div>

                </div>

                {/* Right Section */}
                <div className="flex items-center gap-6">

                    {/* Notification */}
                    <button className="relative hover:text-blue-600 transition">

                        <Bell size={24} />

                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            2
                        </span>

                    </button>

                    {/* User Profile */}
                    <div className="flex items-center gap-2">

                        <UserCircle2
                            size={40}
                            className="text-blue-600"
                        />

                        <div>

                            <h3 className="font-semibold">
                                Welcome 👋
                            </h3>

                            <p className="text-sm text-gray-500">
                                Shareef
                            </p>

                        </div>

                    </div>

                    {/* Logout */}

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </div>
        </header>
    );
};

export default DashboardHeader;