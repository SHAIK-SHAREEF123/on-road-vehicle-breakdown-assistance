import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import BreakdownForm from "../components/BreakdownForm";
import RecentRequests from "../components/RecentRequests";
import SOSButton from "../components/SOSButton";

const UserDashboard = () => {
    const [requests, setRequests] = useState([
        {
            id: 1,
            vehicleType: "Car",
            issue: "Flat Tire",
            location: "Hyderabad",
            status: "Searching Mechanic",
            createdAt: "2 mins ago",
        },
        {
            id: 2,
            vehicleType: "Bike",
            issue: "Battery Dead",
            location: "Warangal",
            status: "Completed",
            createdAt: "Yesterday",
        },
    ]);

    const addRequest = (newRequest) => {
        setRequests((prev) => [newRequest, ...prev]);
    };

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

                        <BreakdownForm addRequest={addRequest} />

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

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default UserDashboard;