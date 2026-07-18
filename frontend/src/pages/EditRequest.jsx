import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../axiosConfig";
import { ArrowLeft } from "lucide-react";

const EditRequest = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        vehicleType: "",
        issue: "",
        description: "",
        location: "",
    });

    const [loading, setLoading] = useState(true);

    const fetchRequest = async () => {
        try {

            const response = await axios.get(`/api/breakdown/${id}`);

            setForm({
                vehicleType: response.data.vehicleType,
                issue: response.data.issue,
                description: response.data.description,
                location: response.data.location,
            });

        } catch (error) {
            console.log(error);
            alert("Unable to load request");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequest();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await axios.put(`/api/breakdown/${id}`, form);

            alert("Request Updated Successfully");

            navigate(`/request/${id}`);

        } catch (error) {
            console.log(error);
            alert("Unable to update request");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2 className="text-2xl font-semibold">
                    Loading...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-3xl mx-auto py-10 px-6">

                <Link
                    to={`/request/${id}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
                >
                    <ArrowLeft size={20} />
                    Back
                </Link>

                <div className="bg-white shadow-xl rounded-2xl p-8">

                    <h1 className="text-3xl font-bold mb-8">
                        Edit Breakdown Request
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <div>
                            <label className="block mb-2 font-medium">
                                Vehicle Type
                            </label>

                            <input
                                type="text"
                                name="vehicleType"
                                value={form.vehicleType}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Issue
                            </label>

                            <input
                                type="text"
                                name="issue"
                                value={form.issue}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Description
                            </label>

                            <textarea
                                rows="4"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 resize-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3"
                                required
                            />
                        </div>

                        <div className="flex gap-4">

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                            >
                                Update Request
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(`/request/${id}`)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditRequest;