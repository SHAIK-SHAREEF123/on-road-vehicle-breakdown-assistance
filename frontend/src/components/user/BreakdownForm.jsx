import { useState } from "react";
import { MapPin, Send, Loader2 } from "lucide-react";
import axios from "../../axiosConfig";

const BreakdownForm = ({ addRequest }) => {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        vehicleType: "",
        issue: "",
        description: "",
        location: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Get Current Location
    const getCurrentLocation = () => {

        if (!navigator.geolocation) {
            alert("Geolocation is not supported.");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setForm((prev) => ({
                    ...prev,
                    location: `${lat}, ${lng}`,
                }));

            },

            () => {
                alert("Unable to fetch location.");
            }

        );
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await axios.post(
                "/api/breakdown/create",
                form
            );

            addRequest({
                id: Date.now(),
                ...form,
                status: "Searching Mechanic",
                createdAt: "Just Now",
            });

            alert("Request Sent Successfully ✅");

            console.log(response.data);

            setForm({
                vehicleType: "",
                issue: "",
                description: "",
                location: "",
            });

        } catch (error) {

            console.log(error);

            alert("Failed to send request ❌");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6">

                🚗 Create Breakdown Request

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Vehicle */}

                <div>

                    <label className="font-medium">

                        Vehicle Type

                    </label>

                    <select
                        name="vehicleType"
                        value={form.vehicleType}
                        onChange={handleChange}
                        className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                        required
                    >

                        <option value="">Select Vehicle</option>

                        <option>Bike</option>

                        <option>Car</option>

                        <option>SUV</option>

                        <option>Truck</option>

                        <option>Bus</option>

                    </select>

                </div>

                {/* Issue */}

                <div>

                    <label className="font-medium">

                        Issue Type

                    </label>

                    <select
                        name="issue"
                        value={form.issue}
                        onChange={handleChange}
                        className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                        required
                    >

                        <option value="">Select Issue</option>

                        <option>Flat Tire</option>

                        <option>Battery Dead</option>

                        <option>Engine Failure</option>

                        <option>Fuel Empty</option>

                        <option>Brake Failure</option>

                        <option>Accident</option>

                        <option>Other</option>

                    </select>

                </div>

                {/* Description */}

                <div>

                    <label className="font-medium">

                        Description

                    </label>

                    <textarea
                        rows={4}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe your problem..."
                        className="w-full mt-2 border rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Location */}

                <div>

                    <label className="font-medium">

                        Location

                    </label>

                    <div className="flex gap-3 mt-2">

                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Enter location"
                            className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <button
                            type="button"
                            onClick={getCurrentLocation}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg flex items-center justify-center"
                        >

                            <MapPin size={20} />

                        </button>

                    </div>

                </div>

                {/* Submit */}

                <button
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2"
                >

                    {loading ? (
                        <>
                            <Loader2
                                className="animate-spin"
                                size={20}
                            />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send size={20} />
                            Send Request
                        </>
                    )}

                </button>

            </form>

        </div>

    );
};

export default BreakdownForm;