import { useState } from "react";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import LocationPicker from "../components/maps/LocationPicker";

const BreakdownRequest = () => {

    const [formData, setFormData] = useState({

        vehicleType: "",

        issue: "",

        description: "",

        location: "",

        latitude: "",

        longitude: "",

    });

    const [loading, setLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await axios.post(
                "/api/breakdown/create",
                formData
            );

            toast.success("Breakdown request submitted successfully.");

            // console.log(response.data);

            setFormData({
                vehicleType: "",
                issue: "",
                description: "",
                location: ""
            });

        } catch (error) {

            // console.error(error);

            toast.error("Failed to create request");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">

            <h1 className="text-3xl font-bold text-center mb-8">
                Create Breakdown Request
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Vehicle Type */}

                <div>

                    <label className="block mb-2 font-semibold">
                        Vehicle Type
                    </label>

                    <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    >

                        <option value="">
                            Select Vehicle
                        </option>

                        <option value="Bike">
                            Bike
                        </option>

                        <option value="Auto">
                            Auto
                        </option>

                        <option value="Car">
                            Car
                        </option>

                        <option value="SUV">
                            SUV
                        </option>

                        <option value="Truck">
                            Truck
                        </option>

                        <option value="Bus">
                            Bus
                        </option>

                        <option value="Lorry">
                            Lorry
                        </option>

                        <option value="Eicher">
                            Eicher
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>

                </div>

                {/* Issue */}

                <div>

                    <label className="block mb-2 font-semibold">
                        Issue
                    </label>

                    <input
                        type="text"
                        name="issue"
                        value={formData.issue}
                        onChange={handleChange}
                        placeholder="Example: Flat Tire"
                        className="w-full border rounded-lg p-3"
                        required
                    />

                </div>

                {/* Description */}

                <div>

                    <label className="block mb-2 font-semibold">
                        Description
                    </label>

                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your vehicle problem..."
                        className="w-full border rounded-lg p-3 resize-none"
                        required
                    />

                </div>

                {/* Location */}

                <div>

                    <label className="block mb-2 font-semibold">
                        Location
                    </label>

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter your location"
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <button
                        type="button"
                        onClick={() => setShowMap(!showMap)}
                        className="
        mt-2
        px-4
        py-2
        bg-green-600
        text-white
        rounded-lg
        hover:bg-green-700
    "
                    >
                        {showMap ? "Hide Map" : "Select on Map"}
                    </button>

                    {
                        showMap && (

                            <div className="mt-5">

                                <LocationPicker

                                    onLocationSelect={(location) => {

                                        setFormData(prev => ({

                                            ...prev,

                                            location: location.address,

                                            latitude: location.latitude,

                                            longitude: location.longitude,

                                        }));

                                    }}

                                />

                            </div>

                        )
                    }

                </div>

                {/* Submit Button */}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                >

                    {loading
                        ? "Sending Request..."
                        : "Create Request"}

                </button>

            </form>

        </div>

    );

};

export default BreakdownRequest;