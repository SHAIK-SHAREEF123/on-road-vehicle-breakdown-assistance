import {
    Bell,
    CheckCheck,
    CheckCircle,
    AlertCircle,
    Info,
    Trash2,
    X
} from "lucide-react";

import { useNotifications } from "../context/NotificationContext";

const NotificationDropdown = () => {

    const {
        notifications,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        deleteNotification,
    } = useNotifications();

    // console.log(notifications);

    const getIcon = (type) => {

        switch (type) {

            case "SUCCESS":
                return (
                    <CheckCircle
                        size={18}
                        className="text-green-600"
                    />
                );

            case "ERROR":
                return (
                    <AlertCircle
                        size={18}
                        className="text-red-600"
                    />
                );

            default:
                return (
                    <Info
                        size={18}
                        className="text-blue-600"
                    />
                );
        }

    };

    const formatTime = (time) => {

        const now = new Date();
        const notificationTime = new Date(time);

        const diffInSeconds =
            Math.floor((now - notificationTime) / 1000);

        if (diffInSeconds < 60) {
            return "Just now";
        }

        const diffInMinutes =
            Math.floor(diffInSeconds / 60);

        if (diffInMinutes < 60) {

            return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""
                } ago`;

        }

        const diffInHours =
            Math.floor(diffInMinutes / 60);

        if (diffInHours < 24) {

            return `${diffInHours} hour${diffInHours > 1 ? "s" : ""
                } ago`;

        }

        const diffInDays =
            Math.floor(diffInHours / 24);

        if (diffInDays === 1) {
            return "Yesterday";
        }

        if (diffInDays < 7) {

            return `${diffInDays} days ago`;

        }

        return notificationTime.toLocaleString();

    };

    return (

        <div
            className="
                absolute
                right-0
                mt-3
                w-96
                bg-white
                rounded-xl
                shadow-2xl
                border
                z-50
            "
        >

            {/* Header */}

            <div
                className="
                    flex
                    justify-between
                    items-center
                    px-4
                    py-3
                    border-b
                "
            >

                <div className="flex items-center gap-2">

                    <Bell size={18} />

                    <h2 className="font-semibold">
                        Notifications
                    </h2>

                </div>

                {notifications.length > 0 && (

                    <div className="flex gap-3">

                        <button
                            onClick={markAllAsRead}
                            className="text-blue-600 text-sm hover:underline"
                        >

                            <CheckCheck
                                size={16}
                                className="inline"
                            />

                            {" "}Read All

                        </button>

                        <button
                            onClick={clearNotifications}
                            className="text-red-600 text-sm hover:underline"
                        >

                            <Trash2
                                size={16}
                                className="inline"
                            />

                            {" "}Clear

                        </button>

                    </div>

                )}

            </div>

            {/* Body */}

            <div className="max-h-96 overflow-y-auto">

                {
                    notifications.length === 0 ? (

                        <div className="py-8 text-center text-gray-500">

                            No notifications

                        </div>

                    ) : (

                        notifications.map((notification) => (

                            <div
                                key={notification.id}
                                onClick={() =>
                                    markAsRead(notification.id)
                                }
                                className={`
                                    flex
                                    gap-3
                                    p-4
                                    border-b
                                    cursor-pointer
                                    hover:bg-gray-50
                                    transition

                                    ${notification.isRead
                                        ? "bg-white"
                                        : "bg-blue-50"
                                    }
                                `}
                            >

                                <div>

                                    {getIcon(notification.type)}

                                </div>

                                <div className="flex-1">

                                    <p className="text-sm font-medium">

                                        {notification.message}

                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">

                                        {formatTime(notification.time)}

                                    </p>

                                </div>

                                <button
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        deleteNotification(notification.id);

                                    }}
                                    className="
        text-gray-400
        hover:text-red-500
        transition
    "
                                >

                                    <X size={16} />

                                </button>

                            </div>

                        ))

                    )
                }

            </div>

        </div>

    );

};

export default NotificationDropdown;