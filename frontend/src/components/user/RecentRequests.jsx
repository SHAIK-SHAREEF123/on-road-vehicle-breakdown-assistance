import RequestCard from "./RequestCard";
import { Link } from "react-router-dom";

const RecentRequests = ({ requests }) => {

    const getStatusLabel = (status) => {

        switch (status) {
            case "PENDING":
                return "Pending";

            case "SEARCHING_MECHANIC":
                return "Searching Mechanic";

            case "MECHANIC_ASSIGNED":
                return "Mechanic Assigned";

            case "MECHANIC_ON_THE_WAY":
                return "Mechanic On The Way";

            case "REPAIR_STARTED":
                return "Repair Started";

            case "COMPLETED":
                return "Completed";

            case "CANCELLED":
                return "Cancelled";

            default:
                return status;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                    Recent Requests
                </h2>

                <span className="text-sm text-gray-500">
                    {requests.length} Request(s)
                </span>

            </div>

            {requests.length === 0 ? (

                <div className="text-center py-10 text-gray-500">

                    <p className="text-lg">
                        No requests found 🚗
                    </p>

                    <p className="text-sm mt-2">
                        Create your first breakdown request.
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {requests.map((request) => (

                        <Link
                            key={request.id}
                            to={`/request/${request.id}`}
                            className="block"
                        >
                            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">

                                <h2>{request.vehicleType}</h2>

                                <p>{request.issue}</p>

                                <p>{request.location}</p>

                                <span>{getStatusLabel(request.status)}</span>

                            </div>
                        </Link>

                    ))}

                </div>

            )}

        </div>
    );
};

export default RecentRequests;