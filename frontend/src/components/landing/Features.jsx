import { motion } from "framer-motion";

import {
    Bell,
    ShieldCheck,
    MapPinned,
    Clock3,
    Wrench,
    ClipboardList
} from "lucide-react";

const features = [

    {
        icon: Bell,
        title: "Real-Time Notifications",
        description:
            "Mechanics receive instant notifications whenever a new breakdown request is created."
    },

    {
        icon: MapPinned,
        title: "Location Based Service",
        description:
            "Users can share their current location to help nearby mechanics reach them faster."
    },

    {
        icon: Wrench,
        title: "Nearby Mechanic Support",
        description:
            "Mechanics can accept requests and assist users with vehicle issues."
    },

    {
        icon: ClipboardList,
        title: "Request Management",
        description:
            "Track every breakdown request from creation until completion."
    },

    {
        icon: ShieldCheck,
        title: "Secure Authentication",
        description:
            "JWT authentication with separate access for Users, Mechanics and Admin."
    },

    {
        icon: Clock3,
        title: "Live Status Updates",
        description:
            "Users always know whether the request is Pending, Accepted or Completed."
    }

];

const Features = () => {

    return (

        <section
            id="features"
            className="py-8 bg-white"
        >

            <div className="max-w-7xl mx-auto px-6">

                <motion.div

                    initial={{ opacity: 0, y: 30 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    transition={{ duration: .6 }}

                    className="text-center mb-14"
                >

                    <h2 className="text-4xl font-bold text-gray-900">

                        Project Features

                    </h2>

                    <p className="text-gray-600 mt-3">

                        Features implemented in the RoadRescue application.

                    </p>

                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {

                        features.map((feature, index) => {

                            const Icon = feature.icon;

                            return (

                                <motion.div

                                    key={index}

                                    initial={{
                                        opacity:0,
                                        y:30
                                    }}

                                    whileInView={{
                                        opacity:1,
                                        y:0
                                    }}

                                    transition={{
                                        delay:index*.1
                                    }}

                                    whileHover={{
                                        y:-6
                                    }}

                                    className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-lg transition-all duration-300"

                                >

                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">

                                        <Icon
                                            size={24}
                                            className="text-blue-600"
                                        />

                                    </div>

                                    <h3 className="mt-5 text-xl font-semibold text-gray-800">

                                        {feature.title}

                                    </h3>

                                    <p className="mt-3 text-gray-600 leading-7">

                                        {feature.description}

                                    </p>

                                </motion.div>

                            );

                        })

                    }

                </div>

            </div>

        </section>

    );

};

export default Features;