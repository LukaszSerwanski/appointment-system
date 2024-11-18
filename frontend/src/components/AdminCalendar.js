import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import "../styles/AdminCalendar.css";

const AdminCalendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null); // Data kliknięta w kalendarzu
    const [tasks, setTasks] = useState([]); // Zadania na kliknięty dzień
    const [showTasks, setShowTasks] = useState(false);

    // Pobieranie danych z API
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/appointments")
            .then((response) => {
                const eventsData = response.data.map((appointment) => ({
                    title: `${appointment.name} - ${appointment.service_type}`,
                    start: appointment.preferred_date,
                    extendedProps: {
                        address: `${appointment.address}, ${appointment.city}, ${appointment.postal_code}`,
                        time: new Date(appointment.preferred_date).toLocaleTimeString("pl-PL", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                    },
                }));
                setEvents(eventsData);
            })
            .catch((error) => console.error("Error fetching appointments:", error));
    }, []);

    // Obsługa kliknięcia w dzień kalendarza
    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr);
        setShowTasks(false);

        // Pobierz zadania dla wybranej daty z API
        axios
            .get(`http://127.0.0.1:8000/api/appointments?date=${info.dateStr}`)
            .then((response) => {
                setTasks(response.data);
                setShowTasks(true);
            })
            .catch((error) => console.error("Error fetching tasks for date:", error));
    };

    // Niestandardowe renderowanie zawartości wydarzenia
    const eventContent = (eventInfo) => (
        <div>
            <b>{eventInfo.event.title}</b>
            <br />
            <span>{eventInfo.event.extendedProps.address}</span>
            <br />
            <span>{eventInfo.event.extendedProps.time}</span>
        </div>
    );

    return (
        <div className="calendar-container">
            <h1>Kalendarz Wizyt</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventContent={eventContent} // Renderowanie niestandardowych danych wydarzeń
                dateClick={handleDateClick} // Kliknięcie w dzień
            />

            {showTasks && (
                <div className="task-list">
                    <h2>Zadania na dzień: {selectedDate}</h2>
                    {tasks.length > 0 ? (
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id}>
                                    <strong>{task.name}</strong> - {task.service_type}
                                    <br />
                                    <strong>Adres:</strong> {task.address}, {task.city}
                                    <br />
                                    <strong>Godzina:</strong>{" "}
                                    {new Date(task.preferred_date).toLocaleTimeString("pl-PL", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Brak zadań na ten dzień.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminCalendar;
