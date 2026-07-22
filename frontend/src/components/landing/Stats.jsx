import { motion } from "framer-motion";
import { CountUp } from "react-countup";
import { useInView } from "react-intersection-observer";
import {
    Users,
    Clock3,
    ShieldCheck,
    Wrench
} from "lucide-react";

const stats = [
    {
        icon: Users,
        value: 500,
        suffix: "+",
        title: "Verified Mechanics",
        description: "Trusted professionals ready to assist."
    },
    {
        icon: Clock3,
        value: 2,
        suffix: " min",
        title: "Average Response",
        description: "Fast assistance during emergencies."
    },
    {
        icon: ShieldCheck,
        value: 98,
        suffix: "%",
        title: "Success Rate",
        description: "Reliable service for every request."
    },
    {
        icon: Wrench,
        value: 24,
        suffix: "/7",
        title: "Availability",
        description: "Round-the-clock support."
    }
];

const Stats = () => {

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.3
    });

    return (

        <section className="py-24 bg-white">

            <div
                ref={ref}
                className="max-w-7xl mx-auto px-6"
            >

                <motion.div

                    initial={{ opacity: 0, y: 40 }}

                    whileInView={{ opacity: 1, y: 0 }}

                    transition={{ duration: 0.7 }}

                    className="text-center mb-16"
                >

                    <h2 className="text-4xl font-bold text-gray-900">

                        Trusted by Drivers

                    </h2>

                    <p className="text-gray-500 mt-4 text-lg">

                        Our platform connects drivers with nearby mechanics in seconds.

                    </p>

                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {

                        stats.map((item, index) => {

                            const Icon = item.icon;

                            return (

                                <motion.div

                                    key={index}

                                    initial={{ opacity: 0, y: 40 }}

                                    whileInView={{ opacity: 1, y: 0 }}

                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.15
                                    }}

                                    whileHover={{
                                        y: -8,
                                        scale: 1.03
                                    }}

                                    className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg border border-gray-100 p-8 transition-all"
                                >

                                    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">

                                        <Icon
                                            className="text-blue-600"
                                            size={30}
                                        />

                                    </div>

                                    <h3 className="text-4xl font-bold text-gray-900">
                                        {item.value}
                                        {item.suffix}
                                    </h3>
                                    <p className="font-semibold mt-3 text-lg">

                                        {item.title}

                                    </p>

                                    <p className="text-gray-500 mt-2 leading-7">

                                        {item.description}

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

export default Stats;