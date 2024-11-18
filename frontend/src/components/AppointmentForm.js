import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link do obsługi przycisków nawigacyjnych
import "../styles/AppointmentForm.css";

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postal_code: "",
        service_type: "montaż okien",
        preferred_date: "",
        photo: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/appointments",
                formDataToSend,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log("Odpowiedź z serwera:", response.data);
            alert(response.data.message || "Wizyta została umówiona!");
        } catch (error) {
            console.error("Błąd podczas przesyłania danych:", error.response?.data || error.message);
            alert("Wystąpił błąd przy umawianiu wizyty.");
        }
    };

    return (
        <div className="appointment-form-container">
            <h2>Umów Wizytę</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Imię i nazwisko"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Adres e-mail"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Numer telefonu"
                    onChange={handleChange}
                />
                <div className="address-group">
                    <input
                        type="text"
                        name="address"
                        placeholder="Adres montażu"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="Miasto"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="postal_code"
                        placeholder="Kod pocztowy"
                        onChange={handleChange}
                    />
                </div>
                <select name="service_type" onChange={handleChange}>
                    <option value="montaż okien">Montaż okien</option>
                    <option value="montaż drzwi">Montaż drzwi</option>
                    <option value="inne">Inne</option>
                </select>
                <input
                    type="datetime-local"
                    name="preferred_date"
                    onChange={handleChange}
                />
                <input type="file" name="photo" onChange={handleFileChange} />
                <button type="submit">Umów wizytę</button>
            </form>

            {/* Przycisk do panelu logowania administratora */}
            <Link to="/login" className="admin-panel-button">
                Przejdź do panelu administratora
            </Link>
        </div>
    );
};

export default AppointmentForm;
