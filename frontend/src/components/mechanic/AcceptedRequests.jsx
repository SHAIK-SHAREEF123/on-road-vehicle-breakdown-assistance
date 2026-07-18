import { Car, MapPin, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const AcceptedRequests = ({ requests }) => {

    if (requests.length === 0) {

        return (

            <div className="bg-white rounded-2xl shadow-lg p-6">

                <h2 className="text-xl font-semibold mb-4">
                    My Accepted Requests
                </h2>

                <p className="text-gray-500">
                    You haven't accepted any requests yet.
                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-semibold mb-6">
                My Accepted Requests
            </h2>

            <div className="space-y-5">

                {requests.map((request) => (

                    <div
                        key={request.id}
                        className="border rounded-xl p-5 hover:shadow-md transition"
                    >

                        <div className="space-y-3">

                            <h3 className="text-lg font-semibold flex items-center gap-2">

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

                            <div className="flex justify-between items-center mt-4">

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold
                                        ${
                                            request.status === "MECHANIC_ASSIGNED"
                                                ? "bg-blue-100 text-blue-700"
                                                : request.status === "MECHANIC_ON_THE_WAY"
                                                ? "bg-purple-100 text-purple-700"
                                                : request.status === "REPAIR_STARTED"
                                                ? "bg-orange-100 text-orange-700"
                                                : request.status === "COMPLETED"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {request.status.replaceAll("_", " ")}
                                </span>

                                <Link
                                    to={`/mechanic/request/${request.id}`}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                >
                                    View Details
                                </Link>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default AcceptedRequests;