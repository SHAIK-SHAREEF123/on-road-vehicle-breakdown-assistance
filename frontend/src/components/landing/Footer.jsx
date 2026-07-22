import { motion } from "framer-motion";
import {
    Car,
    Github,
    Linkedin,
    Mail,
    ArrowUp,
    LifeBuoy
} from "lucide-react";

const Footer = () => {

    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };

    return (

        <footer className="bg-gray-900 text-gray-300">

            <div className="max-w-7xl mx-auto px-6 py-16">

                <div className="grid lg:grid-cols-3 gap-12">

                    {/* ================= LEFT ================= */}

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-lg bg-blue-600 flex items-center justify-center">

                                <Car className="text-white" size={22} />

                            </div>

                            <div>

                                <h2 className="text-xl font-semibold text-white">

                                    RoadRescue

                                </h2>

                                <p className="text-sm text-gray-400">

                                    Vehicle Breakdown Assistance

                                </p>

                            </div>

                        </div>

                        <p className="mt-6 leading-7 text-gray-400">

                            RoadRescue helps vehicle owners quickly connect
                            with nearby mechanics through real-time
                            notifications and location-based assistance.

                        </p>

                    </div>

                    {/* ================= QUICK LINKS ================= */}

                    <div>

                        <h3 className="text-lg font-semibold text-white mb-5">

                            Quick Links

                        </h3>

                        <div className="flex flex-col gap-4">

                            <a
                                href="/"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Home
                            </a>

                            <a
                                href="#how-it-works"
                                className="hover:text-blue-400 transition-colors"
                            >
                                How It Works
                            </a>

                            <a
                                href="#features"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Features
                            </a>

                            <a
                                href="#faq"
                                className="hover:text-blue-400 transition-colors"
                            >
                                FAQ
                            </a>

                        </div>

                    </div>

                    {/* ================= CONTACT ================= */}

                    <div>

                        <h3 className="text-lg font-semibold text-white mb-5">

                            Connect

                        </h3>

                        <div className="flex flex-col gap-4">

                            <a
                                href="shareef08.2005@gmail.com"
                                className="flex items-center gap-3 hover:text-blue-400 transition-colors"
                            >

                                <Mail size={18} />

                                shareef.08.2005@gmail.com

                            </a>

                            <a
                                href="https://github.com/SHAIK-SHAREEF123/on-road-vehicle-breakdown-assistance"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 hover:text-blue-400 transition-colors"
                            >

                                <Github size={18} />

                                GitHub

                            </a>

                            <a
                                href="https://linkedin.com/in/yourprofilehttps://www.linkedin.com/in/shaik-shareef-917620288/"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 hover:text-blue-400 transition-colors"
                            >

                                <Linkedin size={18} />

                                LinkedIn

                            </a>

                        </div>

                    </div>

                </div>

                {/* ================= BOTTOM ================= */}

                <div className="border-t border-gray-800 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-sm text-gray-400">

                        © {new Date().getFullYear()} RoadRescue. All rights reserved.

                    </p>

                    <p className="text-sm text-gray-500">

                        Designed and developed using React, Spring Boot and MongoDB.

                    </p>

                    <motion.button

                        whileHover={{
                            scale: 1.1,
                        }}

                        whileTap={{
                            scale: 0.95,
                        }}

                        onClick={scrollToTop}

                        className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white cursor-pointer"

                    >

                        <ArrowUp size={20} />

                    </motion.button>

                </div>

            </div>

        </footer>

    );

};

export default Footer;