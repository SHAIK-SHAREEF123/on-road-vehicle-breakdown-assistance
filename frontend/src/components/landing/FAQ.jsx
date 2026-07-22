import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How do I request roadside assistance?",
        answer:
            "Log in to your account, enter your vehicle details, select your current location, describe the issue, and submit your breakdown request. Nearby mechanics will receive your request instantly."
    },
    {
        question: "How are mechanics notified?",
        answer:
            "Mechanics receive real-time notifications through WebSockets whenever a new breakdown request is created, allowing them to respond quickly."
    },
    {
        question: "Can I track my request status?",
        answer:
            "Yes. You can monitor the status of your request, such as Pending, Accepted, In Progress, or Completed, directly from your dashboard."
    },
    {
        question: "Is my location secure?",
        answer:
            "Yes. Your location is only used to identify nearby mechanics and help them reach you efficiently. It is not shared for any other purpose."
    },
    {
        question: "Can mechanics manage multiple requests?",
        answer:
            "Mechanics can view available requests, accept a request, and manage their assigned breakdown services from their dashboard."
    },
    {
        question: "Who can use RoadRescue?",
        answer:
            "RoadRescue supports three types of users: Vehicle Owners (Users), Mechanics, and Administrators. Each role has its own dashboard and permissions."
    }
];

const FAQ = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            id="faq"
            className="py-24 bg-gray-50"
        >
            <div className="max-w-4xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <h2 className="text-4xl font-bold text-gray-900">
                        Frequently Asked Questions
                    </h2>

                    <p className="mt-4 text-lg text-gray-600">
                        Find answers to the most common questions about RoadRescue.
                    </p>
                </motion.div>

                <div className="space-y-4">

                    {faqs.map((faq, index) => (

                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                        >

                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                            >

                                <span className="font-semibold text-gray-800">
                                    {faq.question}
                                </span>

                                <ChevronDown
                                    size={20}
                                    className={`text-blue-600 transition-transform duration-300 ${
                                        openIndex === index ? "rotate-180" : ""
                                    }`}
                                />

                            </button>

                            <AnimatePresence>

                                {openIndex === index && (

                                    <motion.div
                                        initial={{
                                            height: 0,
                                            opacity: 0
                                        }}
                                        animate={{
                                            height: "auto",
                                            opacity: 1
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0
                                        }}
                                        transition={{
                                            duration: 0.3
                                        }}
                                    >

                                        <p className="px-6 pb-5 text-gray-600 leading-7">
                                            {faq.answer}
                                        </p>

                                    </motion.div>

                                )}

                            </AnimatePresence>

                        </motion.div>

                    ))}

                </div>

            </div>
        </section>
    );
};

export default FAQ;