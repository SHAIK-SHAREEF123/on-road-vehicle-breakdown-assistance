import { motion } from "framer-motion";
import {
    Bell,
    ShieldCheck,
    Wrench,
} from "lucide-react";

const LoginBanner = () => {

    const features = [

        {
            icon: Bell,
            title: "Real-Time Notifications",
            description: "Receive instant updates whenever a mechanic accepts your request."
        },

        {
            icon: Wrench,
            title: "Nearby Mechanics",
            description: "Connect with trusted mechanics near your current location."
        },

        {
            icon: ShieldCheck,
            title: "Secure Authentication",
            description: "Protected login for Users and Mechanics."
        }

    ];

    return (

        <div className="hidden lg:flex flex-col justify-center bg-blue-600 text-white p-12">

            <motion.div

                initial={{ opacity: 0, x: -40 }}

                animate={{ opacity: 1, x: 0 }}

                transition={{ duration: .7 }}

            >

                <h1 className="text-5xl font-bold">

                    RoadRescue

                </h1>

                <p className="mt-6 text-blue-100 leading-8 text-lg">

                    Helping drivers connect with nearby mechanics
                    through real-time roadside assistance.

                </p>

                <div className="mt-12 space-y-8">

                    {

                        features.map((feature, index) => {

                            const Icon = feature.icon;

                            return (

                                <div
                                    key={index}
                                    className="flex gap-4"
                                >

                                    <div className="w-12 h-12 rounded-lg bg-white/15 flex items-center justify-center">

                                        <Icon size={22} />

                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-lg">

                                            {feature.title}

                                        </h3>

                                        <p className="text-blue-100 mt-1">

                                            {feature.description}

                                        </p>

                                    </div>

                                </div>

                            );

                        })

                    }

                </div>

            </motion.div>

        </div>

    );

};

export default LoginBanner;