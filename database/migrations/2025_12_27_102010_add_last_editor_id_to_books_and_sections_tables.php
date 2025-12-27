<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->foreignId('last_editor_id')->nullable()->constrained('users')->nullOnDelete();
        });

        Schema::table('sections', function (Blueprint $table) {
            $table->foreignId('last_editor_id')->nullable()->constrained('users')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->dropForeign(['last_editor_id']);
            $table->dropColumn('last_editor_id');
        });

        Schema::table('sections', function (Blueprint $table) {
            $table->dropForeign(['last_editor_id']);
            $table->dropColumn('last_editor_id');
        });
    }
};
