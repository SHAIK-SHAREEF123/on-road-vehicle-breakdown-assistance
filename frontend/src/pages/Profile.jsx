import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import DashboardHeader from "../components/DashboardHeader";
import { Link } from "react-router-dom";

import {
    UserCircle2,
    Mail,
    Phone,
    Shield,
    Pencil,
    CalendarDays,
} from "lucide-react";

const Profile = () => {

    const [user, setUser] = useState(null);

    const fetchProfile = async () => {

        try {

            const response = await axios.get("/api/auth/profile");

            setUser(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchProfile();

    }, []);

    if (!user) {

        return (

            <>
                <DashboardHeader />

                <div className="flex justify-center items-center h-[80vh]">

                    Loading...

                </div>

            </>

        );

    }

    return (

        <>

            <DashboardHeader />

            <div className="min-h-screen bg-gray-100 py-10">

                <div className="max-w-4xl mx-auto">

                    {/* Profile Card */}

                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <div className="flex flex-col md:flex-row justify-between items-center">

                            <div className="flex items-center gap-6">

                                <UserCircle2
                                    size={110}
                                    className="text-blue-600"
                                />

                                <div>

                                    <h1 className="text-3xl font-bold">

                                        {user.name}

                                    </h1>

                                    <p className="text-gray-500">

                                        {user.role}

                                    </p>

                                </div>

                            </div>

                            <Link
                                to="/edit-profile"
                                className="mt-5 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                            >

                                <Pencil size={18} />

                                Edit Profile

                            </Link>

                        </div>

                    </div>

                    {/* Personal Information */}

                    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

                        <h2 className="text-2xl font-semibold mb-6">

                            Personal Information

                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div className="flex gap-4">

                                <Mail className="text-blue-600" />

                                <div>

                                    <p className="text-gray-500">

                                        Email

                                    </p>

                                    <p className="font-medium">

                                        {user.email}

                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-4">

                                <Phone className="text-green-600" />

                                <div>

                                    <p className="text-gray-500">

                                        Phone Number

                                    </p>

                                    <p className="font-medium">

                                        {user.phoneNumber}

                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-4">

                                <Shield className="text-orange-600" />

                                <div>

                                    <p className="text-gray-500">

                                        Role

                                    </p>

                                    <p className="font-medium">

                                        {user.role}

                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-4">

                                <CalendarDays className="text-purple-600" />

                                <div>

                                    <p className="text-gray-500">

                                        Account Status

                                    </p>

                                    <p className="font-medium text-green-600">

                                        Active

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

};

export default Profile;