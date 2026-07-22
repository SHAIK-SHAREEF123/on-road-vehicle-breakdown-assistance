import { motion } from "framer-motion";
import {
    FileText,
    BellRing,
    Wrench,
    MapPinned
} from "lucide-react";

const steps = [

    {
        icon: FileText,
        title: "Raise Breakdown Request",
        description:
            "Submit your vehicle issue with location and problem details."
    },

    {
        icon: BellRing,
        title: "Nearby Mechanics Notified",
        description:
            "Available mechanics instantly receive your request."
    },

    {
        icon: Wrench,
        title: "Mechanic Accepts",
        description:
            "The nearest mechanic accepts and starts heading to you."
    },

    {
        icon: MapPinned,
        title: "Track Live Location",
        description:
            "Watch the mechanic's location update in real-time."
    }

];

const HowItWorks = () => {

    return (

        <section
            id="how"
            className="py-24 bg-gray-50"
        >

            <div className="max-w-7xl mx-auto px-6">

                <motion.div

                    initial={{ opacity: 0, y: 40 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    transition={{ duration: 0.7 }}

                    className="text-center mb-16"
                >

                    <h2 className="text-4xl font-bold">

                        How It Works

                    </h2>

                    <p className="text-gray-500 mt-4">

                        Get roadside assistance in just a few simple steps.

                    </p>

                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {

                        steps.map((step, index) => {

                            const Icon = step.icon;

                            return (

                                <motion.div

                                    key={index}

                                    initial={{
                                        opacity: 0,
                                        y: 40
                                    }}

                                    whileInView={{
                                        opacity: 1,
                                        y: 0
                                    }}

                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.15
                                    }}

                                    whileHover={{
                                        y: -8
                                    }}

                                    className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 relative"
                                >

                                    <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                                        {index + 1}

                                    </div>

                                    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">

                                        <Icon
                                            className="text-blue-600"
                                            size={30}
                                        />

                                    </div>

                                    <h3 className="font-bold text-xl mb-3">

                                        {step.title}

                                    </h3>

                                    <p className="text-gray-500 leading-7">

                                        {step.description}

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

export default HowItWorks;