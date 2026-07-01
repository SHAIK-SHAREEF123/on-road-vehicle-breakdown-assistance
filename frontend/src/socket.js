import { Client } from "@stomp/stompjs";

let client = null;

export const connectSocket = (onMessageReceived) => {

    if (client && client.active) {
        return; // prevent multiple connections
    }

    client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        reconnectDelay: 5000,

        onConnect: () => {
            console.log("✅ Connected to WebSocket");

            // safe subscribe
            try {
                client.subscribe("/topic/requests", (message) => {
                    const data = JSON.parse(message.body);
                    onMessageReceived(data);
                });

                client.subscribe("/topic/accepted", (message) => {
                    const data = JSON.parse(message.body);
                    onMessageReceived(data);
                });
            } catch (e) {
                console.error("Subscribe error:", e);
            }
        }
    });

    client.activate();
};