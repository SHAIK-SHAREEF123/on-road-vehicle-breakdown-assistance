import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* 🔥 HERO SECTION */}
            <div className="flex flex-col items-center justify-center text-center py-20 px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    🚗 Vehicle Breakdown Assistance
                </h1>

                <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                    Get instant help from nearby mechanics in real-time. No waiting, no stress.
                </p>

                <div className="mt-6 flex gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow" onClick={() => navigate("/login")}>
                        Login as User
                    </button>

                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow" onClick={() => navigate("/login")}>
                        Login as Mechanic
                    </button>
                </div>
            </div>

            {/* ⚡ HOW IT WORKS */}
            <div className="py-16 px-6 bg-white">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                    How It Works
                </h2>

                <div className="grid md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl">📱</div>
                        <p className="mt-3 font-semibold">Create Request</p>
                        <p className="text-gray-500 text-sm">User submits breakdown details</p>
                    </div>

                    <div>
                        <div className="text-4xl">📡</div>
                        <p className="mt-3 font-semibold">Real-time Alert</p>
                        <p className="text-gray-500 text-sm">Mechanics get notified instantly</p>
                    </div>

                    <div>
                        <div className="text-4xl">🔧</div>
                        <p className="mt-3 font-semibold">Mechanic Accepts</p>
                        <p className="text-gray-500 text-sm">Nearby mechanic takes the job</p>
                    </div>

                    <div>
                        <div className="text-4xl">🚀</div>
                        <p className="mt-3 font-semibold">Help Arrives</p>
                        <p className="text-gray-500 text-sm">Problem gets resolved quickly</p>
                    </div>
                </div>
            </div>

            {/* 🎯 FEATURES */}
            <div className="py-16 px-6">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                    Why Choose Us
                </h2>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="font-semibold text-lg">⚡ Real-time Updates</h3>
                        <p className="text-gray-500 mt-2">
                            Instant notifications using WebSockets
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="font-semibold text-lg">📍 Nearby Mechanics</h3>
                        <p className="text-gray-500 mt-2">
                            Find mechanics close to your location
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="font-semibold text-lg">🔒 Secure & Reliable</h3>
                        <p className="text-gray-500 mt-2">
                            Safe and efficient service system
                        </p>
                    </div>
                </div>
            </div>

            {/* 🚀 FOOTER CTA */}
            <div className="bg-blue-600 text-white text-center py-10">
                <h2 className="text-2xl font-bold">
                    Need help right now?
                </h2>

                <p className="mt-2">
                    Connect with mechanics instantly 🚗
                </p>

                <button className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">
                    Get Started
                </button>
            </div>

        </div>
    );
};

export default Home;