import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { Navigate } from "react-router-dom";
import RequestTimeline from "../components/user/RequestTimeline";
import {
    ArrowLeft,
    Car,
    MapPin,
    Wrench,
    User,
    CheckCircle,
    Calendar,
    FileText,
} from "lucide-react";
import { connectWebSocket, disconnectWebSocket } from "../services/websocket";

const RequestDetails = () => {

    const { id } = useParams();

    const [request, setRequest] = useState(null);

    const navigate = useNavigate();

    const fetchRequest = async () => {
        try {
            const response = await axios.get(`/api/breakdown/${id}`);
            setRequest(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        connectWebSocket((client) => {

            client.subscribe(
                `/topic/request/${id}`,
                (message) => {

                    const updatedRequest = JSON.parse(message.body);
                    console.log(updatedRequest);
                    setRequest(updatedRequest);

                }
            );

        });

        return () => {

            disconnectWebSocket();

        };

    }, [id]);

    useEffect(() => {
        fetchRequest();
    }, []);

    if (!request) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h2 className="text-xl font-semibold">
                    Loading Request...
                </h2>
            </div>
        );
    }

    const handleEdit = () => {
        navigate(`/edit-request/${request.id}`)
    }

    const handleCancel = async () => {
        const confirmDelete = window.confirm("Are you sure you want cancel the request?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`/api/breakdown/${request.id}`);
            alert(response.data);
            navigate("/user");
        } catch (error) {
            console.log(error.response?.data || "Unable to Cancel")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-4xl mx-auto py-10 px-6">

                {/* Back Button */}

                <Link
                    to="/user"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </Link>

                {/* Card */}

                <div className="bg-white rounded-2xl shadow-xl p-8">

                    <h1 className="text-3xl font-bold mb-8">
                        Breakdown Request Details
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Vehicle */}

                        <div>

                            <p className="text-gray-500 flex items-center gap-2">
                                <Car size={18} />
                                Vehicle Type
                            </p>

                            <h2 className="font-semibold text-xl mt-2">
                                {request.vehicleType}
                            </h2>

                        </div>

                        {/* Issue */}

                        <div>

                            <p className="text-gray-500 flex items-center gap-2">
                                <Wrench size={18} />
                                Issue
                            </p>

                            <h2 className="font-semibold text-xl mt-2">
                                {request.issue}
                            </h2>

                        </div>

                        {/* Description */}

                        <div className="md:col-span-2">

                            <p className="text-gray-500 flex items-center gap-2">
                                <FileText size={18} />
                                Description
                            </p>

                            <h2 className="font-semibold mt-2">
                                {request.description}
                            </h2>

                        </div>

                        {/* Location */}

                        <div>

                            <p className="text-gray-500 flex items-center gap-2">
                                <MapPin size={18} />
                                Location
                            </p>

                            <h2 className="font-semibold mt-2">
                                {request.location}
                            </h2>

                        </div>

                        {/* Status */}

                        <div>

                            <p className="text-gray-500 flex items-center gap-2">
                                <CheckCircle size={18} />
                                Status
                            </p>

                            <span
                                className={`inline-block mt-2 px-4 py-2 rounded-full font-semibold
                                ${request.status === "PENDING"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : request.status === "ACCEPTED"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-green-100 text-green-700"
                                    }`}
                            >
                                {request.status}
                            </span>

                        </div>

                        {/* User */}

                        <div>

                            <p className="text-gray-500 flex items-center gap-2">
                                <User size={18} />
                                Requested By
                            </p>

                            <h2 className="font-semibold mt-2">
                                {request.userEmail}
                            </h2>

                        </div>

                        {/* Mechanic */}

                        <div>

                            <p className="text-gray-500 flex items-center gap-2">
                                <User size={18} />
                                Mechanic
                            </p>

                            <h2 className="font-semibold mt-2">
                                {request.mechanicEmail || "Not Assigned"}
                            </h2>

                        </div>

                        {/* Date */}

                        <div>

                            <p className="text-gray-500 flex items-center gap-2">
                                <Calendar size={18} />
                                Created At
                            </p>

                            <h2 className="font-semibold mt-2">
                                {request.createdAt || "Not Available"}
                            </h2>

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="flex gap-4 mt-10">

                        {
                            (request.status === "PENDING" || request.status === "SEARCHING_MECHANIC") && (
                                <>
                                    <button
                                        onClick={handleEdit}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                                    >
                                        Edit Request
                                    </button>

                                    <button
                                        onClick={handleCancel}
                                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
                                    >
                                        Cancel Request
                                    </button>
                                </>
                            )}

                    </div>

                </div>

            </div>

            <RequestTimeline status={request.status} />

        </div>
    );
};

export default RequestDetails;