import {
    Clock3,
    CheckCircle,
    ClipboardList,
} from "lucide-react";

const StatsCards = ({ requests }) => {

    const activeRequests = requests.filter(
        (req) =>
            req.status === "Searching Mechanic" ||
            req.status === "Mechanic Assigned"
    ).length;

    const completedRequests = requests.filter(
        (req) => req.status === "Completed"
    ).length;

    const totalRequests = requests.length;

    const cards = [
        {
            title: "Active Requests",
            value: activeRequests,
            icon: <Clock3 size={34} />,
            bg: "bg-yellow-100",
            text: "text-yellow-600",
        },
        {
            title: "Completed",
            value: completedRequests,
            icon: <CheckCircle size={34} />,
            bg: "bg-green-100",
            text: "text-green-600",
        },
        {
            title: "Total Requests",
            value: totalRequests,
            icon: <ClipboardList size={34} />,
            bg: "bg-blue-100",
            text: "text-blue-600",
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

                    <div
                        className={`${card.bg} ${card.text} p-4 rounded-full`}
                    >
                        {card.icon}
                    </div>

                </div>

            ))}

        </div>
    );
};

export default StatsCards;