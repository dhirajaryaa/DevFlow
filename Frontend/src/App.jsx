import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <main className="w-full h-full ">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>

        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
