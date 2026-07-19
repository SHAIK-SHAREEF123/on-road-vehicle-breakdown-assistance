import { useState, useRef, useEffect } from "react";
import {
    Bell,
    UserCircle2,
    Car,
    Wrench,
    User,
    Settings,
    KeyRound,
    LogOut,
    ChevronDown,
    Home,
} from "lucide-react";

import { useNavigate, Link } from "react-router-dom";
import { disconnectWebSocket } from "../services/websocket";
import NotificationDropdown from "./NotificationDropdown";
import { useNotifications } from "../context/NotificationContext";

const DashboardHeader = () => {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    const isMechanic = role === "MECHANIC";

    const [showMenu, setShowMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const { unreadCount } = useNotifications();

    const menuRef = useRef(null);
    const notificationRef = useRef(null);


    const handleClickOutside = (event) => {

        if (
            menuRef.current &&
            !menuRef.current.contains(event.target)
        ) {
            setShowMenu(false);
        }

        if (
            notificationRef.current &&
            !notificationRef.current.contains(event.target)
        ) {
            setShowNotifications(false);
        }

    };

    const handleLogout = () => {

        disconnectWebSocket();
        localStorage.clear();
        navigate("/login");

    };

    const homeRoute =
        role === "MECHANIC"
            ? "/mechanic"
            : "/user";

    useEffect(() => {

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);

    return (

        <header className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}

                <div className="flex items-center gap-3">

                    <div
                        className={`p-2 rounded-xl ${isMechanic
                            ? "bg-orange-600"
                            : "bg-blue-600"
                            }`}
                    >

                        {isMechanic ? (
                            <Wrench
                                className="text-white"
                                size={28}
                            />
                        ) : (
                            <Car
                                className="text-white"
                                size={28}
                            />
                        )}

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-gray-800">
                            RoadAssist
                        </h1>

                        <p className="text-sm text-gray-500">

                            {isMechanic
                                ? "Mechanic Dashboard"
                                : "Vehicle Breakdown Assistance"}

                        </p>

                    </div>

                </div>

                <Link
                    to={homeRoute}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                    <Home
                        size={20}
                        className={isMechanic ? "text-orange-600" : "text-blue-600"}
                    />

                    <span className="text-gray-700 font-medium">
                        Home
                    </span>
                </Link>

                {/* Right */}

                <div className="flex items-center gap-6">

                    {/* Notification */}

                    <div
                        className="relative"
                        ref={notificationRef}
                    >

                        <button
                            onClick={() =>
                                setShowNotifications(!showNotifications)
                            }
                            className="relative hover:text-blue-600 transition"
                        >

                            <Bell size={24} />

                            {unreadCount > 0 && (

                                <span
                                    className="
                    absolute
                    -top-2
                    -right-2
                    bg-red-500
                    text-white
                    text-xs
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                "
                                >

                                    {unreadCount}

                                </span>

                            )}

                        </button>

                        {showNotifications && (
                            <NotificationDropdown />
                        )}

                    </div>

                    {/* Profile Dropdown */}

                    <div
                        className="relative"
                        ref={menuRef}
                    >

                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="flex items-center gap-3 hover:bg-gray-100 rounded-xl px-3 py-2 transition"
                        >

                            <UserCircle2
                                size={42}
                                className={
                                    isMechanic
                                        ? "text-orange-600"
                                        : "text-blue-600"
                                }
                            />

                            <div className="text-left">

                                <h3 className="font-semibold">

                                    {isMechanic
                                        ? "Welcome 🔧"
                                        : "Welcome 👋"}

                                </h3>

                                <p className="text-sm font-medium">

                                    {name || "User"}

                                </p>

                                <p className="text-xs text-gray-400">

                                    {role}

                                </p>

                            </div>

                            <ChevronDown size={18} />

                        </button>

                        {showMenu && (

                            <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border overflow-hidden">

                                <Link
                                    to="/profile"
                                    onClick={() => setShowMenu(false)}
                                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                                >

                                    <User size={20} />

                                    My Profile

                                </Link>

                                <Link
                                    to="/settings"
                                    onClick={() => setShowMenu(false)}
                                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                                >

                                    <Settings size={20} />

                                    Settings

                                </Link>

                                <Link
                                    to="/change-password"
                                    onClick={() => setShowMenu(false)}
                                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100"
                                >

                                    <KeyRound size={20} />

                                    Change Password

                                </Link>

                                <hr />

                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600"
                                >

                                    <LogOut size={20} />

                                    Logout

                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </header>

    );

};

export default DashboardHeader;