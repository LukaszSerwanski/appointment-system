<?php

use App\Http\Controllers\AppointmentController;

// Trasy API
Route::post('/appointments', [\App\Http\Controllers\AppointmentController::class, 'store']);
// Trasa pobierania wizyt
Route::get('/appointments', [AppointmentController::class, 'index']);
