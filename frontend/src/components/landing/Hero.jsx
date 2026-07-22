import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock3, MapPinned } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {

    const navigate = useNavigate();

    return (

        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100 pt-36 pb-28">

            <div className="absolute w-96 h-96 bg-blue-300 rounded-full blur-[120px] opacity-30 -top-20 -left-20"/>

            <div className="absolute w-96 h-96 bg-indigo-300 rounded-full blur-[120px] opacity-30 bottom-0 right-0"/>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

                <motion.div

                    initial={{opacity:0,x:-50}}

                    animate={{opacity:1,x:0}}

                    transition={{duration:0.8}}

                >

                    <div className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-6">

                        🚗 Trusted by Hundreds of Drivers

                    </div>

                    <h1 className="text-6xl font-extrabold leading-tight text-gray-900">

                        Emergency

                        <span className="text-blue-600">

                            {" "}Roadside

                        </span>

                        <br/>

                        Assistance

                    </h1>

                    <p className="text-gray-600 text-xl mt-8 leading-9">

                        Get connected with nearby verified mechanics instantly.

                        Track their live location,

                        receive real-time updates,

                        and get back on the road faster.

                    </p>

                    <div className="flex gap-5 mt-10 flex-wrap">

                        <button

                            onClick={() => navigate("/login")}

                            className="bg-blue-600 hover:scale-105 transition-all text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2"

                        >

                            Request Help

                            <ArrowRight/>

                        </button>

                        <button

                            onClick={() => navigate("/login")}

                            className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition"

                        >

                            Become a Mechanic

                        </button>

                    </div>

                    <div className="grid grid-cols-3 gap-8 mt-12">

                        <div>

                            <ShieldCheck className="text-blue-600"/>

                            <p className="font-semibold mt-2">

                                Secure

                            </p>

                        </div>

                        <div>

                            <Clock3 className="text-green-600"/>

                            <p className="font-semibold mt-2">

                                Fast Response

                            </p>

                        </div>

                        <div>

                            <MapPinned className="text-red-600"/>

                            <p className="font-semibold mt-2">

                                Live Tracking

                            </p>

                        </div>

                    </div>

                </motion.div>

                <motion.div

                    initial={{opacity:0,x:50}}

                    animate={{opacity:1,x:0}}

                    transition={{duration:0.8}}

                    className="relative"

                >

                    <img

                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000"

                        alt="Hero"

                        className="rounded-3xl shadow-2xl"

                    />

                    <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-5">

                        <p className="font-bold text-3xl">

                            500+

                        </p>

                        <p className="text-gray-500">

                            Verified Mechanics

                        </p>

                    </div>

                </motion.div>

            </div>

        </section>

    );

};

export default Hero;