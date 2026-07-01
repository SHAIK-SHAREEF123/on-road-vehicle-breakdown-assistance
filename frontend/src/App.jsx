import { useEffect, useState } from "react";
import { connectSocket } from "./socket";

import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import UserDashboard from "./pages/UserDashboard";
import MechanicDashboard from "./MechanicDashboard";
import ProtectedRoute from "./ProtectedRoute";

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
      <Route path="/user" element={<UserDashboard /> } />
      <Route path="/mechanic" element={<ProtectedRoute allowedRole="MECHANIC"><MechanicDashboard /> </ProtectedRoute>} />
    </Routes>
  );
}

export default App;