import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notifications, setNotifications] = useState(() => {

        const storedNotifications =
            localStorage.getItem("notifications");

        return storedNotifications
            ? JSON.parse(storedNotifications)
            : [];

    });

    const addNotification = (notification) => {

        // console.log("Adding notification : ", notification);

        setNotifications(prev => [
            {
                id: Date.now(),
                isRead: false,
                time: new Date().toISOString(),
                ...notification,
            },
            ...prev,
        ]);

    };

    const markAsRead = (id) => {

        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, isRead: true }
                    : notification
            )
        );

    };

    const markAllAsRead = () => {

        setNotifications(prev =>
            prev.map(notification => ({
                ...notification,
                isRead: true,
            }))
        );

    };

    const clearNotifications = () => {

        setNotifications([]);

    };

    const deleteNotification = (id) => {

        setNotifications(prev =>
            prev.filter(notification =>
                notification.id !== id
            )
        );

    };

    const unreadCount =
        notifications.filter(n => !n.isRead).length;

    useEffect(() => {

        localStorage.setItem(
            "notifications",
            JSON.stringify(notifications)
        );

    }, [notifications]);

    return (

        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                markAsRead,
                markAllAsRead,
                clearNotifications,
                deleteNotification,
                unreadCount,
            }}
        >
            {children}
        </NotificationContext.Provider>

    );

};

export const useNotifications = () =>
    useContext(NotificationContext);