import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const mechanicIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const RequestLocationMap = ({
    latitude,
    longitude,
    mechanicLatitude,
    mechanicLongitude,
    address,
}) => {

    const [mechanicPosition, setMechanicPosition] = useState(null);
    const [route, setRoute] = useState([]);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);

    if (!latitude || !longitude) {
        return (
            <div className="text-red-500">
                Location not available
            </div>
        );
    }

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(

            (position) => {

                setMechanicPosition([
                    position.coords.latitude,
                    position.coords.longitude,
                ]);

            },

            (error) => {
                console.log(error);
            },

            {
                enableHighAccuracy: true,
            }

        );

    }, []);

    useEffect(() => {

        if (!mechanicLatitude || !mechanicLongitude) return;

        const fetchRoute = async () => {

            try {

                const response = await fetch(

                    `https://router.project-osrm.org/route/v1/driving/${mechanicLongitude},${mechanicLatitude};${longitude},${latitude}?overview=full&geometries=geojson`

                );

                const data = await response.json();

                if (data.routes.length > 0) {

                    const coordinates =
                        data.routes[0].geometry.coordinates.map(
                            point => [
                                point[1],
                                point[0],
                            ]
                        );

                    setRoute(coordinates);
                    setDistance(
                        (
                            data.routes[0].distance / 1000
                        ).toFixed(2)
                    );

                    setDuration(

                        Math.ceil(

                            data.routes[0].duration / 60

                        )

                    );

                }

            } catch (error) {

                console.log(error);

            }

        };

        fetchRoute();

    }, [
        mechanicLatitude,
        mechanicLongitude,
        latitude,
        longitude
    ]);


    return (

        <MapContainer
            center={[latitude, longitude]}
            zoom={16}
            style={{
                height: "350px",
                width: "100%",
                borderRadius: "12px",
            }}
        >

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
                position={[latitude, longitude]}
                icon={markerIcon}
            >

                <Popup>

                    {address}

                </Popup>

            </Marker>

            {mechanicLatitude && mechanicLongitude && (

                <Marker
                    position={[
                        mechanicLatitude,
                        mechanicLongitude
                    ]}
                    icon={mechanicIcon}
                >

                    <Popup>

                        Mechanic Live Location

                    </Popup>

                </Marker>

            )}

            {route.length > 0 && (

                <Polyline
                    positions={route}
                    color="blue"
                    weight={5}
                />

            )}

        </MapContainer>

    );

};

export default RequestLocationMap;