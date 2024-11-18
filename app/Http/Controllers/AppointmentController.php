<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Services\MailService;
use Carbon\Carbon;

class AppointmentController extends Controller
{
    /**
     * Tworzenie nowej wizyty i wysyłka e-maila z potwierdzeniem.
     */
    public function store(Request $request)
    {
        // Walidacja danych
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'service_type' => 'required|string|max:50',
            'preferred_date' => 'required|date',
            'photo' => 'nullable|image|max:2048',
        ]);

        // Sprawdzenie, czy wybrana data jest w przeszłości
        $preferredDate = Carbon::parse($validated['preferred_date']);
        if ($preferredDate->isPast()) {
            return response()->json([
                'message' => 'Wybrana data jest wcześniejsza niż dzisiejsza. Proszę wybrać inną datę.',
            ], 422);
        }

        // Obsługa przesyłania zdjęcia (jeśli istnieje)
        $photoPath = $request->hasFile('photo') 
            ? $request->file('photo')->store('photos', 'public') 
            : null;

        // Korekta godziny daty przed zapisaniem do bazy (jeśli wymagana)
        $correctedDate = $preferredDate->addHour();

        // Tworzenie wizyty w bazie danych
        $appointment = Appointment::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'city' => $validated['city'],
            'postal_code' => $validated['postal_code'],
            'service_type' => $validated['service_type'],
            'preferred_date' => $correctedDate, // Zapis poprawionej godziny
            'photo_path' => $photoPath,
            'ticket_number' => strtoupper(Str::random(10)), // Generowanie unikalnego numeru zgłoszenia
        ]);

        // Wyślij e-mail z potwierdzeniem wizyty
        try {
            MailService::sendAppointmentConfirmation($appointment);
        } catch (\Exception $e) {
            // Logowanie błędów związanych z wysyłką e-mail
            \Log::error('Failed to send email confirmation: ' . $e->getMessage());
        }

        // Zwrócenie odpowiedzi JSON
        return response()->json([
            'message' => 'Wizyta została pomyślnie utworzona!',
            'appointment' => $appointment,
        ], 201);
    }

    /**
     * Pobieranie wizyt z możliwością filtrowania po dacie.
     */
    public function index(Request $request)
    {
        // Jeśli podano datę, zwróć wizyty na tę datę
        if ($request->has('date')) {
            $appointments = Appointment::whereDate('preferred_date', $request->date)->get();
            return response()->json($appointments, 200);
        }

        // W przeciwnym razie zwróć wszystkie wizyty
        $appointments = Appointment::all();
        return response()->json($appointments, 200);
    }
}
