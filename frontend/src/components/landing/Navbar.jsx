import { useState } from "react";
import { Menu, X, Wrench, LifeBuoy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const [mobileOpen, setMobileOpen] = useState(false);

    return (

        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex justify-between items-center h-20">

                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => navigate("/")}
                    >

                        <div className="bg-blue-600 rounded-xl p-2">

                            <Wrench className="text-white w-6 h-6"/>
                            {/* <LifeBuoy className="text-white" size={22} /> */}

                        </div>

                        <div>

                            <h1 className="font-bold text-xl">

                                RoadRescue

                            </h1>

                            <p className="text-xs text-gray-500">

                                Breakdown Assistance

                            </p>

                        </div>

                    </div>

                    <div className="hidden md:flex items-center gap-8">

                        <a href="#features"
                            className="hover:text-blue-600 transition">

                            Features

                        </a>

                        <a href="#how"

                            className="hover:text-blue-600 transition">

                            How It Works

                        </a>

                        <a href="#faq"

                            className="hover:text-blue-600 transition">

                            FAQ

                        </a>

                        <button

                            onClick={() => navigate("/login")}

                            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg text-white"

                        >

                            Login

                        </button>

                    </div>

                    <button

                        className="md:hidden"

                        onClick={() => setMobileOpen(!mobileOpen)}

                    >

                        {

                            mobileOpen

                            ?

                            <X/>

                            :

                            <Menu/>

                        }

                    </button>

                </div>

            </div>

            {

                mobileOpen &&

                <div className="md:hidden bg-white shadow-lg">

                    <div className="flex flex-col p-5 gap-4">

                        <a href="#features">Features</a>

                        <a href="#how">How It Works</a>

                        <a href="#faq">FAQ</a>

                        <button

                            onClick={() => navigate("/login")}

                            className="bg-blue-600 rounded-lg py-2 text-white"

                        >

                            Login

                        </button>

                    </div>

                </div>

            }

        </nav>

    );

};

export default Navbar;