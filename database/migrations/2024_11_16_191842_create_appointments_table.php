<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id(); // Automatyczne ID z AUTO_INCREMENT
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('address');
            $table->string('city');
            $table->string('postal_code');
            $table->string('service_type');
            $table->dateTime('preferred_date');
            $table->string('photo_path')->nullable();
            $table->string('ticket_number');
            $table->timestamps();
        });
    
        // Resetowanie AUTO_INCREMENT przy tworzeniu tabeli
        DB::statement('ALTER TABLE appointments AUTO_INCREMENT = 1');
    } 

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
