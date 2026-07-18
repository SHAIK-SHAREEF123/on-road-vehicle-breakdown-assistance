import {
    Car,
    MapPin,
    Clock,
    Eye,
    Wrench,
    CheckCircle,
    XCircle,
} from "lucide-react";

const RequestCard = ({ request }) => {

    const getStatusStyle = (status) => {

        switch (status) {

            case "Searching Mechanic":
                return {
                    color: "bg-yellow-100 text-yellow-700",
                    icon: <Clock size={16} />
                };

            case "Mechanic Assigned":
                return {
                    color: "bg-blue-100 text-blue-700",
                    icon: <Wrench size={16} />
                };

            case "Completed":
                return {
                    color: "bg-green-100 text-green-700",
                    icon: <CheckCircle size={16} />
                };

            case "Cancelled":
                return {
                    color: "bg-red-100 text-red-700",
                    icon: <XCircle size={16} />
                };

            default:
                return {
                    color: "bg-gray-100 text-gray-700",
                    icon: <Clock size={16} />
                };
        }
    };

    const status = getStatusStyle(request.status);

    return (
        <div className="border rounded-2xl p-6 hover:shadow-lg transition duration-300 bg-white">

            {/* Top Section */}

            <div className="flex justify-between items-start">

                <div>

                    <div className="flex items-center gap-2">

                        <Car className="text-blue-600" size={22} />

                        <h3 className="text-xl font-semibold">

                            {request.vehicleType}

                        </h3>

                    </div>

                    <p className="text-gray-600 mt-2">

                        {request.issue}

                    </p>

                </div>

                <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                >
                    {status.icon}
                    {request.status}
                </div>

            </div>

            {/* Description */}

            {request.description && (

                <div className="mt-4">

                    <p className="text-gray-700">

                        {request.description}

                    </p>

                </div>

            )}

            {/* Bottom Details */}

            <div className="flex flex-wrap justify-between items-center mt-6 gap-4">

                <div className="flex items-center gap-2 text-gray-600">

                    <MapPin size={18} />

                    <span>{request.location}</span>

                </div>

                <div className="flex items-center gap-2 text-gray-600">

                    <Clock size={18} />

                    <span>{request.createdAt}</span>

                </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-3 mt-6">

                <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                    <Eye size={18} />
                    View Details
                </button>

                {request.status === "Searching Mechanic" && (

                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                    >
                        Cancel Request
                    </button>

                )}

            </div>

        </div>
    );
};

export default RequestCard;