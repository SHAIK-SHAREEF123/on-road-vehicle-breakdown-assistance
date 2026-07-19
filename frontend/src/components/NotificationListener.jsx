import { useEffect } from "react";
import toast from "react-hot-toast";

import { connectWebSocket } from "../services/websocket";
import { useNotifications } from "../context/NotificationContext";

const NotificationListener = () => {

    const { addNotification } = useNotifications();

    useEffect(() => {

        const role = localStorage.getItem("role");
        const email = localStorage.getItem("email");

        if (!role || !email) return;

        let personalSubscription;
        let mechanicSubscription;

        connectWebSocket((client) => {

            // Personal notifications
            personalSubscription = client.subscribe(
                `/topic/notifications/${email}`,
                (message) => {

                    const notification = JSON.parse(message.body);

                    console.log("Mechanic Notification Received:",notification);
                    
                    addNotification(notification);

                    switch (notification.type) {

                        case "SUCCESS":
                            toast.success(notification.message);
                            break;

                        case "ERROR":
                            toast.error(notification.message);
                            break;

                        case "INFO":
                            toast(notification.message);
                            break;

                        default:
                            toast(notification.message);

                    }

                }
            );

            // Notifications for all mechanics
            if (role === "MECHANIC") {

                mechanicSubscription = client.subscribe(
                    "/topic/mechanics",
                    (message) => {

                        const notification = JSON.parse(message.body);

                        addNotification(notification);

                        toast(notification.message);

                    }
                );

            }

        });

        return () => {

            if (personalSubscription) {
                personalSubscription.unsubscribe();
            }

            if (mechanicSubscription) {
                mechanicSubscription.unsubscribe();
            }

        };

    }, [addNotification]);

    return null;

};

export default NotificationListener;