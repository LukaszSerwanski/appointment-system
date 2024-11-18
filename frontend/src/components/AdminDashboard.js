import React from "react";
import AdminCalendar from "./AdminCalendar"; // Import komponentu kalendarza
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard-container">
            <h1>Panel Administratora</h1>
            <p>Witaj, administratorze! Zarządzaj swoimi wizytami w kalendarzu poniżej.</p>
            <AdminCalendar /> {/* Wyświetlanie kalendarza */}
        </div>
    );
};

export default AdminDashboard;
