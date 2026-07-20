import { useEffect, useState } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
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

const DraggableMarker = ({
    position,
    setPosition,
    fetchAddress,
}) => {

    useMapEvents({

        click(e) {

            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            setPosition([lat, lng]);
            fetchAddress(lat, lng);

        }

    });
    return (

        <Marker
            draggable={true}
            position={position}
            icon={markerIcon}

            eventHandlers={{

                dragend(e) {

                    const marker = e.target.getLatLng();

                    setPosition([
                        marker.lat,
                        marker.lng,
                    ]);

                    fetchAddress(marker.lat, marker.lng);

                }

            }}

        >

            <Popup>

                Drag me or click anywhere on the map.

            </Popup>

        </Marker>

    );

};

const LocationPicker = ({ onLocationSelect }) => {

    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState("");

    useEffect(() => {

        const getCurrentLocation = () => {

            navigator.geolocation.getCurrentPosition(

                (position) => {

                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    console.log(latitude, longitude);

                    setPosition([latitude, longitude]);
                    fetchAddress(latitude, longitude);

                },

                (error) => {

                    console.log(error);

                    alert("Unable to fetch your location");

                },

                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }

            );

        };

        getCurrentLocation();

    }, []);

    const fetchAddress = async (lat, lng) => {

        try {

            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );

            const data = await response.json();

            setAddress(data.display_name);

            if (onLocationSelect) {
                onLocationSelect({
                    latitude: lat,
                    longitude: lng,
                    address: data.display_name,
                });
            }

        } catch (error) {
            console.log(error);
        }

    };

    if (!position) {

        return <h2>Loading Map...</h2>;

    }

    return (

        <>

            <MapContainer
                center={position}
                zoom={15}
                style={{
                    height: "500px",
                    width: "100%",
                    borderRadius: "15px",
                }}
            >

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <DraggableMarker
                    position={position}
                    setPosition={setPosition}
                    fetchAddress={fetchAddress}
                />

            </MapContainer>

            {/* Coordinates */}

            <div className="mt-4 bg-gray-100 p-4 rounded-lg">

                <h3 className="font-semibold">
                    Selected Coordinates
                </h3>

                <p>
                    Latitude: {position[0]}
                </p>

                <p>
                    Longitude: {position[1]}
                </p>

            </div>

            {/* Address */}

            <div className="mt-4 bg-blue-50 p-4 rounded-lg">

                <h3 className="font-semibold mb-2">
                    Selected Address
                </h3>

                <p className="text-gray-700 break-words">

                    {address || "Loading address..."}

                </p>

            </div>

        </>

    );

};

export default LocationPicker;