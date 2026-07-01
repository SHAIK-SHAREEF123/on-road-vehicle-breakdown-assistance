import RequestCard from "./RequestCard";

const RecentRequests = ({ requests }) => {
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

                <div className="space-y-5">

                    {requests.map((request) => (

                        <RequestCard
                            key={request.id}
                            request={request}
                        />

                    ))}

                </div>

            )}

        </div>
    );
};

export default RecentRequests;