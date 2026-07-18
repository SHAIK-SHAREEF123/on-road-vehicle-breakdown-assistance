import {
    Circle,
    CheckCircle2,
} from "lucide-react";

const RequestTimeline = ({ status }) => {

    const steps = [
        {
            key: "PENDING",
            label: "Request Submitted",
            color: "bg-yellow-100 text-yellow-700",
        },
        {
            key: "SEARCHING_MECHANIC",
            label: "Searching Mechanic",
            color: "bg-blue-100 text-blue-700",
        },
        {
            key: "MECHANIC_ASSIGNED",
            label: "Mechanic Assigned",
            color: "bg-purple-100 text-purple-700",
        },
        {
            key: "MECHANIC_ON_THE_WAY",
            label: "Mechanic On The Way",
            color: "bg-orange-100 text-orange-700",
        },
        {
            key: "REPAIR_STARTED",
            label: "Repair Started",
            color: "bg-indigo-100 text-indigo-700",
        },
        {
            key: "COMPLETED",
            label: "Completed",
            color: "bg-green-100 text-green-700",
        },
    ];

    const currentIndex = steps.findIndex(
        (step) => step.key === status
    );

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-semibold mb-6">
                Request Timeline
            </h2>

            <div className="space-y-6">

                {steps.map((step, index) => {

                    const completed = index <= currentIndex;
                    const current = index === currentIndex;

                    return (

                        <div
                            key={step.key}
                            className="flex items-start gap-4"
                        >

                            {/* Timeline Icon */}
                            <div className="flex flex-col items-center">

                                {completed ? (
                                    <CheckCircle2
                                        size={28}
                                        className="text-green-600"
                                    />
                                ) : (
                                    <Circle
                                        size={28}
                                        className="text-gray-300"
                                    />
                                )}

                                {index !== steps.length - 1 && (
                                    <div
                                        className={`w-1 h-12 ${
                                            completed
                                                ? "bg-green-500"
                                                : "bg-gray-300"
                                        }`}
                                    />
                                )}

                            </div>

                            {/* Status */}
                            <div className="flex-1">

                                <div className="flex items-center justify-between">

                                    <h3
                                        className={`font-semibold text-lg ${
                                            completed
                                                ? "text-gray-900"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {step.label}
                                    </h3>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${step.color}`}
                                    >
                                        {step.key}
                                    </span>

                                </div>

                                {current && (
                                    <p className="text-sm text-gray-500 mt-2">
                                        Current Status
                                    </p>
                                )}

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>
    );
};

export default RequestTimeline;