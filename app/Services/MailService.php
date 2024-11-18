<?php

namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MailService
{
    public static function sendAppointmentConfirmation($appointment)
    {
        $mail = new PHPMailer(true);

        try {
            // Konfiguracja SMTP
            $mail->isSMTP();
            $mail->Host = 'sandbox.smtp.mailtrap.io'; // Host Mailtrap
            $mail->SMTPAuth = true;
            $mail->Username = ''; // Username z Mailtrap
            $mail->Password = ''; // Password z Mailtrap
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Nadawca i odbiorca
            $mail->setFrom('no-reply@example.com', 'System Wizyta');
            $mail->addAddress($appointment->email, $appointment->name);

            // Treść wiadomości
            $mail->isHTML(true);
            $mail->Subject = 'Potwierdzenie wizyty';
            $mail->Body = "
                <h1>Potwierdzenie wizyty</h1>
                <p>Witaj, {$appointment->name}!</p>
                <p>Dziękujemy za umówienie wizyty.</p>
                <p><strong>Adres montażu:</strong> {$appointment->address}, {$appointment->city}, {$appointment->postal_code}</p>
                <p><strong>Typ usługi:</strong> {$appointment->service_type}</p>
                <p><strong>Data i godzina:</strong> {$appointment->preferred_date}</p>
                <p>Numer zgłoszenia: <strong>{$appointment->ticket_number}</strong></p>
            ";

            // Wyślij wiadomość
            $mail->send();
            error_log('Wiadomość została wysłana.');
        } catch (Exception $e) {
            // Obsługa błędów
            error_log('Mail could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        }
    }
}
