import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { Moon } from "lucide-react";

const Settings = () => {

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {

        if (darkMode) {

            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");

            toast("🌙 Dark mode enabled");

        } else {

            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");

            toast("☀️ Light mode enabled");

        }

    }, [darkMode]);

    return (

        <>
            <DashboardHeader />

            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">

                <div className="max-w-3xl mx-auto py-10 px-6">

                    <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
                        Settings
                    </h1>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-4">

                                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full">

                                    <Moon className="text-indigo-600" />

                                </div>

                                <div>

                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                        Dark Mode
                                    </h2>

                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        Enable dark theme for the application.
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
                                    darkMode
                                        ? "bg-indigo-600"
                                        : "bg-gray-300"
                                }`}
                            >

                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                                        darkMode
                                            ? "translate-x-8"
                                            : "translate-x-1"
                                    }`}
                                />

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

};

export default Settings;