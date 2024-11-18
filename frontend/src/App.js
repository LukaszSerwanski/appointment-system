import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminCalendar from "./components/AdminCalendar";
import AppointmentForm from "./components/AppointmentForm";

function App() {
    return (
        <Router
            future={{
                v7_startTransition: true, // Flaga dla startTransition
                v7_relativeSplatPath: true, // Flaga dla relativeSplatPath
            }}
        >
            <Routes>
                {/* Strona główna - Formularz dla klientów */}
                <Route path="/" element={<AppointmentForm />} />

                {/* Logowanie administratora */}
                <Route path="/login" element={<Login />} />

                {/* Kalendarz administratora */}
                <Route path="/admin-calendar" element={<AdminCalendar />} />
            </Routes>
        </Router>
    );
}

export default App;
