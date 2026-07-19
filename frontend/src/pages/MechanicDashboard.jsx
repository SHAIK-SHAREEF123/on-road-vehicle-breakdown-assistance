import { useEffect, useState } from "react";
import axios from "../axiosConfig";

import DashboardHeader from "../components/DashboardHeader";
import MechanicStats from "../components/mechanic/MechanicStats";
import AvailableRequests from "../components/mechanic/AvailableRequests";
import AcceptedRequests from "../components/mechanic/AcceptedRequests";

import { connectWebSocket, disconnectWebSocket } from "../services/websocket";
import toast from "react-hot-toast";

const MechanicDashboard = () => {

    const [pendingRequests, setPendingRequests] = useState([]);
    const [acceptedRequests, setAcceptedRequests] = useState([]);

    // Fetch all pending requests
    const fetchPendingRequests = async () => {
        try {

            const response = await axios.get("/api/breakdown/pendingForMechanic");
            // console.log("Pending:", response.data);
            setPendingRequests(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    // Fetch accepted requests of logged-in mechanic
    const fetchAcceptedRequests = async () => {
        try {

            const response = await axios.get("/api/breakdown/mechanicAccepted-requests");
            setAcceptedRequests(response.data);

        } catch (error) {
            console.log(error.response?.data);
        }
    };

    useEffect(() => {
        fetchPendingRequests();
        fetchAcceptedRequests();
    }, []);

    useEffect(() => {
        let pendingSubscription;
        let acceptedSubscription;
        connectWebSocket((client) => {

            pendingSubscription = client.subscribe("/topic/pending-requests", (message) => {

                const newRequest = JSON.parse(message.body);

                setPendingRequests((prev) => [
                    newRequest,
                    ...prev,
                ]);

                toast.success("🚗 New breakdown request received!");

            });

            acceptedSubscription = client.subscribe("/topic/request-accepted", (message) => {

                const acceptedRequest = JSON.parse(message.body);

                setPendingRequests((prev) =>
                    prev.filter(
                        (request) =>
                            request.id !== acceptedRequest.id
                    )
                );

            }
            );

        });

        return () => {

            pendingSubscription?.unsubscribe();

            acceptedSubscription?.unsubscribe();

        };

    }, []);

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <DashboardHeader />

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Statistics */}
                <MechanicStats
                    pendingRequests={pendingRequests}
                    acceptedRequests={acceptedRequests}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

                    {/* Left Section */}
                    <div className="lg:col-span-2">

                        <AvailableRequests
                            requests={pendingRequests}
                            refreshPending={fetchPendingRequests}
                            refreshAccepted={fetchAcceptedRequests}
                        />

                    </div>

                    {/* Right Section */}
                    <div>

                        <AcceptedRequests
                            requests={acceptedRequests}
                        />

                        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

                            <h2 className="text-xl font-semibold mb-4">
                                Dashboard Tips
                            </h2>

                            <ul className="space-y-3 text-gray-600 text-sm">

                                <li>🔧 Accept requests quickly.</li>

                                <li>📞 Contact the customer before leaving.</li>

                                <li>🚗 Update status regularly.</li>

                                <li>✅ Complete repair after service.</li>

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default MechanicDashboard;