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
        Schema::table('ateliers', function (Blueprint $table) {
            $table->tinyInteger('is_public')->after('pose_type_id')->default(0);
            $table->unsignedInteger('max_modeles')->after('is_public')->default(1);
            $table->unsignedInteger('max_croqueurs')->after('max_modeles')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ateliers', function (Blueprint $table) {
            $table->dropColumn('public');
            $table->dropColumn('max_modeles');
            $table->dropColumn('max_croqueurs');
        });
    }
};
