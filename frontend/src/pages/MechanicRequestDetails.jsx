import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axiosConfig";
import {
    ArrowLeft,
    Car,
    Wrench,
    MapPin,
    FileText,
    User,
    Mail,
    Phone,
} from "lucide-react";
import RequestTimeline from "../components/user/RequestTimeline";
import RequestLocationMap from "../components/maps/RequestLocationMap";
import { getRouteInfo } from "../services/routeService";
import useLiveLocation from "../hooks/useLiveLocation";


const MechanicRequestDetails = () => {

    const { id } = useParams();

    const [request, setRequest] = useState(null);

    const shouldTrack =
        request?.status === "MECHANIC_ASSIGNED" ||
        request?.status === "MECHANIC_ON_THE_WAY" ||
        request?.status === "REPAIR_STARTED";

    // Start live location tracking
    useLiveLocation(id, shouldTrack);

    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");

    const fetchRequest = async () => {

        try {

            const response = await axios.get(`/api/breakdown/${id}`);

            setRequest(response.data);

        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        fetchRequest();
    }, []);

    useEffect(() => {

        if (request) {
            getMechanicLocation();
        }

    }, [request]);

    const handleAccept = async (id) => {

        try {

            const response = await axios.put(`/api/breakdown/accept/${id}`);

            setRequest(response.data);

        } catch (error) {
            console.log(error);
        }

    };

    const handleUpdateStatus = async (status) => {

        try {

            const response = await axios.put(
                `/api/breakdown/update-status/${request.id}`,
                null,
                {
                    params: {
                        status,
                    },
                }
            );

            setRequest(response.data);

        } catch (error) {
            console.log(error);
        }

    };

    if (!request) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    const getMechanicLocation = () => {

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const mechanicLat =
                    position.coords.latitude;

                const mechanicLng =
                    position.coords.longitude;

                const route = await getRouteInfo(

                    mechanicLat,
                    mechanicLng,

                    request.latitude,
                    request.longitude

                );

                if (route) {

                    setDistance(route.distance);

                    setDuration(route.duration);

                }

            },

            (error) => {

                console.log(error);

            },

            {

                enableHighAccuracy: true

            }

        );

    };

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="max-w-5xl mx-auto px-6 py-8">

                <Link
                    to="/mechanic"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </Link>

                <div className="bg-white rounded-2xl shadow-lg mt-6 p-8">

                    <div className="flex justify-between items-start">

                        <div>

                            <h1 className="text-3xl font-bold flex items-center gap-3">

                                <Car className="text-blue-600" />

                                {request.vehicleType}

                            </h1>

                            <p className="text-gray-500 mt-2">
                                Breakdown Request Details
                            </p>

                        </div>

                        <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold
                            ${request.status === "PENDING"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : request.status === "SEARCHING_MECHANIC"
                                        ? "bg-orange-100 text-orange-700"
                                        : request.status === "MECHANIC_ASSIGNED"
                                            ? "bg-blue-100 text-blue-700"
                                            : request.status === "MECHANIC_ON_THE_WAY"
                                                ? "bg-purple-100 text-purple-700"
                                                : request.status === "REPAIR_STARTED"
                                                    ? "bg-indigo-100 text-indigo-700"
                                                    : "bg-green-100 text-green-700"
                                }`}
                        >
                            {request.status}
                        </span>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

                        <div>

                            <h2 className="text-xl font-semibold mb-5">
                                Request Information
                            </h2>

                            <div className="space-y-5">

                                <div className="flex items-start gap-3">

                                    <Wrench className="text-orange-500 mt-1" />

                                    <div>

                                        <p className="text-gray-500 text-sm">
                                            Issue
                                        </p>

                                        <p className="font-medium">
                                            {request.issue}
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-start gap-3">

                                    <FileText className="text-blue-500 mt-1" />

                                    <div>

                                        <p className="text-gray-500 text-sm">
                                            Description
                                        </p>

                                        <p className="font-medium">
                                            {request.description}
                                        </p>

                                    </div>

                                </div>

                                {/* Location */}

                                <div className="flex items-start gap-3">

                                    <MapPin className="text-red-500 mt-1" />

                                    <div>

                                        <p className="text-gray-500 text-sm">
                                            Location
                                        </p>

                                        <p className="font-medium">
                                            {request.location}
                                        </p>

                                    </div>

                                </div>

                                {/* Customer Map */}

                                <div className="mt-8">

                                    <h2 className="text-xl font-semibold mb-4">
                                        Customer Location
                                    </h2>

                                    <RequestLocationMap
                                        latitude={request.latitude}
                                        longitude={request.longitude}
                                        mechanicLatitude={request.mechanicLatitude}
                                        mechanicLongitude={request.mechanicLongitude}
                                        address={request.location}
                                    />

                                </div>

                                {/* Distance Card */}

                                <div className="bg-white rounded-xl shadow-md p-5 mt-5">

                                    <h2 className="text-xl font-bold mb-4">
                                        Distance Information
                                    </h2>

                                    <p>
                                        📍 {request.location}
                                    </p>

                                    <div className="mt-4">

                                        <h3 className="font-semibold">
                                            Distance
                                        </h3>

                                        <p className="text-2xl text-blue-600">
                                            🚗 {distance} km
                                        </p>

                                    </div>

                                    <div className="mt-4">

                                        <h3 className="font-semibold">
                                            Estimated Time
                                        </h3>

                                        <p className="text-2xl text-green-600">
                                            ⏱ {duration} mins
                                        </p>

                                    </div>

                                </div>

                                {/* Navigate Button */}

                                <button
                                    onClick={() => {

                                        window.open(
                                            `https://www.google.com/maps/dir/?api=1&destination=${request.latitude},${request.longitude}`,
                                            "_blank"
                                        );

                                    }}
                                    className="
        mt-5
        bg-green-600
        hover:bg-green-700
        text-white
        px-5
        py-3
        rounded-lg
    "
                                >

                                    Navigate to Customer

                                </button>

                            </div>

                        </div>

                        <div>

                            <h2 className="text-xl font-semibold mb-5">
                                Customer Information
                            </h2>

                            <div className="space-y-5">

                                <div className="flex items-start gap-3">

                                    <User className="text-green-600 mt-1" />

                                    <div>

                                        <p className="text-gray-500 text-sm">
                                            Name
                                        </p>

                                        <p className="font-medium">
                                            {request.userName || "Not Available"}
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-start gap-3">

                                    <Mail className="text-blue-600 mt-1" />

                                    <div>

                                        <p className="text-gray-500 text-sm">
                                            Email
                                        </p>

                                        <p className="font-medium">
                                            {request.userEmail}
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-start gap-3">

                                    <Phone className="text-purple-600 mt-1" />

                                    <div>

                                        <p className="text-gray-500 text-sm">
                                            Phone
                                        </p>

                                        <p className="font-medium">
                                            {request.phoneNumber || "Not Available"}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <RequestTimeline status={request.status} />

                <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

                    <div className="flex justify-end gap-4">

                        {(request.status === "PENDING" ||
                            request.status === "SEARCHING_MECHANIC") && (

                                <button
                                    onClick={() => handleAccept(request.id)}
                                    className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
                                >
                                    Accept Request
                                </button>

                            )}

                        {request.status === "MECHANIC_ASSIGNED" && (

                            <button
                                onClick={() => handleUpdateStatus("MECHANIC_ON_THE_WAY")}
                                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                            >
                                Start Journey
                            </button>

                        )}

                        {request.status === "MECHANIC_ON_THE_WAY" && (

                            <button
                                onClick={() => handleUpdateStatus("REPAIR_STARTED")}
                                className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold"
                            >
                                Start Repair
                            </button>

                        )}

                        {request.status === "REPAIR_STARTED" && (

                            <button
                                onClick={() => handleUpdateStatus("COMPLETED")}
                                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                            >
                                Complete Service
                            </button>

                        )}

                        {request.status === "COMPLETED" && (

                            <button
                                disabled
                                className="px-6 py-3 rounded-xl bg-green-600 text-white opacity-70 cursor-not-allowed"
                            >
                                ✅ Service Completed
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );
};

export default MechanicRequestDetails;