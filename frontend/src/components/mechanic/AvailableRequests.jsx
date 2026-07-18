import axios from "../../axiosConfig";
import { MapPin, Car, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const AvailableRequests = ({
    requests,
    refreshPending,
    refreshAccepted,
}) => {

    const handleAccept = async (id) => {

        try {

            await axios.put(`/api/breakdown/accept/${id}`);
            await refreshPending();
            await refreshAccepted();

        } catch (error) {
            console.log(error);
        }

    };

    if (requests.length === 0) {

        return (

            <div className="bg-white rounded-2xl shadow-lg p-6">

                <h2 className="text-2xl font-semibold mb-4">
                    Available Requests
                </h2>

                <p className="text-gray-500">
                    No pending requests available.
                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-semibold mb-6">
                Available Requests
            </h2>

            <div className="space-y-5">

                {requests.map((request) => (

                    <div
                        key={request.id}
                        className="border rounded-xl p-5 hover:shadow-md transition"
                    >

                        <div className="flex justify-between items-start">

                            <div className="space-y-2">

                                <h3 className="text-xl font-semibold flex items-center gap-2">

                                    <Car className="text-blue-600" />

                                    {request.vehicleType}

                                </h3>

                                <p className="flex items-center gap-2 text-gray-700">

                                    <Wrench
                                        size={18}
                                        className="text-orange-500"
                                    />

                                    {request.issue}

                                </p>

                                <p className="flex items-center gap-2 text-gray-700">

                                    <MapPin
                                        size={18}
                                        className="text-red-500"
                                    />

                                    {request.location}

                                </p>

                            </div>

                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">

                                {request.status}

                            </span>

                        </div>

                        <div className="flex justify-end gap-3 mt-5">

                            <Link
                                to={`/mechanic/request/${request.id}`}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                            >
                                View Details
                            </Link>

                            <button
                                onClick={() => handleAccept(request.id)}
                                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                            >
                                Accept
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default AvailableRequests;