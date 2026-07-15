import { useNavigate } from "react-router-dom";

const MechanicDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirm = window.confirm("Are you sure you want to logout?");
        if (!confirm) return;

        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="p-6">

            {/* 🔥 Top Bar */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Mechanic Dashboard 🔧</h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            {/* Your content */}
            <p>Live breakdown requests will appear here.</p>

        </div>
    );
};

export default MechanicDashboard;