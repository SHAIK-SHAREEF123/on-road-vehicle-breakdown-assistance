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

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/user" element={<ProtectedRoute allowedRole="USER"> <UserDashboard /> </ProtectedRoute> } />
      <Route path="/mechanic" element={<ProtectedRoute allowedRole="MECHANIC"><MechanicDashboard /> </ProtectedRoute>} />\

      <Route path="/breakdown-request" element={<BreakdownRequest />} />

    </Routes>
  );
}

export default App;