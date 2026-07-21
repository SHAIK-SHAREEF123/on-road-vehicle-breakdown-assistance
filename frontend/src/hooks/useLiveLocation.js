import { useEffect } from "react";
import axios from "../axiosConfig";

const useLiveLocation = (requestId, enabled) => {

    useEffect(() => {

        if (!requestId || !enabled) return;

        const sendLocation = () => {

            navigator.geolocation.getCurrentPosition(

                async (position) => {

                    try {

                        await axios.post(
                            "/api/breakdown/update-location",
                            {
                                requestId,
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            }
                        );

                    } catch (error) {

                        console.log(error);

                    }

                },

                (error) => {

                    console.log(error);

                },

                {
                    enableHighAccuracy: true,
                }

            );

        };

        // Send immediately
        sendLocation();

        // Send every 5 seconds
        const interval = setInterval(sendLocation, 5000);

        return () => clearInterval(interval);

    }, [requestId, enabled]);

};

export default useLiveLocation;