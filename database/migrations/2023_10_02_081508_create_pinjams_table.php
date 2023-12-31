<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pinjams', function (Blueprint $table) {
            $table->id();
            $table->date('tgl_mulai');
            $table->date('tgl_selesai');
            $table->foreignId('manajemen_id')->constrained();
            $table->foreignId('user_id')->constrained()->nullable();
            $table->float('sewa');
            $table->enum('status', ['sedang_disewa', 'telah_dikembalikan'])->default('sedang_disewa');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pinjams');
    }
};
