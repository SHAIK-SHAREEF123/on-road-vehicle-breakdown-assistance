import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let client = null;
let isConnected = false;

export const connectWebSocket = (onConnect) => {

    // Already connected
    if (client && isConnected) {

        if (onConnect) {
            onConnect(client);
        }

        return;
    }

    const socket = new SockJS("http://localhost:8080/ws");

    client = new Client({

        webSocketFactory: () => socket,

        reconnectDelay: 5000,

        onConnect: () => {

            console.log("✅ Connected");

            isConnected = true;

            if (onConnect) {
                onConnect(client);
            }

        },

        onStompError: (frame) => {

            console.error(frame);

        },

        onDisconnect: () => {

            isConnected = false;

            console.log("❌ Disconnected");

        }

    });

    client.activate();

};

export const disconnectWebSocket = () => {

    if (client) {

        client.deactivate();

        client = null;

        isConnected = false;

    }

};

export const getClient = () => client;