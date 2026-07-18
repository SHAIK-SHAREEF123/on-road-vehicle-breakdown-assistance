import {
    Wrench,
    ClipboardCheck,
    CheckCircle,
} from "lucide-react";

const MechanicStats = ({ pendingRequests, acceptedRequests }) => {

    const availableRequests = pendingRequests.length;

    const acceptedCount = acceptedRequests.filter(
        (request) =>
            request.status === "MECHANIC_ASSIGNED" ||
            request.status === "MECHANIC_ON_THE_WAY" ||
            request.status === "REPAIR_STARTED"
    ).length;

    const completedCount = acceptedRequests.filter(
        (request) => request.status === "COMPLETED"
    ).length;

    const cards = [
        {
            title: "Available Requests",
            value: availableRequests,
            icon: <Wrench size={34} />,
            bg: "bg-yellow-100",
            text: "text-yellow-600",
        },
        {
            title: "Accepted Requests",
            value: acceptedCount,
            icon: <ClipboardCheck size={34} />,
            bg: "bg-blue-100",
            text: "text-blue-600",
        },
        {
            title: "Completed Repairs",
            value: completedCount,
            icon: <CheckCircle size={34} />,
            bg: "bg-green-100",
            text: "text-green-600",
        },
    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {cards.map((card, index) => (

                <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6 flex items-center justify-between"
                >

                    <div>

                        <p className="text-gray-500 font-medium">
                            {card.title}
                        </p>

                        <h2 className="text-4xl font-bold mt-2">
                            {card.value}
                        </h2>

                    </div>

                    <div className={`${card.bg} ${card.text} p-4 rounded-full`}>

                        {card.icon}

                    </div>

                </div>

            ))}

        </div>

    );
};

export default MechanicStats;