<?php

use App\Http\Controllers\InscriptionController;
use Illuminate\Support\Facades\Route;

Route::get('/inscription', [InscriptionController::class, 'show'])->name('inscription');
Route::post('/inscription/step1', [InscriptionController::class, 'step1'])->name('inscription.step1');
Route::post('/inscription/step2', [InscriptionController::class, 'step2'])->name('inscription.step2');
Route::post('/inscription/step3', [InscriptionController::class, 'step3'])->name('inscription.step3');
Route::post('/inscription/step4/{user}', [InscriptionController::class, 'step4'])->name('inscription.step4');
Route::post('/inscription/step5/{user}', [InscriptionController::class, 'step5'])->name('inscription.step5');
Route::post('/inscription/step6/{user}', [InscriptionController::class, 'step6'])->name('inscription.step6');
