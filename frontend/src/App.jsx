import { useEffect, useState } from "react";
import { connectSocket } from "./socket";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import MechanicDashboard from "./pages/MechanicDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BreakdownRequest from "./pages/ BreakdownRequest";
import RequestDetails from "./pages/RequestDetails";
import EditRequest from "./pages/EditRequest";
import MechanicRequestDetails from "./pages/MechanicRequestDetails";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";

function App() {
  const [requests, setRequests] = useState([]);

  // useEffect(() => {
  //   connectSocket((data) => {
  //     setRequests((prev) => {
  //       const exists = prev.find(r => r.id === data.id);

  //       if (exists) {
  //         return prev.map(r => r.id === data.id ? data : r);
  //       } else {
  //         return [data, ...prev];
  //       }
  //     });
  //   });
  // }, []);

  useEffect(() => {

    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/user" element={<ProtectedRoute allowedRole="USER"> <UserDashboard /> </ProtectedRoute>} />
      <Route path="/mechanic" element={<MechanicDashboard />} />

      <Route path="/create-request" element={<BreakdownRequest />} />
      <Route path="/request/:id" element={<RequestDetails />} />
      <Route path="/edit-request/:id" element={<EditRequest />} />

      <Route path="/mechanic/request/:id" element={<MechanicRequestDetails />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/edit-profile" element={<EditProfile />} />

    </Routes>
  );
}

export default App;