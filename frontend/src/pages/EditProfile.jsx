import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import DashboardHeader from "../components/DashboardHeader";
import { User, Phone, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
    });

    const fetchProfile = async () => {

        try {

            const response = await axios.get("/api/auth/profile");

            setFormData({
                name: response.data.name,
                phoneNumber: response.data.phoneNumber,
            });

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchProfile();

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                "/api/auth/update-profile",
                formData
            );

            localStorage.setItem("name", formData.name);

            toast.success("Profile Updated Successfully");

            navigate("/profile");

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <DashboardHeader />

            <div className="min-h-screen bg-gray-100 py-10">

                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                    <h1 className="text-3xl font-bold mb-8">

                        Edit Profile

                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <div>

                            <label className="font-medium">

                                Name

                            </label>

                            <div className="relative mt-2">

                                <User
                                    className="absolute left-4 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />

                            </div>

                        </div>

                        <div>

                            <label className="font-medium">

                                Phone Number

                            </label>

                            <div className="relative mt-2">

                                <Phone
                                    className="absolute left-4 top-3 text-gray-400"
                                />

                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />

                            </div>

                        </div>

                        <div className="flex justify-end gap-4">

                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
                            >

                                Cancel

                            </button>

                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                            >

                                <Save size={18} />

                                Save Changes

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </>

    );

};

export default EditProfile;