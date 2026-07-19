import { useEffect, useEffectEvent, useState } from "react";
import axios from "../axiosConfig";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/user/StatsCards";
import BreakdownForm from "../components/user/BreakdownForm";
import RecentRequests from "../components/user/RecentRequests";
import SOSButton from "../components/user/SOSButton";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const UserDashboard = () => {
    const [requests, setRequests] = useState([]);
    const addRequest = (newRequest) => {
        setRequests((prev) => [newRequest, ...prev]);
    };

    const fetchRequests = async () => {
        try {

            const response = await axios.get("/api/breakdown/my-requests");
            setRequests(response.data);

        } catch (error) {
            console.log(error.data);
        }

    }

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <DashboardHeader />

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Statistics */}
                <StatsCards requests={requests} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

                    {/* Left Side */}
                    <div className="lg:col-span-2">

                        <Link to="/create-request">

                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-lg hover:scale-105 transition">

                                <h2 className="text-2xl font-bold">
                                    🚗 Create Breakdown Request
                                </h2>

                                <p className="mt-2">
                                    Need roadside assistance? Click here to create a new request.
                                </p>

                            </div>

                        </Link>

                        <div className="mt-8">
                            <RecentRequests requests={requests} />
                        </div>

                    </div>

                    {/* Right Side */}
                    <div>

                        <SOSButton />

                        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

                            <h2 className="text-xl font-semibold mb-4">
                                Tips
                            </h2>

                            <ul className="space-y-3 text-gray-600 text-sm">

                                <li>🚗 Turn on hazard lights.</li>

                                <li>📍 Share accurate location.</li>

                                <li>📞 Keep your phone reachable.</li>

                                <li>🛠 Wait safely until mechanic arrives.</li>

                                <li>🛠 Stay in a safe place while waiting.</li>

                                <li>🔋 If it's night, keep your parking lights on.</li>

                                <li>🚧 Place a warning triangle behind your vehicle if available.</li>

                                <li>⛽ If you're on a highway, move the vehicle to the roadside if possible.</li>

                                <li>🚑 In case of an accident or emergency, call the SOS service immediately.</li>

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default UserDashboard;