import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let client = null;

export const connectWebSocket = (onConnect) => {

    const socket = new SockJS("http://localhost:8080/ws");

    client = new Client({

        webSocketFactory: () => socket,

        reconnectDelay: 5000,

        onConnect: () => {

            console.log("✅ Connected");

            onConnect(client);

        },

        onStompError: (frame) => {

            console.log(frame);

        }

    });

    client.activate();

};

export const disconnectWebSocket = () => {

    if (client) {

        client.deactivate();

    }

};

export const getClient = () => client;