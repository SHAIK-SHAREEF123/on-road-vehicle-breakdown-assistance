import { Siren, PhoneCall, ShieldAlert } from "lucide-react";
import axios from "../../axiosConfig";

const SOSButton = () => {

    const handleSOS = async () => {

        const confirmSOS = window.confirm(
            "Are you sure you want to send an Emergency SOS request?"
        );

        if (!confirmSOS) return;

        try {

            await axios.post("/api/breakdown/sos");

            alert("🚨 SOS Request Sent Successfully!");

        } catch (error) {

            console.error(error);

            alert("Failed to send SOS request.");

        }
    };

    return (

        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl shadow-xl p-6">

            <div className="flex items-center gap-3">

                <ShieldAlert size={38} />

                <div>

                    <h2 className="text-2xl font-bold">
                        Emergency Assistance
                    </h2>

                    <p className="text-red-100 mt-1">
                        Press SOS only during emergencies.
                    </p>

                </div>

            </div>

            <div className="mt-6 space-y-3">

                <div className="flex items-center gap-3">

                    <PhoneCall size={20} />

                    <p>
                        High Priority Breakdown Request
                    </p>

                </div>

                <div className="flex items-center gap-3">

                    <Siren size={20} />

                    <p>
                        Nearest mechanic will be notified first.
                    </p>

                </div>

            </div>

            <button
                onClick={handleSOS}
                className="mt-8 w-full bg-white text-red-600 hover:bg-red-100 transition font-bold py-4 rounded-xl text-lg flex justify-center items-center gap-3"
            >

                <Siren size={24} />

                SEND SOS

            </button>

        </div>

    );
};

export default SOSButton;