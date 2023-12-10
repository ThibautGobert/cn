<?php

use App\Http\Controllers\InscriptionController;
use Illuminate\Support\Facades\Route;

Route::get('/inscription', [InscriptionController::class, 'show'])->name('inscription');
Route::post('/inscription/step1', [InscriptionController::class, 'step1'])->name('inscription.step1');
Route::post('/inscription/step2', [InscriptionController::class, 'step2'])->name('inscription.step2');
